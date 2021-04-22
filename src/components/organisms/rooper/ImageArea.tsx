import React, { useState, useRef, useEffect } from 'react'
import Hidden from '@material-ui/core/Hidden'
import { Box } from '@material-ui/core'
import { Stage, Layer } from 'react-konva'
import Dropzone from 'react-dropzone'
import URLImage from '../../atoms/URLImage'
import SelectField from '~/components/form/SelectField'
import { createSetImageFile } from '~/utils/formHelper'

const ImageArea: React.FC = () => {
  const canvasWidth = 620
  const canvasHight = 866

  const [url, setUrl] = useState('')
  const [chara, setChara] = useState('boy')
  const [previewUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)
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
  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }
  useEffect(effect)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setImageFile(e.target.files[0])
  }
  return (
    <>
      <div style={{ maxWidth: '500px', minWidth: '200px' }}>
        <Box my={4} display="flex">
          <SelectField
            id="theme"
            labelText="キャラクター選択"
            items={
              [
                { name: '男子学生', value: 'boy' },
                { name: '女子学生', value: 'girl' },
                { name: 'お嬢様', value: 'rmd' },
                { name: '巫女', value: 'shr' },
                { name: '刑事', value: 'kg' },
                { name: 'サラリーマン', value: 'off' },
                { name: '情報屋', value: 'info' },
                { name: '医者', value: 'doc' },
                { name: '患者', value: 'pat' },
                { name: '委員長', value: 'rep' },
                { name: 'イレギュラー', value: 'mys' },
                { name: '異世界人', value: 'ali' },
                { name: '神格', value: 'god' },
                { name: 'アイドル', value: 'idol' },
                { name: 'マスコミ', value: 'jou' },
                { name: '大物', value: 'boss' },
                { name: 'ナース', value: 'nurse' },
                { name: '手先', value: 'hen' },
                { name: '学者', value: 'gak' },
                { name: '幻想', value: 'ill' },
                { name: '鑑識官', value: 'fore' },
                { name: 'A.I.', value: 'ai' },
                { name: '教師', value: 'tea' },
                { name: '転校生', value: 'new' },
                { name: '軍人', value: 'mil' },
                { name: '黒猫', value: 'cat' },
                { name: '女の子', value: 'lit' },
                { name: 'コピーキャット', value: 'copy' },
                { name: '教祖', value: 'hier' },
                { name: 'ご神木', value: 'tree' },
                { name: '妹', value: 'sis' },
              ] as any
            }
            unselectedText=""
            value={chara}
            valueProp={'value'}
            changeHandler={(e: { name: any; value: any }) => {
              setChara(e.value)
            }}
          />
        </Box>
      </div>
      <Dropzone onDrop={handleOnDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <Hidden mdUp implementation="css">
              <img
                className="sample-image"
                src={url}
                style={{ width: '100%' }}
              ></img>
            </Hidden>
            <Hidden smDown implementation="css">
              <Stage
                width={canvasWidth}
                height={canvasHight}
                ref={stageRef}
                onDrop={handleImageChange}
              >
                <Layer>
                  <URLImage src={`/images/rooper/card_back.png`} x={0} y={0} />
                  <URLImage src={previewUrl} x={0} y={0} />
                  <URLImage src={`/images/rooper/${chara}.png`} x={0} y={0} />
                </Layer>
              </Stage>
            </Hidden>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </>
  )
}

export default ImageArea
