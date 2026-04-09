// ─── Skills Registry ───────────────────────────────────────────────────────
// Each skill is a markdown file in /skills. This module registers them
// so the response engine can match user queries to skill-based responses.
//
// To add a new skill:
//   1. Drop a .md file into the /skills folder
//   2. Add an entry here with id, file, description, triggers (regex), and response fn name
//   3. Add the matching response function in responses.js
//
// The agent reads these at "boot" to know what additional capabilities it has.

export const SKILLS = [
  {
    id: 'counterfactual',
    file: 'counterfactual_skill.md',
    name: 'Historical Counterfactual Analysis',
    description:
      'Replay past periods with a different operational decision and estimate how margin, disruption cost, and OTP would have changed.',
    triggers:
      /\b(what if|counterfactual|what.if we had|would have|hypothetical|replay|had operated|different|scenario.*past|if we had)\b/i,
    responseFn: 'counterfactual',
    exampleQuestions: [
      'What if we had added extra Friday capacity on AMS–DXB in Q1?',
      'How would margin have changed if we rerouted FRA–PVG cargo?',
      'Run a counterfactual on LHR–ORD without dynamic pricing',
    ],
  },
]

/**
 * Try to match a query against skill triggers.
 * Returns the matching skill object, or null.
 */
export function matchSkill(query) {
  const t = query.toLowerCase()
  for (const skill of SKILLS) {
    if (skill.triggers.test(t)) return skill
  }
  return null
}

/**
 * List all registered skill names + descriptions (used by the fallback
 * response to tell the user what additional capabilities are available).
 */
export function listSkillSummaries() {
  return SKILLS.map(
    (s) => `<li><strong>${s.name}</strong> — ${s.description}</li>`
  ).join('\n')
}
