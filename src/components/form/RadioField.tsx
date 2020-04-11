import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

const RadioField: React.FC<{
  model: any
  prop: string
  labelText: string
  changeHandler: any
  items: { label: string; value: number }[]
}> = ({ model, changeHandler, labelText, prop, items }) => {
  return (
    <FormControl component="fieldset" style={{ marginTop: '10px' }}>
      <FormLabel component="legend">{labelText}</FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue={1}
        value={model[prop]}
        onChange={changeHandler}
      >
        {items.map((item) => {
          return (
            <FormControlLabel
              value={item.value}
              control={<Radio color="primary" />}
              label={item.label}
              key={item.value}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioField
