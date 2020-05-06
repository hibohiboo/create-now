/* eslint-disable react/display-name */
import * as _ from 'lodash'
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Router, { useRouter, NextRouter } from 'next/router'
import Head from 'next/head'
import Dropzone from 'react-dropzone'
import { Box, Button, Chip, Checkbox, Tooltip } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteOutline, Help } from '@material-ui/icons'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import { useAuth } from '~/store/modules/authModule'
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
  useCharacterEditViewModel,
  initBag,
  CharacterClass,
  Ability,
  Item,
  Bag,
  fetchCamps,
  useCamps,
} from '~/store/modules/lostModule'
import {
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
  canEdit,
} from '~/firestore/character'
import * as tableConfig from '~/lib/constants'

const campLimit = 100

const getIdFromQuery = (router: NextRouter) => {
  if (typeof router.query.id === 'string') return router.query.id
  return null
}

const Page: NextPage = () => {
  const authUser = useAuth()
  const i18n = useI18n()
  const t = i18n.t
  const router = useRouter()
  const dispatch = useDispatch()
  const character = useCharacter()
  const camps = useCamps()
  const vm = useCharacterEditViewModel()
  const id = getIdFromQuery(router)
  const beforePage = `/lostrpg/characters/${i18n.activeLocale}/list`

  const updateRowData = (prop: string, toNextState: (d: any[]) => any[]) => {
    const newData = { ...character }
    newData[prop] = toNextState([...character[prop]])
    dispatch(setCharacter(newData))
  }
  const updateRowDataBags = (bag: Bag, toNextState: (d: any[]) => any[]) => {
    dispatch(setCharacterBag({ ...bag, items: toNextState([...bag.items]) }))
  }

  const [isSubmit, setIsSubmit] = useState(false)
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

    Router.push(
      {
        pathname: `/lostrpg/public/[lng]/[view]`,
        query: { id: retId },
      },
      `/lostrpg/public/${i18n.activeLocale}/character?id=${retId}`,
    )
  }

  const deleteHandler = async () => {
    if (confirm(t('message_are_you_sure_remove'))) {
      await deleteCharacter(id, authUser.uid)
      Router.push(beforePage)
    }
  }

  useEffect(() => {
    if (!authUser || (id && !canEdit(authUser, character))) {
      Router.push(beforePage)
    }
    dispatch(setLocale(i18n.activeLocale))
    dispatch(fetchCamps(campLimit))

    if (!id) {
      dispatch(setCharacter({ ...character, playerName: authUser.displayName }))
      return
    }
    ;(async () => {
      const data = await getCharacter(id)
      if (data) {
        // createdAtがserializeではないオブジェクトなのでstringifyを経由することによりserialize化
        dispatch(setCharacter(JSON.parse(JSON.stringify(data))))
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
              <Box my={1}>
                <SelectField
                  id="camp-select"
                  items={_.cloneDeep(camps)}
                  value={character.campId}
                  valueProp={'id'}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_common_camp')}
                  changeHandler={(
                    item: { id: string; name: string } | null,
                  ) => {
                    if (item) {
                      dispatch(
                        setCharacter({
                          ...character,
                          campName: item.name,
                          campId: item.id,
                        }),
                      )
                      return
                    }
                    dispatch(
                      setCharacter({
                        ...character,
                        campName: '',
                        campId: '',
                      }),
                    )
                  }}
                />
              </Box>

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
              <Box my={1}>
                <SelectField
                  id="class-select"
                  items={vm.classList}
                  value={''}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_character_edit_addClass')}
                  changeHandler={(item: CharacterClass | null) => {
                    item &&
                      dispatch(
                        setCharacter({
                          ...character,
                          classes: [...character.classes, item],
                        }),
                      )
                  }}
                />
              </Box>
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
            </Box>

            <Box my={2}>
              <Box display="flex" alignItems="center">
                <InputLabel>
                  {t('lostrpg_character_common_specialty')}
                </InputLabel>
                <Tooltip
                  title={t('lostrpg_character_edit_specialtiesHelp')}
                  placement="right-start"
                >
                  <Help />
                </Tooltip>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  dispatch(
                    setCharacter({ ...character, damagedSpecialties: [] }),
                  )
                }
              >
                {t('lostrpg_character_edit_resetDamage')}
              </Button>

              <SpecialtiesTable
                columns={vm.specialtiesTableColumns}
                rows={vm.specialtiesTableRows}
                gapHandler={(name) => {
                  const gaps = character.gaps.includes(name)
                    ? character.gaps.filter((item) => item !== name)
                    : [...character.gaps, name]
                  dispatch(
                    setCharacter({
                      ...character,
                      gaps,
                    }),
                  )
                }}
                specialtyHandler={(name) => {
                  const specialties = character.specialties.includes(name)
                    ? character.specialties.filter((item) => item !== name)
                    : [...character.specialties, name]
                  dispatch(
                    setCharacter({
                      ...character,
                      specialties,
                    }),
                  )
                }}
                damageHandler={(name) => dispatch(toggleCharacterDamage(name))}
              />
            </Box>
            <Box my={2}>
              <InputLabel>
                {t('lostrpg_character_common_choosedSpacialty')}
              </InputLabel>
              <Box m={2}>
                {character.specialties.map((name) => (
                  <Chip style={{ margin: '0.5rem' }} key={name} label={name} />
                ))}
              </Box>
            </Box>
            <Box my={2}>
              <InputLabel>
                {t('lostrpg_character_common_bodyPartsTable')}
              </InputLabel>

              <DamageTable
                sevenLabel={t('lostrpg_character_common_attackersChoice')}
                rows={vm.damageBodyParts}
                damageHandler={(name) => dispatch(toggleCharacterDamage(name))}
              />
            </Box>

            <Box my={2}>
              <SelectField
                id="ability-select"
                items={vm.abilityList}
                value={''}
                unselectedText={t('common_unselected')}
                labelText={t('lostrpg_character_edit_addAbility')}
                changeHandler={(item: Ability | null) => {
                  item &&
                    dispatch(
                      setCharacter({
                        ...character,
                        abilities: [...character.abilities, item],
                      }),
                    )
                }}
              />
            </Box>

            <EditableMaterialTable
              title={t('lostrpg_character_common_ability')}
              columns={vm.abilitiesColumns}
              data={_.cloneDeep(character.abilities)}
              rowAddHandler={(newData) => {
                updateRowData('abilities', (d) => [...d, newData])
              }}
              rowUpdateHandler={(newData, oldData) => {
                updateRowData('abilities', (d) => {
                  d[d.findIndex((i) => i.name === oldData.name)] = newData
                  return d
                })
              }}
              rowDeleteHandler={(oldData) => {
                updateRowData('abilities', (d) => {
                  d.splice(
                    d.findIndex((i) => i.name === oldData.name),
                    1,
                  )
                  return d
                })
              }}
            />

            <Box my={2} display="flex">
              <InputField
                model={character}
                type="number"
                prop="staminaBase"
                labelText={t('lostrpg_character_common_staminaBase')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      staminaBase: Number(e.target.value),
                    }),
                  )
                }
              />
              <InputField
                model={character}
                type="number"
                prop="stamina"
                labelText={t('lostrpg_character_common_stamina')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      stamina: Number(e.target.value),
                    }),
                  )
                }
              />
            </Box>
            <Box my={2} display="flex">
              <InputField
                model={character}
                type="number"
                prop="willPowerBase"
                labelText={t('lostrpg_character_common_willPowerBase')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      willPowerBase: Number(e.target.value),
                    }),
                  )
                }
              />
              <InputField
                model={character}
                type="number"
                prop="willPower"
                labelText={t('lostrpg_character_common_willPower')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      willPower: Number(e.target.value),
                    }),
                  )
                }
              />
            </Box>

            <Box my={2} display="flex">
              <InputField
                model={character}
                type="number"
                prop="carryingCapacity"
                labelText={t('lostrpg_character_common_carryingCapacity')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      carryingCapacity: Number(e.target.value),
                    }),
                  )
                }
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
            <Box my={2}>
              <Box my={2}>
                <SelectField
                  id="items-select"
                  items={vm.items}
                  value={''}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_character_edit_addItem')}
                  changeHandler={(item: Item | null) => {
                    item &&
                      dispatch(
                        setCharacter({
                          ...character,
                          items: [
                            ...character.items,
                            { ...item, id: _.uniqueId(item.name), number: 1 },
                          ],
                        }),
                      )
                  }}
                />
              </Box>
              <EditableMaterialTable
                title={t('lostrpg_character_common_item')}
                columns={vm.itemsColumns}
                data={_.cloneDeep(character.items)}
                rowAddHandler={(newData) => {
                  updateRowData('items', (d) => [
                    ...d,
                    { ...newData, id: _.uniqueId(newData.name) },
                  ])
                }}
                rowUpdateHandler={(newData, oldData) => {
                  updateRowData('items', (d) => {
                    d[d.findIndex((i) => i.id === oldData.id)] = newData
                    return d
                  })
                }}
                rowDeleteHandler={(oldData) => {
                  updateRowData('items', (d) => {
                    d.splice(
                      d.findIndex((i) => i.id === oldData.id),
                      1,
                    )
                    return d
                  })
                }}
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
              <Box my={2}>
                <Button
                  onClick={(e) =>
                    dispatch(
                      setCharacter({
                        ...character,
                        bags: [
                          ...character.bags,
                          { ...initBag, id: _.uniqueId(initBag.id) },
                        ],
                      }),
                    )
                  }
                  variant="contained"
                  color="primary"
                >
                  {`${t('lostrpg_character_common_bag')}${t('common_add')}`}
                </Button>
              </Box>
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
                    <Box display="flex">
                      <InputField
                        model={bag}
                        type="string"
                        prop="name"
                        labelText={t('common_name')}
                        changeHandler={(e) =>
                          dispatch(
                            setCharacterBag({
                              ...bag,
                              name: e.target.value,
                            }),
                          )
                        }
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          if (!confirm(t('message_are_you_sure_remove'))) return
                          dispatch(
                            setCharacter({
                              ...character,
                              bags: character.bags.filter(
                                (b) => b.id !== bag.id,
                              ),
                            }),
                          )
                        }}
                      >
                        <DeleteOutline />
                      </Button>
                    </Box>

                    <Box my={2} display="flex">
                      <InputField
                        model={bag}
                        type="number"
                        prop="capacity"
                        labelText={t('lostrpg_character_common_bag_capacity')}
                        changeHandler={(e) =>
                          dispatch(
                            setCharacterBag({
                              ...bag,
                              capacity: Number(e.target.value),
                            }),
                          )
                        }
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
                    <SelectField
                      id={`${bag.id}-items-select`}
                      items={vm.items}
                      value={''}
                      unselectedText={t('common_unselected')}
                      labelText={t('lostrpg_character_edit_addItem')}
                      changeHandler={(item: Item | null) => {
                        item &&
                          dispatch(
                            setCharacterBag({
                              ...bag,
                              items: [
                                ...bag.items,
                                {
                                  ...item,
                                  id: _.uniqueId(item.name),
                                  number: 1,
                                },
                              ],
                            }),
                          )
                      }}
                    />

                    <EditableMaterialTable
                      title={t('lostrpg_character_common_item')}
                      columns={vm.itemsColumns}
                      data={_.cloneDeep(bag.items)}
                      rowAddHandler={(newData) => {
                        updateRowDataBags(bag, (d) => [
                          ...d,
                          { ...newData, id: _.uniqueId(newData.name) },
                        ])
                      }}
                      rowUpdateHandler={(newData, oldData) => {
                        updateRowDataBags(bag, (d) => {
                          d[d.findIndex((i) => i.id === oldData.id)] = newData
                          return d
                        })
                      }}
                      rowDeleteHandler={(oldData) => {
                        updateRowDataBags(bag, (d) => {
                          d.splice(
                            d.findIndex((i) => i.id === oldData.id),
                            1,
                          )
                          return d
                        })
                      }}
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
                  {
                    title: t('lostrpg_character_common_area'),
                    field: 'equipedArea',
                  },
                  {
                    title: t('common_name'),
                    field: 'name',
                    render: (rowData) => {
                      const items = vm.items.filter(
                        (i) =>
                          i.area === rowData['equipedArea'] ||
                          ([
                            t('lostrpg_character_common_rightHand'),
                            t('lostrpg_character_common_leftHand'),
                          ].includes(rowData['equipedArea']) &&
                            [
                              t('lostrpg_character_common_oneHand'),
                              t('lostrpg_character_common_twoHand'),
                            ].includes(i.area)),
                      )
                      return (
                        <Box style={{ minWidth: '100px' }}>
                          <SelectField
                            id={`${rowData['equipedArea']}-equip-items-select`}
                            items={items}
                            value={rowData['name']}
                            unselectedText={t('common_unselected')}
                            labelText={`${t(
                              'lostrpg_character_common_equipment',
                            )}${t('common_add')}`}
                            changeHandler={(item: Item | null) => {
                              let data = {
                                ...character,
                                equipments: character.equipments.filter(
                                  (i) =>
                                    i.equipedArea !== rowData['equipedArea'],
                                ),
                              }
                              if (item) {
                                data = {
                                  ...character,
                                  equipments: [
                                    ...data.equipments,
                                    {
                                      ...item,
                                      id: _.uniqueId(item.name),
                                      equipedArea: rowData['equipedArea'],
                                    },
                                  ],
                                }
                              }

                              dispatch(setCharacter(data))
                            }}
                          />
                        </Box>
                      )
                    },
                  },
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
                    render: (rowData) => {
                      return (
                        <Checkbox
                          checked={rowData['isChecked']}
                          onChange={() =>
                            dispatch(
                              setCharacter({
                                ...character,
                                statusAilments: rowData['isChecked']
                                  ? character.statusAilments.filter(
                                      (name) => name !== rowData['name'],
                                    )
                                  : [
                                      ...character.statusAilments,
                                      rowData['name'],
                                    ],
                              }),
                            )
                          }
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
            </Box>

            <Box my={2} display="flex">
              <InputField
                model={character}
                type="number"
                prop="unusedExperience"
                labelText={t('lostrpg_character_common_unusedExperiencePoint')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      unusedExperience: Number(e.target.value),
                    }),
                  )
                }
              />
              <InputField
                model={character}
                type="number"
                prop="totalExperience"
                labelText={t('lostrpg_character_common_totalExperiencePoint')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({
                      ...character,
                      totalExperience: Number(e.target.value),
                    }),
                  )
                }
              />
            </Box>

            <Box my={2}>
              <InputLabel>{t('common_summary')}</InputLabel>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  value={character.summary}
                  onChange={(e) =>
                    dispatch(
                      setCharacter({
                        ...character,
                        summary: e.target.value,
                      }),
                    )
                  }
                />
              </FormControl>
            </Box>
            <Box my={2}>
              <InputLabel>
                {t('lostrpg_character_common_appearance')}
              </InputLabel>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  value={character.appearance}
                  onChange={(e) =>
                    dispatch(
                      setCharacter({
                        ...character,
                        appearance: e.target.value,
                      }),
                    )
                  }
                />
              </FormControl>
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
              <InputField
                model={character}
                type="text"
                prop="quote"
                labelText={t('lostrpg_character_common_quote')}
                changeHandler={(e) =>
                  dispatch(
                    setCharacter({ ...character, quote: e.target.value }),
                  )
                }
              />
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

          <Link href={`/lostrpg/characters/[lng]/list`} as={beforePage}>
            {t('common_back')}
          </Link>
        </Container>
      )}
    </>
  )
}

export default Page
