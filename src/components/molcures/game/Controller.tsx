// https://qiita.com/idaida_idaida/items/47e07c27b08426e46f16

import React from 'react'
import crossLayout from './cross-layout.module.css'

const Controller: React.FC = () => {
  return (
    <div className="game-controller">
      <div className="abxy-btn-set">
        <div className="cross-layout">
          <button className="btn abxy-btn cross-layout-position-top btn-x">
            X
          </button>
          <button className="btn abxy-btn cross-layout-position-left btn-y">
            Y
          </button>
          <button className="btn abxy-btn cross-layout-position-right btn-a">
            A
          </button>
          <button className="btn abxy-btn cross-layout-position-bottom btn-b">
            B
          </button>
        </div>
      </div>
    </div>
  )
}
export default Controller
