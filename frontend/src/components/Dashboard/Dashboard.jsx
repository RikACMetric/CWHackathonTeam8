import Counterfactual from '../Counterfactual/Counterfactual'
import Geopolitical from '../Geopolitical/Geopolitical'

export default function Dashboard({ view }) {
  if (view === 'counterfactual') return <Counterfactual />
  return <Geopolitical />
}
