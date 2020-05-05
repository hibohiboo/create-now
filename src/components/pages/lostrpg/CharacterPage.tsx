import React, { useEffect } from 'react'
import Head from 'next/head'
import { Box, Button, Chip, Checkbox } from '@material-ui/core'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { AuthUser } from '~/store/modules/authModule'
import * as data from '~/data/lostrpg'
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
import { getCharacter, canEdit } from '~/firestore/character'

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

      <Box my={4}>
        <MaterialTable
          title={t('lostrpg_character_common_ability')}
          options={{
            search: false,
            sorting: false,
            paging: false,
            draggable: false,
            rowStyle: {
              whiteSpace: 'nowrap',
            },
            headerStyle: {
              whiteSpace: 'nowrap',
            },
          }}
          localization={{
            header: {
              actions: '',
            },
          }}
          columns={vm.abilitiesColumns}
          data={character.abilities}
        />
      </Box>

      <Link href={beforePage}>{t('common_back')}</Link>
    </Container>
  )
}

export default Page
