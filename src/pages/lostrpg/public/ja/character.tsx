import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import {

  getCharacter,

} from '~/api/firestoreAPI'
import {

  Character,

} from '~/store/modules/lostModule'
import { getLocaleProps } from '~/lib/i18n'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import CharacterPage from '~/components/pages/lostrpg/ja/CharacterPage'
const Page: NextPage<{
  id: string
  character?: Character
}> = function (ctx) {
  const dispatch = useDispatch()
  const authUser = useAuth()

  useEffect(() => {
    dispatch(createAuthClientSide())
  }, [])

  const { character, id } = ctx
  return <CharacterPage character={character} id={id} authUser={authUser} />
}

Page.getInitialProps = async ({ query }) => {
  const id = query.id as string
  const { lngDict } = await getLocaleProps({ params: { lng: 'ja' } })

  const character = await getCharacter(id)
  return { character, lng: 'ja', lngDict, view: 'character', id }
}
// Page.getStaticPaths = getLocalePaths

export default Page
