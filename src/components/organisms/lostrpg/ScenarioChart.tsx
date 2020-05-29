import React, { useEffect } from 'react'
import * as dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import type { Scenario } from '~/store/modules/lostModule'
const css = `
line {
  stroke: #777;
  stroke-width: 1px;
}
`
const nodes = [
  { name: 'aset', links: ['a', 'b'], x: 200, y: 300 },
  { name: 'bset', links: ['b', 'c'], x: 300, y: 200 },
  { name: 'cset', links: ['d'], x: 400, y: 200 },
]
var edges = [
  {
    source: 0,
    target: 1,
    links: ['a', 'b'],
  },
]

const ScnearioChart: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  useEffect(() => {
    const g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}))

    // Here we're setting the nodes
    g.setNode('a', { label: 'A' })
    g.setNode('b', { label: 'B' })
    g.setNode('c', { label: 'C' })
    g.setNode('d', { label: 'D' })
    g.setNode('e', { label: 'E' })
    g.setNode('f', { label: 'F' })
    g.setNode('g', { label: 'G' })
    g.setNode('group', {
      label: 'Group',
      clusterLabelPos: 'top',
      style: 'fill: #d3d7e8',
    })
    g.setNode('top_group', {
      label: 'Top Group',
      clusterLabelPos: 'bottom',
      style: 'fill: #ffd47f',
    })
    g.setNode('bottom_group', { label: 'Bottom Group', style: 'fill: #5f9488' })

    // Set the parents to define which nodes belong to which cluster
    g.setParent('top_group', 'group')
    g.setParent('bottom_group', 'group')
    g.setParent('b', 'top_group')
    g.setParent('c', 'bottom_group')
    g.setParent('d', 'bottom_group')
    g.setParent('e', 'bottom_group')
    g.setParent('f', 'bottom_group')

    // Set up edges, no special attributes.
    g.setEdge('a', 'b')
    g.setEdge('b', 'c')
    g.setEdge('b', 'd')
    g.setEdge('b', 'e')
    g.setEdge('b', 'f')
    g.setEdge('b', 'g')

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
    console.log(svg)
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
