export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  try {
    const account = await stripe.accounts.update('acct_1TBIXUJzG6xU26F9', {
      business_profile: {
        url: 'https://closersassist.com'
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      url: account.business_profile.url,
      name: account.business_profile.name
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
