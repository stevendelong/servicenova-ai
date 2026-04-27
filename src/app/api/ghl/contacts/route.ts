import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getTenantByClerkId } from '@/lib/supabase'
import { getContacts } from '@/lib/ghl'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tenant = await getTenantByClerkId(userId)
    if (!tenant) {
      return NextResponse.json({ error: 'Account not provisioned yet.' }, { status: 404 })
    }

    const data = await getContacts(tenant.ghl_api_key, tenant.ghl_location_id)

    // Transform GHL contacts into ServiceNova leads format
    const leads = (data.contacts || []).map((c: Record<string, unknown>) => ({
      id: c.id,
      name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Unknown',
      email: c.email || '',
      phone: c.phone || '',
      source: c.source || 'Direct',
      dateAdded: c.dateAdded,
      tags: c.tags || [],
    }))

    return NextResponse.json({ leads, total: data.meta?.total || leads.length })
  } catch (err) {
    console.error('[ServiceNova API] Contacts error:', err)
    return NextResponse.json({ error: 'Failed to load leads.' }, { status: 500 })
  }
}
