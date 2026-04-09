export const ROUTES = [
  {
    code: 'LHR–ORD',
    margin: '+24.1%',
    marginColor: 'var(--ok)',
    prompt: 'Tell me about the LHR–ORD route performance in detail',
  },
  {
    code: 'AMS–NBO',
    margin: '+21.4%',
    marginColor: 'var(--ok)',
    prompt: 'Tell me about the AMS–NBO route performance',
  },
  {
    code: 'CDG–BKK',
    margin: '+16.8%',
    marginColor: 'var(--text)',
    prompt: 'Tell me about CDG–BKK route performance',
  },
  {
    code: 'AMS–DXB',
    margin: '+9.2%',
    marginColor: 'var(--warn)',
    prompt: 'What is happening on AMS–DXB and why are margins dropping?',
  },
  {
    code: 'FRA–PVG',
    margin: '+2.1%',
    marginColor: 'var(--warn)',
    prompt: 'Tell me about FRA–PVG and the disruption issues there',
  },
  {
    code: 'CDG–JFK',
    margin: '−3.7%',
    marginColor: 'var(--bad)',
    prompt: 'What is happening on CDG–JFK and what are our options?',
  },
]

export const DOMAINS = [
  {
    icon: '✈',
    label: 'Route Performance',
    badge: { text: '3', type: 'warn' },
    prompt: 'Give me a full route performance overview across the network',
  },
  {
    icon: '📦',
    label: 'Bookings & Loads',
    badge: null,
    prompt: 'Show me current booking trends and load factors across routes',
  },
  {
    icon: '⚠',
    label: 'Disruptions',
    badge: { text: '5', type: 'bad' },
    prompt: 'What are the main disruption events this month and what did they cost us?',
  },
  {
    icon: '🏢',
    label: 'Customers',
    badge: null,
    prompt: 'Which customers are most profitable and which are at risk of churning?',
  },
  {
    icon: '🎯',
    label: 'Initiatives',
    badge: null,
    prompt: 'Which transformation initiatives are showing measurable results?',
  },
]

export const DATA_CURRENCY = [
  { key: 'Bookings',     value: 'Live · 15m lag', ok: true },
  { key: 'Capacity',     value: 'Daily refresh',  ok: true },
  { key: 'Financials',   value: 'Weekly',         ok: false },
  { key: 'Disruptions',  value: 'Live',           ok: true },
  { key: 'Customer NPS', value: 'Monthly',        ok: false },
  { key: 'Route margin', value: 'Weekly',         ok: false },
]
