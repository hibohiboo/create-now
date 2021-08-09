import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import URLImage from '../../atoms/URLImage'

const ImageArea: React.FC = () => {
  const sheet = useEntrySheet()

  if (!sheet) {
    return <div></div>
  }
  const canvasWidth = 1192
  const canvasHight = 1684
  const leftPadding = 215
  const inputWidth = canvasWidth - leftPadding
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
    fontawesome: '"Font Awesome 5 Free", "Font Awesome 5 Brands"',
  }
  // Font Awesome のfont-weightのルール
  const faWeight = { solid: '900', regular: '400', brands: '400', light: '300' }
  const faUnicode = { heart: '\uf004', check: '\uf00c' }
  const NO_PROBREM = 1
  const FAVORITE = 2

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

  const Heart: React.FC<{ x: number; y: number; visible?: boolean }> = ({
    x,
    y,
    visible = false,
  }) => (
    <>
      {visible && (
        <Text
          x={x}
          y={y}
          width={inputWidth}
          align="left"
          text={faUnicode.heart}
          fill={sheet.heartColor}
          fontFamily={family.fontawesome}
          fontStyle={faWeight.solid}
          fontSize={60}
        />
      )}
    </>
  )
  const Check: React.FC<{
    x: number
    y: number
    size?: string
    visible?: boolean
  }> = ({ x, y, size = 'big', visible = false }) => (
    <>
      {visible && (
        <Text
          x={x}
          y={y}
          width={inputWidth}
          align="left"
          text={faUnicode.check}
          fill={sheet.checkColor}
          fontFamily={family.fontawesome}
          fontStyle={faWeight.solid}
          fontSize={size === 'big' ? 70 : 30}
        />
      )}
    </>
  )
  const Circle: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <Ellipse
      x={x}
      y={y}
      radiusX={40}
      radiusY={20}
      stroke={sheet.circleColor}
      strokeWidth={5}
    />
  )

  return (
    <div style={{ maxWidth: '800px', position: 'relative' }}>
      <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      <div style={{ display: 'none' }}>
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHight}
              fill={sheet.imageBackColor}
            />
            <URLImage
              src={sheet.previewUrl}
              x={sheet.imageX}
              y={sheet.imageY}
              scale={sheet.scale / 100}
            />

            <URLImage
              src={`/images/trpg-manual/${sheet.theme}.png`}
              x={0}
              y={0}
            />

            {
              // 左アイコン部
            }
            <Check x={42} y={443} visible={true} />
            <Heart x={39} y={525} visible={true} />
            <Check x={165} y={735} visible={sheet.mystery === NO_PROBREM} />
            <Check x={370} y={735} visible={sheet.battle === NO_PROBREM} />
            <Heart x={165} y={754} visible={sheet.mystery === FAVORITE} />
            <Heart x={370} y={754} visible={sheet.battle === FAVORITE} />

            <Check x={165} y={945} visible={sheet.horror === NO_PROBREM} />
            <Check x={370} y={945} visible={sheet.grotesque === NO_PROBREM} />
            <Heart x={165} y={965} visible={sheet.horror === FAVORITE} />
            <Heart x={370} y={965} visible={sheet.grotesque === FAVORITE} />
            <Check x={165} y={1155} visible={sheet.gl === NO_PROBREM} />
            <Check x={370} y={1155} visible={sheet.bl === NO_PROBREM} />
            <Heart x={165} y={1175} visible={sheet.gl === FAVORITE} />
            <Heart x={370} y={1175} visible={sheet.bl === FAVORITE} />
            <Check x={165} y={1335} visible={sheet.love === NO_PROBREM} />
            <Check x={360} y={1335} visible={sheet.PvP === NO_PROBREM} />
            <Heart x={165} y={1358} visible={sheet.love === FAVORITE} />
            <Heart x={365} y={1358} visible={sheet.PvP === FAVORITE} />
            <Check x={165} y={1545} visible={sheet.depression === NO_PROBREM} />
            <Check x={360} y={1545} visible={sheet.decision === NO_PROBREM} />
            <Heart x={165} y={1562} visible={sheet.depression === FAVORITE} />
            <Heart x={360} y={1562} visible={sheet.decision === FAVORITE} />
            {
              // 右半分
            }
            <Text
              x={640}
              y={115}
              width={inputWidth}
              align="left"
              text={sheet.name}
              fill={sheet.fontColor}
              fontFamily={family.gothic}
              fontSize={sheet.nameFontSize}
            />
            <Text
              x={640}
              y={174}
              width={inputWidth}
              align="left"
              text={sheet.id}
              fill={sheet.fontColor}
              fontFamily={family.gothic}
              fontSize={sheet.idFontSize}
            />
            <Check
              x={950 + sheet.exp * 102}
              y={168}
              size="small"
              visible={true}
            />

            <Check x={593} y={370} size="small" visible={sheet.voice} />
            <Check x={950} y={368} size="small" visible={sheet.ccfolia} />
            <Check x={593} y={425} size="small" visible={sheet.text} />
            <Check x={950} y={425} size="small" visible={sheet.udonarium} />
            <Check x={593} y={480} size="small" visible={sheet.textWithVoice} />
            <Check x={950} y={480} size="small" visible={sheet.discord} />
            <Check x={593} y={613} size="small" visible={sheet.onTheTable} />
            <Check x={950} y={535} size="small" visible={sheet.skype} />
            <Text
              x={940}
              y={610}
              width={inputWidth}
              align="left"
              text={sheet.others}
              fill={sheet.fontColor}
              fontFamily={family.gothic}
              fontSize={20}
            />
            <Circle x={820 + sheet.gm * 105} y={715} />
            <Circle x={820 + sheet.pl * 105} y={775} />
            <Check x={925} y={838} size="small" visible={sheet.rpMany} />
            <Check x={1140} y={838} size="small" visible={sheet.rpOften} />
            <Check x={925} y={898} size="small" visible={sheet.scenario} />
            <Check x={1140} y={898} size="small" visible={sheet.scenarioC} />
            <Check x={925} y={958} size="small" visible={sheet.lostNo} />
            <Check x={1140} y={958} size="small" visible={sheet.lostYes} />
            <Check x={925} y={1015} size="small" visible={sheet.ruleStrict} />
            <Check x={1140} y={1015} size="small" visible={sheet.ruleFasy} />

            <Text
              x={480}
              y={1150}
              width={inputWidth}
              align="left"
              text={String(sheet.rulebook)}
              fill={sheet.fontColor}
              fontFamily={family.gothic}
              fontSize={sheet.rulebookFontSize}
            />
            <Text
              x={480}
              y={1430}
              width={inputWidth}
              align="left"
              text={String(sheet.free)}
              fill={sheet.fontColor}
              fontFamily={family.gothic}
              fontSize={sheet.commentFontSize}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default ImageArea
