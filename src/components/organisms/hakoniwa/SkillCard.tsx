import React, { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import Hidden from '@material-ui/core/Hidden'
import { Box } from '@material-ui/core'
import { Stage, Layer } from 'react-konva'
import Dropzone from 'react-dropzone'
import URLImage from '~/components/atoms/URLImage'
import SelectField from '~/components/form/SelectField'
import { createSetImageFile } from '~/utils/formHelper'

// html2canvas で得られる URI を用いてダウンロードさせる関数
// Ref: https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas
const saveAsImage = (uri) => {
  const downloadLink = document.createElement('a')

  if (typeof downloadLink.download === 'string') {
    downloadLink.href = uri

    // ファイル名
    downloadLink.download = 'component.png'

    // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
    document.body.appendChild(downloadLink)

    // ダウンロードリンクが設定された a タグをクリック
    downloadLink.click()

    // Firefox 対策で追加したリンクを削除しておく
    document.body.removeChild(downloadLink)
  } else {
    window.open(uri)
  }
}

const SkillCard: React.FC = () => {
  const canvasWidth = 252
  const canvasHight = 352

  const [url, setUrl] = useState('')
  const [chara, setChara] = useState('boy')
  const [previewUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const stageRef = useRef(null)
  let firstFlg = true

  const effect = () => {
    // const stage = stageRef.current
    // // const canvas: HTMLCanvasElement = stage.toCanvas()
    // // setUrl(canvas.toDataURL())

    if (firstFlg) {
      firstFlg = false
      setTimeout(effect, 500) // useEffectで初回に呼ばれるときにはまだ描画がされていないので少し待ってから読み込む
    }
  }
  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }
  useEffect(effect)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setImageFile(e.target.files[0])
  }

  const onClickExport = () => {
    // 画像に変換する component の id を指定
    const target = document.getElementById('target-component')
    html2canvas(target).then((canvas) => {
      const targetImgUri = canvas.toDataURL('img/png')
      saveAsImage(targetImgUri)
    })
  }
  const labelData = {
    timing: 'タイミング',
    count: 'カウント',
    range: '射程',
    target: '対象',
    maxLevel: '最大Lv',
    level: 'Lv',
  }
  const cardData = {
    type: 'スキル',
    name: '強打',
    timing: 'アクション',
    count: 4,
    target: '自身',
    range: 0,
    tags: ['攻撃', '剣'],
    effect: '剣のダメージ+[Lv]',
    description: '気合の声を上げ、全力で相手を叩き伏せる。',
    id: 'b-1',
    image: null,
    maxLevel: null,
    level: null,
    // image: {
    //   text: '自作',
    //   url: '/images/icons/icon-72x72.png',
    // },
  }

  return (
    <>
      <div
        id="target-component"
        style={{ padding: '0px', width: '252px', backgroundColor: '#fff' }}
      >
        <div className="skill-card">
          <div className="wrapper">
            <div className="base">
              <div className="skillLabel">{cardData.type}</div>
              <div className="image">
                {cardData.image ? (
                  <img
                    src={cardData.image.url}
                    crossOrigin="use-credentials"
                  ></img>
                ) : (
                  <></>
                )}
              </div>
              <div className="cardName">{cardData.name}</div>
              {/* <div className="attrTimingLabel attrLabel border">
                {labelData.timing}
              </div>
              <div className="attrTimingValue border">{cardData.timing}</div> */}
              <div className="attrCostLabel attrLabel border">
                {labelData.count}
              </div>
              <div className="attrCostValue border-trb">{cardData.count}</div>
              <div className="attrRangeLabel attrLabel border-blr">
                {labelData.range}
              </div>
              <div className="attrRangeValue border-br">{cardData.range}</div>
              <div className="attrTargetLabel attrLabel border-blr">
                {labelData.target}
              </div>
              <div className="attrTargetValue border-br">{cardData.target}</div>
              {/* <div className="attrExpLabel attrLabel border">
                {labelData.exp}
              </div>
              <div className="attrExpValue border">{cardData.exp}</div> */}
              <div className="tags">
                {cardData.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mainContent border">
                {cardData.level ? (
                  <>
                    <div className="maxLevelLabel border-br">
                      {labelData.maxLevel}
                    </div>
                    <div className="maxLevel border-br">
                      {cardData.maxLevel}
                    </div>
                    <div className="lvLavel border-br">{labelData.level}</div>
                    <div className="level border-br">{cardData.level}</div>
                  </>
                ) : (
                  <></>
                )}
                <div className="effect">{cardData.effect}</div>
                <div className="description">{cardData.description}</div>
              </div>
              <div className="bottomContent">
                {/* <div className="cardId">{cardData.id}</div> */}
                {cardData.image ? (
                  <div className="illustedBy">
                    <a
                      href={cardData.image.url}
                    >{`illust: ${cardData.image.text}`}</a>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => onClickExport()}>PNG出力</button>
    </>
  )
}

export default SkillCard

const MyJSX = () => (
  <style jsx>{`
    div {
      background-color: #fff;
    }
  `}</style>
)
