import React from 'react'
import { InputLabel, FormControl, Input } from '@material-ui/core'
import { ChangeEvent } from 'react'

const InputField: React.FC<{
  value: any
  labelText: string
  type?: string
  changeHandler?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  readonly?: boolean
}> = ({
  value,
  labelText,
  type = 'text',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeHandler = () => {},
  readonly = false,
}) => {
  return (
    <FormControl fullWidth style={{ marginTop: '10px' }}>
      <InputLabel>{labelText}</InputLabel>
      <Input
        type={type}
        value={value}
        onChange={changeHandler}
        readOnly={readonly}
      />
    </FormControl>
  )
}
export default React.memo<{
  value: any
  labelText: string
  type?: string
  changeHandler?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  readonly?: boolean
}>(InputField)
