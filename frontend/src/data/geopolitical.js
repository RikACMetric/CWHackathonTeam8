// Demo dataset — Iran conflict & oil price impact on TopFlight operations

export const oilTimeSeries = [
  { week: 'W1',  brent: 78, jetFuel: 0.58, fuelCostActual: 820, fuelCostPlan: 820, marginActual: 19.7, marginPlan: 19.7 },
  { week: 'W2',  brent: 81, jetFuel: 0.60, fuelCostActual: 845, fuelCostPlan: 820, marginActual: 19.4, marginPlan: 19.7 },
  { week: 'W3',  brent: 84, jetFuel: 0.62, fuelCostActual: 870, fuelCostPlan: 820, marginActual: 19.1, marginPlan: 19.7 },
  { week: 'W4',  brent: 86, jetFuel: 0.64, fuelCostActual: 890, fuelCostPlan: 820, marginActual: 18.9, marginPlan: 19.7 },
  { week: 'W5',  brent: 89, jetFuel: 0.66, fuelCostActual: 920, fuelCostPlan: 820, marginActual: 18.6, marginPlan: 19.7 },
  { week: 'W6',  brent: 91, jetFuel: 0.68, fuelCostActual: 940, fuelCostPlan: 820, marginActual: 18.4, marginPlan: 19.7 },
  { week: 'W7',  brent: 93, jetFuel: 0.69, fuelCostActual: 955, fuelCostPlan: 820, marginActual: 18.2, marginPlan: 19.7 },
  { week: 'W8',  brent: 94, jetFuel: 0.70, fuelCostActual: 965, fuelCostPlan: 820, marginActual: 18.1, marginPlan: 19.7 },
  { week: 'W9',  brent: 95, jetFuel: 0.71, fuelCostActual: 975, fuelCostPlan: 820, marginActual: 18.0, marginPlan: 19.7 },
  { week: 'W10', brent: 96, jetFuel: 0.71, fuelCostActual: 980, fuelCostPlan: 820, marginActual: 17.9, marginPlan: 19.7 },
  { week: 'W11', brent: 97, jetFuel: 0.72, fuelCostActual: 990, fuelCostPlan: 820, marginActual: 17.8, marginPlan: 19.7 },
  { week: 'W12', brent: 97, jetFuel: 0.72, fuelCostActual: 990, fuelCostPlan: 820, marginActual: 17.8, marginPlan: 19.7 },
  { week: 'W13', brent: 97, jetFuel: 0.72, fuelCostActual: 995, fuelCostPlan: 820, marginActual: 17.7, marginPlan: 19.7 },
]

// Ceasefire collapse scenario projection (W14–W20)
export const scenarioData = [
  { week: 'W13', current: 97,  collapse: 97,  stable: 97  },
  { week: 'W14', current: 98,  collapse: 105, stable: 93  },
  { week: 'W15', current: 99,  collapse: 112, stable: 89  },
  { week: 'W16', current: 100, collapse: 118, stable: 86  },
  { week: 'W17', current: 100, collapse: 122, stable: 84  },
  { week: 'W18', current: 101, collapse: 125, stable: 82  },
  { week: 'W19', current: 101, collapse: 124, stable: 81  },
  { week: 'W20', current: 102, collapse: 123, stable: 80  },
]

export const routeExposure = [
  { route: 'AMS–DXB', fuelDelta: 480, marginImpact: -2.1, collapseRisk: 'Below break-even', severity: 'critical' },
  { route: 'FRA–PVG', fuelDelta: 390, marginImpact: -1.6, collapseRisk: 'Below break-even', severity: 'critical' },
  { route: 'CDG–JFK', fuelDelta: 320, marginImpact: -1.3, collapseRisk: 'Below break-even', severity: 'critical' },
  { route: 'LHR–ORD', fuelDelta: 280, marginImpact: -1.1, collapseRisk: 'Margin compressed', severity: 'warning' },
  { route: 'CDG–BKK', fuelDelta: 210, marginImpact: -0.9, collapseRisk: 'Margin compressed', severity: 'warning' },
  { route: 'AMS–NBO', fuelDelta: 120, marginImpact: -0.5, collapseRisk: 'Manageable', severity: 'ok' },
]

