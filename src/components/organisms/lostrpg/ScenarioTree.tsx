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
      ) : event.type === 'search' ? (
        <i className="fas fa-search"></i>
      ) : event.type === 'lock' ? (
        <i className="fas fa-lock"></i>
      ) : event.type === 'key' ? (
        <i className="fas fa-key"></i>
      ) : event.type === 'limitUp' ? (
        <i className="fas fa-hourglass-start"></i>
      ) : event.type === 'boss' ? (
        <i className="fas fa-dragon"></i>
      ) : (
        <></>
      )}{' '}
      {event.name}
    </summary>
    <ul>
      {event.items.map((item, i) => (
        <li key={`${item.name}-${i}`}>
          {item.type === 'item' ? (
            <i className="fas fa-flask"></i>
          ) : item.type === 'roll' ? (
            <i className="fas fa-dice"></i>
          ) : item.type === 'path' ? (
            <i className="fas fa-shoe-prints"></i>
          ) : item.type === 'prize' ? (
            <i className="far fa-gem"></i>
          ) : (
            <></>
          )}

          {item.name}
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
      ) : scene.type === 'path' ? (
        <i className="fas fa-shoe-prints"></i>
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
    <details open={true} style={{ minWidth: '200px' }}>
      <summary>{scenario.name}</summary>
      {scenario.phases.map(createPhase)}
    </details>
  )
}
export default ScenarioTree
