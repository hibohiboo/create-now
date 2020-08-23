import React from 'react'
import { InputLabel, FormControl } from '@material-ui/core'
import Select from 'react-select'

type State = {
  isClearable: boolean
  isDisabled: boolean
  isLoading: boolean
  isRtl: boolean
  isSearchable: boolean
}
const state: State = {
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true,
}
export interface SelectItem {
  value: string
  label: string
}
const SelectableInputField: React.FC<{
  id: string
  labelText: string
  items: SelectItem[]
  value: SelectItem | null
  changeHandler: (val: SelectItem) => void
}> = ({ id, labelText, items, changeHandler, value }) => {
  const { isClearable, isSearchable, isDisabled, isLoading, isRtl } = state

  return (
    <FormControl fullWidth>
      <label
        id={`${id}-label`}
        style={{
          transform: 'translate(0, 1.5px) scale(0.75)',
          transformOrigin: 'left top',
          color: 'rgba(0, 0, 0, 0.54)',
        }}
      >
        {labelText}
      </label>

      <Select
        instanceId={id}
        value={value}
        onChange={changeHandler}
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
