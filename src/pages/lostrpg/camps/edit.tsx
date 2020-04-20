import { NextPage } from 'next'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Router, { useRouter } from 'next/router'
import Link from '~/components/atoms/mui/Link'
import { Box, Button } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { getAuth } from '~/store/firebase'
import InputField from '~/components/form/InputField'
import { Camp } from '~/@types/logtrpg'
import {
  createCamp,
  updateCamp,
  initCamp,
  getDataById,
  canEdit,
  deleteCamp,
} from '~/store/firestore/lostrpg/camp'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'

const Page: NextPage = () => {
  const firestore = useFirestore()
  const router = useRouter()
  const authUser = getAuth()
  const [camp, setCamp] = useState<Camp>(initCamp)
  const { id } = router.query
  const beforePage = '/lostrpg/camps/list'
  const editHandler = id
    ? () => {
        updateCamp(
          firestore,
          id as string,
          { ...camp, uid: authUser.uid },
          authUser.uid,
        )
      }
    : () => {
        createCamp(firestore, { ...camp, uid: authUser.uid }, authUser.uid)
      }
  const deleteHandler = async () => {
    if (confirm('削除してもよいですか？')) {
      await deleteCamp(firestore, id as string)
      Router.push(beforePage)
    }
  }

  useEffect(() => {
    if (!authUser || (id && canEdit(authUser, camp))) {
      Router.push(beforePage)
    }

    if (!id) {
      return
    }
    ;(async () => {
      const data = await getDataById(firestore, id as string)
      if (data) {
        setCamp(data)
      }
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
