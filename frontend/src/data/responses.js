// ─── Response engine ───────────────────────────────────────────────────────
export function getResponse(q) {
  const t = q.toLowerCase()

  if (/\b(route|routes|margin|losing|overview|network|all route)\b/.test(t))
    return routeOverview()
  if (/\b(disruption|disrupt|cost|fra.pvg|frankfurt|pvg|ramp)\b/.test(t) && !/invest|prior/.test(t))
    return disruptions()
  if (/\b(invest|priority|priorities|next quarter|where should|double down|stop doing|back)\b/.test(t))
    return investment()
  if (/\b(customer|nps|risk|churn|dhl|zara|amazon|profitab)\b/.test(t))
    return customers()
  if (/\b(working|initiative|prove|proven|what.s working|actually working|evidence)\b/.test(t))
    return working()
  if (/\b(fra|pvg|frankfurt|shanghai)\b/.test(t))
    return fraPvg()
  if (/\b(ams.dxb|amsterdam.dubai|dxb|dubai|gulf carrier|emirates)\b/.test(t))
    return amsDxb()
  if (/\b(lhr.ord|london.chicago|lhr|ord|dynamic pricing|pricing pilot)\b/.test(t))
    return lhrOrd()
  if (/\b(cdg.jfk|paris.new york|jfk|paris|new york)\b/.test(t))
    return cdgJfk()
  if (/\b(capacity|utiliz|load factor|tonne|unfilled)\b/.test(t))
    return capacity()
  if (/\b(otp|on.time|on time|delay|punctuality|performance)\b/.test(t))
    return otp()
  if (/\b(revenue|income|financ|quarter|qtd|target)\b/.test(t))
    return revenue()
  if (/\b(margin drop|drop in margin|why.*margin|margin.*why|2\.1pp)\b/.test(t))
    return marginDrop()

  return fallback(q)
}

// ─── Individual response functions ────────────────────────────────────────

function routeOverview() {
  return `
<h4>Route Performance Overview — All 6 Active Routes</h4>
<table class="dtable">
  <thead>
    <tr><th>Route</th><th>Margin</th><th>Load Factor</th><th>Trend</th><th>OTP</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td class="mono">LHR–ORD</td><td class="c-ok mono">+24.1%</td><td>89%</td><td class="c-ok">↑ +4.2pp</td><td>93%</td><td><span class="tag tag-ok">HEALTHY</span></td></tr>
    <tr><td class="mono">AMS–NBO</td><td class="c-ok mono">+21.4%</td><td>78%</td><td class="c-ok">↑ +6.1pp</td><td>90%</td><td><span class="tag tag-ok">ON TRACK</span></td></tr>
    <tr><td class="mono">CDG–BKK</td><td class="mono" style="color:var(--text)">+16.8%</td><td>74%</td><td class="c-mute">→ stable</td><td>88%</td><td><span class="tag tag-info">STABLE</span></td></tr>
    <tr><td class="mono">AMS–DXB</td><td class="c-warn mono">+9.2%</td><td>69%</td><td class="c-bad">↓ −3.1pp</td><td>91%</td><td><span class="tag tag-warn">AT RISK</span></td></tr>
    <tr><td class="mono">FRA–PVG</td><td class="c-warn mono">+2.1%</td><td>63%</td><td class="c-bad">↓ −5.8pp</td><td>71%</td><td><span class="tag tag-bad">CRITICAL</span></td></tr>
    <tr><td class="mono">CDG–JFK</td><td class="c-bad mono">−3.7%</td><td>58%</td><td class="c-bad">↓ −2.4pp</td><td>82%</td><td><span class="tag tag-bad">LOSING $</span></td></tr>
  </tbody>
</table>
<p><strong>Two routes demand immediate attention:</strong></p>
<ul>
  <li><strong>CDG–JFK</strong> — margin negative at −3.7%. Chronic under-booking (58% load, break-even is ~74%) combined with JFK port congestion penalties averaging €48K/month. Currently losing approximately €140K/month.</li>
  <li><strong>FRA–PVG</strong> — margin nearly gone at +2.1%, down 5.8pp this quarter. Driven entirely by ramp handling SLA failures at Frankfurt Cargo Center, not by demand weakness.</li>
  <li><strong>AMS–DXB</strong> — margin slipping under competitive pressure from Emirates SkyCargo. Route has strong OTP (91%) which is not yet reflected in pricing.</li>
</ul>
<div class="conf-note"><strong>Data note:</strong> Margin figures are weekly averages based on last full week. CDG–JFK and FRA–PVG figures have highest confidence; AMS–DXB margin includes a directional estimate on competitive capacity impact that is harder to isolate precisely.</div>`
}

