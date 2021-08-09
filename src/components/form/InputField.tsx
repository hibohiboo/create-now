import React from 'react'
import { InputLabel, FormControl, Input } from '@material-ui/core'
import { ChangeEvent } from 'react'

const InputField: React.FC<{
  model: any
  prop: string
  labelText: string
  type?: string
  changeHandler?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  readonly?: boolean
}> = ({
  model,
  prop,
  labelText,
  type = 'text',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeHandler = () => {},
  readonly = false,
}) => (
  <FormControl fullWidth style={{ marginTop: '10px' }}>
    <InputLabel>{labelText}</InputLabel>
    <Input
      type={type}
      value={model[prop]}
      onChange={changeHandler}
      readOnly={readonly}
    />
  </FormControl>
)
export default InputField
