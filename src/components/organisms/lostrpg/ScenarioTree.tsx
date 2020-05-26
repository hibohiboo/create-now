import type { Scenario } from '~/store/modules/lostModule'
const createEvent = (event, ei) => (
  <details
    key={`event-${ei}-${event.name}`}
    open={true}
    style={{ paddingLeft: '20px' }}
  >
    <summary>
      {event.type === 'view' ? (
        <i className="far fa-image"></i>
      ) : event.type === 'battle' ? (
        <i className="fas fa-ghost"></i>
      ) : // <i className="fas fa-dragon"></i>
      event.type === 'search' ? (
        <i className="fas fa-search"></i>
      ) : event.type === 'lock' ? (
        <i className="fas fa-lock"></i>
      ) : (
        <></>
      )}{' '}
      {event.name}
    </summary>
    <ul>
      {event.items.map((item) => (
        <li key={item}>
          <i className="fas fa-shopping-bag"></i>
          {item}
        </li>
      ))}
      {event.rolls.map((roll) => (
        <li key={roll}>
          <i className="fas fa-dice"></i>
          {roll}
        </li>
      ))}
      {event.paths.map((path) => (
        <li key={path}>
          <i className="fas fa-shoe-prints"></i>
          {path}
        </li>
      ))}
      {event.tables.map((table) => (
        <li key={table.title}>
          <i className="fas fa-list-ol"></i>
          {table.title}
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
    <summary>
      {scene.type === 'checkpoint' ? (
        <i className="far fa-check-circle"></i>
      ) : (
        <></>
      )}
      {/* {scene.alias ? <span>{`${scene.alias}:`}</span> : <></>} */}
      {scene.name}
    </summary>
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
    <details open={true} style={{ minWidth: '230px' }}>
      <summary>{scenario.name}</summary>
      {scenario.phases.map(createPhase)}
    </details>
  )
}
export default ScenarioTree
