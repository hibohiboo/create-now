import React from 'react'
import type { Terrain } from '~/store/modules/gameModule'
const World: React.FC<{ tiles: Terrain[][] }> = ({ tiles }) => {
  return (
    <div className="game-world">
      <div className="game-table">
        {tiles.map((row, rowIndex) => (
          <div className="game-table-row" key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <div
                className={`game-table-cell game-object-terrain-${col.texture}`}
                key={`row-${rowIndex}-col-${colIndex}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
export default World
