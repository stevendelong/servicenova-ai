import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getTenantByClerkId } from '@/lib/supabase'
import { getConversations } from '@/lib/ghl'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tenant = await getTenantByClerkId(userId)
    if (!tenant) {
      return NextResponse.json({ error: 'Account not provisioned yet. Please contact support.' }, { status: 404 })
    }

    const data = await getConversations(tenant.ghl_api_key, tenant.ghl_location_id)

    // Transform GHL response into ServiceNova-branded format
    // Strip any GHL-specific fields the client shouldn't see
    const conversations = (data.conversations || []).map((c: Record<string, unknown>) => ({
      id: c.id,
      contactId: c.contactId,
      contactName: c.contactName || c.fullName || 'Unknown',
      lastMessage: (c.lastMessageBody as string) || '',
      lastMessageDate: c.lastMessageDate,
      unreadCount: c.unreadCount || 0,
      type: c.type, // SMS, Email, etc.
    }))

    return NextResponse.json({ conversations })
  } catch (err) {
    console.error('[ServiceNova API] Conversations error:', err)
    return NextResponse.json({ error: 'Failed to load conversations.' }, { status: 500 })
  }
}
