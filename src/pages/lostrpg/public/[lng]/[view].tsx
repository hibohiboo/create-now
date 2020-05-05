import React from 'react'
import { NextPage } from 'next'
import { getCamp, getCharacter } from '~/api/firestoreAPI'
import { Camp, Character } from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'
import CampPage from '~/components/pages/lostrpg/camp'
import CharacterPage from '~/components/pages/lostrpg/CharacterPage'

const Page: NextPage<{
  view: string
  camp?: Camp
  character?: Character
  id: string
}> = function (ctx) {
  const authUser = useAuth()
  const { view, id } = ctx
  if (view === 'camp') {
    const { camp } = ctx
    return <CampPage camp={camp} id={id} authUser={authUser} />
  }
  if (view === 'character') {
    const { character } = ctx
    return <CharacterPage character={character} id={id} authUser={authUser} />
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
  if (view === 'character') {
    const character = await getCharacter(id as string)
    return { character, lng, lngDict, view: 'character', id: id as string }
  }
}

export default Page
