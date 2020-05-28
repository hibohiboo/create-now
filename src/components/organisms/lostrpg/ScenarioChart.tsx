import React, { useEffect } from 'react'
import * as d3 from 'd3'
import type { Scenario } from '~/store/modules/lostModule'

const ScnearioChart: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  useEffect(() => {
    const target = d3.select('.target')
    target.append('div').html(scenario.name)
  }, [scenario])
  return (
    <>
      <div className="target"></div>
    </>
  )
}
export default ScnearioChart
