import React, { useState, useRef, useEffect } from 'react'
import Hidden from '@material-ui/core/Hidden'
import { Stage, Layer } from 'react-konva'
import Dropzone from 'react-dropzone'
import URLImage from '../../../atoms/URLImage'
import { createSetImageFile } from '~/utils/formHelper'

const ImageArea: React.FC<{
  onFileChange: (canvas) => void
  defChara: string
}> = ({ onFileChange, defChara }) => {
  const canvasWidth = 620
  const canvasHight = 866

  const [url, setUrl] = useState('')
  const [chara] = useState(defChara)
  const [previewUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const stageRef = useRef(null)

  const effect = () => {
    const stage = stageRef.current
    const canvas: HTMLCanvasElement = stage.toCanvas()
    setUrl(canvas.toDataURL())
    // onFileChange(canvas)
  }
  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
    onFileChange(stageRef.current)
  }
  useEffect(() => {
    setTimeout(effect, 500) // useEffectで初回に呼ばれるときにはまだ描画がされていないので少し待ってから読み込む
  }, [])
  useEffect(effect)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setImageFile(e.target.files[0])
  }
  return (
    <>
      <Dropzone onDrop={handleOnDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              transform: 'scale(0.25)',
              transformOrigin: '0 0',
              width: '155px',
              height: '216.5px',
            }}
          >
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