function disruptions() {
  return `
<h4>Disruption Analysis — Q1 Cost: <span class="c-bad">€2.4M total</span></h4>
<p><strong>The headline is misleading</strong> — this is not a network-wide disruption problem. It is concentrated in one place.</p>
<table class="dtable">
  <thead><tr><th>Route</th><th>Disruption Cost Q1</th><th>vs Q4 Prior</th><th>Primary Cause</th></tr></thead>
  <tbody>
    <tr><td class="mono">FRA–PVG</td><td class="c-bad mono">€1.48M</td><td class="c-bad">↑ ×3.1</td><td>Ramp handling SLA failure</td></tr>
    <tr><td class="mono">CDG–JFK</td><td class="c-warn mono">€580K</td><td class="c-bad">↑ +42%</td><td>JFK port congestion delays</td></tr>
    <tr><td class="mono">AMS–DXB</td><td class="mono">€180K</td><td class="c-mute">→ stable</td><td>Late connecting cargo</td></tr>
    <tr><td class="mono">Other routes</td><td class="mono">€140K</td><td class="c-ok">↓ −12%</td><td>Weather, misc</td></tr>
  </tbody>
</table>
<h4>FRA–PVG Root Cause — It Is Not Weather</h4>
<p>I have cross-referenced disruption logs with weather data, customs records, and ground handler SLA reports. The breakdown:</p>
<ul>
  <li><strong>Ramp handling failures: 67%</strong> — 3 of 5 contracted ground handlers at Frankfurt Cargo Center are failing >40% of their lift commitments on time.</li>
  <li><strong>Weather: 18%</strong> — seasonal, not abnormal vs prior years.</li>
  <li><strong>Customs clearance delays: 15%</strong> — correlated with handler failures causing documentation backlogs.</li>
</ul>
<p>Monthly cost trajectory on FRA–PVG: <span class="c-mute">Jan €180K</span> → <span class="c-warn">Feb €420K</span> → <span class="c-bad">Mar €680K</span>. This is accelerating, not stabilising.</p>
<p><strong>The penalty clauses in the ground handler contracts cover up to 60% of documented SLA losses</strong> — these have not yet been invoked. This is recoverable revenue.</p>
<div class="conf-note"><strong>Confidence: High.</strong> Disruption log data is live. Handler SLA reports are sourced directly from the Frankfurt Cargo Center management system. The 67/18/15 split is based on 847 logged disruption events in Q1.</div>`
}

function investment() {
  return `
<h4>Where to Focus — Three Prioritised Recommendations</h4>
<div class="rec-card">
  <div class="rec-num">PRIORITY 1 · Highest confidence · 6-week fix</div>
  <div class="rec-title">Invoke FRA ramp handling SLA penalties and trigger contingency handler</div>
  <div class="rec-detail">Estimated recovery: €840K in penalty claims. Estimated ongoing saving once SLA restored: €1.2M annually. Two contingency handlers are pre-qualified in Frankfurt. This is an operational fix, not a transformation project — it can move in weeks, not months.</div>
</div>
<div class="rec-card">
  <div class="rec-num">PRIORITY 2 · Medium confidence · 60–90 day pilot</div>
  <div class="rec-title">Expand LHR–ORD dynamic pricing model to AMS–DXB</div>
  <div class="rec-detail">LHR–ORD gained 4.2pp margin in 90 days after dynamic pricing launch — the clearest proof point we have. AMS–DXB has premium OTP (91%) not reflected in pricing. Estimated uplift: +2–3pp margin. Note: AMS–DXB market is more competitive — Gulf carrier dynamics may dampen impact vs LHR–ORD.</div>
</div>
<div class="rec-card">
  <div class="rec-num">PRIORITY 3 · Requires 2 more months of data</div>
  <div class="rec-title">Restructure or exit CDG–JFK</div>
  <div class="rec-detail">Currently losing €140K/month. Three options: (a) Exit — stops the bleeding fastest. (b) Restructure to cargo-only charter partnership, removing belly dependency. (c) Capacity-share with a transatlantic partner. Post-peak season data (May–Jun) will significantly sharpen this decision.</div>
</div>
<div class="conf-note"><strong>Confidence note:</strong> Recommendations are based on 6 months of operational data. Priority 1 has the highest confidence — the causal chain from handler failure to cost is directly evidenced. Priority 2 has medium confidence — the LHR–ORD model is proven but AMS–DXB market dynamics differ. Priority 3 cannot be called with confidence yet — data does not support a final route/exit decision before the summer data is in.</div>`
}

