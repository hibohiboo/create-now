import React, { useEffect } from 'react'
import * as dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import type { Scenario } from '~/store/modules/lostModule'
// Font Awesome のfont-weightのルール
const faWeight = { solid: '900', regular: '400', brands: '400', light: '300' }
const tspan = (text) => {
  // const dom = document.createElement('tspan')
  const dom = document.createElement('div')
  dom.appendChild(document.createTextNode(text))
  dom.style.fontFamily
  // dom.setAttribute('xml:space', 'preserve')
  // dom.setAttribute('dy', '1.5em')
  // dom.setAttribute('x', '1')
  return dom
}
const createLabel = (name, type) => {
  if (type === 'checkpoint') {
    const dom = tspan(`\uf058 ${name}`)
    dom.style.fontWeight = faWeight.regular
    return dom
  } else if (type === 'path') {
    const dom = tspan(`\uf54b ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'view') {
    const dom = tspan(`\uf03e ${name}`)
    dom.style.fontWeight = faWeight.regular
    return dom
  } else if (type === 'battle') {
    const dom = tspan(`\uf6e2 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'search') {
    const dom = tspan(`\uf002 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'lock') {
    const dom = tspan(`\uf023 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'key') {
    const dom = tspan(`\uf084 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'limitUp') {
    const dom = tspan(`\uf251 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'boss') {
    const dom = tspan(`\uf6d5 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'item') {
    const dom = tspan(`\uf290 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'roll') {
    const dom = tspan(`\uf522 ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  } else if (type === 'table') {
    const dom = tspan(`\uf0cb ${name}`)
    dom.style.fontWeight = faWeight.solid
    return dom
  }

  return tspan(name)
}
const createLabels = (scene) => {
  const fragment = document.createDocumentFragment()
  fragment.appendChild(createLabel(scene.name, scene.type))
  scene.events.forEach((event) => {
    const eventLabel = createLabel(event.name, event.type)
    eventLabel.classList.add('event')
    fragment.appendChild(eventLabel)
    event.items.map((item) => {
      const itemLabel = createLabel(item, 'item')
      itemLabel.classList.add('event-item')
      fragment.appendChild(itemLabel)
    })
    event.rolls.map((item) => {
      const itemLabel = createLabel(item, 'roll')
      itemLabel.classList.add('event-item')
      fragment.appendChild(itemLabel)
    })
    event.tables.map((item) => {
      const itemLabel = createLabel(item.title, 'table')
      itemLabel.classList.add('event-item')
      fragment.appendChild(itemLabel)
    })
  })
  return fragment
}
const setScenes = (phase, pi, g, befores) => {
  phase.scenes.forEach((scene, si) => {
    const nodeName = scene.alias || `phase-${pi}-scene-${si}`
    let labelStyle = `font-family:"Font Awesome 5 Free", "Font Awesome 5 Brands";`
    g.setNode(nodeName, {
      label: () => createLabels(scene),
      labelStyle,
      class: scene.type,
    })
    g.setParent(nodeName, phase.name)
    if (
      (befores.scene && !scene.next) ||
      (befores.scene && !scene.alias && scene.next.length === 0)
    ) {
      g.setEdge(befores.scene, nodeName)
    } else if (scene.next && scene.next.length > 0) {
      scene.next.forEach((n) => {
        g.setEdge(nodeName, n)
      })
    }
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

    // Set up zoom and Drag support
    var zoom = d3.zoom().on('zoom', function () {
      svgGroup.attr('transform', d3.event.transform)
    })
    svg.call(zoom)
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
