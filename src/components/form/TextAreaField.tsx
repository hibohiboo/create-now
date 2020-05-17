import React from 'react'
import {
  Box,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from '@material-ui/core'

const TextAreaField: React.FC<{
  model: any
  prop: string
  labelText: string
  changeHandler?: (value: string) => void
  readonly?: boolean
}> = ({ model, prop, labelText, changeHandler, readonly }) => (
  <Box my={2}>
    <InputLabel>{labelText}</InputLabel>
    <FormControl fullWidth style={{ marginTop: '10px' }}>
      <TextareaAutosize
        aria-label={prop}
        rowsMin={3}
        value={model[prop]}
        onChange={(e) => changeHandler(e.target.value)}
        readOnly={readonly}
      />
    </FormControl>
  </Box>
)
export default TextAreaField