function customers() {
  return `
<h4>Customer Profitability & Risk — 34 Active Accounts</h4>
<table class="dtable">
  <thead><tr><th>Customer</th><th>Revenue (QTD)</th><th>NPS</th><th>Trend</th><th>Late Del. Rate</th><th>Risk</th></tr></thead>
  <tbody>
    <tr><td><strong>Maersk Air Cargo</strong></td><td class="mono">€14.2M</td><td class="c-ok">68</td><td class="c-ok">↑ +4</td><td class="c-ok">3.1%</td><td><span class="tag tag-ok">HEALTHY</span></td></tr>
    <tr><td><strong>DB Schenker</strong></td><td class="mono">€11.8M</td><td class="c-ok">61</td><td class="c-mute">→ stable</td><td class="c-ok">4.7%</td><td><span class="tag tag-ok">HEALTHY</span></td></tr>
    <tr><td><strong>Kuehne+Nagel</strong></td><td class="mono">€9.4M</td><td class="c-ok">57</td><td class="c-ok">↑ +2</td><td class="c-ok">5.2%</td><td><span class="tag tag-ok">HEALTHY</span></td></tr>
    <tr><td><strong>DHL Express</strong></td><td class="mono">€7.6M</td><td class="c-bad">28 ↓</td><td class="c-bad">↓ −24</td><td class="c-bad">14.2%</td><td><span class="tag tag-bad">AT RISK</span></td></tr>
    <tr><td><strong>Zara Logistics</strong></td><td class="mono">€5.1M</td><td class="c-warn">44</td><td class="c-mute">→ stable</td><td class="c-warn">7.8%</td><td><span class="tag tag-warn">WATCH</span></td></tr>
    <tr><td><strong>Siemens Freight</strong></td><td class="mono">€4.3M</td><td class="c-ok">52</td><td class="c-mute">→ stable</td><td class="c-ok">4.1%</td><td><span class="tag tag-ok">HEALTHY</span></td></tr>
    <tr><td><strong>Bolloré Logistics</strong></td><td class="mono">€3.8M</td><td class="c-warn">38</td><td class="c-bad">↓ −11</td><td class="c-warn">9.3%</td><td><span class="tag tag-warn">WATCH</span></td></tr>
    <tr><td><em>Amazon Air</em></td><td class="mono c-mute">— prospect</td><td class="c-mute">—</td><td class="c-mute">—</td><td class="c-mute">—</td><td><span class="tag tag-info">OPPORTUNITY</span></td></tr>
  </tbody>
</table>
<ul>
  <li><strong>DHL Express is the critical case.</strong> NPS dropped from 52 to 28 in two months. Late delivery rate of 14.2% traces directly to FRA–PVG disruptions — DHL's time-critical pharma shipments are the most affected. If this is not fixed operationally, this account is at renewal risk (contract expires Q3).</li>
  <li><strong>Zara Logistics</strong> is stable on NPS but is actively renegotiating their contract. Their leverage is limited but they know it — expect a 5–8% rate ask downward.</li>
  <li><strong>Top 3 customers (Maersk, DB Schenker, K+N)</strong> contribute 61% of revenue and are healthy. Protecting these relationships must not be compromised by network instability.</li>
  <li><strong>Amazon Air</strong> is not yet a customer but has made two exploratory enquiries in Q1. A credible pitch would require demonstrating the LHR–ORD dynamic pricing capability and AMS–NBO route development story.</li>
</ul>
<div class="conf-note"><strong>Data note:</strong> NPS scores are from the most recent monthly survey (March). Revenue is QTD from the weekly financial extract. Late delivery rates are from the operational events system — live data, 15-minute lag.</div>`
}

