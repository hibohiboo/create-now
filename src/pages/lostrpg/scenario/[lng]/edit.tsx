/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import { DeleteOutline, Save } from '@material-ui/icons'
import MaterialTable from 'material-table'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import ImageZone from '~/components/organisms/lostrpg/ImageZone'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import TextAreaField from '~/components/form/TextAreaField'
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { contentLanguageMap } from '~/lib/i18n'
import { useBossEditViewModel } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import SpecialtiesTooltip from '~/components/organisms/lostrpg/SpecialtiesTooltip'

const Page: NextPage = () => {
  const vm = useBossEditViewModel()
  const t = vm.i18n.t
  return <>{!vm.authUser ? <></> : <Container></Container>}</>
}
export default Page
