import { NextPage } from 'next'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Router, { useRouter } from 'next/router'
import Link from '~/components/atoms/mui/Link'
import { Box, Button } from '@material-ui/core'
import InputField from '~/components/form/InputField'
import { Camp, initCamp } from '~/store/modules/lostModule'
import { createCamp, canEdit } from '~/firestore/camp'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { useAuth } from '~/store/modules/authModule'

const Page: NextPage = () => {
  const router = useRouter()
  const authUser = useAuth()
  const [camp, setCamp] = useState<Camp>(initCamp)
  const { id } = router.query
  const beforePage = '/lostrpg/camps/list'
  const editHandler = id
    ? async () => {
        // await updateCamp(
        //   firestore,
        //   id as string,
        //   { ...camp, uid: authUser.uid },
        //   authUser.uid,
        // )
        // Router.push({ pathname: `/lostrpg/camps/view`, query: { id } })
      }
    : async () => {
        const id = await createCamp({ ...camp, uid: authUser.uid }, authUser)
        Router.push({ pathname: `/lostrpg/camps/view`, query: { id } })
      }
  // const deleteHandler = async () => {
  //   if (confirm('削除してもよいですか？')) {
  //     await deleteCamp(firestore, id as string)
  //     Router.push(beforePage)
  //   }
  // }

  useEffect(() => {
    if (!authUser || (id && canEdit(authUser, camp))) {
      Router.push(beforePage)
    }

    if (!id) {
      if (authUser) setCamp({ ...camp, playerName: authUser.displayName })
      return
    }
    ;(async () => {
      // const data = await getDataById(id as string)
      // if (data) {
      //   setCamp(data)
      // }
    })()
  }, [])

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <Container>
          <Box my={4} style={{ maxWidth: '500px', minWidth: '200px' }}>
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
                  // onClick={deleteHandler}
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
