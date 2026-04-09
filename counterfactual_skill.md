# Skill: Historical Counterfactual Analysis

## 1. Purpose

Allow Noor to ask **“What if we had operated differently?”** on past periods and see how key metrics (margin, disruption cost, capacity use, OTP) would have changed, using the same data and logic as the Operational X‑Ray.

The counterfactual engine:

- Replays historical periods (e.g., last quarter on a lane or hub).
- Applies a simple, configurable **intervention rule** (extra capacity, rerouting, prioritisation, different product mix).
- Estimates the **delta vs. actuals** using causal assumptions encoded in the harness.

---

## 2. Example user story

**Question (Noor):**  
> “If we had added an extra wide‑body flight on the AMS–DXB lane on Fridays in Q1, how would that have affected margin and disruption costs?”

### 2.1 Agent response (high-level)

**Narrative summary**

- *Scope:* AMS–DXB lane, Fridays, Q1.  
- *Intervention:* Add 1 extra wide‑body cargo flight per Friday ( +20% Friday capacity).  
- *Effect vs. actuals (estimated):*
  - **+€420k** lane margin over Q1 (+6.5%).  
  - **−€110k** disruption cost (fewer rollovers and missed connections).  
  - **+4.2 pts** improvement in OTP for time‑critical product on Fridays.

**Confidence:** Medium (based on similar historical cases on AMS–JFK and FRA–DXB; weather disruptions still introduce uncertainty).

---

## 3. How the harness computes this (conceptual)

1. **Baseline reconstruction**
   - Load historical data for AMS–DXB, Q1:
     - Bookings by product and departure day.
     - Actual capacity and load factors.
     - Disruptions (rollovers, missed connections, cancellations).
     - Financials (revenue, cost, margin).

2. **Apply the intervention rule**
   - For each Friday in Q1:
     - Increase available capacity by 20% for the relevant products.
     - Re‑allocate overflow shipments that were historically rolled over or downgraded.
     - Reduce probability of rollover‑related disruptions according to learned relationships.

3. **Re‑compute counterfactual metrics**
   - Recalculate:
     - Revenue (more shipments at correct product / rate).
     - Direct operating costs (extra flight cost).
     - Disruption costs (fewer rollovers, fewer penalty payments).
     - OTP and NPS proxies for time‑critical products.

4. **Compare with actuals**
   - Compute **Δ margin**, **Δ disruption cost**, **Δ OTP**:
     - `delta_margin = margin_counterfactual - margin_actual`
     - `delta_disruption_cost = cost_counterfactual - cost_actual`

5. **Summarise and visualise**
   - Agent returns:
     - A small **“Actual vs. Counterfactual” chart**:
       - Bars: actual margin vs. counterfactual margin.
       - Line: disruption cost actual vs. counterfactual.
     - A short **explanation** in business language.
     - Suggested **next step** (e.g., “Run a 4‑week live experiment with extra Friday capacity on AMS–DXB and AMS–JFK to validate these gains.”).

---

## 4. Example agent output (UI copy)

> **Counterfactual result: Extra Friday capacity on AMS–DXB (Q1)**  
> - Adding one extra wide‑body flight on Fridays would have **absorbed 82% of the overflow** that was historically rolled onto Saturday flights.  
> - This reduces rollover‑related disruption cost by an estimated **€110k** and avoids most customer downgrades.  
> - After including the extra flight cost, lane margin improves by **~€420k (+6.5%)** over the quarter.  
> - Time‑critical shipments see a **4.2‑point OTP increase**, mainly from fewer missed connections at DXB.  
> - Similar historical patterns on AMS–JFK and FRA–DXB support this estimate; remaining uncertainty is driven by weather‑related delays.

**Suggested action**

- “Set up a **4‑week live test** adding extra Friday capacity on AMS–DXB. Track: load factor, margin, disruption cost, and OTP for time‑critical product versus the same period last year.”

---

## 5. Why this belongs in the harness

- Uses the same **expected vs. actual** logic as the Operational X‑Ray.  
- Encodes **causal assumptions** as reusable rules (e.g., “extra capacity reduces rollovers, which reduces disruption cost and protects yield”).  
- Keeps complexity hidden behind **a single question from Noor**, returning a familiar dashboard plus a clear narrative and an experiment suggestion.