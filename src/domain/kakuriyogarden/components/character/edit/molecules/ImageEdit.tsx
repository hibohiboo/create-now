import React from 'react'
import { Box, InputLabel } from '@material-ui/core'
import Dropzone from 'react-dropzone'

const ImageEdit = React.memo<{
  label: string
  prevUrl: string
  onDrop: any
}>(({ label, prevUrl, onDrop }) => {
  return (
    <Box my={2} ml={3}>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <Box
              border={1}
              style={{
                width: '50px',
                height: '50px',
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
})

export default ImageEdit
