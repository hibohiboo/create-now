import { NextPage } from 'next'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Router, { useRouter } from 'next/router'
import Link from '~/components/atoms/mui/Link'
import { Container, Button } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import Footer from '~/components/organisms/common/Footer'
import { getAuth } from '~/store/firebase'
import InputField from '~/components/form/InputField'
import { Camp } from '~/@types/logtrpg'
import { initCamp, fetchCamp } from '~/store/firestore/lostrpg/camp'

const Page: NextPage<{ camp: Camp }> = function (ctx) {
  const { camp } = ctx
  console.log('ctx', ctx)
  const router = useRouter()
  const { id } = router.query
  const beforePage = '/lostrpg/camps/list'

  return (
    <>
      <Container>
        <div style={{ maxWidth: '500px', minWidth: '200px' }}>
          <h2>{camp.name}</h2>
        </div>
        <Link href={beforePage}>戻る</Link>
        <Footer />
      </Container>
    </>
  )
}

Page.getInitialProps = async ({ query }) => {
  const camp = await fetchCamp(query.id as string)
  return { camp: camp }
}

export default Page
