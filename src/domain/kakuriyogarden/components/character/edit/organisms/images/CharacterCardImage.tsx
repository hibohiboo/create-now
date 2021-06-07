import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import { Gemory } from '~/domain/kakuriyogarden/classes/gemory'
import { getHopeImageUrl, Hope } from '~/domain/kakuriyogarden/classes/hope'
import OutLine from './card/outline'
import URLImage from '~/domain/kakuriyogarden/components/character/edit/atoms/konva/URLImage'
import CellImage from '~/domain/kakuriyogarden/components/character/edit/organisms/character/Garden/atoms/CellImage'
import { Character } from '~/domain/kakuriyogarden/store/character'
import TagText from '~/domain/kakuriyogarden/components/character/edit/atoms/konva/TagText'

const ImageArea: React.FC<{ character: Character; gardenUrl: string }> = ({
  gardenUrl,
  character,
}) => {
  const tags = character.tags.split(',')
  const size = 50

  const canvasWidth = 242
  const canvasHight = 342
  const leftPadding = 5
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
    fontawesome: '"Font Awesome 5 Free", "Font Awesome 5 Brands"',
  }
  // 基本フォントサイズ
  const fontSize = 14
  const lineHeight = 1.5

  // カードの横幅ガイド src\styles\kakuriyogarden\card\index.scssより
  const leftGap = 5
  const innerLeft = 60
  const attrLabel = 60
  const attrValue = 1
  const innerRight = 1
  const rightGap = 4

  // カードの縦幅ガイド
  const innerTop = 20 - 5
  const cardName = 26 + innerTop - 15
  const tagsY = 24 + cardName
  const pictTop = 20 + tagsY
  const range_ = 20
  const target_ = 20
  const count = 20
  const exp = 20
  const mainContent = 140
  const bottomContent = 1
  const [url, setUrl] = useState('')
  const stageRef = useRef(null)
  let firstFlg = true

  const effect = () => {
    const stage = stageRef.current
    const canvas: HTMLCanvasElement = stage.toCanvas()
    setUrl(canvas.toDataURL())

    if (firstFlg) {
      firstFlg = false
      setTimeout(effect, 500) // useEffectで初回に呼ばれるときにはまだ描画がされていないので少し待ってから読み込む
    }
  }
  useEffect(effect)

  const cellSize = 50

  return (
    <>
      <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      <div style={{ display: 'none' }}>
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
          <Layer>
            <OutLine width={canvasWidth} height={canvasHight} />
            <CellImage
              src={character.imageUrl}
              x={leftGap}
              y={pictTop}
              size={cellSize}
            />
            <Text
              x={leftGap}
              y={innerTop}
              fontSize={fontSize * 0.7}
              fontFamily={family.gothic}
              text={character.symbolNameKana}
              shadowEnabled={false}
            />
            <Text
              x={leftGap}
              y={cardName}
              fontSize={fontSize * 1.5}
              fontFamily={family.gothic}
              text={`${character.symbolName}の${character.magicalName}`}
              shadowEnabled={false}
            />
            {tags.map((t, i) =>
              i === 0 ? (
                <TagText text={t} y={tagsY} x={leftGap} />
              ) : (
                <TagText
                  text={t}
                  y={tagsY}
                  x={
                    leftGap +
                    tags
                      .filter((_, j) => j < i)
                      .reduce((a, b) => a + b.length * fontSize, 0) +
                    i * 12
                  }
                />
              ),
            )}
            <URLImage
              src={gardenUrl}
              x={20}
              y={200}
              width={200}
              height={200}
              size="contain"
            />
          </Layer>
        </Stage>
      </div>
    </>
  )
}

export default ImageArea
