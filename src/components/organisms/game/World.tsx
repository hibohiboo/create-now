import React from 'react'

const World: React.FC<{ tiles: number[][] }> = ({ tiles }) => {
  return (
    <div className="game-world">
      <div className="game-table">
        {tiles.map((row, rowIndex) => (
          <div className="game-table-row" key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <div
                className="game-table-cell"
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
