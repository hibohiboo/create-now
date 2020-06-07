/* eslint-disable @typescript-eslint/no-empty-function */
import * as _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { Box, Chip, Checkbox, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { AuthUser } from '~/store/modules/authModule'
import useI18n from '~/hooks/use-i18n'
import InputField from '~/components/form/InputField'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import {
  setCharacter,
  useCharacterEditViewModel,
  setLocale,
  Character,
  fetchCharactersRecords,
} from '~/store/modules/lostModule'
import { canEdit } from '~/firestore/character'
import * as tableConfig from '~/lib/constants'
import SocialMeta from '~/components/SocialMeta'

const Page: React.FC<{
  character: Character
  id: string
  authUser: AuthUser
}> = (ctx) => {
  const i18n = useI18n()
  const t = i18n.t
  const dispatch = useDispatch()
  const vm = useCharacterEditViewModel()
  const { character, id, authUser } = ctx
  const beforePage = `/lostrpg/characters/${i18n.activeLocale}/list`
  useEffect(() => {
    dispatch(setLocale(i18n.activeLocale))
    dispatch(setCharacter(character))
    dispatch(fetchCharactersRecords(id))
  }, [])

  return (
    <Container>
      <Head>
        <title>{character.name}</title>
      </Head>
      <SocialMeta
        title={character.name}
        description={character.summary}
        url={`/lostrpg/public/ja/character?id=${id}`}
        image={character.imageUrl}
      />
      <Box my={4}>
        <h1>{character.name}</h1>
        {character.campId ? (
          <h5>
            {t('lostrpg_common_camp')}:
            <Link
              href={{
                pathname: `/lostrpg/public/[lng]/[view]`,
                query: { id: character.campId },
              }}
              as={`/lostrpg/public/${i18n.activeLocale}/camp?id=${character.campId}`}
            >
              {character.campName}
            </Link>
          </h5>
        ) : (
          <></>
        )}
        {!canEdit(authUser, character) ? (
          <></>
        ) : (
          <Box my={1}>
            <Link
              href={{
                pathname: `/lostrpg/characters/[lng]/edit`,
                query: { id },
              }}
              as={`/lostrpg/characters/${i18n.activeLocale}/edit?id=${id}`}
            >
              {t('common_edit')}
            </Link>
          </Box>
        )}
      </Box>
      <Box my={4}>
        {character.quote ? (
          <q style={{ fontSize: '1.5rem' }}>{character.quote}</q>
        ) : (
          <></>
        )}
      </Box>
      <Box my={2}>
        <InputLabel>{t('lostrpg_character_common_class')}</InputLabel>
        <Box m={2}>
          {character.classes.map((c) => (
            <Chip style={{ margin: '0.5rem' }} key={c.name} label={c.name} />
          ))}
        </Box>
      </Box>
      <Box style={{ width: '100%' }} display="flex" flexWrap="wrap">
        {character.imageUrl ? (
          <Box
            border={1}
            style={{
              minWidth: '320px',
            }}
          >
            <img
              alt={t('common_image')}
              src={character.imageUrl}
              id={vm.imgId}
            />
          </Box>
        ) : (
          <></>
        )}
        {character.summary.trim() ? (
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {character.summary}
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
          damageHandler={() => {}}
        />
      </Box>
      <Box my={2}>
        <InputLabel>
          {t('lostrpg_character_common_choosedSpacialty')}
        </InputLabel>
        <Box m={2}>
          {character.specialties.map((name) => (
            <Chip style={{ marginLeft: '0.5rem' }} key={name} label={name} />
          ))}
        </Box>
      </Box>
      <Box my={4}>
        <MaterialTable
          title={t('lostrpg_character_common_ability')}
          options={tableConfig.viewTable}
          columns={vm.abilitiesColumns}
          data={character.abilities}
        />
      </Box>

      <Box my={2} display="flex" flexWrap="wrap">
        <Box my={2} display="flex" style={{ maxWidth: 400, minWidth: 200 }}>
          <InputField
            model={character}
            type="number"
            prop="staminaBase"
            labelText={t('lostrpg_character_common_staminaBase')}
            readonly={true}
          />
          <InputField
            model={character}
            type="number"
            prop="stamina"
            labelText={t('lostrpg_character_common_stamina')}
            readonly={true}
          />

          <InputField
            model={character}
            type="number"
            prop="willPowerBase"
            labelText={t('lostrpg_character_common_willPowerBase')}
            readonly={true}
          />
          <InputField
            model={character}
            type="number"
            prop="willPower"
            labelText={t('lostrpg_character_common_willPower')}
            readonly={true}
          />
        </Box>

        <Box my={2} display="flex" style={{ maxWidth: 300, minWidth: 150 }}>
          <InputField
            model={character}
            type="number"
            prop="carryingCapacity"
            labelText={t('lostrpg_character_common_carryingCapacity')}
            readonly={true}
          />
          <InputField
            model={vm}
            type="number"
            prop="totalWeight"
            labelText={t('lostrpg_character_common_item_weight')}
            readonly={true}
          />
          <InputField
            model={vm}
            type="number"
            prop="totalValue"
            labelText={t('lostrpg_character_common_totalValue')}
            readonly={true}
          />
        </Box>
      </Box>
      <Box my={4}>
        <MaterialTable
          title={t('lostrpg_character_common_item')}
          options={tableConfig.viewTable}
          columns={vm.itemsColumns}
          data={character.items}
        />
      </Box>
      <Box
        my={2}
        style={{
          padding: '5px',
          border: 'solid 1px rgba(224, 224, 224, 1)',
        }}
      >
        <InputLabel>{t('lostrpg_character_common_bag')}</InputLabel>
        {character.bags.map((bag) => {
          return (
            <Box
              key={bag.id}
              my={2}
              style={{
                padding: '5px',
                border: 'solid 1px rgba(224, 224, 224, 1)',
              }}
            >
              <InputLabel>{bag.name}</InputLabel>
              <Box my={2} display="flex">
                <InputField
                  model={bag}
                  type="number"
                  prop="capacity"
                  labelText={t('lostrpg_character_common_bag_capacity')}
                  readonly={true}
                />
                <InputField
                  model={{
                    weight: bag.items.reduce(
                      (sum, { weight, number }) => sum + weight * number,
                      0,
                    ),
                  }}
                  type="number"
                  prop="weight"
                  labelText={t('lostrpg_character_common_item_weight')}
                  readonly={true}
                />
              </Box>
              <MaterialTable
                title={t('lostrpg_character_common_item')}
                options={tableConfig.viewTable}
                columns={vm.itemsColumns}
                data={bag.items}
              />
            </Box>
          )
        })}
      </Box>
      <Box my={2}>
        <MaterialTable
          title={t('lostrpg_character_common_equipment')}
          options={tableConfig.viewTable}
          columns={[
            { title: t('lostrpg_character_common_area'), field: 'equipedArea' },
            { title: t('common_name'), field: 'name' },
            ...vm.equipmentColumns,
          ]}
          data={vm.equipments}
        />
      </Box>
      <Box my={2}>
        <MaterialTable
          title={t('lostrpg_character_common_statusAilments')}
          options={tableConfig.viewTable}
          columns={[
            {
              title: '',
              // eslint-disable-next-line react/display-name
              render: (rowData) => <Checkbox checked={rowData['isChecked']} />,
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
      {character.backbones.length === 0 ? (
        <></>
      ) : (
        <Box my={4}>
          <MaterialTable
            title={t('lostrpg_character_common_backbone')}
            options={tableConfig.viewTable}
            columns={vm.backboneColumns}
            data={character.backbones}
          />
        </Box>
      )}

      <Box my={2} display="flex" style={{ maxWidth: 300, minWidth: 150 }}>
        <InputField
          model={character}
          type="number"
          prop="unusedExperience"
          labelText={t('lostrpg_character_common_unusedExperiencePoint')}
          readonly={true}
        />
        <InputField
          model={character}
          type="number"
          prop="totalExperience"
          labelText={t('lostrpg_character_common_totalExperiencePoint')}
          readonly={true}
        />
      </Box>

      {character.appearance ? (
        <Box my={2} style={{ width: '100%' }}>
          <InputLabel>{t('lostrpg_character_common_appearance')}</InputLabel>
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {character.appearance}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {character.freeWriting ? (
        <Box my={2} style={{ width: '100%' }}>
          <InputLabel>{t('common_detail')}</InputLabel>
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {character.freeWriting}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {!character.useStrangeField ? (
        <></>
      ) : (
        <Box my={2}>
          <InputLabel>
            {t('lostrpg_character_common_use_supplement')}
          </InputLabel>
          <Chip
            style={{ margin: '0.5rem' }}
            label={t('lostrpg_character_common_strange_field')}
          />
        </Box>
      )}
      <Box my={2}>
        <Button variant="contained" color="primary" onClick={vm.exportXml}>
          {t('lostrpg_common_export_udonarium')}
        </Button>
        <Button
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={vm.exportJson}
        >
          {t('export_for_trpg_studio')}
        </Button>
      </Box>
      <Box my={2}>
        {t('lostrpg_records_common_recordsheet')}

        {!canEdit(authUser, character) ? (
          <></>
        ) : (
          <Box my={1}>
            <Link
              href={{
                pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                query: {
                  lng: i18n.activeLocale,
                  characterId: character.campId,
                },
              }}
              as={`/lostrpg/records/${i18n.activeLocale}/${id}/edit`}
            >
              {t('common_create')}
            </Link>
            {vm.records.length === 0 ? (
              <></>
            ) : (
              <MaterialTable
                title={t('lostrpg_records_common_recordsheet')}
                options={tableConfig.viewTable}
                columns={[
                  {
                    title: t('lostrpg_record_common_scenarioTitle'),
                    // eslint-disable-next-line react/display-name
                    render: (rowData) => (
                      <Link
                        href={{
                          pathname: `/lostrpg/public/[lng]/[view]`,
                          query: {
                            lng: i18n.activeLocale,
                            id: rowData['recordId'],
                          },
                        }}
                        as={`/lostrpg/public/${i18n.activeLocale}/record?id=${rowData['recordId']}`}
                      >
                        {rowData['scenarioTitle']}
                      </Link>
                    ),
                  },
                  ...vm.recordsColumns,
                  {
                    title: '',
                    // eslint-disable-next-line react/display-name
                    render: (rowData) => {
                      if (!authUser) return <></>
                      if (authUser.uid !== rowData['uid']) return <></>
                      return (
                        <Link
                          href={{
                            pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                            query: {
                              lng: i18n.activeLocale,
                              characterId: rowData['characterId'],
                              id: rowData['recordId'],
                            },
                          }}
                          as={`/lostrpg/records/${i18n.activeLocale}/${id}/edit?id=${rowData['recordId']}`}
                        >
                          {t('common_edit')}
                        </Link>
                      )
                    },
                  },
                ]}
                data={_.cloneDeep(vm.records)}
              />
            )}
          </Box>
        )}
      </Box>

      <Link href={`/lostrpg/characters/[lng]/list`} as={beforePage}>
        {t('common_back')}
      </Link>
    </Container>
  )
}

export default Page
