import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import { Favorite } from '@material-ui/icons'
import URLImage from '../../atoms/URLImage'
import Hidden from '@material-ui/core/Hidden'

const ImageArea: React.FC = () => {
  const sheet = useEntrySheet()

  if (!sheet) {
    return <div></div>
  }
  const canvasWidth = 1192
  const canvasHight = 1684
  const leftPadding = 215
  const themePadding = leftPadding + 350
  const inputWidth = canvasWidth - leftPadding
  const fontSize = { system: 25, title: 80, titleRuby: 40, subTitle: 30 }
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
  const checkChar = '✔'

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

  const Heart: React.FC<{ x: number; y: number }> = ({ x, y }) => (
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

  return (
    <>
      <Hidden mdUp implementation="css">
        <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      </Hidden>
      <Hidden smDown implementation="css">
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHight}
              fill={'#fff'}
            />
            <URLImage src="/images/trpg-manual/black.png" x={0} y={0} />
            <Text
              x={640}
              y={115}
              width={inputWidth}
              align="left"
              text={sheet.name}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={30}
            />
            {
              // 左アイコン部
            }
            <Check x={42} y={443} visible={true} />
            <Heart x={40} y={525} />
            <Check x={165} y={735} visible={sheet.mystery === 1} />
            <Check x={370} y={735} />
            <Check x={165} y={945} />
            <Check x={370} y={945} />
            <Check x={165} y={1155} />
            <Check x={370} y={1155} />
            <Check x={165} y={1335} />
            <Check x={360} y={1335} />
            <Check x={165} y={1545} />
            <Check x={360} y={1545} />
            {
              // 右半分
            }
            <Text
              x={640}
              y={174}
              width={inputWidth}
              align="left"
              text={sheet.id}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={20}
            />
            <Check x={950} y={168} size="small" />

            <Check x={593} y={370} size="small" />
            <Check x={950} y={368} size="small" />
            <Check x={593} y={425} size="small" />
            <Check x={950} y={425} size="small" />
            <Check x={593} y={480} size="small" />
            <Check x={950} y={480} size="small" />
            <Check x={593} y={613} size="small" />
            <Check x={950} y={535} size="small" />

            <Ellipse
              x={750 + (sheet.requiredRule === 1 ? 0 : 50)}
              y={720}
              radiusX={30}
              radiusY={15}
              stroke="#000"
              strokeWidth={3}
            />

            <Check x={925} y={838} size="small" />
            <Check x={1140} y={838} size="small" />
            <Check x={925} y={898} size="small" />
            <Check x={1140} y={898} size="small" />
            <Check x={925} y={958} size="small" />
            <Check x={1140} y={958} size="small" />
            <Check x={925} y={1015} size="small" />
            <Check x={1140} y={1015} size="small" />

            <Text
              x={480}
              y={1430}
              width={inputWidth}
              align="left"
              text={String(sheet.free)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
          </Layer>
        </Stage>
      </Hidden>
    </>
  )
}

export default ImageArea
