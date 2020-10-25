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
  }
  const cardData = {
    type: 'スキル',
    name: '居合切り',
    timing: 'アクション',
    count: 4,
    range: 0,
    tags: ['攻撃', '剣'],
    effect: '攻撃： 1d6ダメージ',
    description: '気合を入れた一閃を繰り出す',
    id: 'b-1',
    image: {
      text: '自作',
      url:
        'https://drive.google.com/uc?export=view&id=11sGd0fb1kteXpT6nuk_Nbv-KHfxOlVVd&usp=sharing',
    },
  }
  return (
    <>
      <div
        id="target-component"
        style={{ padding: '1px', width: '252px', backgroundColor: '#fff' }}
      >
        <div className="skill-card">
          <div className="wrapper">
            <div className="base">
              <div className="skillLabel">{cardData.type}</div>
              <div className="image">
                {cardData.image ? <img src={cardData.image.url}></img> : <></>}
              </div>
              <div className="cardName">{cardData.name}</div>
              {/* <div className="attrTimingLabel attrLabel border">
                {labelData.timing}
              </div>
              <div className="attrTimingValue border">{cardData.timing}</div> */}
              <div className="attrCostLabel attrLabel border">
                {labelData.count}
              </div>
              <div className="attrCostValue border">{cardData.count}</div>
              <div className="attrRangeLabel attrLabel border">
                {labelData.range}
              </div>
              <div className="attrRangeValue border">{cardData.range}</div>
              {/* <div className="attrExpLabel attrLabel border">
                {cardData.range}
              </div>
              <div className="attrExpValue border">{cardData.range}</div> */}
              <div className="tags">
                {cardData.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mainContent border">
                {/* <div className="maxLevelLabel border">a</div>
                <div className="maxLevel border">b</div>
                <div className="lvLavel border">a</div>
                <div className="level border">1</div> */}
                <div className="effect">{cardData.effect}</div>
                <div className="description">{cardData.description}</div>
              </div>
              <div className="bottomContent">
                <div className="cardId">{cardData.id}</div>
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
