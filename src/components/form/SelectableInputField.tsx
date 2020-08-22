import React, { ChangeEvent } from 'react'
import { Input, InputLabel, FormControl } from '@material-ui/core'
import Select from 'react-select'

type State = {
  isClearable: boolean
  isDisabled: boolean
  isLoading: boolean
  isRtl: boolean
  isSearchable: boolean
}
const SelectableInputField: React.FC<{
  id: string
  labelText: string
  unselectedText: string
  items: { value: string; label: string }[]
  value: string
  valueProp?: string
  changeHandler: (val: string) => void
  type: string
}> = ({
  id,
  labelText,
  items,
  changeHandler,
  value,
  valueProp = 'name',
  type = 'text',
}) => {
  const { isClearable, isSearchable, isDisabled, isLoading, isRtl } = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  }
  const handleChange = (selectedOption) => {
    changeHandler(selectedOption.value)
  }
  const valueOption = { value, label: value }

  return (
    <FormControl fullWidth style={{ marginTop: '10px' }}>
      <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
      <Select
        value={valueOption}
        onChange={handleChange}
        options={items}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
      />
    </FormControl>
  )
}
export default SelectableInputField
