import React, { useState, useRef, useEffect } from 'react'
import Hidden from '@material-ui/core/Hidden'
import { Box } from '@material-ui/core'
import { Stage, Layer } from 'react-konva'
import Dropzone from 'react-dropzone'
import URLImage from '~/components/atoms/URLImage'
import SelectField from '~/components/form/SelectField'
import { createSetImageFile } from '~/utils/formHelper'

const ImageArea: React.FC = () => {
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
                <Layer></Layer>
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
