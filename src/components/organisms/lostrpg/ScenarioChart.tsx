import React, { useEffect } from 'react'
import * as dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import type { Scenario } from '~/store/modules/lostModule'
// Font Awesome のfont-weightのルール
const faWeight = { solid: '900', regular: '400', brands: '400', light: '300' }
const setScenes = (phase, pi, g, befores) => {
  phase.scenes.forEach((scene, si) => {
    const nodeName = `phase-${pi}-scene-${si}` //`${scene.name}${i}`
    let label = scene.name
    let labelStyle = `font-family:"Font Awesome 5 Free", "Font Awesome 5 Brands";`
    if (scene.type === 'checkpoint') {
      label = `\uf058 ${label}`
      labelStyle = `${labelStyle}font-weight: ${faWeight.regular};`
    } else if (scene.type === 'path') {
      label = `\uf54b ${label}`
      labelStyle = `${labelStyle}font-weight: ${faWeight.solid};`
    }
    // scene.events.forEach((event) => {
    //   label = `${label}\n  ${event.name}`
    // })
    g.setNode(nodeName, { label, labelStyle, class: scene.type })
    g.setParent(nodeName, phase.name)
    if (befores.scene) g.setEdge(befores.scene, nodeName)
    befores.scene = nodeName
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
    const befores = { phase: null, scene: null }
    scenario.phases.forEach((phase, pi) => {
      setScenes(phase, pi, g, befores)
      g.setNode(phase.name, {
        label: phase.name,
        clusterLabelPos: 'top',
        style: 'fill: #fff;',
        labelStyle: 'font-size:1.2rem',
      })
      g.setParent(phase.name, 'group')
      // if (beforePhase) g.setEdge(beforePhase, phase.name)
      befores.phase = phase.name
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
