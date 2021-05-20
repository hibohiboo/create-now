import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { getCharacter } from '~/api/firestoreAPI'
import Edit from '~/components/pages/kakuriyogarden/character/edit'

const Page: NextPage<{
  id: string
}> = function (ctx) {
  const dispatch = useDispatch()

  useEffect(() => {}, [])

  const { id } = ctx
  return <Edit>{id}</Edit>
}

Page.getInitialProps = async ({ query }) => {
  const id = query.id as string

  return { id }
}
// Page.getStaticPaths = getLocalePaths

export default Page