// Year-on-year comparison — same Q1 period, last year vs this year
export const yoyComparison = [
  { week: 'W1',  fuelCostThisYear: 820, fuelCostLastYear: 780, marginThisYear: 19.7, marginLastYear: 21.2, brentThisYear: 78, brentLastYear: 74 },
  { week: 'W2',  fuelCostThisYear: 845, fuelCostLastYear: 775, marginThisYear: 19.4, marginLastYear: 21.4, brentThisYear: 81, brentLastYear: 73 },
  { week: 'W3',  fuelCostThisYear: 870, fuelCostLastYear: 782, marginThisYear: 19.1, marginLastYear: 21.1, brentThisYear: 84, brentLastYear: 74 },
  { week: 'W4',  fuelCostThisYear: 890, fuelCostLastYear: 790, marginThisYear: 18.9, marginLastYear: 20.9, brentThisYear: 86, brentLastYear: 75 },
  { week: 'W5',  fuelCostThisYear: 920, fuelCostLastYear: 785, marginThisYear: 18.6, marginLastYear: 21.0, brentThisYear: 89, brentLastYear: 74 },
  { week: 'W6',  fuelCostThisYear: 940, fuelCostLastYear: 788, marginThisYear: 18.4, marginLastYear: 21.1, brentThisYear: 91, brentLastYear: 74 },
  { week: 'W7',  fuelCostThisYear: 955, fuelCostLastYear: 792, marginThisYear: 18.2, marginLastYear: 20.8, brentThisYear: 93, brentLastYear: 75 },
  { week: 'W8',  fuelCostThisYear: 965, fuelCostLastYear: 795, marginThisYear: 18.1, marginLastYear: 20.7, brentThisYear: 94, brentLastYear: 75 },
  { week: 'W9',  fuelCostThisYear: 975, fuelCostLastYear: 790, marginThisYear: 18.0, marginLastYear: 20.9, brentThisYear: 95, brentLastYear: 74 },
  { week: 'W10', fuelCostThisYear: 980, fuelCostLastYear: 788, marginThisYear: 17.9, marginLastYear: 21.0, brentThisYear: 96, brentLastYear: 74 },
  { week: 'W11', fuelCostThisYear: 990, fuelCostLastYear: 785, marginThisYear: 17.8, marginLastYear: 21.2, brentThisYear: 97, brentLastYear: 73 },
  { week: 'W12', fuelCostThisYear: 990, fuelCostLastYear: 782, marginThisYear: 17.8, marginLastYear: 21.3, brentThisYear: 97, brentLastYear: 73 },
  { week: 'W13', fuelCostThisYear: 995, fuelCostLastYear: 780, marginThisYear: 17.7, marginLastYear: 21.4, brentThisYear: 97, brentLastYear: 73 },
]

export const yoySummary = {
  fuelCostDelta: '+€2.4M',
  marginDelta: '−3.1pp',
  brentDelta: '+$23/bbl (+31%)',
  lastYearAvgMargin: '21.1%',
  thisYearAvgMargin: '18.5%',
  lastYearAvgBrent: '$74/bbl',
  thisYearAvgBrent: '$90/bbl',
}

export const summary = {
  brentStart: '$78/bbl',
  brentNow: '$97/bbl',
  brentChange: '+24%',
  fuelCostOverPlan: '+€1.8M',
  marginCompression: '−1.4pp',
  marginActual: '18.3%',
  marginPlan: '19.7%',
  collapseOilRange: '$115–125/bbl',
  collapseExtraCost: '€2.6–3.4M',
  routesAtRisk: '3 routes below break-even',
  insuranceIncrease: '+40%',
  confidence: 'Medium-High',
}
