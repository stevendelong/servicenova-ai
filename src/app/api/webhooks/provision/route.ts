import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const expectedKey = process.env.PROVISIONING_API_KEY
    
    // Require a secure provisioning API key to call this endpoint
    if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { email, ghl_location_id, ghl_api_key, business_name, plan_tier } = body

    if (!email || !ghl_location_id || !ghl_api_key || !business_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Upsert tenant by email
    const { data, error } = await supabase
      .from('tenants')
      .upsert({
        email,
        ghl_location_id,
        ghl_api_key,
        business_name,
        plan_tier: plan_tier || 'growth'
      }, { onConflict: 'email' })
      .select()
      .single()

    if (error) {
      console.error('[Provisioning DB Error]', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, tenant: data })
  } catch (err: any) {
    console.error('[Provision Webhook Error]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
