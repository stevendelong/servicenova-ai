import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getTenantByClerkId } from '@/lib/supabase'
import { getCalendarEvents } from '@/lib/ghl'

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

    const data = await getCalendarEvents(tenant.ghl_api_key, tenant.ghl_location_id)

    // Transform GHL calendar events into ServiceNova appointments
    const appointments = (data.events || []).map((e: Record<string, unknown>) => ({
      id: e.id,
      title: e.title || 'Service Appointment',
      contactName: (e as Record<string, unknown>).contact
        ? `${((e as Record<string, unknown>).contact as Record<string, unknown>).firstName || ''} ${((e as Record<string, unknown>).contact as Record<string, unknown>).lastName || ''}`.trim()
        : 'Unknown',
      startTime: e.startTime,
      endTime: e.endTime,
      status: e.status || 'confirmed',
      notes: e.notes || '',
    }))

    return NextResponse.json({ appointments })
  } catch (err) {
    console.error('[ServiceNova API] Appointments error:', err)
    return NextResponse.json({ error: 'Failed to load appointments.' }, { status: 500 })
  }
}