function working() {
  return `
<h4>What the Data Can Prove — Initiative Scorecard</h4>
<p>Three initiatives have measurable, defensible results. Two do not.</p>
<table class="dtable">
  <thead><tr><th>Initiative</th><th>Status</th><th>Metric</th><th>Result</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>LHR–ORD Dynamic Pricing Pilot</strong></td>
      <td><span class="tag tag-ok">PROVEN</span></td>
      <td>Margin / Revenue</td>
      <td class="c-ok">+4.2pp margin · €2.1M incremental revenue in 90 days</td>
    </tr>
    <tr>
      <td><strong>AMS–NBO Route Launch</strong></td>
      <td><span class="tag tag-ok">ON TRACK</span></td>
      <td>Load Factor</td>
      <td class="c-ok">78% load in Month 3 — ahead of 70% target</td>
    </tr>
    <tr>
      <td><strong>Digital Booking Portal</strong></td>
      <td><span class="tag tag-ok">PROVEN</span></td>
      <td>Self-serve rate / handling time</td>
      <td class="c-ok">34% of bookings now self-serve · avg handling time −22 min</td>
    </tr>
    <tr>
      <td><strong>Manual Capacity Allocation — FRA–PVG</strong></td>
      <td><span class="tag tag-bad">NOT WORKING</span></td>
      <td>Decision lag</td>
      <td class="c-bad">&gt;48hr lag on reallocation decisions — disruptions compound before response</td>
    </tr>
    <tr>
      <td><strong>CDG–JFK Static Pricing Strategy</strong></td>
      <td><span class="tag tag-bad">NOT WORKING</span></td>
      <td>Yield vs market</td>
      <td class="c-bad">Yield 11% below spot market price in 6 of last 8 weeks</td>
    </tr>
  </tbody>
</table>
<h4>The Pattern</h4>
<ul>
  <li>The dynamic pricing approach works — LHR–ORD is the evidence. The question is where to expand it next.</li>
  <li>New route development is performing well — AMS–NBO shows the model can generate new revenue when there is genuine demand.</li>
  <li>Manual operational processes are the common thread in what is failing — both the FRA–PVG and CDG–JFK problems involve slow human decision loops in volatile situations.</li>
</ul>
<div class="conf-note"><strong>Confidence: High for items marked PROVEN.</strong> LHR–ORD and Digital Portal results are based on before/after operational data with clear control periods. AMS–NBO is early-stage — three months of data; trend is positive but too early to call long-term. The "not working" assessments are directional — based on operational data, not controlled experiments.</div>`
}

function fraPvg() {
  return `
<h4>FRA–PVG Deep Dive — The Disruption Trajectory</h4>
<table class="dtable">
  <thead><tr><th>Month</th><th>Disruption Events</th><th>Cost</th><th>OTP</th><th>Dominant Cause</th></tr></thead>
  <tbody>
    <tr><td>January</td><td>31</td><td class="mono">€180K</td><td>84%</td><td>Weather (52%), Ramp (33%)</td></tr>
    <tr><td>February</td><td>67</td><td class="c-warn mono">€420K</td><td>76%</td><td>Ramp (61%), Weather (24%)</td></tr>
    <tr><td>March</td><td>94</td><td class="c-bad mono">€680K</td><td>71%</td><td>Ramp (67%), Customs (15%)</td></tr>
  </tbody>
</table>
<h4>Ground Handler SLA Failure — Frankfurt Cargo Center</h4>
<table class="dtable">
  <thead><tr><th>Handler</th><th>SLA Target</th><th>Actual</th><th>Failure Rate</th><th>Action</th></tr></thead>
  <tbody>
    <tr><td>AeroGround GmbH</td><td>&lt;30 min lift</td><td>62 min avg</td><td class="c-bad">51% of lifts late</td><td><span class="tag tag-bad">INVOKE PENALTY</span></td></tr>
    <tr><td>Fraport Cargo Services</td><td>&lt;30 min lift</td><td>47 min avg</td><td class="c-bad">44% of lifts late</td><td><span class="tag tag-bad">INVOKE PENALTY</span></td></tr>
    <tr><td>WFS Frankfurt</td><td>&lt;30 min lift</td><td>38 min avg</td><td class="c-warn">31% of lifts late</td><td><span class="tag tag-warn">FORMAL WARNING</span></td></tr>
    <tr><td>Swissport FRA</td><td>&lt;30 min lift</td><td>28 min avg</td><td class="c-ok">9% of lifts late</td><td><span class="tag tag-ok">PERFORMING</span></td></tr>
    <tr><td>dnata Frankfurt</td><td>&lt;30 min lift</td><td>31 min avg</td><td class="c-ok">14% of lifts late</td><td><span class="tag tag-ok">PERFORMING</span></td></tr>
  </tbody>
</table>
<h4>Immediate Actions Available</h4>
<ul>
  <li><strong>Invoke SLA penalty clauses</strong> for AeroGround and Fraport — recoverable up to 60% of documented SLA losses, estimated €504K in claims.</li>
  <li><strong>Transfer volume to Swissport and dnata</strong> as contingency while remediation is underway — both have spare capacity confirmed.</li>
  <li><strong>The customs delay pattern (15%) is downstream</strong> — when lifts are late, documentation queues at customs. Fixing the ramp problem will reduce customs delays as a secondary effect.</li>
</ul>
<div class="conf-note"><strong>Confidence: High.</strong> Handler SLA data is pulled directly from the Frankfurt Cargo Center management system and cross-referenced with TopFlight's own operations logs. The cost figures are based on direct cost attribution, not modelled estimates.</div>`
}

