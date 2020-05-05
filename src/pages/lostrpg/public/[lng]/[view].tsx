import React from 'react'
import { NextPage } from 'next'
import { getCamp } from '~/api/firestoreAPI'
import { Camp } from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'
import CampPage from '~/components/pages/lostrpg/camp'

const Page: NextPage<{ view: string; camp?: Camp; id: string }> = function (
  ctx,
) {
  const authUser = useAuth()
  const { camp, view, id } = ctx
  if (view === 'camp') {
    return <CampPage camp={camp} id={id} authUser={authUser} />
  }
  return <></>
}

Page.getInitialProps = async ({ query }) => {
  const { id, lng, view } = query
  const { default: lngDict = {} } = await import(`~/locales/${lng}.json`)
  if (view === 'camp') {
    const camp = await getCamp(id as string)
    return { camp, lng, lngDict, view: 'camp', id: id as string }
  }
}

export default Page
