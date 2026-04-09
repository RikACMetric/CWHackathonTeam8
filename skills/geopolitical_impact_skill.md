# Skill: Geopolitical Shock & Oil Price Impact Analysis

## 1. Purpose

Allow Noor to understand **how the Iran–Israel conflict and rising oil prices are affecting TopFlight's cargo operations**, and what happens under different escalation scenarios — particularly if ceasefire negotiations collapse.

The shock‑impact engine:

- Ingests external macroeconomic signals (oil price, shipping route risk, insurance premiums).
- Maps them to TopFlight's cost structure and route economics.
- Models **two scenarios**: (a) current trajectory (oil prices continue rising) and (b) ceasefire collapse (acute shock).
- Estimates the **delta vs. current plan** on fuel cost, margin, customer pricing, and route viability.

---

## 2. Example user story

**Question (Noor):**
> "How is the Iran situation affecting our fuel costs and margins — and what happens if the ceasefire falls through?"

### 2.1 Agent response (high-level)

**Narrative summary**

- *Context:* Brent crude has risen from $78 to $97/barrel since the Iran–Israel escalation began. Jet fuel prices have followed, up 24%.
- *Current impact on TopFlight:*
  - **+€1.8M** additional fuel cost this quarter vs. plan.
  - Network margin compressed by **−1.4pp** (from 19.7% planned to 18.3% actual).
  - AMS–DXB and CDG–BKK most exposed (Gulf/Asia routes with longest sectors).
- *If ceasefire collapses:*
  - Oil projected to spike to $115–125/barrel.
  - Additional **€2.6M–3.4M** quarterly fuel cost increase.
  - Three routes would fall below break-even margin (AMS–DXB, FRA–PVG, CDG–JFK).
  - Insurance premiums on Gulf-adjacent routes would increase ~40%.

**Confidence:** Medium-High for current impact (based on live fuel procurement data). Medium for ceasefire-collapse scenario (based on analyst consensus and historical analogues from 2019 Strait of Hormuz crisis).

---

## 3. How the harness computes this (conceptual)

1. **Current impact assessment**
   - Load current fuel procurement data (contract rates, spot exposure).
   - Calculate fuel cost delta vs. Q1 plan at current Brent price ($97/bbl).
   - Attribute cost increase across routes by sector length and frequency.
   - Recompute route margins including the fuel cost increase.

2. **Scenario modelling: Ceasefire collapse**
   - Apply oil price shock assumptions ($115–125/bbl range).
   - Model fuel surcharge pass-through rates by customer contract type.
   - Estimate insurance premium increases on Gulf-adjacent routes.
   - Identify routes that would fall below break-even margin threshold.
   - Flag customer contracts with fuel surcharge caps that limit pass-through.

3. **Summarise and recommend**
   - Agent returns:
     - **Impact table**: route-by-route margin impact under current and shock scenarios.
     - **Risk flags**: customers with capped fuel surcharges, routes at break-even risk.
     - **Recommended actions**: hedging strategy, surcharge renegotiation, route contingency.

---

## 4. Example agent output (UI copy)

> **Geopolitical Impact: Iran Conflict & Oil Prices**
> - Brent crude has risen 24% ($78 → $97/bbl) since escalation. Jet fuel spot is up €0.14/kg.
> - TopFlight's Q1 fuel cost is **€1.8M above plan**, compressing network margin by 1.4pp.
> - AMS–DXB absorbs the largest share (€480K) due to sector length and frequency.
> - If ceasefire collapses and oil reaches $115–125/bbl, an additional €2.6–3.4M in quarterly fuel cost would push AMS–DXB, FRA–PVG, and CDG–JFK below break-even.
> - DHL Express and Zara Logistics have fuel surcharge caps in their contracts — limiting TopFlight's ability to pass through increases on ~18% of revenue.

**Suggested actions**

- "Lock in fuel hedging for Q2 at current rates — each $1/bbl increase adds ~€74K/quarter in unhedged exposure."
- "Renegotiate fuel surcharge caps with DHL Express (renewal Q3) and Zara Logistics ahead of schedule."
- "Prepare contingency: if oil exceeds $110/bbl for 4+ weeks, activate CDG–JFK suspension protocol."

---

## 5. Why this belongs in the harness

- Connects **external macroeconomic signals** (oil price, geopolitical risk) to **internal operational impact** (fuel cost, margin, route viability).
- Encodes **causal relationships**: oil price → fuel cost → margin by route, filtered by contract terms and hedging position.
- Provides **scenario planning** capability: "what happens if X gets worse" — a question every SVP asks during geopolitical disruptions.
- Delivers the answer in **one question from Noor**, with a clear dashboard and actionable recommendations.
