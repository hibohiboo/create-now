import React from 'react'
import { Input, InputLabel, FormControl } from '@material-ui/core'

const getValueFromName = (
  items: { name: string }[],
  valueProp: string,
  name: string,
) => {
  const item = items.find((i) => i.name === name)
  if (item) {
    return item[valueProp]
  }
  return name
}
const getNameFromValue = (
  items: { name: string }[],
  valueProp: string,
  value: string,
) => {
  const item = items.find((i) => i[valueProp] === value)
  if (item) {
    return item.name
  }
  return value
}

const SelectableInputField: React.FC<{
  id: string
  labelText: string
  items: { name: string }[]
  value: string
  valueProp?: string
  changeHandler: (name: string) => void
  type?: string
}> = ({
  id,
  labelText,
  items,
  changeHandler,
  value,
  valueProp = 'name',
  type = 'text',
}) => {
  const name = getNameFromValue(items, valueProp, value)
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
      <Input
        id={id}
        type={type}
        value={name}
        onChange={(event) => {
          changeHandler(getValueFromName(items, valueProp, event.target.value))
          if (!event.target.value) {
            event.target.blur()
          }
        }}
        inputProps={{ list: `${id}-datalist` }}
        onFocus={(event) => {
          event.target.select()
        }}
      />
      <datalist id={`${id}-datalist`}>
        {items.map((item, i) => (
          <option value={item.name} key={item[valueProp]}></option>
        ))}
      </datalist>
    </FormControl>
  )
}
export default SelectableInputField
