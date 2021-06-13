import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { getCharacter } from '~/api/firestoreAPI'
import { Character } from '~/store/modules/lostModule'
import { getLocaleProps } from '~/lib/i18n'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import CharacterPage from '~/components/pages/lostrpg/ja/CharacterPage'
import {
  equipments,
  makeSpecialtiesTableColumns,
  makeStatusAilments,
  specialtiesTableRows,
} from '~/store/modules/lostModule/character'
import * as lostData from '~/data/lostrpg'
import { useRouter } from 'next/router'
import { readCharacterIds, readCharacters } from '~/firestore/character'

const Page: NextPage<{
  id: string
  character?: Character
  vm: any
}> = function (ctx) {
  const router = useRouter()
  if (!router.isFallback && !ctx?.id) return <div>page not found</div>
  if (!ctx?.character) return <div>page loading</div>
  const dispatch = useDispatch()
  const authUser = useAuth()

  useEffect(() => {
    dispatch(createAuthClientSide())
  }, [])

  const { character, id, vm } = ctx
  return (
    <CharacterPage character={character} id={id} authUser={authUser} vm={vm} />
  )
}

export const getStaticProps = async ({ params }) => {
  const id = params.id as string
  const { lngDict } = await getLocaleProps({ params: { lng: 'ja' } })
  const character = await getCharacter(id)

  // 本番で実行時エラーが出る。vercelのFunctionsがタイムアウト?
  // recordの取得はローカルにしてみる。
  // const records = await readCharactersRecords(id)
  const {
    specialtiesTableColumns,
    bodyParts,
    specialties,
    abilitiesColumns,
    itemsColumns,
    equipmentColumns,
    statusAilments,
    backboneColumns,
    recordsColumns,
  } = lostData
  const itemsValue = character.items.reduce(
    (sum, { j, number }) => sum + j * number,
    0,
  )
  const bagsValue = character.bags
    .map((bag) => bag.items)
    .flat()
    .reduce((sum, { j, number }) => sum + j * number, 0)
  const equipmentValue = character.equipments.reduce((sum, { j }) => sum + j, 0)
  const makedStatusAilments = makeStatusAilments(character, statusAilments)
  const i18n = { t: (s) => lngDict[s] }
  // const damagedParts = damageBodyParts(bodyParts, character)
  const equipmentList = equipments(character, i18n)
  const vm = {
    specialtiesTableColumns: makeSpecialtiesTableColumns(
      specialtiesTableColumns,
      character,
    ),
    specialtiesTableRows: specialtiesTableRows(
      bodyParts,
      specialties,
      character,
    ),
    abilitiesColumns,
    totalWeight: character.items.reduce(
      (sum, { weight, number }) => sum + weight * number,
      0,
    ),
    totalValue: itemsValue + bagsValue + equipmentValue,
    itemsColumns,
    equipmentColumns,
    statusAilments: makedStatusAilments,
    backboneColumns,
    recordsColumns,
    equipments: equipmentList,
  }
  const props = { character, lng: 'ja', lngDict, vm, id }
  return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
  const result = await readCharacterIds(1000)
  return {
    paths: result.characters.map(({ id }) => ({ params: { id } })),
    // [{ params: { id: '9zhaBaPGJ3U78MFIXKxz'}}]
    fallback: true,
  }
}

export default Page
