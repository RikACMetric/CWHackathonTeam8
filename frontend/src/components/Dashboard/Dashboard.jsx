import Counterfactual from '../Counterfactual/Counterfactual'
import Escalation from '../Escalation/Escalation'
import Geopolitical from '../Geopolitical/Geopolitical'

export default function Dashboard({ view }) {
  if (view === 'counterfactual') return <Counterfactual />
  if (view === 'escalation') return <Escalation />
  return <Geopolitical />
}
