import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

// Server-side only Supabase client using the service role key.
// NEVER expose this to the browser — it bypasses RLS.
export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Tenant lookup ────────────────────────────────────────────────────────────
// Given a Clerk user ID, returns the tenant's GHL credentials and metadata.
// Automatically links the account by email if provisioning was done before sign-up.
export async function getTenantByClerkId(clerkUserId: string) {
  let { data: tenant, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()

  if (!tenant) {
    // Fallback: look up by email if they just signed up and haven't been linked
    const { currentUser } = await import('@clerk/nextjs/server')
    const user = await currentUser()
    const email = user?.emailAddresses[0]?.emailAddress
    
    if (email) {
      const { data: tenantByEmail } = await supabase
        .from('tenants')
        .select('*')
        .eq('email', email)
        .single()
        
      if (tenantByEmail) {
        // Link them for future speed
        await supabase
          .from('tenants')
          .update({ clerk_user_id: clerkUserId })
          .eq('id', tenantByEmail.id)
          
        tenant = { ...tenantByEmail, clerk_user_id: clerkUserId }
      }
    }
  }

  if (!tenant) {
    console.error('[Supabase] Tenant lookup failed:', error?.message)
    return null
  }

  return tenant as {
    id: string
    clerk_user_id: string
    email: string
    ghl_location_id: string
    ghl_api_key: string
    business_name: string
    plan_tier: string
    created_at: string
  }
}
