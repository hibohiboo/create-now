/* eslint-disable react/display-name */
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Router, { useRouter, NextRouter } from 'next/router'
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
import { Camp, initCamp } from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'
import {
  createCamp,
  getCamp,
  updateCamp,
  deleteCamp,
  canEdit,
} from '~/firestore/camp'
import * as lostData from '~/data/lostrpg'
import { deleteMessage } from '~/config/messages'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import { createSetImageFile } from '~/utils/formHelper'
import useI18n from '~/hooks/use-i18n'

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
  const i18n = useI18n()
  const router = useRouter()
  const authUser = useAuth()
  const [camp, setCamp] = useState<Camp>(initCamp)
  const [isSubmit, setIsSubmit] = useState(false)
  const id = getIdFromQuery(router)
  const beforePage = '/lostrpg/camps/list'

  const [state, setState] = React.useState({
    columns: lostData.facilitiesColumns,
    data: [],
  })
  type TableState = typeof state
  const updateRowData = (
    toNextState: (prevData: TableState['data']) => TableState['data'],
  ) =>
    setState((prevState) => ({
      ...prevState,
      data: toNextState([...prevState.data]),
    }))

  const classes = useStyles()
  const [equipment, setEquipment] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)
  const setImageFile = createSetImageFile(setFile, setPrevUrl)

  const handleOnDrop = (files: File[]) => {
    setImageFile(files[0])
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setImageFile(e.target.files[0])
  }

  const editHandler = id
    ? async () => {
        if (!camp.name) {
          setIsSubmit(true)
          window.scrollTo(0, 0)
          return
        }
        await updateCamp(id, { ...camp, uid: authUser.uid }, authUser.uid, file)
        Router.push(
          {
            pathname: `/lostrpg/public/[lng]/[view]`,
            query: { id },
          },
          `/lostrpg/public/${i18n.activeLocale}/camp?id=${id}`,
        )
      }
    : async () => {
        if (!camp.name) {
          window.scrollTo(0, 0)
          setIsSubmit(true)
          return
        }
        const retId = await createCamp(
          { ...camp, uid: authUser.uid },
          authUser,
          file,
        )
        Router.push({ pathname: `/lostrpg/camps/view`, query: { id: retId } })
      }

  const deleteHandler = async () => {
    if (confirm(deleteMessage)) {
      await deleteCamp(id, authUser.uid)
      Router.push(beforePage)
    }
  }

  useEffect(() => {
    if (!authUser || (id && canEdit(authUser, camp))) {
      Router.push(beforePage)
    }

    if (!id) {
      setState({ ...state, data: lostData.defaultFacilities })
      if (authUser) setCamp({ ...camp, playerName: authUser.displayName })
      return
    }
    ;(async () => {
      const data = await getCamp(id)
      if (data) {
        setCamp(data)
        setState({ ...state, data: data.facilities })
        if (data.imageUrl) setPrevUrl(data.imageUrl)
      }
    })()
  }, [])

  useEffect(() => {
    setCamp({ ...camp, facilities: state.data })
  }, [state])

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <Container>
          <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
            <h2>LOSTRPG キャンプ{id ? '編集' : '作成'}</h2>
            <Box my={2}>
              <InputField
                model={camp}
                type="text"
                prop="playerName"
                labelText="プレイヤー名"
                changeHandler={(e) =>
                  setCamp({ ...camp, playerName: e.target.value })
                }
              />
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextField
                  id="campName"
                  required
                  label="キャンプ名"
                  error={!camp.name && isSubmit}
                  helperText={
                    camp.name || !isSubmit
                      ? ''
                      : '必須項目です。入力してください'
                  }
                  value={camp.name}
                  onChange={(e) => setCamp({ ...camp, name: e.target.value })}
                />
              </FormControl>
            </Box>
            <Box my={2}>
              <InputLabel>キャンプ画像</InputLabel>
              <Dropzone onDrop={handleOnDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <Box
                      border={1}
                      style={{
                        maxWidth: '480px',
                        height: '320px',
                        overflow: 'hidden',
                      }}
                    >
                      {prevUrl ? (
                        <img
                          style={{ width: '100%' }}
                          alt="キャンプ画像"
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
              <Button component="label" color="primary">
                画像ファイル選択
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
            <Box my={2}>
              <InputLabel>メモ欄</InputLabel>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  value={camp.freeWriting}
                  onChange={(e) =>
                    setCamp({ ...camp, freeWriting: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <EditableMaterialTable
              title="施設"
              columns={state.columns}
              data={state.data}
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
                <InputLabel id="equipment-select-label">設備追加</InputLabel>
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
                    setEquipment(event.target.value)
                    const item = lostData.equipmentList.find(
                      (i) => i.name === event.target.value,
                    )
                    if (item)
                      setState((prevState) => {
                        const data = [...prevState.data]
                        data.push(createFacility(item))
                        return { ...prevState, data }
                      })
                  }}
                >
                  <MenuItem value="">未選択</MenuItem>
                  {lostData.equipmentList.map((item) => (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="personality-select-label">人材追加</InputLabel>
                <Select
                  labelId="personality-select-label"
                  id="personality-select"
                  value={equipment}
                  onChange={(
                    event: React.ChangeEvent<{
                      name?: string
                      value: string
                    }>,
                  ) => {
                    setEquipment(event.target.value)
                    const item = lostData.campPersonalityList.find(
                      (i) => i.name === event.target.value,
                    )
                    if (item)
                      setState((prevState) => {
                        const data = [...prevState.data]
                        data.push(createFacility(item))
                        return { ...prevState, data }
                      })
                  }}
                >
                  <MenuItem value="">未選択</MenuItem>
                  {lostData.campPersonalityList.map((item) => (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box my={2}>
              <Button onClick={editHandler} variant="contained" color="primary">
                {id ? '更新' : '作成'}
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
                  削除
                </Button>
              </Box>
            )}
          </Box>

          <Link href={beforePage}>戻る</Link>
        </Container>
      )}
    </>
  )
}

export default Page
