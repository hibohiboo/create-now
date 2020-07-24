// https://qiita.com/idaida_idaida/items/47e07c27b08426e46f16

import React from 'react'
import type { CommandButton } from '~/store/modules/gameModule'

const Controller: React.FC<{ onClick: (x: CommandButton) => void }> = ({
  onClick,
}) => {
  return (
    <div className="game-controller">
      <div className="abxy-btn-set">
        <div className="cross-layout">
          <button
            className="btn abxy-btn cross-layout-position-top btn-x"
            onClick={() => onClick('x')}
          >
            X
          </button>
          <button
            className="btn abxy-btn cross-layout-position-left btn-y"
            onClick={() => onClick('y')}
          >
            Y
          </button>
          <button
            className="btn abxy-btn cross-layout-position-right btn-a"
            onClick={() => onClick('a')}
          >
            A
          </button>
          <button
            className="btn abxy-btn cross-layout-position-bottom btn-b"
            onClick={() => onClick('b')}
          >
            B
          </button>
        </div>
      </div>
    </div>
  )
}
export default Controller
