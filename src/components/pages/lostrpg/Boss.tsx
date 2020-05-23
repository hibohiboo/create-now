import * as _ from 'lodash'
import React from 'react'
import Head from 'next/head'
import { Box, Checkbox } from '@material-ui/core'
import MaterialTable from 'material-table'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { AuthUser } from '~/store/modules/authModule'
import InputField from '~/components/form/InputField'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { useBossViewModel, Boss } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'
import SocialMeta from '~/components/SocialMeta'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'

const Page: React.FC<{
  boss: Boss
  id: string
  authUser: AuthUser
}> = (ctx) => {
  const { boss, id, authUser } = ctx
  const vm = useBossViewModel(boss)
  const t = vm.i18n.t

  return (
    <Container>
      <Head>
        <title>{vm.boss.name}</title>
      </Head>
      <SocialMeta
        title={vm.boss.name}
        description={vm.boss.summary}
        url={`/lostrpg/public/${vm.i18n.activeLocale}/boss?id=${id}`}
        image={vm.boss.imageUrl}
      />
      <Box my={4}>
        <h1>{vm.boss.name}</h1>

        {authUser && authUser.uid !== vm.boss.uid ? (
          <></>
        ) : (
          <Box my={1}>
            <Link
              href={{
                pathname: `/lostrpg/bosses/[lng]/edit`,
                query: { id },
              }}
              as={`/lostrpg/bosses/${vm.i18n.activeLocale}/edit?id=${id}`}
            >
              {t('common_edit')}
            </Link>
          </Box>
        )}
      </Box>

      <Box style={{ width: '100%' }} display="flex" flexWrap="wrap">
        {vm.boss.imageUrl ? (
          <Box
            border={1}
            style={{
              minWidth: '320px',
            }}
          >
            <img alt={t('common_image')} src={vm.boss.imageUrl} />{' '}
          </Box>
        ) : (
          <></>
        )}
        {vm.boss.summary.trim() ? (
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {vm.boss.summary}
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box my={2}>
        <SpecialtiesTable
          columns={vm.specialtiesTableColumns}
          rows={vm.specialtiesTableRows}
          gapHandler={() => {}}
          specialtyHandler={() => {}}
          damageHandler={vm.damageHandler}
        />
      </Box>
      <Box my={2}>
        <InputLabel>{t('lostrpg_character_common_bodyPartsTable')}</InputLabel>

        <DamageTable
          sevenLabel={t('lostrpg_character_common_attackersChoice')}
          rows={vm.damageBodyParts}
          damageHandler={vm.damageHandler}
        />
      </Box>
      <Box my={4}>
        <MaterialTable
          title={t('lostrpg_character_common_ability')}
          options={tableConfig.viewTable}
          columns={vm.abilitiesColumns}
          data={vm.boss.abilities}
        />
      </Box>

      <Box my={2} display="flex" flexWrap="wrap">
        <Box my={2} display="flex" style={{ maxWidth: 400, minWidth: 200 }}>
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
      </Box>
      <Box my={2}>
        <MaterialTable
          title={t('lostrpg_character_common_statusAilments')}
          options={tableConfig.viewTable}
          columns={[
            {
              title: '',
              // eslint-disable-next-line react/display-name
              render: (rowData) => (
                <Checkbox
                  checked={rowData['isChecked']}
                  onChange={() => vm.statusAilmentsHandler(rowData)}
                />
              ),
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
      </Box>

      {vm.boss.freeWriting ? (
        <Box my={2} style={{ width: '100%' }}>
          <InputLabel>{t('common_detail')}</InputLabel>
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {vm.boss.freeWriting}
          </Box>
        </Box>
      ) : (
        <></>
      )}

      <Link href={`/lostrpg/bosses/[lng]/list`} as={vm.beforePage}>
        {t('common_back')}
      </Link>
    </Container>
  )
}

export default Page
