import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { getCamp } from '~/api/firestoreAPI'
import { canEdit } from '~/firestore/camp'
import { Camp } from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'

const Page: NextPage<{ camp: Camp }> = function (ctx) {
  const router = useRouter()
  const authUser = useAuth()
  const { camp } = ctx
  const { id } = router.query
  const beforePage = '/lostrpg/camps/list'
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
  const camp = await getCamp(query.id as string)
  return { camp }
}

export default Page
