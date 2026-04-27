import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getTenantByClerkId } from '@/lib/supabase'
import { getContacts, getCalendarEvents, getConversations } from '@/lib/ghl'

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

    // Fetch all data sources in parallel
    const [contactsData, eventsData, convoData] = await Promise.all([
      getContacts(tenant.ghl_api_key, tenant.ghl_location_id).catch(() => ({ contacts: [], meta: { total: 0 } })),
      getCalendarEvents(tenant.ghl_api_key, tenant.ghl_location_id).catch(() => ({ events: [] })),
      getConversations(tenant.ghl_api_key, tenant.ghl_location_id).catch(() => ({ conversations: [] })),
    ])

    const totalLeads = contactsData.meta?.total || contactsData.contacts?.length || 0
    const bookedAppointments = eventsData.events?.length || 0

    // Calculate conversion rate: contacts with appointments / total contacts
    const conversionRate = totalLeads > 0
      ? Math.round((bookedAppointments / totalLeads) * 100)
      : 0

    // Estimate revenue: average job value × booked appointments
    // Default to $500 per job if no monetary data available
    const avgJobValue = 500
    const estimatedRevenue = bookedAppointments * avgJobValue

    // Build recent activity feed from conversations
    const recentActivity = (convoData.conversations || [])
      .slice(0, 5)
      .map((c: Record<string, unknown>) => ({
        type: c.type === 'TYPE_PHONE' ? 'call' : 'message',
        contactName: c.contactName || c.fullName || 'Customer',
        lastMessage: (c.lastMessageBody as string) || '',
        time: c.lastMessageDate,
      }))

    return NextResponse.json({
      stats: {
        totalLeads,
        conversionRate,
        bookedAppointments,
        estimatedRevenue,
      },
      recentActivity,
      businessName: tenant.business_name,
      planTier: tenant.plan_tier,
    })
  } catch (err) {
    console.error('[ServiceNova API] Stats error:', err)
    return NextResponse.json({ error: 'Failed to load dashboard stats.' }, { status: 500 })
  }
}
