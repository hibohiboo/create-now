import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { getCamp } from '~/api/firestoreAPI'
import { canEdit } from '~/firestore/camp'
import { Camp } from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'
import * as data from '~/data/lostrpg'

const Page: NextPage<{ camp: Camp }> = function (ctx) {
  const router = useRouter()
  const authUser = useAuth()
  const { camp } = ctx
  const { id } = router.query
  const beforePage = '/lostrpg/camps/list'
  return (
    <Container>
      <Head>
        <title>{camp.name}</title>
      </Head>
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
      <Box my={4}>
        <MaterialTable
          title="施設"
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
          columns={data.facilitiesColumns}
          data={camp.facilities}
        />
      </Box>
      <Link href={beforePage}>戻る</Link>
    </Container>
  )
}

Page.getInitialProps = async ({ query }) => {
  const camp = await getCamp(query.id as string)
  return { camp }
}

export default Page