function amsDxb() {
  return `
<h4>AMS–DXB — Under Competitive Pressure</h4>
<p>This is a high-volume route with a strong operational foundation — but the commercial position is deteriorating due to external competition.</p>
<table class="dtable">
  <thead><tr><th>Metric</th><th>Current</th><th>vs 6 Months Ago</th><th>vs Competitor Avg</th></tr></thead>
  <tbody>
    <tr><td>Margin</td><td class="c-warn">+9.2%</td><td class="c-bad">↓ −3.1pp</td><td class="c-mute">—</td></tr>
    <tr><td>Load Factor</td><td>69%</td><td class="c-bad">↓ −5pp</td><td class="c-mute">68% (similar)</td></tr>
    <tr><td>OTP</td><td class="c-ok">91%</td><td class="c-ok">↑ +2pp</td><td class="c-ok">vs 84% competitors</td></tr>
    <tr><td>Avg Yield</td><td class="mono">€3.21/kg</td><td class="c-bad">↓ −€0.31/kg</td><td class="c-mute">—</td></tr>
    <tr><td>Capacity leakage</td><td class="c-bad">~8%</td><td>—</td><td class="c-mute">bookings lost to competitors</td></tr>
  </tbody>
</table>
<h4>What Changed</h4>
<ul>
  <li><strong>Emirates SkyCargo added 3 weekly freighter services on this lane in January</strong> — increasing Gulf carrier belly + freighter capacity by an estimated 18% on the route.</li>
  <li>~8% of bookings that would previously have gone to TopFlight are now being captured by Gulf carrier alternatives — confirmed by customer conversations and GDS booking data.</li>
  <li><strong>TopFlight's OTP is significantly better</strong> (91% vs 84% competitor average) — but the current pricing does not reflect this premium. Time-critical and pharma shippers are the most price-inelastic segment here.</li>
</ul>
<h4>The Opportunity</h4>
<p>Introduce a <strong>premium OTP tier for time-critical and pharma shipments</strong> — price the reliability advantage explicitly. The LHR–ORD dynamic pricing model already does this. Estimated uplift: +2–3pp margin on the premium tier (estimated 35% of volume on this route).</p>
<div class="conf-note"><strong>Confidence: Medium.</strong> The competitive capacity increase is directly evidenced. The 8% leakage is estimated from GDS booking patterns — directionally correct but imprecise. The pricing tier uplift estimate is modelled from LHR–ORD analogues; AMS–DXB has different market dynamics and Gulf carriers have lower cost bases.</div>`
}

function lhrOrd() {
  return `
<h4>LHR–ORD — The Standout Performer</h4>
<p>This is the proof point Noor needs to show in leadership reviews. The dynamic pricing pilot has produced <strong>measurable, defensible results in 90 days</strong>.</p>
<table class="dtable">
  <thead><tr><th>Metric</th><th>Before Pilot</th><th>Now</th><th>Change</th></tr></thead>
  <tbody>
    <tr><td>Margin</td><td>19.9%</td><td class="c-ok">24.1%</td><td class="c-ok">↑ +4.2pp</td></tr>
    <tr><td>Load Factor</td><td>76%</td><td class="c-ok">89%</td><td class="c-ok">↑ +13pp</td></tr>
    <tr><td>Avg Yield</td><td class="mono">£4.11/kg</td><td class="c-ok mono">£4.82/kg</td><td class="c-ok">↑ +17%</td></tr>
    <tr><td>Incremental Revenue</td><td>—</td><td class="c-ok">€2.1M</td><td class="c-ok">90-day period</td></tr>
    <tr><td>OTP</td><td>91%</td><td class="c-ok">93%</td><td class="c-ok">↑ +2pp</td></tr>
    <tr><td>Customer NPS (route)</td><td>54</td><td class="c-ok">67</td><td class="c-ok">↑ +13 pts</td></tr>
  </tbody>
</table>
<h4>How It Works</h4>
<ul>
  <li>The algorithm reads 48-hour demand signals from the booking system and adjusts yield by cargo segment — pharma, time-critical, general freight — independently.</li>
  <li>Time-critical and pharma shipments are now priced at a premium that customers accept because OTP is consistently high (93%).</li>
  <li>General freight gets yield-optimised filling to target load factor without eroding margin on premium segments.</li>
</ul>
<h4>What This Proves for the Wider Case</h4>
<p>This is the model for AMS–DXB and potentially CDG–BKK. The conditions that make it work: high OTP, enough booking volume to generate demand signals, and a mix of time-critical and price-elastic cargo.</p>
<div class="conf-note"><strong>Confidence: High.</strong> This is a before/after comparison on a single route with a clear pilot start date. The €2.1M incremental revenue figure is directly attributed in the financial system. NPS is from the route-level customer survey run monthly.</div>`
}

