import React, { useEffect } from 'react'
import Head from 'next/head'
import { Box, Button, Chip, Checkbox } from '@material-ui/core'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { AuthUser } from '~/store/modules/authModule'
import useI18n from '~/hooks/use-i18n'
import { useDispatch } from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteOutline } from '@material-ui/icons'
import InputField from '~/components/form/InputField'
import SelectField from '~/components/form/SelectField'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import { useAuth } from '~/store/modules/authModule'
import { deleteMessage } from '~/config/messages'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import { contentLanguageMap } from '~/lib/i18n'
import { createSetImageFile } from '~/utils/formHelper'
import {
  setCharacter,
  useCharacterEditViewModel,
  setLocale,
  Character,
} from '~/store/modules/lostModule'
import { canEdit } from '~/firestore/character'
import * as tableConfig from '~/config/table'

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
  }, [])

  return (
    <Container>
      <Head>
        <title>{character.name}</title>
      </Head>
      <Box my={4}>
        <div style={{ maxWidth: '500px', minWidth: '200px' }}>
          <h2>{character.name}</h2>
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
        </div>
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
            <img alt={t('common_image')} src={character.imageUrl} />{' '}
          </Box>
        ) : (
          <></>
        )}

        <Box
          border={1}
          p={1}
          style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
        >
          {character.freeWriting}
        </Box>
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

        <Box my={2} display="flex" style={{ maxWidth: 200, minWidth: 100 }}>
          <InputField
            model={character}
            type="number"
            prop="carryingCapacity"
            labelText={t('lostrpg_character_common_carryingCapacity')}
            readonly={true}
          />
          <InputField
            model={{
              weight: character.items.reduce(
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
      <Link href={beforePage}>{t('common_back')}</Link>
    </Container>
  )
}

export default Page
