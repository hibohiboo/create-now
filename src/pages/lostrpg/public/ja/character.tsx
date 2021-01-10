import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { getCharacter } from '~/api/firestoreAPI'
import { Character } from '~/store/modules/lostModule'
import { getLocaleProps } from '~/lib/i18n'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import CharacterPage from '~/components/pages/lostrpg/ja/CharacterPage'
import { characterToDoc, characterToTRPGStudioDoc, damageBodyParts, makeSpecialtiesTableColumns, makeStatusAilments, specialtiesTableRows } from '~/store/modules/lostModule/character'
import * as lostData from '~/data/lostrpg'
import { calcSHA256Async } from '~/lib/udonarium/FileReaderUtil'
import { MimeType } from '~/lib/udonarium/mimeType'
import { convertDocToXML, FileArchiver } from '~/lib/fileArchiver'
import { getRecord, readCharactersRecords } from '~/firestore/record'

const Page: NextPage<{
  id: string
  character?: Character
  vm: any
}> = function (ctx) {
  const dispatch = useDispatch()
  const authUser = useAuth()

  useEffect(() => {
    dispatch(createAuthClientSide())
  }, [])

  const { character, id, vm } = ctx
  return <CharacterPage character={character} id={id} authUser={authUser} vm={vm} />
}

Page.getInitialProps = async ({ query }) => {
  const id = query.id as string
  const { lngDict } = await getLocaleProps({ params: { lng: 'ja' } })

  const character = await getCharacter(id)
  const records = await readCharactersRecords(id)
  const { specialtiesTableColumns, bodyParts, specialties, abilitiesColumns, itemsColumns, equipmentColumns, statusAilments, backboneColumns, recordsColumns } = lostData

  const itemsValue = character.items.reduce((sum, { j, number }) => sum + j * number, 0)
  const bagsValue =
      character.bags
        .map((bag) => bag.items)
        .flat()
        .reduce((sum, { j, number }) => sum + j * number, 0)
  const equipmentValue =  character.equipments.reduce((sum, { j }) => sum + j, 0)
  const makedStatusAilments = makeStatusAilments(character, statusAilments)
  const i18n = lngDict
  const damagedParts = damageBodyParts(bodyParts, character)
  const vm ={
    specialtiesTableColumns: makeSpecialtiesTableColumns(specialtiesTableColumns, character),
    specialtiesTableRows: specialtiesTableRows(bodyParts, specialties, character),
    abilitiesColumns,
    totalWeight: character.items.reduce(
      (sum, { weight, number }) => sum + weight * number,
      0,
    ),
    totalValue: itemsValue+bagsValue+equipmentValue,
    itemsColumns,
    equipmentColumns,
    statusAilments: makedStatusAilments,
    backboneColumns,
    recordsColumns,
    records,
    exportXml: async () => {
      console.log('exportXml', character)
      let identifier = ''
      const files: File[] = []
      if (character.imageUrl) {
        const response = await fetch(character.imageUrl, { method: 'GET' })
        const blob = await response.blob()
        identifier = await calcSHA256Async(blob)

        files.push(
          new File([blob], identifier + '.' + MimeType.extension(blob.type), {
            type: blob.type,
          }),
        )
      }
      const doc = characterToDoc(
        character,
        damagedParts,
        makedStatusAilments,
        i18n,
        identifier,
      )
      const sXML = convertDocToXML(doc)

      files.push(new File([sXML], 'data.xml', { type: 'text/plain' }))
      FileArchiver.instance.save(files, character.name)
    },
    exportJson: async () => {
      // const identifier = ''

      const json = characterToTRPGStudioDoc(
        character,
        damagedParts,
        makedStatusAilments,
        i18n,
        specialtiesTableColumns,
        specialties,
        abilitiesColumns.map((a) => a.title),
        equipmentColumns.map((e) => e.title),
        itemsColumns.map((i) => i.title),
      )

      const file = new File([json], `${character.name}.txt`, {
        type: 'text/plain',
      })

      FileArchiver.instance.saveText(file)
    },
  }
  return { character, lng: 'ja', lngDict, vm, id }
}
// Page.getStaticPaths = getLocalePaths

export default Page
