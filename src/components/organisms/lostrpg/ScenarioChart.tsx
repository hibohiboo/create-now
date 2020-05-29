import React, { useEffect } from 'react'
import * as dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import type { Scenario } from '~/store/modules/lostModule'
const setScenes = (phase, g) => {
  phase.scenes.forEach((scene) => {
    g.setNode(scene.name, { label: scene.name })
    g.setParent(scene.name, phase.name)
  })
}
const ScnearioChart: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  useEffect(() => {
    const g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}))

    // Here we're setting the nodes
    g.setNode('group', {
      label: '',
      clusterLabelPos: 'top',
      style: 'fill: #fff',
    })
    let beforePhase = null
    let beforeScene = null
    scenario.phases.forEach((phase, pi) => {
      g.setNode(phase.name, {
        label: phase.name,
        clusterLabelPos: 'top',
        style: 'fill: #fff;',
        labelStyle: 'font-size:1.2rem',
      })
      g.setParent(phase.name, 'group')
      // if (beforePhase) g.setEdge(beforePhase, phase.name)
      beforePhase = phase.name

      phase.scenes.forEach((scene, si) => {
        const nodeName = `phase-${pi}-scene-${si}` //`${scene.name}${i}`
        console.log(nodeName)
        g.setNode(nodeName, { label: scene.name })
        g.setParent(nodeName, phase.name)
        if (beforeScene) g.setEdge(beforeScene, nodeName)
        beforeScene = nodeName
      })
    })

    g.nodes().forEach((v) => {
      const node = g.node(v)
      // Round the corners of the nodes
      node.rx = node.ry = 5
    })
    console.log('g', g)
    // Create the renderer
    const render = new dagreD3.render()

    // Set up an SVG group so that we can translate the final graph.
    const target = d3.select('.target')
    const svg = target.append('svg').attr('height', 800).attr('width', 600)

    const svgGroup = svg.append('g')

    // Run the renderer. This is what draws the final graph.
    render(d3.select('svg g'), g)

    // Center the graph
    const xCenterOffset = (svg.attr('width') - g.graph().width) / 2
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)')
    svg.attr('height', g.graph().height + 40)
  })
  return (
    <>
      <div className="scenario-chart">
        <div className="target"></div>
      </div>
    </>
  )
}
export default ScnearioChart
