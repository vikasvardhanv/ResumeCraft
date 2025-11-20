// Vercel Serverless Function for Stripe Checkout
const Stripe = require('stripe');

// Use environment variable for secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { source } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Set this in your Vercel project env vars
          quantity: 1,
        },
      ],
      success_url: 'https://resumecraft.dev/premium-success',
      cancel_url: 'https://resumecraft.dev/premium-cancel',
      metadata: {
        source: source || 'web',
      },
    });
    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
