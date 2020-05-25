import type { Scenario } from '~/store/modules/lostModule'
const createEvent = (event, ei) => (
  <details
    key={`event-${ei}-${event.name}`}
    open={true}
    style={{ paddingLeft: '20px' }}
  >
    <summary>{event.name}</summary>
    <ul>
      {event.items.map((item) => (
        <li key={item}>
          <i className="fas fa-shopping-bag"></i>
          {item}
        </li>
      ))}
    </ul>
  </details>
)
const createScene = (scene, si) => (
  <details
    key={`scene-${si}-${scene.name}`}
    open={true}
    style={{ paddingLeft: '20px' }}
  >
    <summary>{scene.name}</summary>
    {scene.events.map(createEvent)}
  </details>
)

const createPhase = (phase, pi) => (
  <details
    key={`phase-${pi}-${phase.name}`}
    open={true}
    style={{ paddingLeft: '10px' }}
  >
    <summary>{phase.name}</summary>
    {phase.scenes.map(createScene)}
  </details>
)

const ScenarioTree: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  return (
    <details open={true} style={{ minWidth: '200px' }}>
      <summary>{scenario.name}</summary>
      {scenario.phases.map(createPhase)}
    </details>
  )
}
export default ScenarioTree