function cdgJfk() {
  return `
<h4>CDG–JFK — The Loss-Maker</h4>
<p>This route is currently losing approximately <strong class="c-bad">€140K/month</strong>. Two distinct problems are compounding each other.</p>
<table class="dtable">
  <thead><tr><th>Metric</th><th>Current</th><th>Break-Even Point</th><th>Gap</th></tr></thead>
  <tbody>
    <tr><td>Load Factor</td><td class="c-bad">58%</td><td>~74%</td><td class="c-bad">−16pp</td></tr>
    <tr><td>Margin</td><td class="c-bad">−3.7%</td><td>0%</td><td class="c-bad">−3.7pp</td></tr>
    <tr><td>Avg Yield</td><td class="mono">€3.44/kg</td><td class="mono">~€3.90/kg</td><td class="c-bad">−€0.46/kg</td></tr>
    <tr><td>JFK Congestion Penalty</td><td class="c-bad">€48K/month</td><td>€0</td><td class="c-bad">Operational</td></tr>
    <tr><td>OTP</td><td class="c-warn">82%</td><td>—</td><td class="c-mute">Below network avg</td></tr>
  </tbody>
</table>
<h4>Three Options — Honest Assessment</h4>
<ul>
  <li><strong>Option A — Exit the route:</strong> Stops the €140K/month loss immediately. Risk: customer disruption (particularly Maersk and DB Schenker who use this route). This option is cleanest if data confirms no structural recovery path.</li>
  <li><strong>Option B — Restructure to cargo-only charter partnership:</strong> Removes belly dependency (currently a constraint on flexibility). Requires a transatlantic partner willing to share capacity. Discussions would take 3–4 months to conclude.</li>
  <li><strong>Option C — Capacity-share with another carrier:</strong> Reduces fixed cost exposure while maintaining a commercial presence on the lane. Least disruptive but lowest upside.</li>
</ul>
<h4>Why We Cannot Call This Yet</h4>
<p>CDG–JFK load factors have seasonal peaks in May–June (trade fair season, summer retail). The current 58% load is partly a post-winter trough. <strong>Two more months of data will significantly clarify whether the structural demand exists</strong> to make the route viable with better pricing.</p>
<div class="conf-note"><strong>Confidence: High on diagnosis, Low on recommendation.</strong> The cost and margin figures are directly evidenced. The option analysis is sound. But committing to Option A or B before summer data is available would be premature — and hard to defend if summer loads recover. Recommended: prepare Option A documentation in parallel so you can move fast if needed.</div>`
}

