import React, { ChangeEvent } from 'react'
import { InputLabel, FormControl, MenuItem, Select } from '@material-ui/core'

const SelectField: React.FC<{
  id: string
  labelText: string
  unselectedText: string
  items: { name: string }[]
  value: string
  changeHandler: ({ name: string }) => void
}> = ({ id, labelText, items, unselectedText, changeHandler, value }) => (
  <FormControl fullWidth>
    <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
    <Select
      labelId={`${id}-label`}
      id={id}
      value={value}
      onChange={(event) => {
        const item = items.find((i) => i.name === event.target.value)
        if (item) changeHandler(item)
      }}
    >
      <MenuItem value="">{unselectedText}</MenuItem>
      {items.map((item) => (
        <MenuItem value={item.name} key={item.name}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
export default SelectField
