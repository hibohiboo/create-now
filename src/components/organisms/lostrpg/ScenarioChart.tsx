import React, { useEffect } from 'react'
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
    const target = d3.select('.target')
    const svg = target.append('svg').attr('height', 800).attr('width', 600)
    const nodeSelection = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
    const edgeSelection = svg
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
    nodeSelection
      .attr('r', 10)
      .attr('cx', (v) => v.x)
      .attr('cy', (v) => v.y)
    edgeSelection
      .attr('x1', (d) => nodes[d.source].x)
      .attr('y1', (d) => nodes[d.source].y)
      .attr('x2', (d) => nodes[d.target].x)
      .attr('y2', (d) => nodes[d.target].y)
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
