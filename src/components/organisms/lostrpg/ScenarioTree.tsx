import type { Scenario } from '~/store/modules/lostModule'

const createScene = (scene, pi) => (
  <details
    key={`scene-${pi}-${scene.name}`}
    open={false}
    style={{ paddingLeft: '20px' }}
  >
    <summary>{scene.name}</summary>
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
    <details open={true}>
      <summary>{scenario.name}</summary>
      {scenario.phases.map(createPhase)}
    </details>
  )
}
export default ScenarioTree
