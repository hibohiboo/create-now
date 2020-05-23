/* eslint-disable react/display-name */
import * as _ from 'lodash'
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Dropzone from 'react-dropzone'
import {
  Box,
  Button,
  Chip,
  Checkbox,
  Tooltip,
  FormControlLabel,
  ClickAwayListener,
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import { DeleteOutline, Help, Save } from '@material-ui/icons'
import MaterialTable from 'material-table'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import TextAreaField from '~/components/form/TextAreaField'
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { contentLanguageMap } from '~/lib/i18n'
import { useBossViewModel } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import SpecialtiesTooltip from '~/components/organisms/lostrpg/SpecialtiesTooltip'

const Page: NextPage = () => {
  const vm = useBossViewModel()
  const t = vm.i18n.t
  return (
    <>
      {!vm.authUser ? (
        <></>
      ) : (
        <Container>
          <Head>
            <meta
              httpEquiv="content-language"
              content={contentLanguageMap[vm.i18n.activeLocale]}
            />
            <title>{t('lostrpg_boss_edit_title')}</title>
          </Head>
          <div style={{ display: 'none' }}>
            <LanguageSelector i18n={vm.i18n} />
          </div>
          <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
            <h2>
              {t('lostrpg_boss_edit_title')}
              {vm.boss.id ? t('common_edit') : t('common_create')}
            </h2>
            <Box my={2}>
              <InputField
                model={vm.boss}
                prop="creatorName"
                labelText={t('lostrpg_boss_common_creatorName')}
                changeHandler={vm.creatorNameHandler}
              />

              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextField
                  id="bossName"
                  required
                  label={t('lostrpg_boss_common_bossName')}
                  error={!vm.boss.name && vm.isSubmit}
                  helperText={
                    vm.boss.name || !vm.isSubmit ? '' : t('message_required')
                  }
                  value={vm.boss.name}
                  onChange={vm.bossNameHandler}
                />
              </FormControl>
              <Box my={2} display="flex" flex="wrap">
                <InputField
                  model={vm.boss}
                  type="number"
                  prop="level"
                  labelText={t('lostrpg_common_level')}
                  changeHandler={vm.levelHandler}
                />
                <InputField
                  model={vm.boss}
                  type="number"
                  prop="stamina"
                  labelText={t('lostrpg_character_common_stamina')}
                  changeHandler={vm.staminaHandler}
                />
                <InputField
                  model={vm.boss}
                  type="number"
                  prop="willPower"
                  labelText={t('lostrpg_character_common_willPower')}
                  changeHandler={vm.willPowerHandler}
                />
              </Box>

              <Box my={2}>
                <SpecialtiesTooltip
                  label={t('lostrpg_character_common_specialty')}
                  help={t('lostrpg_character_edit_specialtiesHelp')}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={vm.resetDamageHandler}
                >
                  {t('lostrpg_character_edit_resetDamage')}
                </Button>
                <SpecialtiesTable
                  columns={vm.specialtiesTableColumns}
                  rows={vm.specialtiesTableRows}
                  gapHandler={vm.gapHandler}
                  specialtyHandler={vm.specialtyHandler}
                  damageHandler={vm.damageHandler}
                />
              </Box>
              <Box my={2} display="flex">
                <SelectField
                  id="ability-filter"
                  items={vm.abilityClasses}
                  value={vm.abilityFilter}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_boss_edit_abilityFilter')}
                  changeHandler={vm.abilityFilterHandler}
                />
                <SelectField
                  id="ability-select"
                  items={vm.abilityList}
                  value={''}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_character_edit_addAbility')}
                  changeHandler={vm.selectAbilityHandler}
                />
              </Box>

              <EditableMaterialTable
                title={t('lostrpg_character_common_ability')}
                columns={vm.abilitiesColumns}
                data={_.cloneDeep(vm.boss.abilities)}
                rowAddHandler={vm.rowAddHandler}
                rowUpdateHandler={vm.rowUpdateHandler}
                rowDeleteHandler={vm.rowDeleteHandler}
              />
            </Box>
          </Box>
        </Container>
      )}
    </>
  )
}
export default Page
