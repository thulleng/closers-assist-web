import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    const body = await req.text();

    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("✅ checkout.session.completed", {
        sessionId: session.id,
        customer: session.customer,
        customerEmail: session.customer_details?.email,
        subscriptionId: session.subscription,
        amountTotal: session.amount_total,
      });

      const email = session.customer_details?.email;
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      // ── Step 1: Auto-create Supabase user ──────────────────────────────
      let userId: string | null = null;

      if (email) {
        try {
          const supabase = createAdminClient();

          // Check if user already exists for this email
          const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
          
          if (!listError && existingUsers) {
            const existing = existingUsers.users.find(
              (u) => u.email?.toLowerCase() === email.toLowerCase()
            );
            if (existing) {
              userId = existing.id;
              console.log(`👤 Existing user found: ${email} (${userId})`);
            }
          }

          // Create user if not found
          if (!userId) {
            // Generate a secure random password (user will use magic link anyway)
            const tempPassword = Array.from(
              crypto.getRandomValues(new Uint8Array(24))
            )
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");

            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
              email,
              password: tempPassword,
              email_confirm: true,
              user_metadata: {
                source: "stripe_checkout",
                stripe_session_id: session.id,
                stripe_customer_id: customerId,
              },
            });

            if (createError) {
              console.error("Failed to create Supabase user:", createError);
            } else if (newUser?.user) {
              userId = newUser.user.id;
              console.log(`🆕 User created: ${email} (${userId})`);

              // Send magic link so they can log in without knowing the password
              const { error: linkError } = await supabase.auth.admin.generateLink({
                type: "magiclink",
                email,
                options: {
                  redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://closersassist.com"}/onboarding`,
                },
              });

              if (linkError) {
                console.error("Failed to send magic link:", linkError);
              } else {
                console.log(`📧 Magic link sent to ${email}`);
              }
            }
          }
        } catch (userErr) {
          console.error("User provisioning error:", userErr);
        }
      }

      // ── Step 2: Save subscription to Supabase ──────────────────────────
      try {
        const supabase = createAdminClient();

        const { error: upsertError } = await supabase
          .from("subscriptions")
          .upsert(
            {
              stripe_subscription_id: subscriptionId,
              stripe_customer_id: customerId,
              stripe_session_id: session.id,
              user_id: userId,
              price_id: null,
              customer_email: email || null,
              status: "active",
              current_period_start: null,
              current_period_end: null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "stripe_subscription_id" }
          );

        if (upsertError) {
          console.error("Failed to save subscription:", upsertError);

          if (upsertError.code === "42P01") {
            console.warn(
              "⚠️  subscriptions table missing. Run: sql/create_subscriptions.sql in Supabase dashboard"
            );
          }
        } else {
          console.log(`💾 Subscription saved: ${subscriptionId} (${email}, user=${userId})`);
        }
      } catch (dbErr) {
        console.error("Supabase error:", dbErr);
      }

      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const s = sub as any;
      console.log("🔄 subscription updated", {
        id: sub.id,
        status: sub.status,
        customer: sub.customer,
      });

      try {
        const supabase = createAdminClient();
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: sub.status,
            current_period_start: new Date(s.current_period_start * 1000).toISOString(),
            current_period_end: new Date(s.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", sub.id);

        if (error && error.code !== "42P01") {
          console.error("Failed to update subscription:", error);
        }
      } catch (dbErr) {
        console.error("Supabase error:", dbErr);
      }

      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log("❌ subscription cancelled", { subscriptionId: sub.id });

      try {
        const supabase = createAdminClient();
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", sub.id);

        if (error && error.code !== "42P01") {
          console.error("Failed to mark subscription cancelled:", error);
        }
      } catch (dbErr) {
        console.error("Supabase error:", dbErr);
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