function capacity() {
  return `
<h4>Capacity Utilization — Network View</h4>
<table class="dtable">
  <thead><tr><th>Route</th><th>Load Factor</th><th>Target</th><th>Gap</th><th>Volatility</th></tr></thead>
  <tbody>
    <tr><td class="mono">LHR–ORD</td><td class="c-ok">89%</td><td>85%</td><td class="c-ok">+4pp above</td><td>Low</td></tr>
    <tr><td class="mono">AMS–NBO</td><td class="c-ok">78%</td><td>70%</td><td class="c-ok">+8pp above</td><td>Low</td></tr>
    <tr><td class="mono">CDG–BKK</td><td>74%</td><td>78%</td><td class="c-mute">−4pp</td><td>Low</td></tr>
    <tr><td class="mono">AMS–DXB</td><td class="c-warn">69%</td><td>80%</td><td class="c-bad">−11pp</td><td>Medium</td></tr>
    <tr><td class="mono">FRA–PVG</td><td class="c-bad">63%</td><td>80%</td><td class="c-bad">−17pp · disruption-driven</td><td><span class="c-bad">HIGH (48–91% weekly)</span></td></tr>
    <tr><td class="mono">CDG–JFK</td><td class="c-bad">58%</td><td>74%</td><td class="c-bad">−16pp · structural</td><td>Medium</td></tr>
  </tbody>
</table>
<h4>Network Gap Analysis</h4>
<ul>
  <li><strong>~3,400 tonnes/month of unfilled capacity</strong> across the network (excluding LHR–ORD which is over-target).</li>
  <li>At current average yields (~€3.60/kg), closing that gap would generate approximately <strong class="c-ok">€8.2M additional annual revenue</strong> — without adding a single new route.</li>
  <li>Two-thirds of the gap is on FRA–PVG and CDG–JFK. These are different problems: FRA–PVG gap is operational (disruptions reduce bookable capacity), CDG–JFK gap is commercial (not enough demand at current pricing).</li>
</ul>
<div class="conf-note"><strong>Data note:</strong> Load factor is a daily average. FRA–PVG shows extreme week-on-week volatility (48%–91%) caused by disruption events — the weekly average of 63% masks the operational chaos. Capacity data refreshes daily from the central planning system.</div>`
}

function otp() {
  return `
<h4>On-Time Performance — 87.2% Network Average</h4>
<p>The headline improved by 1.3pp this quarter. <strong>But the aggregate hides two very different stories.</strong></p>
<table class="dtable">
  <thead><tr><th>Route</th><th>Jan OTP</th><th>Feb OTP</th><th>Mar OTP</th><th>Trend</th></tr></thead>
  <tbody>
    <tr><td class="mono">LHR–ORD</td><td>91%</td><td>92%</td><td class="c-ok">93%</td><td class="c-ok">↑ Improving</td></tr>
    <tr><td class="mono">AMS–NBO</td><td>86%</td><td>89%</td><td class="c-ok">90%</td><td class="c-ok">↑ Improving</td></tr>
    <tr><td class="mono">CDG–BKK</td><td>88%</td><td>87%</td><td>88%</td><td class="c-mute">→ Stable</td></tr>
    <tr><td class="mono">AMS–DXB</td><td>92%</td><td>91%</td><td class="c-ok">91%</td><td class="c-mute">→ Stable</td></tr>
    <tr><td class="mono">CDG–JFK</td><td>85%</td><td>83%</td><td class="c-warn">82%</td><td class="c-bad">↓ Declining</td></tr>
    <tr><td class="mono">FRA–PVG</td><td>84%</td><td>76%</td><td class="c-bad">71%</td><td class="c-bad">↓ Rapid decline</td></tr>
  </tbody>
</table>
<ul>
  <li><strong>LHR–ORD and AMS–NBO are pulling the network average up</strong> — these two routes alone account for the +1.3pp headline improvement.</li>
  <li><strong>FRA–PVG is in freefall</strong> — from 84% in January to 71% in March. This is entirely attributable to the ramp handling failures at Frankfurt.</li>
  <li><strong>CDG–JFK declining slowly</strong> — JFK port congestion is adding avg 4.2hr ground delays. Not a crisis but compounding the route's margin problem.</li>
  <li><strong>AMS–DXB OTP (91%) is the network's strongest operational asset</strong> on a route where it is not yet being monetised through pricing.</li>
</ul>
<div class="conf-note"><strong>Data note:</strong> OTP data has a 15-minute lag from the ops system. These monthly figures are derived from the weekly ops report. OTP definition used: cargo departed within 30 minutes of scheduled time.</div>`
}

