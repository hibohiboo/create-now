import { NextPage } from 'next'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Router, { useRouter } from 'next/router'
import Link from '~/components/atoms/mui/Link'
import { Button } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { getAuth } from '~/store/firebase'
import InputField from '~/components/form/InputField'
import { Camp } from '~/@types/logtrpg'
import {
  createCamp,
  updateCamp,
  initCamp,
  getDataById,
} from '~/store/firestore/lostrpg/camp'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'

const Page: NextPage = () => {
  const firestore = useFirestore()
  const router = useRouter()
  const authUser = getAuth()
  const [camp, setCamp] = useState<Camp>(initCamp)
  const { id } = router.query
  const clickHandler = id
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
  const beforePage = '/lostrpg/camps/list'
  useEffect(() => {
    if (!authUser) {
      Router.push(beforePage)
    }

    if (id) {
      ;(async () => {
        const data = await getDataById(firestore, id as string)
        console.log('data', data)
        if (data) {
          setCamp(data)
        }
      })()
    }
  }, [])

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <Container>
          <div style={{ maxWidth: '500px', minWidth: '200px' }}>
            <h2>LOSTRPG キャンプ{id ? '編集' : '作成'}</h2>
            <InputField
              model={camp}
              type="text"
              prop="name"
              labelText="キャンプ名"
              changeHandler={(e) => setCamp({ ...camp, name: e.target.value })}
            />
            <Button onClick={clickHandler} variant="contained" color="primary">
              {id ? '更新' : '作成'}
            </Button>
          </div>
          <Link href={beforePage}>戻る</Link>
        </Container>
      )}
    </>
  )
}

export default Page
