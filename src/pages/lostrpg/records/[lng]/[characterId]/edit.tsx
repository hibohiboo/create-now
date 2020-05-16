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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteOutline, Help, Save } from '@material-ui/icons'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import TextAreaField from '~/components/form/TextAreaField'
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'

import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import {
  setCharacter,
  useRecord,
  setLocale,
  setRecord,
  useRecordViewModel,
  setPartyMember,
} from '~/store/modules/lostModule'

import * as tableConfig from '~/lib/constants'

import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'

const Page: NextPage = () => {
  const vm = useRecordViewModel()
  const t = vm.i18n.t
  const ReadOnlyTextField = ({
    label,
    prop,
  }: {
    label: string
    prop: string
  }) => (
    <InputField
      model={vm.character}
      type="text"
      prop={prop}
      labelText={label}
      readonly={true}
    />
  )

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
            <title>{t('lostrpg_records_common_title')}</title>
          </Head>
          <div style={{ display: 'none' }}>
            <LanguageSelector i18n={vm.i18n} />
          </div>
          <h1>{t('lostrpg_records_common_title')}</h1>
          <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
            <ReadOnlyTextField
              prop="playerName"
              label={t('common_playerName')}
            />

            <ReadOnlyTextField
              prop="name"
              label={t('lostrpg_character_common_characterName')}
            />

            <FormControl fullWidth style={{ marginTop: '10px' }}>
              <TextField
                id="characterName"
                required
                label={t('lostrpg_record_common_scenarioTitle')}
                error={!vm.record.scenarioTitle && vm.isSubmit}
                helperText={
                  vm.record.scenarioTitle || !vm.isSubmit
                    ? ''
                    : t('message_required')
                }
                value={vm.record.scenarioTitle}
                onChange={vm.scenarioTitleHandler}
              />
            </FormControl>

            <InputField
              model={vm.record}
              type="text"
              prop="gmName"
              labelText={t('lostrpg_record_common_gmName')}
              changeHandler={vm.gmNameHanler}
            />
            <Box
              my={2}
              style={{
                padding: '5px',
                border: 'solid 1px rgba(224, 224, 224, 1)',
              }}
            >
              <InputLabel>{t('lostrpg_common_party')}</InputLabel>
              <Box my={2}>
                <Button
                  onClick={vm.addMemberHandler}
                  variant="contained"
                  color="primary"
                >
                  {`${t('lostrpg_common_member')}${t('common_add')}`}
                </Button>
                {vm.record.members.map((member) => {
                  return (
                    <Box
                      key={member.id}
                      my={2}
                      style={{
                        padding: '5px',
                        border: 'solid 1px rgba(224, 224, 224, 1)',
                      }}
                    >
                      <InputField
                        model={member}
                        type="text"
                        prop="name"
                        labelText={t('common_name')}
                        changeHandler={(e) =>
                          vm.partyMemberNameHandler(e, member)
                        }
                      />

                      <TextAreaField
                        model={member}
                        prop="memo"
                        labelText={t('common_memo')}
                        changeHandler={(v) =>
                          vm.partyMemberMemoHandler(v, member)
                        }
                      />
                      <Box display="flex">
                        <InputField
                          model={member}
                          type="text"
                          prop="trophy"
                          labelText={t('common_trophy')}
                          changeHandler={(e) =>
                            vm.partyMemberTrophyHandler(e, member)
                          }
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => vm.deleteMemberHandler(member)}
                        >
                          <DeleteOutline />
                        </Button>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <TextAreaField
              model={vm.record}
              prop="memo"
              labelText={t('common_memo')}
              changeHandler={(v) => vm.memoHanler(v)}
            />
            <SpecialtiesTable
              columns={vm.specialtiesTableColumns}
              rows={vm.specialtiesTableRows}
              gapHandler={() => {}}
              specialtyHandler={() => {}}
              damageHandler={vm.damageHandler}
            />

            <Box my={2}>
              <MaterialTable
                title={t('common_exp')}
                options={tableConfig.viewTable}
                columns={[
                  {
                    title: '',
                    render: (rowData) => {
                      return (
                        <Checkbox
                          checked={rowData['isChecked']}
                          onChange={() => vm.expHelperHandler(rowData)}
                        />
                      )
                    },
                  },
                  {
                    title: t('common_name'),
                    field: 'name',
                  },
                  {
                    title: t('common_exp'),
                    field: 'point',
                  },
                ]}
                data={vm.expChecks}
              />
            </Box>
            <InputField
              model={vm.record}
              type="number"
              prop="exp"
              labelText={t('common_exp')}
              changeHandler={vm.expHelper}
            />
            <InputField
              model={vm.record}
              type="text"
              prop="trophy"
              labelText={t('common_trophy')}
              changeHandler={(e) => vm.trophyHanler(e)}
            />
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
            {!vm.record.id ? (
              <></>
            ) : (
              <Box my={4}>
                <Button
                  onClick={vm.deleteHandler}
                  variant="contained"
                  color="secondary"
                >
                  {t('common_delete')}
                </Button>
              </Box>
            )}
          </Box>

          <Link href={`/lostrpg/characters/[lng]/list`} as={vm.beforePage}>
            {t('common_back')}
          </Link>
        </Container>
      )}
    </>
  )
}

export default Page
