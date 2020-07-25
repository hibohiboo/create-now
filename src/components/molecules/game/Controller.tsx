// https://qiita.com/idaida_idaida/items/47e07c27b08426e46f16

import React from 'react'
import type { CommandButton } from '~/store/modules/gameModule'

const Controller: React.FC<{ onClick: (x: CommandButton) => void }> = ({
  onClick,
}) => {
  return (
    <div className="game-controller">
      <div className="spf-controller">
        <div className="controller-left">
          <div className="cross-layout">
            <button
              className="cross-layout-position-top btn cross-key-btn"
              onClick={() => onClick('UP')}
            >
              <span className="top-mark">▲</span>
            </button>
            <button className="cross-layout-position-left btn cross-key-btn">
              <span className="left-mark">▲</span>
            </button>
            {/* <button className="cross-layout-position-center btn cross-key-btn">
              <span className="center-mark">●</span>
            </button> */}
            <button className="cross-layout-position-right btn cross-key-btn">
              <span className="right-mark">▲</span>
            </button>
            <button
              className="cross-layout-position-bottom btn cross-key-btn"
              onClick={() => onClick('DOWN')}
            >
              <span className="bottom-mark">▲</span>
            </button>
          </div>
        </div>
        <div className="controller-right">
          <div className="abxy-btn-set">
            <div className="cross-layout">
              <button
                className="btn abxy-btn cross-layout-position-top btn-x"
                onClick={() => onClick('X')}
              >
                X
              </button>
              <button
                className="btn abxy-btn cross-layout-position-left btn-y"
                onClick={() => onClick('Y')}
              >
                Y
              </button>
              <button
                className="btn abxy-btn cross-layout-position-right btn-a"
                onClick={() => onClick('A')}
              >
                A
              </button>
              <button
                className="btn abxy-btn cross-layout-position-bottom btn-b"
                onClick={() => onClick('B')}
              >
                B
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Controller
