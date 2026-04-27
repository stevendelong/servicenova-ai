import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

// Server-side only Supabase client using the service role key.
// NEVER expose this to the browser — it bypasses RLS.
export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Tenant lookup ────────────────────────────────────────────────────────────
// Given a Clerk user ID, returns the tenant's GHL credentials and metadata.
export async function getTenantByClerkId(clerkUserId: string) {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()

  if (error || !data) {
    console.error('[Supabase] Tenant lookup failed:', error?.message)
    return null
  }

  return data as {
    id: string
    clerk_user_id: string
    ghl_location_id: string
    ghl_api_key: string
    business_name: string
    plan_tier: string
    created_at: string
  }
}
