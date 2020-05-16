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
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import { createSetImageFile } from '~/utils/formHelper'
import {
  setCharacter,
  toggleCharacterDamage,
  setCharacterBag,
  setLocale,
  useCharacter,
  useRecordViewModel,
  initBag,
  CharacterClass,
  Ability,
  Item,
  Bag,
  fetchCamps,
  useCamps,
  initCharacter,
} from '~/store/modules/lostModule'
import {
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
  canEdit,
} from '~/firestore/character'
import * as tableConfig from '~/lib/constants'
import { getIdFromQuery } from '~/utils/urlHelper'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'

const campLimit = 100

const Page: NextPage = () => {
  const authUser = useAuth()
  const i18n = useI18n()
  const t = i18n.t
  const router = useRouter()
  const dispatch = useDispatch()
  const vm = useRecordViewModel()
  const id = getIdFromQuery(router)
  console.log('i18n', i18n.activeLocale)
  const beforePage = `/lostrpg/public/${i18n.activeLocale}/character?id=${id}`

  // const updateRowData = (prop: string, toNextState: (d: any[]) => any[]) => {
  //   const newData = { ...character }
  //   newData[prop] = toNextState([...character[prop]])
  //   dispatch(setCharacter(newData))
  // }
  // const updateRowDataBags = (bag: Bag, toNextState: (d: any[]) => any[]) => {
  //   dispatch(setCharacterBag({ ...bag, items: toNextState([...bag.items]) }))
  // }

  // Validation State
  const [isSubmit, setIsSubmit] = useState(false)

  // Image State
  const [prevUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }

  // const editHandler = async () => {
  //   if (!character.name) {
  //     setIsSubmit(true)
  //     window.scrollTo(0, 0)
  //     return
  //   }

  //   let retId = id
  //   if (!retId) {
  //     retId = await createCharacter(
  //       { ...character, uid: authUser.uid },
  //       authUser,
  //       file,
  //     )
  //   } else {
  //     await updateCharacter(
  //       id,
  //       { ...character, uid: authUser.uid },
  //       authUser.uid,
  //       file,
  //     )
  //   }

  //   Router.push(
  //     {
  //       pathname: `/lostrpg/public/[lng]/[view]`,
  //       query: { id: retId },
  //     },
  //     `/lostrpg/public/${i18n.activeLocale}/character?id=${retId}`,
  //   )
  // }

  // const deleteHandler = async () => {
  //   if (confirm(t('message_are_you_sure_remove'))) {
  //     await deleteCharacter(id, authUser.uid)
  //     Router.push(beforePage)
  //   }
  // }

  // // ToolTip State
  // const [open, setOpen] = React.useState(false)
  // const handleTooltipClose = () => {
  //   setOpen(false)
  // }
  // const handleTooltipOpen = () => {
  //   setOpen(true)
  // }

  useEffect(() => {
    dispatch(createAuthClientSide())
    dispatch(setLocale(i18n.activeLocale))
  }, [])

  useEffect(() => {
    if (!id || !authUser) {
      return
    }
    ;(async () => {
      const data = await getCharacter(id)
      if (data) {
        dispatch(setCharacter(data))
        if (data.imageUrl) setPrevUrl(data.imageUrl)
      }
    })()
  }, [id, authUser])

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
      {!authUser ? (
        <></>
      ) : (
        <Container>
          <Head>
            <meta
              httpEquiv="content-language"
              content={contentLanguageMap[i18n.activeLocale]}
            />
            <title>{t('lostrpg_records_common_title')}</title>
          </Head>
          <div style={{ display: 'none' }}>
            <LanguageSelector i18n={i18n} />
          </div>
          <h1>{t('lostrpg_records_common_title')}</h1>
          <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
            <Box my={2}>
              <ReadOnlyTextField
                prop="playerName"
                label={t('common_playerName')}
              />
            </Box>
            <Box my={2}>
              <ReadOnlyTextField
                prop="name"
                label={t('lostrpg_character_common_characterName')}
              />
            </Box>
          </Box>

          <Link href={`/lostrpg/characters/[lng]/list`} as={beforePage}>
            {t('common_back')}
          </Link>
        </Container>
      )}
    </>
  )
}

export default Page
