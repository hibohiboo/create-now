/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import Head from 'next/head'
import { Box, Checkbox } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MaterialTable from 'material-table'
import { AuthUser } from '~/store/modules/authModule'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import TextAreaField from '~/components/form/TextAreaField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { contentLanguageMap } from '~/lib/i18n'
import { useRecordViewModel } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'

import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'

const Page: React.FC<{
  recordId: string
  characterId: string
  authUser: AuthUser
}> = (ctx) => {
  const vm = useRecordViewModel(ctx.recordId, ctx.characterId)
  const t = vm.i18n.t
  const ReadOnlyTextField = ({
    label,
    prop,
    model,
  }: {
    label: string
    prop: string
    model: any
  }) => (
    <InputField
      model={model}
      type="text"
      prop={prop}
      labelText={label}
      readonly={true}
    />
  )

  return (
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
          model={vm.character}
          prop="playerName"
          label={t('common_playerName')}
        />

        <ReadOnlyTextField
          model={vm.character}
          prop="name"
          label={t('lostrpg_character_common_characterName')}
        />
        <ReadOnlyTextField
          model={vm.record}
          prop="scenarioTitle"
          label={t('lostrpg_record_common_scenarioTitle')}
        />
        <ReadOnlyTextField
          model={vm.record}
          prop="gmName"
          label={t('lostrpg_record_common_gmName')}
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
                  <ReadOnlyTextField
                    model={member}
                    prop="name"
                    label={t('common_name')}
                  />
                  <ReadOnlyTextField
                    model={member}
                    prop="memo"
                    label={t('common_memo')}
                  />
                  <ReadOnlyTextField
                    model={member}
                    prop="trophy"
                    label={t('common_trophy')}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
        <TextAreaField
          model={vm.record}
          prop="memo"
          labelText={t('common_memo')}
          readonly={true}
        />
        <SpecialtiesTable
          columns={vm.specialtiesTableColumns}
          rows={vm.specialtiesTableRows}
          gapHandler={() => {}}
          specialtyHandler={() => {}}
          damageHandler={() => {}}
        />

        <Box my={2}>
          <MaterialTable
            title={t('common_exp')}
            options={tableConfig.viewTable}
            columns={[
              {
                title: '',
                render: (rowData) => {
                  return <Checkbox checked={rowData['isChecked']} />
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
        <ReadOnlyTextField
          model={vm.record}
          prop="exp"
          label={t('common_exp')}
        />
        <ReadOnlyTextField
          model={vm.record}
          prop="trophy"
          label={t('common_trophy')}
        />
      </Box>

      <Link
        href={`/lostrpg/public/[lng]/character?id=${vm.record.characterId}`}
        as={vm.beforePage}
      >
        {t('common_back')}
      </Link>
    </Container>
  )
}

export default Page
