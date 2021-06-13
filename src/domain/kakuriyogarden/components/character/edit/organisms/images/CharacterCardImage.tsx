import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse, Group } from 'react-konva'
import { Gemory } from '~/domain/kakuriyogarden/classes/gemory'
import { getHopeImageUrl, Hope } from '~/domain/kakuriyogarden/classes/hope'
import OutLine from './card/outline'
import URLImage from '~/domain/kakuriyogarden/components/character/edit/atoms/konva/URLImage'
import CellImage from '~/domain/kakuriyogarden/components/character/edit/organisms/character/Garden/atoms/CellImage'
import { Character } from '~/domain/kakuriyogarden/store/character'
import TagText from '~/domain/kakuriyogarden/components/character/edit/atoms/konva/TagText'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { textToRemoveRubyTag } from '~/domain/kakuriyogarden/classes/ruby'

const ImageArea: React.FC<{ character: Character; gardenUrl: string }> = ({
  gardenUrl,
  character,
}) => {
  // https://blog.chetan-verma.in/uselayouteffect-and-the-ssr-warning
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect
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
  const innerLeft = 60 + leftGap
  const attrLabel = 60 + innerLeft
  const attrValue = 1 + attrLabel
  const innerRight = 1 + attrValue
  const rightGap = 4

  // カードの縦幅ガイド
  const innerTop = 20 - 5
  const cardName = 26 + innerTop - 15
  const tagsY = 24 + cardName
  const pictTop = 20 + tagsY
  const range_ = 20 + pictTop
  const target_ = 20 + range_
  const count = 20 + target_
  const exp = 20 + count
  const mainContent = 40 + exp
  const bottomContent = 130 + mainContent
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
  useIsomorphicLayoutEffect(effect)

  const cellSize = 50

  const canvasRef = useCallback((node) => {
    node.getCanvas()._canvas.id = 'card-character'
  }, [])

  return (
    <>
      <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      <div style={{ display: 'none' }}>
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
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
              src={character.imageUrl}
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
            {/* 右上 */}
            <Text
              x={innerLeft}
              y={innerTop - 10}
              fontSize={fontSize}
              fontFamily={family.gothic}
              text={character.playerName}
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

            {/* 願い */}
            <CellImage
              src={getHopeImageUrl(character.hope)}
              x={leftGap}
              y={pictTop + 55}
              size={cellSize * 0.6}
            />
            <Text
              x={leftGap}
              y={pictTop + 55 + 35}
              fontSize={fontSize}
              fontFamily={family.gothic}
              text={character.hope}
            />
            {/* 装備 */}
            <CellImage
              src={getGadgetImageUrl(character.gadget)}
              x={leftGap + 35}
              y={pictTop + 55}
              size={cellSize * 0.6}
            />
            <Text
              x={leftGap + 35}
              y={pictTop + 55 + 35}
              fontSize={fontSize}
              fontFamily={family.gothic}
              text={character.gadget}
            />
            {/* 庭園 */}
            <URLImage
              src={gardenUrl}
              x={5}
              y={180}
              width={230}
              height={140}
              size="contain"
            />
            {/* <Rect
              x={5}
              y={180}
              width={230}
              height={140}
              stroke={'black'}
              strokeWidth={1}
            /> */}
            <Text
              x={leftGap + 5}
              y={bottomContent + 2}
              fontSize={fontSize * 0.6}
              fontFamily={family.gothic}
              text={textToRemoveRubyTag(character.profile)}
              width={230}
            />

            {/* 逸脱 */}
            <Rect
              x={innerLeft + 10}
              y={pictTop}
              width={160}
              height={105}
              stroke={'black'}
              strokeWidth={1}
            />
            <CellImage
              src={'/images/kakuriyogarden/icons/game-icons/egg-eye.svg'}
              x={innerLeft + 10}
              y={pictTop}
              size={cellSize * 0.4}
            />
            <Text
              x={innerLeft + 35}
              y={pictTop + 5}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={'箇所'}
              width={40}
              shadowEnabled={false}
            />
            <Text
              x={innerLeft + 65}
              y={pictTop + 5}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={'変身前'}
              width={40}
              shadowEnabled={false}
            />
            <Text
              x={innerLeft + 110}
              y={pictTop + 5}
              fontSize={fontSize * 0.8}
              fontFamily={family.gothic}
              text={'変身後'}
              width={40}
              shadowEnabled={false}
            />
            {character.deviations.map((d, i) => (
              <Group key={i}>
                <Text
                  x={innerLeft + 15}
                  y={pictTop + 8 + (i + 1) * 16}
                  fontSize={fontSize * 0.6}
                  fontFamily={family.gothic}
                  text={d.point}
                  width={40}
                  shadowEnabled={false}
                />
                <Text
                  x={innerLeft + 65}
                  y={pictTop + 8 + (i + 1) * 16}
                  fontSize={fontSize * 0.6}
                  fontFamily={family.gothic}
                  text={d.before}
                  width={45}
                  shadowEnabled={false}
                />
                <Text
                  x={innerLeft + 110}
                  y={pictTop + 8 + (i + 1) * 16}
                  fontSize={fontSize * 0.6}
                  fontFamily={family.gothic}
                  text={d.after}
                  width={45}
                  shadowEnabled={false}
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  )
}

export default ImageArea
