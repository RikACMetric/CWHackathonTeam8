import Counterfactual from '../Counterfactual/Counterfactual'
import Escalation from '../Escalation/Escalation'
import Geopolitical from '../Geopolitical/Geopolitical'
import EmptyDashboard from './EmptyDashboard'

export default function Dashboard({ view, showYoY }) {
  if (!view) return <EmptyDashboard />
  if (view === 'counterfactual') return <Counterfactual />
  if (view === 'escalation') return <Escalation />
  return <Geopolitical showYoY={showYoY} />
}
