// ── GoHighLevel API helper ───────────────────────────────────────────────────
// All GHL API calls go through this utility so the client NEVER sees GHL URLs.
// The API key and location ID come from the tenant's Supabase row.

const GHL_BASE = 'https://services.leadconnectorhq.com'

interface GHLRequestOptions {
  apiKey: string
  locationId: string
  endpoint: string
  params?: Record<string, string>
}

export async function ghlFetch({ apiKey, locationId, endpoint, params }: GHLRequestOptions) {
  const url = new URL(`${GHL_BASE}${endpoint}`)
  url.searchParams.set('locationId', locationId)
  
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 30 }, // cache GHL responses for 30 seconds
  })

  if (!res.ok) {
    const text = await res.text()
    console.error(`[GHL API Error] ${endpoint}:`, res.status, text)
    throw new Error(`GHL API error: ${res.status}`)
  }

  return res.json()
}

// ── Typed helpers ────────────────────────────────────────────────────────────

export async function getConversations(apiKey: string, locationId: string) {
  return ghlFetch({
    apiKey,
    locationId,
    endpoint: '/conversations/search',
    params: { limit: '20', sortBy: 'last_message_date', sortOrder: 'desc' },
  })
}

export async function getContacts(apiKey: string, locationId: string) {
  return ghlFetch({
    apiKey,
    locationId,
    endpoint: '/contacts/',
    params: { limit: '50', sortBy: 'date_added', sortOrder: 'desc' },
  })
}

export async function getCalendarEvents(apiKey: string, locationId: string) {
  // Get events from today forward (30-day window)
  const startDate = new Date().toISOString()
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  return ghlFetch({
    apiKey,
    locationId,
    endpoint: '/calendars/events',
    params: { startTime: startDate, endTime: endDate },
  })
}

export async function getOpportunities(apiKey: string, locationId: string) {
  return ghlFetch({
    apiKey,
    locationId,
    endpoint: '/opportunities/search',
    params: { limit: '100' },
  })
}
