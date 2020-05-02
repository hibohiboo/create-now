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
  const router = useRouter()
  const authUser = useAuth()
  const [camp, setCamp] = useState<Camp>(initCamp)
  const [isSubmit, setIsSubmit] = useState(false)
  const id = getIdFromQuery(router)
  const beforePage = '/lostrpg/camps/list'
  const editHandler = id
    ? async () => {
        if (!camp.name) {
          setIsSubmit(true)
          window.scrollTo(0, 0)
          return
        }
        await updateCamp(id, { ...camp, uid: authUser.uid }, authUser.uid)
        Router.push({ pathname: `/lostrpg/camps/view`, query: { id } })
      }
    : async () => {
        if (!camp.name) {
          window.scrollTo(0, 0)
          setIsSubmit(true)
          return
        }
        const retId = await createCamp({ ...camp, uid: authUser.uid }, authUser)
        Router.push({ pathname: `/lostrpg/camps/view`, query: { id: retId } })
      }
  const deleteHandler = async () => {
    if (confirm(deleteMessage)) {
      await deleteCamp(id)
      Router.push(beforePage)
    }
  }

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
  const [equipment, setEquipment] = React.useState('')

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
