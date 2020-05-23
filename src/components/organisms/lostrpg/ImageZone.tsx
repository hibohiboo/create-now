import React, { useState, useEffect } from 'react'
import { Box, InputLabel } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import { createSetImageFile } from '~/utils/formHelper'

const ImageZone: React.FC<{ label: string }> = ({ label }) => {
  const [prevUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }
  return (
    <Box my={2}>
      <InputLabel>{label}</InputLabel>
      <Dropzone onDrop={handleOnDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <Box
              border={1}
              style={{
                maxWidth: '480px',
                minHeight: '100px',
                overflow: 'hidden',
              }}
            >
              {prevUrl ? (
                <img style={{ width: '100%' }} alt={label} src={prevUrl} />
              ) : (
                <></>
              )}
            </Box>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </Box>
  )
}
export default ImageZone
