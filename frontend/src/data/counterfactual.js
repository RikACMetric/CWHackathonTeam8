// Counterfactual — FRA-PVG Q1 2026, "What if we rerouted via AMS during ramp failures?"

export const timeSeries = [
  { week: 'W1',  marginActual: 44, marginCF: 46, disruptActual: 26, disruptCF: 24, otpActual: 88, otpCF: 89 },
  { week: 'W2',  marginActual: 41, marginCF: 43, disruptActual: 30, disruptCF: 27, otpActual: 85, otpCF: 87 },
  { week: 'W3',  marginActual: 16, marginCF: 45, disruptActual: 76, disruptCF: 31, otpActual: 61, otpCF: 85 },
  { week: 'W4',  marginActual:  9, marginCF: 47, disruptActual: 90, disruptCF: 29, otpActual: 54, otpCF: 87 },
  { week: 'W5',  marginActual:  5, marginCF: 44, disruptActual: 96, disruptCF: 34, otpActual: 50, otpCF: 84 },
  { week: 'W6',  marginActual: 11, marginCF: 48, disruptActual: 84, disruptCF: 28, otpActual: 57, otpCF: 88 },
  { week: 'W7',  marginActual:  3, marginCF: 50, disruptActual:102, disruptCF: 27, otpActual: 48, otpCF: 89 },
  { week: 'W8',  marginActual:  7, marginCF: 46, disruptActual: 94, disruptCF: 32, otpActual: 53, otpCF: 86 },
  { week: 'W9',  marginActual: 19, marginCF: 49, disruptActual: 68, disruptCF: 28, otpActual: 65, otpCF: 88 },
  { week: 'W10', marginActual: 25, marginCF: 47, disruptActual: 58, disruptCF: 30, otpActual: 70, otpCF: 87 },
  { week: 'W11', marginActual: 33, marginCF: 44, disruptActual: 48, disruptCF: 32, otpActual: 76, otpCF: 86 },
  { week: 'W12', marginActual: 38, marginCF: 43, disruptActual: 38, disruptCF: 28, otpActual: 80, otpCF: 88 },
  { week: 'W13', marginActual: 42, marginCF: 44, disruptActual: 30, disruptCF: 25, otpActual: 84, otpCF: 89 },
]

export const cumulativeImpact = timeSeries.reduce((acc, row) => {
  const prev = acc.length ? acc[acc.length - 1].cumDelta : 0
  const delta = row.marginCF - row.marginActual
  acc.push({ ...row, delta, cumDelta: prev + delta })
  return acc
}, [])

export const summary = {
  totalMarginActual: '€293K',
  totalMarginCF: '€596K',
  marginDelta: '+€303K',
  marginDeltaPP: '+6.8pp',
  disruptionActual: '€740K',
  disruptionCF: '€375K',
  disruptionSaved: '−€365K',
  otpActual: '67%',
  otpCF: '87%',
  otpDelta: '+20 pts',
  confidence: 'Medium-High',
  route: 'FRA–PVG',
  intervention: 'Reroute via AMS during Frankfurt ramp failures',
  period: 'Q1 2026',
}
