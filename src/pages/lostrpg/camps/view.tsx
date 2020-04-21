import { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core'
import Link from '~/components/atoms/mui/Link'
import { getAuth } from '~/store/firebase'
import { Camp } from '~/@types/logtrpg'
import { canEdit, fetchCamp } from '~/store/firestore/lostrpg/camp'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'

const Page: NextPage<{ camp: Camp }> = function (ctx) {
  const { camp } = ctx
  const router = useRouter()
  const { id } = router.query
  const beforePage = '/lostrpg/camps/list'
  const authUser = getAuth()
  return (
    <>
      <Container>
        <Box my={4}>
          <div style={{ maxWidth: '500px', minWidth: '200px' }}>
            <h2>{camp.name}</h2>
            {!canEdit(authUser, camp) ? (
              <></>
            ) : (
              <Box my={1}>
                <Link href={{ pathname: '/lostrpg/camps/edit', query: { id } }}>
                  編集
                </Link>
              </Box>
            )}
          </div>
        </Box>
        <Link href={beforePage}>戻る</Link>
      </Container>
    </>
  )
}

Page.getInitialProps = async ({ query }) => {
  const camp = await fetchCamp(query.id as string)
  return { camp: camp }
}

export default Page
