import React from 'react'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Box,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core'
import entrySheetModule, {
  useEntrySheet,
} from '~/store/modules/trpgManualModule'
import InputField from '~/components/form/InputField'
import RadioField from '~/components/form/RadioField'
import SelectField from '~/components/form/SelectField'

const InputArea: React.FC = () => {
  const sheet = useEntrySheet()
  const dispatch = useDispatch()
  const { update } = entrySheetModule.actions
  const noproFavItems = [
    { label: '', value: 0 },
    { label: 'No Problem', value: 1 },
    { label: 'Favorite', value: 2 },
  ]
  if (!sheet) {
    return <div>読込失敗</div>
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = async () => {
      dispatch(update({ ...sheet, previewUrl: reader.result.toString() }))
    }

    reader.readAsDataURL(file)
  }
  return (
    <div style={{ maxWidth: '500px', minWidth: '200px' }}>
      <Box my={4} display="flex">
        <SelectField
          id="theme"
          labelText="キャラクター選択"
          items={[{ name: '男子学生', value: 'boy' }] as any}
          unselectedText=""
          value={'boy'}
          valueProp={'value'}
          changeHandler={(e) => dispatch(update({ ...sheet, theme: e.name }))}
        />
      </Box>
    </div>
  )
}

export default InputArea
