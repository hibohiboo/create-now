import React, { useState, useCallback } from 'react'
import { Stage, Layer, Rect, Text, Line } from 'react-konva'
import OutLine from './card/outline'
import CellImage from '~/domain/kakuriyogarden/components/character/edit/organisms/character/Garden/atoms/CellImage'
import TagText from '~/domain/kakuriyogarden/components/character/edit/atoms/konva/TagText'
import { Magic } from '~/domain/kakuriyogarden/classes/gemory/magic'
import { labelData } from '~/domain/kakuriyogarden/classes/gemory/magic'
const ImageArea: React.FC<{ magic: Magic; id: string }> = ({ magic, id }) => {
  const tags = magic?.tags || []

  const canvasWidth = 242
  const canvasHight = 342

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
  const textPagging = 6
  // カードの横幅ガイド src\styles\kakuriyogarden\card\index.scssより
  const leftGap = 5
  const innerLeft = 60 + leftGap
  const innerLeftLabel = innerLeft + textPagging
  const attrLabel = 60 + innerLeftLabel + textPagging
  const attrValue = 1 + attrLabel
  const innerRight = 1 + attrValue
  const rightGap = 4

  // カードの縦幅ガイド
  const innerTop = 20 - 5
  const cardName = 26 + innerTop - 15
  const tagsY = 24 + cardName
  const pictTop = 20 + tagsY
  const range_ = 20 + pictTop + textPagging
  const target_ = 20 + range_
  const count = 20 + target_
  const exp = 20 + count
  const mainContent = 20 + exp
  const bottomContent = 130 + mainContent
  const [url, setUrl] = useState('')
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      try {
        const canvas: HTMLCanvasElement = node.toCanvas()
        console.log('update canvas')
        setUrl(canvas.toDataURL())
      } catch (e) {
        console.error(`canvas is null name:${magic.name}`, e)
      }
    }
  }, [])
  const canvasRef = useCallback((node) => {
    node.getCanvas()._canvas.id = id
  }, [])

  const cellSize = 50
  const dataAreaHeight = 100

  // 効果の文字サイズ調整
  let effectStyle = { fontSize: fontSize }
  if (magic.effect.length > 35) {
    effectStyle = { fontSize: fontSize * 0.85 }
  }
  if (magic.effect.length > 50) {
    effectStyle = { fontSize: fontSize * 0.75 }
  }
  return (
    <div>
      <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      <div style={{ display: 'none' }}>
        <Stage width={canvasWidth} height={canvasHight} ref={measuredRef}>
          <Layer ref={canvasRef}>
            <OutLine width={canvasWidth} height={canvasHight} />
            {/* キャラ画像 */}
            <Rect
              x={leftGap}
              y={pictTop}
              width={cellSize}
              height={cellSize}
              stroke={'black'}
              strokeWidth={1}
            />

            <CellImage
              src={magic.image.url}
              x={leftGap}
              y={pictTop}
              size={cellSize}
            />
            {/* 名前 */}
            <Text
              x={leftGap}
              y={innerTop}
              fontSize={fontSize * 0.7}
              fontFamily={family.gothic}
              text={magic.nameKana}
              shadowEnabled={false}
            />
            <Text
              x={leftGap}
              y={cardName}
              fontSize={fontSize * 1.5}
              fontFamily={family.gothic}
              text={`${magic.name}`}
              shadowEnabled={false}
            />
            {/* 右上 */}
            <Text
              x={innerLeft}
              y={innerTop - 10}
              fontSize={fontSize}
              fontFamily={family.gothic}
              text={`${magic.kind}/${magic.type}`}
              shadowEnabled={false}
              align={'right'}
              width={canvasWidth - innerLeft - 10}
            />

            {/* tag */}
            {tags.map((t, i) =>
              i === 0 ? (
                <TagText key={i} text={t} y={tagsY} x={leftGap} />
              ) : (
                <TagText
                  key={i}
                  text={t}
                  y={tagsY}
                  x={
                    leftGap +
                    tags
                      .filter((_, j) => j < i)
                      .reduce((a, b) => a + b.length * fontSize + 12, 0)
                  }
                />
              ),
            )}

            {/* 基本データ label */}
            <Rect
              x={innerLeft}
              y={pictTop}
              width={170}
              height={dataAreaHeight}
              stroke={'black'}
              strokeWidth={1}
            />
            <Text
              x={innerLeftLabel}
              y={pictTop + 5}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={labelData.timing}
              shadowEnabled={false}
            />
            <Line
              x={innerLeft}
              y={range_ - Math.ceil(textPagging / 2)}
              strokeWidth={1}
              points={[0, 0, 170, 0]}
              stroke={'black'}
              tension={1}
            />
            <Text
              x={innerLeftLabel}
              y={range_}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={labelData.range}
              shadowEnabled={false}
            />
            <Line
              x={innerLeft}
              y={target_ - Math.ceil(textPagging / 2)}
              strokeWidth={1}
              points={[0, 0, 170, 0]}
              stroke={'black'}
              tension={1}
            />
            <Text
              x={innerLeftLabel}
              y={target_}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={labelData.target}
              shadowEnabled={false}
            />
            <Line
              x={innerLeft}
              y={count - Math.ceil(textPagging / 2)}
              strokeWidth={1}
              points={[0, 0, 170, 0]}
              stroke={'black'}
              tension={1}
            />
            <Text
              x={innerLeftLabel}
              y={count}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={labelData.count}
              shadowEnabled={false}
            />
            <Text
              x={innerLeftLabel + 95}
              y={count}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={labelData.successRate}
              shadowEnabled={false}
            />
            <Line
              x={innerLeft}
              y={exp - Math.ceil(textPagging / 2)}
              strokeWidth={1}
              points={[0, 0, 170, 0]}
              stroke={'black'}
              tension={1}
            />
            <Text
              x={innerLeftLabel}
              y={exp}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={labelData.exp}
              shadowEnabled={false}
            />
            <Line
              x={attrLabel - Math.ceil(textPagging / 2)}
              y={pictTop}
              strokeWidth={1}
              points={[0, 0, 0, dataAreaHeight]}
              stroke={'black'}
              tension={1}
            />
            <Line
              x={innerLeftLabel + 92}
              y={count - 2}
              strokeWidth={1}
              points={[0, 0, 0, 20]}
              stroke={'black'}
              tension={1}
            />
            {/* 基本データ 値 */}
            <Text
              x={attrLabel}
              y={pictTop + 5}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={magic.timing}
              shadowEnabled={false}
            />
            <Text
              x={attrLabel}
              y={range_}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={magic.range}
              shadowEnabled={false}
            />
            <Text
              x={attrLabel}
              y={target_}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={magic.target}
              shadowEnabled={false}
            />
            <Text
              x={attrLabel}
              y={count}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={magic.count}
              shadowEnabled={false}
            />
            <Text
              x={attrLabel + 65}
              y={count}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={magic.successRate}
              shadowEnabled={false}
            />
            <Text
              x={attrLabel}
              y={exp}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={String(magic.exp)}
              shadowEnabled={false}
            />
            {/* 本文 */}
            <Rect
              x={leftGap}
              y={mainContent}
              width={230}
              height={145}
              stroke={'black'}
              strokeWidth={1}
            />
            <Text
              x={leftGap + textPagging}
              y={mainContent + textPagging}
              fontSize={effectStyle.fontSize}
              fontFamily={family.gothic}
              text={`${magic.effect}`}
              lineHeight={1.5}
              shadowEnabled={false}
              width={220}
            />
            {/* 庭園効果 */}
            <Line
              x={leftGap}
              y={mainContent + 95}
              strokeWidth={1}
              points={[0, 0, 230, 0]}
              stroke={'black'}
              tension={1}
              dash={[3]}
            />
            <Text
              x={leftGap + textPagging + 50}
              y={mainContent + textPagging + 95 - 5}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={`${magic.gardeneffect}`}
              lineHeight={1.5}
              shadowEnabled={false}
              width={165}
            />
            <CellImage
              src={'/images/kakuriyogarden/icons/game-icons/field.svg'}
              x={leftGap}
              y={mainContent + 95}
              size={cellSize}
            />
            {/* 右下 */}
            <Text
              x={innerLeft}
              y={mainContent + 150}
              fontSize={fontSize * 0.6}
              fontFamily={family.gothic}
              text={`illust: ${magic.image.source}`}
              shadowEnabled={false}
              align={'right'}
              width={canvasWidth - innerLeft - 10}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default ImageArea
