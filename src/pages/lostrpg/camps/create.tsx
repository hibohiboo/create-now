import { NextPage } from 'next'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Router from 'next/router'
import Link from '~/components/atoms/mui/Link'
import { Container, Button } from '@material-ui/core'
import Footer from '~/components/organisms/common/Footer'
import { getAuth } from '~/store/firebase'
import InputField from '~/components/form/InputField'
import { Camp } from '~/@types/logtrpg'
import { createCamp, initCamp } from '~/store/firestore/lostrpg/camp'

const Page: NextPage = () => {
  const authUser = getAuth()
  useEffect(() => {
    if (!authUser) {
      Router.push('/lostrpg/camps/list')
    }
  }, [])
  const [camp, setCamp] = useState<Camp>(initCamp)

  const addCamp = () => {
    createCamp({ ...camp, uid: authUser.uid }, authUser.uid)
  }
  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <Container>
          <div style={{ maxWidth: '500px', minWidth: '200px' }}>
            <h2>LOSTRPG キャンプ作成</h2>
            <InputField
              model={camp}
              type="text"
              prop="name"
              labelText="キャンプ名"
              changeHandler={(e) => setCamp({ ...camp, name: e.target.value })}
            />
            <Button onClick={addCamp} variant="contained" color="primary">
              作成
            </Button>
          </div>
          <Link href="/lostrpg">戻る</Link>
          <Footer />
        </Container>
      )}
    </>
  )
}

export default Page
