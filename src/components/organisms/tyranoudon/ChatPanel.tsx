/* eslint-disable react/display-name */
import * as _ from 'lodash'
import { useState, FC } from 'react'
import Head from 'next/head'
import { Box, Checkbox } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import TextAreaField from '~/components/form/TextAreaField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { contentLanguageMap } from '~/lib/i18n'
import { useRecordViewModel } from '~/store/modules/lostModule'
import SelectField from '~/components/form/SelectField'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'

const Page: FC = () => {
  const [height, setHeight] = useState(360)
  const [width, setWidth] = useState(1600)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  return (
    <DraggablePanel
      title="チャット"
      width={width}
      height={height}
      onResize={onResize}
    >
      <SelectField
        id="theme"
        labelText="テンプレート選択"
        items={[
          { name: 'black' },
          { name: 'aqua' },
          { name: 'blue' },
          { name: 'navy' },
          { name: 'pink' },
        ]}
        unselectedText=""
        value={sheet.theme}
        changeHandler={(e) => dispatch(update({ ...sheet, theme: e.name }))}
      />
    </DraggablePanel>
  )
}

export default Page
