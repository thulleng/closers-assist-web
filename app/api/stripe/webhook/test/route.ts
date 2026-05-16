import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

/**
 * TEST MODE webhook — uses STRIPE_TEST_SECRET_KEY + STRIPE_TEST_WEBHOOK_SECRET.
 * Identical to production except skips VM provisioning (no infra costs for tests).
 */

function getTestStripe() {
  const key = process.env.STRIPE_TEST_SECRET_KEY;
  if (!key) throw new Error("STRIPE_TEST_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_TEST_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    const stripe = getTestStripe();
    const body = await req.text();

    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("[TEST WEBHOOK] Error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  console.log(`[TEST WEBHOOK] ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      console.log("[TEST] ✅ Payment complete:", { email, subscriptionId });

      let userId: string | null = null;

      if (email) {
        try {
          const supabase = createAdminClient();
          const { data: existingUsers } = await supabase.auth.admin.listUsers();

          if (existingUsers) {
            const existing = existingUsers.users.find(
              (u) => u.email?.toLowerCase() === email.toLowerCase()
            );
            if (existing) {
              userId = existing.id;
              console.log(`[TEST] 👤 Existing user: ${email}`);
            }
          }

          if (!userId) {
            const tempPassword = Array.from(
              crypto.getRandomValues(new Uint8Array(24))
            )
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");

            const { data: newUser, error: createError } =
              await supabase.auth.admin.createUser({
                email,
                password: tempPassword,
                email_confirm: true,
                user_metadata: {
                  source: "stripe_checkout_test",
                  stripe_session_id: session.id,
                },
              });

            if (createError) {
              console.error("[TEST] Create user failed:", createError);
            } else if (newUser?.user) {
              userId = newUser.user.id;
              console.log(`[TEST] 🆕 User: ${email}`);

              const { error: linkError } =
                await supabase.auth.admin.generateLink({
                  type: "magiclink",
                  email,
                  options: {
                    redirectTo: `${
                      process.env.NEXT_PUBLIC_SITE_URL || "https://closersassist.com"
                    }/onboarding`,
                  },
                });

              if (linkError) {
                console.error("[TEST] Magic link failed:", linkError);
              } else {
                console.log(`[TEST] 📧 Magic link sent`);
              }
            }
          }
        } catch (e) {
          console.error("[TEST] User error:", e);
        }
      }

      // Save subscription
      try {
        const supabase = createAdminClient();
        await supabase.from("subscriptions").upsert(
          {
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            stripe_session_id: session.id,
            user_id: userId,
            customer_email: email || null,
            status: "active",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_subscription_id" }
        );
        console.log(`[TEST] 💾 Subscription saved`);
      } catch (e) {
        console.error("[TEST] Subscription save failed:", e);
      }

      // SKIP VM provisioning — test mode
      console.log(`[TEST] ⏭️  Skipping Hetzner VM (test mode)`);

      // Still create agent_profile for success page
      if (userId) {
        try {
          const supabase = createAdminClient();
          await supabase.from("agent_profiles").upsert(
            {
              user_id: userId,
              provisioning_status: "provisioned",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
          console.log(`[TEST] 💾 Agent profile created`);
        } catch (e) {
          console.error("[TEST] Profile save failed:", e);
        }
      }

      break;
    }

    default:
      console.log(`[TEST] Unhandled: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
