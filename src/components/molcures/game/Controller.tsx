// https://qiita.com/idaida_idaida/items/47e07c27b08426e46f16

import React from 'react'
import crossLayout from './cross-layout.module.css'

const Controller: React.FC = () => {
  return (
    <div className={crossLayout.layout}>
      <button className={crossLayout.positionTop}>X</button>
      <button className={crossLayout.positionLeft}>Y</button>
      <button className={crossLayout.positionRight}>A</button>
      <button className={crossLayout.positionBottom}>B</button>
    </div>
  )
}
export default Controller
