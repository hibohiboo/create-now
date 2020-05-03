/* eslint-disable react/display-name */
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Router, { useRouter, NextRouter } from 'next/router'
import Head from 'next/head'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import Dropzone from 'react-dropzone'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { Character, initCharacter } from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'
import {
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
  canEdit,
} from '~/firestore/character'
import * as lostData from '~/data/lostrpg'
import { deleteMessage } from '~/config/messages'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import * as validate from '~/utils/validate'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const getIdFromQuery = (router: NextRouter) => {
  if (typeof router.query.id === 'string') return router.query.id
  return null
}

const createFacility = (item) => ({
  name: item.name,
  type: item.type,
  specialty: item.specialty,
  level: 1,
  effect: item.effect,
})

const Page: NextPage = () => {
  const authUser = useAuth()
  const i18n = useI18n()
  const t = i18n.t
  const router = useRouter()
  const [character, setCharacter] = useState<Character>(initCharacter)
  const [isSubmit, setIsSubmit] = useState(false)
  const id = getIdFromQuery(router)
  const beforePage = `/lostrpg/characters/${i18n.activeLocale}/list`

  const [abilities, setAbilities] = React.useState({
    columns: lostData.abilitiesColumns,
    data: [],
  })
  type TableState = typeof abilities
  const updateRowData = (
    toNextState: (prevData: TableState['data']) => TableState['data'],
  ) =>
    setAbilities((prevState) => ({
      ...prevState,
      data: toNextState([...prevState.data]),
    }))

  const classes = useStyles()
  const [equipment, setAbility] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)

  const setImageFile = async (file: File) => {
    if (!(await validate.validImageFile(file))) {
      return
    }
    const reader = new FileReader()
    reader.onloadend = async () => {
      setFile(file)
      setPrevUrl(reader.result.toString())
    }

    reader.readAsDataURL(file)
  }

  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }

  const editHandler = id
    ? async () => {
        if (!character.name) {
          setIsSubmit(true)
          window.scrollTo(0, 0)
          return
        }
        await updateCharacter(
          id,
          { ...character, uid: authUser.uid },
          authUser.uid,
          file,
        )
        Router.push({ pathname: `/lostrpg/characters/view`, query: { id } })
      }
    : async () => {
        if (!character.name) {
          window.scrollTo(0, 0)
          setIsSubmit(true)
          return
        }
        const retId = await createCharacter(
          { ...character, uid: authUser.uid },
          authUser,
          file,
        )
        Router.push({
          pathname: `/lostrpg/characters/view`,
          query: { id: retId },
        })
      }

  const deleteHandler = async () => {
    if (confirm(deleteMessage)) {
      await deleteCharacter(id, authUser.uid)
      Router.push(beforePage)
    }
  }

  useEffect(() => {
    if (!authUser || (id && canEdit(authUser, character))) {
      Router.push(beforePage)
    }

    if (!id) {
      setAbilities({ ...abilities })
      if (authUser)
        setCharacter({ ...character, playerName: authUser.displayName })
      return
    }
    ;(async () => {
      const data = await getCharacter(id)
      if (data) {
        setCharacter(data)
        setAbilities({ ...abilities, data: data.abilities })
        if (data.imageUrl) setPrevUrl(data.imageUrl)
      }
    })()
  }, [])

  useEffect(() => {
    setCharacter({ ...character, abilities: abilities.data })
  }, [abilities])

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
            <title>{i18n.t('lostrpg_index_title')}</title>
          </Head>
          <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
            <h2>
              {t('lostrpg_character_edit_title')}
              {id ? t('common_edit') : t('common_create')}
            </h2>
            <Box my={2}>
              <InputField
                model={character}
                type="text"
                prop="playerName"
                labelText={t('common_playerName')}
                changeHandler={(e) =>
                  setCharacter({ ...character, playerName: e.target.value })
                }
              />
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextField
                  id="characterName"
                  required
                  label={t('lostrpg_character_common_characterName')}
                  error={!character.name && isSubmit}
                  helperText={
                    character.name || !isSubmit ? '' : t('message_required')
                  }
                  value={character.name}
                  onChange={(e) =>
                    setCharacter({ ...character, name: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box my={2}>
              <InputLabel>{t('common_image')}</InputLabel>
              <Dropzone onDrop={handleOnDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <Box
                      border={1}
                      style={{
                        maxWidth: '480px',
                        minHeight: '100px',
                        overflow: 'hidden',
                      }}
                    >
                      {prevUrl ? (
                        <img
                          style={{ width: '100%' }}
                          alt={t('common_image')}
                          src={prevUrl}
                        />
                      ) : (
                        <></>
                      )}
                    </Box>
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
            </Box>
            <Box my={2}>
              <InputLabel>{t('lostrpg_character_common_memo')}</InputLabel>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  value={character.freeWriting}
                  onChange={(e) =>
                    setCharacter({ ...character, freeWriting: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <EditableMaterialTable
              title={t('lostrpg_character_common_ability')}
              columns={abilities.columns}
              data={abilities.data}
              rowAddHandler={(newData) => {
                updateRowData((d) => [...d, newData])
              }}
              rowUpdateHandler={(newData, oldData) => {
                updateRowData((d) => {
                  d[d.indexOf(oldData)] = newData
                  return d
                })
              }}
              rowDeleteHandler={(oldData) => {
                updateRowData((d) => {
                  d.splice(d.indexOf(oldData), 1)
                  return d
                })
              }}
            />
            <Box my={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="equipment-select-label">
                  {t('lostrpg_character_edit_addAbility')}
                </InputLabel>
                <Select
                  labelId="equipment-select-label"
                  id="equipment-select"
                  value={equipment}
                  onChange={(
                    event: React.ChangeEvent<{
                      name?: string
                      value: string
                    }>,
                  ) => {
                    setAbility(event.target.value)
                    const item = lostData.abilityList.find(
                      (i) => i.name === event.target.value,
                    )
                    if (item)
                      setAbilities((prevState) => {
                        const data = [...prevState.data]
                        data.push(createFacility(item))
                        return { ...prevState, data }
                      })
                  }}
                >
                  <MenuItem value="">{t('common_unselected')}</MenuItem>
                  {lostData.abilityList[0].list.map((item) => (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box my={2}>
              <Button onClick={editHandler} variant="contained" color="primary">
                {id ? t('common_update') : t('common_create')}
              </Button>
            </Box>
            {!id ? (
              <></>
            ) : (
              <Box my={4}>
                <Button
                  onClick={deleteHandler}
                  variant="contained"
                  color="secondary"
                >
                  {t('common_delete')}
                </Button>
              </Box>
            )}
          </Box>

          <Link href={beforePage}>{t('common_back')}</Link>
        </Container>
      )}
    </>
  )
}

export default Page
