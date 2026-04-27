import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// ─── IMPORTANT: Add these to Vercel Environment Variables ────────────────────
// STRIPE_SECRET_KEY              = sk_live_...  (Stripe → Developers → API keys)
// STRIPE_PLATFORM_PRICE_ID       = price_...    ($297/mo recurring)
// STRIPE_GROWTH_PRICE_ID         = price_...    ($997/mo recurring)
// STRIPE_PREMIUM_PRICE_ID        = price_...    ($1997/mo recurring)
// NEXT_PUBLIC_SITE_URL           = https://servicenova.ai OR your Vercel URL
// ─────────────────────────────────────────────────────────────────────────────

// Initialize Stripe safely for build time when env vars might be missing
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY) 
  : null as unknown as Stripe;

const PLAN_PRICE_MAP: Record<string, string> = {
  platform: process.env.STRIPE_PLATFORM_PRICE_ID!,   // $297/mo
  growth:   process.env.STRIPE_GROWTH_PRICE_ID!,     // $997/mo
  premium:  process.env.STRIPE_PREMIUM_PRICE_ID!,    // $1,997/mo
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, plan } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const priceId = PLAN_PRICE_MAP[plan] || PLAN_PRICE_MAP.growth

    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price IDs are not configured. Please contact support.' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://servicenova-ai.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      metadata: {
        businessName: company || name,
        contactName: name,
        plan: plan || 'growth',
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      subscription_data: {
        metadata: {
          businessName: company || name,
          contactName: name,
          plan: plan || 'growth',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Stripe Checkout Error]', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
