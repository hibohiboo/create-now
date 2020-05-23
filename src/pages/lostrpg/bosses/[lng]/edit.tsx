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
              {vm.id ? t('common_edit') : t('common_create')}
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
                  error={!vm.boss.name && vm.isValidError}
                  helperText={
                    vm.boss.name || !vm.isValidError
                      ? ''
                      : t('message_required')
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
              <ImageZone
                label={t('common_image')}
                fileHandler={vm.setImageHandler}
              />

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
                <Box my={2}>
                  <InputLabel>
                    {t('lostrpg_character_common_bodyPartsTable')}
                  </InputLabel>

                  <DamageTable
                    sevenLabel={t('lostrpg_character_common_attackersChoice')}
                    rows={vm.damageBodyParts}
                    damageHandler={vm.damageHandler}
                  />
                </Box>
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
              <MaterialTable
                title={t('lostrpg_character_common_statusAilments')}
                options={tableConfig.viewTable}
                columns={[
                  {
                    title: '',
                    render: (rowData) => {
                      return (
                        <Checkbox
                          checked={rowData['isChecked']}
                          onChange={() => vm.statusAilmentsHandler(rowData)}
                        />
                      )
                    },
                  },
                  {
                    title: t('common_name'),
                    field: 'name',
                  },
                  {
                    title: t('common_effect'),
                    field: 'effect',
                  },
                ]}
                data={vm.statusAilments}
              />

              <TextAreaField
                model={vm.boss}
                prop="summary"
                labelText={t('common_summary')}
                changeHandler={vm.summaryHandler}
              />
              <TextAreaField
                model={vm.boss}
                prop="freeWriting"
                labelText={t('lostrpg_character_common_memo')}
                changeHandler={vm.freeWritingHandler}
              />
            </Box>
          </Box>

          <Box m={2}>
            <InputLabel>{t('lostrpg_common_publish')}</InputLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={vm.boss.isPublish}
                  onChange={vm.publishHandler}
                  color="primary"
                />
              }
              label={t('lostrpg_common_publish')}
            />
          </Box>

          <Box my={2}>
            <Button
              startIcon={<Save />}
              onClick={vm.editHandler}
              variant="contained"
              color="primary"
            >
              {t('common_save')}
            </Button>
          </Box>
          {!vm.id ? (
            <></>
          ) : (
            <Box my={4}>
              <Button
                startIcon={<DeleteOutline />}
                onClick={vm.deleteHandler}
                variant="contained"
                color="secondary"
              >
                {t('common_delete')}
              </Button>
            </Box>
          )}

          <Link href={`/lostrpg/bosses/[lng]/list`} as={vm.beforePage}>
            {t('common_back')}
          </Link>
        </Container>
      )}
    </>
  )
}
export default Page
