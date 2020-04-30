/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import { AddBox, Edit, DeleteOutline, Check, Clear } from '@material-ui/icons'
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Router, { useRouter, NextRouter } from 'next/router'
import { Box, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
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
import * as data from '~/data/lostrpg'

const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => (
    <AddBox {...props} ref={ref} />
  )),
  Delete: forwardRef<SVGSVGElement>((props, ref) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  Edit: forwardRef<SVGSVGElement>((props, ref) => (
    <Edit {...props} ref={ref} />
  )),
  Check: forwardRef<SVGSVGElement>((props, ref) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef<SVGSVGElement>((props, ref) => (
    <Clear {...props} ref={ref} />
  )),
}
const getIdFromQuery = (router: NextRouter) => {
  if (typeof router.query.id === 'string') return router.query.id
  return null
}

const Page: NextPage = () => {
  const router = useRouter()
  const authUser = useAuth()
  const [camp, setCamp] = useState<Camp>(initCamp)
  const id = getIdFromQuery(router)
  const beforePage = '/lostrpg/camps/list'
  const editHandler = id
    ? async () => {
        await updateCamp(id, { ...camp, uid: authUser.uid }, authUser.uid)
        Router.push({ pathname: `/lostrpg/camps/view`, query: { id } })
      }
    : async () => {
        const retId = await createCamp({ ...camp, uid: authUser.uid }, authUser)
        Router.push({ pathname: `/lostrpg/camps/view`, query: { id: retId } })
      }
  const deleteHandler = async () => {
    if (confirm('削除してもよいですか？')) {
      await deleteCamp(id)
      Router.push(beforePage)
    }
  }

  const [state, setState] = React.useState({
    columns: [
      { title: '名前', field: 'name' },
      { title: 'タイプ', field: 'type' },
      { title: '特技', field: 'specialty' },
      {
        title: 'レベル',
        field: 'level',
        type: 'numeric' as 'numeric',
      },
      { title: '効果', field: 'effect' },
    ],
    data: data.facilities,
  })

  useEffect(() => {
    if (!authUser || (id && canEdit(authUser, camp))) {
      Router.push(beforePage)
    }

    if (!id) {
      if (authUser) setCamp({ ...camp, playerName: authUser.displayName })
      return
    }
    ;(async () => {
      const data = await getCamp(id)
      if (data) {
        setCamp(data)
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
              <InputField
                model={camp}
                type="text"
                prop="name"
                labelText="キャンプ名"
                changeHandler={(e) =>
                  setCamp({ ...camp, name: e.target.value })
                }
              />
            </Box>

            <MaterialTable
              title="施設"
              icons={tableIcons}
              options={{
                search: false,
                sorting: false,
                paging: false,
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
              columns={state.columns}
              data={state.data}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve()
                      setState((prevState) => {
                        const data = [...prevState.data]
                        data.push(newData)
                        return { ...prevState, data }
                      })
                    }, 600)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve()
                      if (oldData) {
                        setState((prevState) => {
                          const data = [...prevState.data]
                          data[data.indexOf(oldData)] = newData
                          return { ...prevState, data }
                        })
                      }
                    }, 600)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve()
                      setState((prevState) => {
                        const data = [...prevState.data]
                        data.splice(data.indexOf(oldData), 1)
                        return { ...prevState, data }
                      })
                    }, 600)
                  }),
              }}
            />
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
