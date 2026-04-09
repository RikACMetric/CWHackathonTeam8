// Escalation scenario — FRA-PVG Cascade Failure, 6-week compounding disruption

export const escalationTimeline = [
  { week: 'W1', event: 'Ground-handling SLA miss', detail: 'PVG partner missed SLA on 4 consecutive rotations', margin: 8.4, revenue: 312, loadFactor: 78, disruptionWeekly: 22, disruptionCumulative: 22, customerRevAtRisk: 0 },
  { week: 'W2', event: 'Delays absorbed', detail: 'Average turnaround delay +3.2 hrs, within buffer', margin: 7.9, revenue: 305, loadFactor: 76, disruptionWeekly: 23, disruptionCumulative: 45, customerRevAtRisk: 0 },
  { week: 'W3', event: 'Missed feeder windows', detail: '3 missed connecting truck feeder windows in Shanghai', margin: 6.1, revenue: 280, loadFactor: 72, disruptionWeekly: 48, disruptionCumulative: 93, customerRevAtRisk: 0 },
  { week: 'W4', event: 'Crew duty violations', detail: '2 flight cancellations from crew duty-time breaches', margin: 4.2, revenue: 248, loadFactor: 68, disruptionWeekly: 87, disruptionCumulative: 180, customerRevAtRisk: 380 },
  { week: 'W5', event: 'Customer volume shift', detail: '#2 pharma customer shifted 40% of FRA-PVG volume', margin: 3.1, revenue: 218, loadFactor: 64, disruptionWeekly: 120, disruptionCumulative: 300, customerRevAtRisk: 1900 },
  { week: 'W6', event: 'Force majeure notice', detail: 'PVG handler cited labour action — no support for 8 rotations', margin: 2.1, revenue: 194, loadFactor: 61, disruptionWeekly: 140, disruptionCumulative: 440, customerRevAtRisk: 3100 },
]

export const projectedData = [
  { week: 'W6', marginActual: 2.1, marginProjected: 2.1 },
  { week: 'W7', marginActual: null, marginProjected: 0.8 },
  { week: 'W8', marginActual: null, marginProjected: -0.9 },
  { week: 'W9', marginActual: null, marginProjected: -2.4 },
  { week: 'W10', marginActual: null, marginProjected: -4.2 },
]

export const customerImpact = [
  { week: 'W1', volumeActual: 100, volumeBaseline: 100 },
  { week: 'W2', volumeActual: 98, volumeBaseline: 100 },
  { week: 'W3', volumeActual: 92, volumeBaseline: 100 },
  { week: 'W4', volumeActual: 81, volumeBaseline: 100 },
  { week: 'W5', volumeActual: 64, volumeBaseline: 100 },
  { week: 'W6', volumeActual: 58, volumeBaseline: 100 },
]

export const riskMatrix = [
  { risk: 'Lane goes margin-negative within 2 weeks', likelihood: 'High', impact: '−€85K/month bleed', severity: 'critical', mitigation: 'Activate backup ground-handler (Swissport PVG standby)' },
  { risk: '#2 pharma customer fully exits FRA-PVG', likelihood: 'Medium-High', impact: '€1.9M annual revenue loss', severity: 'critical', mitigation: 'Direct commercial outreach with SLA credits + priority guarantee' },
  { risk: 'Labour action spreads to cargo warehouse ops', likelihood: 'Medium', impact: 'No EU hub-to-Shanghai capacity', severity: 'critical', mitigation: 'Stand up FRA-ICN-PVG codeshare routing' },
  { risk: 'Spot-market backfill fails to recover yield', likelihood: 'High', impact: 'Load factor stuck at 61%', severity: 'warning', mitigation: 'Deploy dynamic pricing on remaining capacity' },
  { risk: 'Insurance claim delayed past deductible window', likelihood: 'Medium', impact: '€200K deductible absorbed', severity: 'warning', mitigation: 'Fast-track documentation and claim filing' },
]

export const responseActions = {
  tier1: [
    { title: 'Activate Swissport PVG standby contract', detail: 'Backup ground-handling agreement covers 8 rotations. Estimated activation cost: €45K. Prevents total service outage on FRA-PVG.', timeline: 'This week', confidence: 'High' },
    { title: 'Direct outreach to #2 pharma customer', detail: 'Offer guaranteed priority handling + SLA credits worth €120K to retain remaining 60% volume. Revenue at stake: €1.9M annually.', timeline: 'This week', confidence: 'Medium-High' },
    { title: 'Reroute 3 of next 8 rotations via AMS-PVG', detail: 'AMS has confirmed capacity on Tue/Thu/Sat. Maintains service continuity while PVG ground ops are offline.', timeline: 'This week', confidence: 'High' },
  ],
  tier2: [
    { title: 'Negotiate exit clause with current PVG handler', detail: 'Force majeure notice gives contractual basis for penalty-free exit. Engage legal to formalise transition to Swissport.', timeline: '2-4 weeks', confidence: 'Medium' },
    { title: 'Deploy dynamic pricing on FRA-PVG capacity', detail: 'Remaining capacity at 61% load factor. Dynamic pricing can recover estimated €15-20K/week in yield vs. flat spot rates.', timeline: '2-4 weeks', confidence: 'Medium-High' },
    { title: 'Stand up FRA-ICN-PVG routing via codeshare', detail: 'If PVG ground ops remain offline >2 weeks, Incheon transit routing preserves Shanghai service. Lead time: 10 business days.', timeline: '2-4 weeks', confidence: 'Medium' },
  ],
  tier3: [
    { title: 'Dual-source ground handling at top-5 stations', detail: 'Mandate backup ground-handler contracts at all top-5 destination airports. Prevents single-vendor cascade risk.', timeline: '1-3 months', confidence: 'High' },
    { title: 'Implement automated escalation triggers', detail: 'If any lane hits 3 consecutive SLA breaches, auto-flag for VP review. Catches cascades before they compound.', timeline: '1-3 months', confidence: 'High' },
    { title: 'Add FRA-PVG to quarterly stress-test scenarios', detail: 'Alongside CDG-JFK, model cascade failure scenarios quarterly. Includes customer retention, ground-handler, and insurance dimensions.', timeline: '1-3 months', confidence: 'Medium-High' },
  ],
}

export const summary = {
  laneMargin: '+2.1%',
  laneMarginTrend: 'down from +8.4%',
  weeklyRevenue: '€194K',
  weeklyRevenueTrend: '↓ 38% from €312K',
  loadFactor: '61%',
  loadFactorTrend: 'down from 78%',
  disruptionCost: '€440K',
  disruptionCostTrend: 'cumulative over 6 weeks',
  customerRevAtRisk: '€3.1M',
  customerRevAtRiskDetail: 'annual revenue exposed',
  projectedMargin: '−4.2%',
  projectedMarginDetail: 'by Week 10 if unresolved',
  route: 'FRA-PVG',
  period: '6-Week Cascade',
  worstCase: '€4.8M annualised impact',
  emergencySpend: '€150K',
}
