import React, { ChangeEvent } from 'react'
import { InputLabel, FormControl, MenuItem, Select } from '@material-ui/core'

const SelectField: React.FC<{
  id: string
  labelText: string
  unselectedText: string
  items: { name: string }[]
  value: string
  valueProp?: string
  changeHandler: ({ name: string }) => void
}> = ({
  id,
  labelText,
  items,
  unselectedText,
  changeHandler,
  value,
  valueProp = 'name',
}) => {
  console.log(`memo test ${labelText}`)
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value || ''}
        onChange={(event) => {
          const item = items.find((i) => i[valueProp] === event.target.value)
          changeHandler(item)
        }}
      >
        {unselectedText && <MenuItem value="">{unselectedText}</MenuItem>}
        {items.map((item) => (
          <MenuItem value={item[valueProp]} key={item[valueProp]}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default React.memo(SelectField)