function revenue() {
  return `
<h4>Revenue — Q1 QTD</h4>
<table class="dtable">
  <thead><tr><th>Route</th><th>Revenue QTD</th><th>vs Target</th><th>Margin</th></tr></thead>
  <tbody>
    <tr><td class="mono">LHR–ORD</td><td class="mono">€22.4M</td><td class="c-ok">+€2.1M</td><td class="c-ok">24.1%</td></tr>
    <tr><td class="mono">AMS–DXB</td><td class="mono">€18.7M</td><td class="c-warn">−€1.2M</td><td class="c-warn">9.2%</td></tr>
    <tr><td class="mono">AMS–NBO</td><td class="mono">€14.3M</td><td class="c-ok">+€1.4M</td><td class="c-ok">21.4%</td></tr>
    <tr><td class="mono">CDG–BKK</td><td class="mono">€13.1M</td><td class="c-mute">−€0.3M</td><td>16.8%</td></tr>
    <tr><td class="mono">FRA–PVG</td><td class="mono">€10.8M</td><td class="c-bad">−€2.4M</td><td class="c-warn">2.1%</td></tr>
    <tr><td class="mono">CDG–JFK</td><td class="c-bad mono">€4.9M</td><td class="c-bad">−€1.1M</td><td class="c-bad">−3.7%</td></tr>
    <tr style="border-top: 1px solid var(--border)"><td><strong>Network Total</strong></td><td class="mono"><strong>€84.2M</strong></td><td class="c-ok"><strong>+€2.5M</strong></td><td><strong>18.3%</strong></td></tr>
  </tbody>
</table>
<p>The network is <strong class="c-ok">€2.5M ahead of revenue target</strong> — largely because LHR–ORD's dynamic pricing pilot generated €2.1M in incremental revenue. Without that pilot, the network would be essentially on-plan.</p>
<p><strong>The margin story is more concerning than the revenue story.</strong> Revenue is up, but margin is down 2.1pp because disruption costs on FRA–PVG (€1.48M in Q1) and structural losses on CDG–JFK are eroding what the pricing gains on LHR–ORD are building.</p>
<div class="conf-note"><strong>Data note:</strong> Revenue figures are from the weekly financial extract. Most recent data is 4 days old. Margin calculations include allocated ground handling costs and disruption penalties but exclude corporate overhead allocation.</div>`
}

function marginDrop() {
  return `
<h4>Why Cargo Margin Dropped 2.1pp — Root Cause</h4>
<p>The 2.1pp drop from 20.4% to 18.3% is the result of three forces working against each other simultaneously.</p>
<table class="dtable">
  <thead><tr><th>Factor</th><th>Margin Impact</th><th>Direction</th></tr></thead>
  <tbody>
    <tr><td>FRA–PVG disruption costs (ramp SLA failures)</td><td class="c-bad mono">−1.8pp</td><td class="c-bad">↓ Deteriorating fast</td></tr>
    <tr><td>CDG–JFK structural losses</td><td class="c-bad mono">−0.7pp</td><td class="c-bad">↓ Steady drain</td></tr>
    <tr><td>AMS–DXB yield erosion (Gulf competition)</td><td class="c-bad mono">−0.4pp</td><td class="c-bad">↓ Pressure ongoing</td></tr>
    <tr><td>LHR–ORD dynamic pricing gain</td><td class="c-ok mono">+0.8pp</td><td class="c-ok">↑ Growing</td></tr>
  </tbody>
</table>
<p><strong>Net: −2.1pp</strong></p>
<p>The positive contribution from LHR–ORD's pricing pilot is being overwhelmed by two problems that are both fixable — but require action in the next 4–6 weeks to prevent further deterioration.</p>
<ul>
  <li>FRA–PVG is the largest single driver. Without the disruption cost spike, network margin would be approximately 19.8% — still slightly down, but manageable.</li>
  <li>CDG–JFK is a slow bleed. €140K/month sounds manageable but it is compounding — and there is no sign of structural demand recovery at current pricing.</li>
</ul>
<div class="conf-note"><strong>Confidence: High for the FRA–PVG and CDG–JFK attribution.</strong> The AMS–DXB figure is a directional estimate — isolating the exact margin impact of Gulf carrier competition involves assumptions about counterfactual booking patterns that cannot be directly measured.</div>`
}

function fallback(q) {
  return `
<p>I do not have a specific data match for that question yet. Based on what you asked, here are three things I can answer that may be relevant:</p>
<ul>
  <li><strong>Route performance and margins</strong> — which routes are creating or losing value, and why.</li>
  <li><strong>Disruption costs</strong> — root causes, cost breakdown, and what can be recovered through SLA penalties.</li>
  <li><strong>Investment priorities</strong> — where the data supports acting now, and where more data is needed first.</li>
</ul>
<p>Try asking in those terms, or click any metric in the bar above or a route in the sidebar to go directly to that data. What would be most useful?</p>
<div class="conf-note"><strong>Note:</strong> CargoClaw is connected to TopFlight's operational data across 6 routes and 34 customer accounts. Questions outside that scope — e.g. competitor cost structures, macro freight market data, or data from other business units — are outside what I can answer with TopFlight's own evidence.</div>`
}
