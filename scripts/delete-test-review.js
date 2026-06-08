const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  // Find the test review by "Thul Lejg" or "test to see how fast"
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('id, name, review_text, created_at')
    .ilike('name', '%Thul%')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Query error:', error);
    return;
  }

  console.log(`Found ${reviews.length} matching reviews:`);
  for (const r of reviews) {
    console.log(`\nID: ${r.id}`);
    console.log(`Name: ${r.name}`);
    console.log(`Text: ${r.review_text.substring(0, 60)}...`);
    console.log(`Created: ${r.created_at}`);
    
    // Delete it
    const { error: delErr } = await supabase
      .from('reviews')
      .delete()
      .eq('id', r.id);
    
    if (delErr) {
      console.log(`  ❌ Delete failed: ${delErr.message}`);
    } else {
      console.log(`  ✅ DELETED`);
    }
  }
  
  if (reviews.length === 0) {
    console.log('No reviews found matching "Thul". Checking for test reviews...');
    
    const { data: testReviews } = await supabase
      .from('reviews')
      .select('id, name, review_text, created_at')
      .ilike('review_text', '%test%')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (testReviews && testReviews.length > 0) {
      for (const r of testReviews) {
        console.log(`\nID: ${r.id}, Name: ${r.name}, Text: ${r.review_text.substring(0, 60)}...`);
        const { error: delErr } = await supabase.from('reviews').delete().eq('id', r.id);
        if (delErr) console.log(`  ❌ Delete failed: ${delErr.message}`);
        else console.log(`  ✅ DELETED`);
      }
    } else {
      console.log('No test reviews found either.');
    }
  }
}

main();
