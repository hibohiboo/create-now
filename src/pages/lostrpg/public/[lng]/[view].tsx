import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import {
  getCamp,
  getCharacter,
  getCharactersRecord,
  getBoss,
  getScenario,
} from '~/api/firestoreAPI'
import {
  Camp,
  Character,
  Record,
  Boss,
  Scenario,
} from '~/store/modules/lostModule'
import { getLocaleProps, getLocalePaths } from '~/lib/i18n'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import CampPage from '~/components/pages/lostrpg/camp'
import CharacterPage from '~/components/pages/lostrpg/CharacterPage'
import RecordPage from '~/components/pages/lostrpg/Record'
import BossPage from '~/components/pages/lostrpg/Boss'
import ScenarioPage from '~/components/pages/lostrpg/Scenario'

const Page: NextPage<{
  view: string
  id: string
  camp?: Camp
  character?: Character
  record?: Record
  boss?: Boss
  scenario?: Scenario
  lng?: string
  lngDict?: any
}> = function (ctx) {
  const dispatch = useDispatch()
  const authUser = useAuth()
  const { view, id, lng, lngDict } = ctx

  useEffect(() => {
    dispatch(createAuthClientSide())
  }, [])
  if (view === 'camp') {
    const { camp } = ctx
    return <CampPage camp={camp} id={id} authUser={authUser} />
  }
  if (view === 'character') {
    const { character } = ctx
    return <CharacterPage character={character} id={id} authUser={authUser} />
  }
  if (view === 'record') {
    const { record } = ctx
    return (
      <RecordPage
        recordId={record.recordId}
        characterId={record.characterId}
        authUser={authUser}
      />
    )
  }
  if (view === 'boss') {
    const { boss } = ctx
    return <BossPage boss={boss} id={id} authUser={authUser} />
  }
  if (view === 'scenario') {
    const { scenario } = ctx
    return (
      <ScenarioPage
        scenario={scenario}
        lng={lng}
        lngDict={lngDict}
        id={id}
        authUser={authUser}
      />
    )
  }
  return <></>
}

Page.getInitialProps = async ({ query }) => {
  const lng = query.lng as string
  const view = query.view as string
  const id = query.id as string
  const { lngDict } = await getLocaleProps({ params: { lng } })
  if (view === 'camp') {
    const camp = await getCamp(id)
    return { camp, lng, lngDict, view, id }
  }
  if (view === 'character') {
    const character = await getCharacter(id)
    return { character, lng, lngDict, view, id }
  }
  if (view === 'record') {
    const record = (await getCharactersRecord(id)) as Record
    return { record, lng, lngDict, view, id }
  }
  if (view === 'boss') {
    const boss = await getBoss(id)
    return { boss, lng, lngDict, view, id }
  }
  if (view === 'scenario') {
    const scenario = await getScenario(id)
    return { scenario, lng, lngDict, view, id }
  }
}
// Page.getStaticPaths = getLocalePaths

export default Page
