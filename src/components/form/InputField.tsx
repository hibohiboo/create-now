import React from 'react'
import { InputLabel, FormControl, Input } from '@material-ui/core'
import { ChangeEvent } from 'react'

const InputField: React.FC<{
  model: any
  type: string
  prop: string
  labelText: string
  changeHandler: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
}> = ({ model, type, prop, labelText, changeHandler }) => (
  <FormControl fullWidth style={{ marginTop: '10px' }}>
    <InputLabel>{labelText}</InputLabel>
    <Input type={type} value={model[prop]} onChange={changeHandler} />
  </FormControl>
)
export default InputField
