/* eslint-disable react/display-name */
import * as _ from 'lodash'
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteOutline } from '@material-ui/icons'

import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import {
  setCharacter,
  useCharacter,
  useCharacterEditViewModel,
  CharacterClass,
  Ability,
} from '~/store/modules/lostModule'
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
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import { createSetImageFile } from '~/utils/formHelper'

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
  const dispatch = useDispatch()
  const character = useCharacter()
  const vm = useCharacterEditViewModel()
  const [isSubmit, setIsSubmit] = useState(false)
  const id = getIdFromQuery(router)
  const beforePage = `/lostrpg/characters/${i18n.activeLocale}/list`

  const updateRowData = (toNextState: (d: Ability[]) => Ability[]) =>
    dispatch(
      setCharacter({
        ...character,
        abilities: toNextState([...character.abilities]),
      }),
    )

  const [prevUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }

  const editHandler = async () => {
    if (!character.name) {
      setIsSubmit(true)
      window.scrollTo(0, 0)
      return
    }

    let retId = id
    if (!retId) {
      retId = await createCharacter(
        { ...character, uid: authUser.uid },
        authUser,
        file,
      )
    } else {
      await updateCharacter(
        id,
        { ...character, uid: authUser.uid },
        authUser.uid,
        file,
      )
    }

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
      dispatch(setCharacter({ ...character, playerName: authUser.displayName }))
      return
    }
    ;(async () => {
      const data = await getCharacter(id)
      if (data) {
        dispatch(setCharacter(data))
        if (data.imageUrl) setPrevUrl(data.imageUrl)
      }
    })()
  }, [])

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
                  dispatch(
                    setCharacter({ ...character, playerName: e.target.value }),
                  )
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
                    dispatch(
                      setCharacter({ ...character, name: e.target.value }),
                    )
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
              <InputLabel>{t('lostrpg_character_common_class')}</InputLabel>
              <List aria-label="classes">
                {character.classes.map((item) => (
                  <ListItem button key={item.name}>
                    <ListItemIcon
                      onClick={() => {
                        dispatch(
                          setCharacter({
                            ...character,
                            classes: character.classes.filter(
                              (i) => i.name !== item.name,
                            ),
                          }),
                        )
                      }}
                    >
                      <DeleteOutline />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
              <SelectField
                id="class-select"
                items={vm.classList}
                value={''}
                unselectedText={t('common_unselected')}
                labelText={t('lostrpg_character_edit_addClass')}
                changeHandler={(item: CharacterClass) => {
                  dispatch(
                    setCharacter({
                      ...character,
                      classes: [...character.classes, item],
                    }),
                  )
                }}
              />
            </Box>

            <EditableMaterialTable
              title={t('lostrpg_character_common_ability')}
              columns={lostData.abilitiesColumns}
              data={_.cloneDeep(character.abilities)}
              rowAddHandler={(newData) => {
                updateRowData((d) => [...d, newData])
              }}
              rowUpdateHandler={(newData, oldData) => {
                updateRowData((d) => {
                  d[d.findIndex((i) => i.name === oldData.name)] = newData
                  return d
                })
              }}
              rowDeleteHandler={(oldData) => {
                updateRowData((d) => {
                  d.splice(
                    d.findIndex((i) => i.name === oldData.name),
                    1,
                  )
                  return d
                })
              }}
            />
            <Box my={2}>
              <SelectField
                id="ability-select"
                items={vm.abilityList}
                value={''}
                unselectedText={t('common_unselected')}
                labelText={t('lostrpg_character_edit_addAbility')}
                changeHandler={(item: Ability) => {
                  dispatch(
                    setCharacter({
                      ...character,
                      abilities: [...character.abilities, item],
                    }),
                  )
                }}
              />
            </Box>
            <Box my={2}>
              <InputLabel>{t('lostrpg_character_common_memo')}</InputLabel>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  value={character.freeWriting}
                  onChange={(e) =>
                    dispatch(
                      setCharacter({
                        ...character,
                        freeWriting: e.target.value,
                      }),
                    )
                  }
                />
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
