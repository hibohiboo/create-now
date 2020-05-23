import fetch from 'isomorphic-unfetch'
import { FireStoreAPIResponse } from '~/@types/firestore'
import * as lost from '~/store/modules/lostModule'

// common utility
const fetchFromFirestore = async (path: string) => {
  const url = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`
  const res: Response = await fetch(url)
  const data: FireStoreAPIResponse = await res.json()
  return data
}

const getStr = (obj): string | undefined => (obj ? obj.stringValue : null)
const getInt = (obj) =>
  obj && obj.integerValue && !isNaN(Number(obj.integerValue))
    ? Number(obj.integerValue)
    : obj && obj.stringValue && !isNaN(Number(obj.stringValue))
    ? Number(obj.stringValue)
    : 0
const getBool = (obj): boolean | undefined => obj && obj.booleanValue === true
const getTimestamp = (obj) => (obj ? obj.timestampValue : null)
const getArray = (obj, decoder) =>
  obj && obj.arrayValue && obj.arrayValue.values
    ? obj.arrayValue.values.map((item) => {
        if (!item.mapValue) return decoder(item)
        const { mapValue } = item
        if (mapValue === null || mapValue === undefined) return null
        if (mapValue.fields) return decoder(mapValue.fields)
        return decoder(mapValue)
      })
    : []

// LOSTRPG
export const getCamp = async (id: string) => {
  const data = await fetchFromFirestore(`systems/lost/camps/${id}`)

  const {
    name,
    uid,
    playerName,
    createdAt,
    updatedAt,
    facilities,
    freeWriting,
    imageUrl,
    items,
    summary,
    totalCampPoint,
    unusedCampPoint,
  } = data.fields
  const ret: lost.Camp = {
    name: getStr(name),
    uid: getStr(uid),
    playerName: getStr(playerName),
    createdAt: getTimestamp(createdAt),
    updatedAt: getTimestamp(updatedAt),
    facilities: getArray(facilities, (item) => ({
      name: getStr(item.name),
      type: getStr(item.type),
      specialty: getStr(item.specialty),
      level: getInt(item.level),
      effect: getStr(item.effect),
    })),
    freeWriting: getStr(freeWriting),
    imageUrl: getStr(imageUrl),
    summary: getStr(summary),
    totalCampPoint: getInt(totalCampPoint),
    unusedCampPoint: getInt(unusedCampPoint),
    items: getArray(items, (item) => ({
      id: getStr(item.id),
      name: getStr(item.name),
      number: getInt(item.number),
      j: getInt(item.j),
      weight: getInt(item.weight),
      type: getStr(item.type),
      area: getStr(item.area),
      trait: getStr(item.trait),
      specialty: getStr(item.specialty),
      effect: getStr(item.effect),
    })),
  }
  return ret
}

// LOSTRPG
export const getCharacter = async (id: string) => {
  if (!id) throw new Error('empty id')
  const data = await fetchFromFirestore(`systems/lost/characters/${id}`)

  const {
    name,
    uid,
    playerName,
    createdAt,
    updatedAt,
    freeWriting,
    imageUrl,
    classes,
    abilities,
    statusAilments,
    damagedSpecialties,
    specialties,
    gaps,
    items,
    equipments,
    bags,
    willPowerBase,
    willPower,
    staminaBase,
    stamina,
    carryingCapacity,
    totalExperience,
    unusedExperience,
    quote,
    summary,
    appearance,
    campId,
    campName,
    useStrangeField,
    backbones,
  } = data.fields
  const ret: lost.Character = {
    name: getStr(name),
    uid: getStr(uid),
    playerName: getStr(playerName),
    createdAt: getTimestamp(createdAt),
    updatedAt: getTimestamp(updatedAt),
    classes: getArray(classes, (item) => ({
      name: getStr(item.name),
      id: getStr(item.id),
    })),
    specialties: getArray(specialties, (item) => getStr(item)),
    gaps: getArray(gaps, (item) => getStr(item)),
    abilities: getArray(abilities, (item) => ({
      name: getStr(item.name),
      target: getStr(item.target),
      specialty: getStr(item.specialty),
      type: getStr(item.type),
      recoil: getStr(item.recoil),
      group: getStr(item.group),
      effect: getStr(item.effect),
    })),
    items: getArray(items, (item) => ({
      id: getStr(item.id),
      name: getStr(item.name),
      number: getInt(item.number),
      j: getInt(item.j),
      weight: getInt(item.weight),
      type: getStr(item.type),
      area: getStr(item.area),
      trait: getStr(item.trait),
      specialty: getStr(item.specialty),
      effect: getStr(item.effect),
    })),
    equipments: getArray(equipments, (item) => ({
      id: getStr(item.id),
      name: getStr(item.name),
      j: getInt(item.j),
      weight: getInt(item.weight),
      type: getStr(item.type),
      area: getStr(item.area),
      trait: getStr(item.trait),
      target: getStr(item.target),
      specialty: getStr(item.specialty),
      effect: getStr(item.effect),
      equipedArea: getStr(item.equipedArea),
    })),
    bags: getArray(bags, (bag) => ({
      id: getStr(bag.id),
      name: getStr(bag.name),
      capacity: getInt(bag.capacity),
      items: getArray(bag.items, (item) => ({
        id: getStr(item.id),
        name: getStr(item.name),
        number: getInt(item.number),
        j: getInt(item.j),
        weight: getInt(item.weight),
        type: getStr(item.type),
        area: getStr(item.area),
        trait: getStr(item.trait),
        specialty: getStr(item.specialty),
        effect: getStr(item.effect),
      })),
    })),
    statusAilments: getArray(statusAilments, (item) => getStr(item)),
    damagedSpecialties: getArray(damagedSpecialties, (item) => getStr(item)),
    freeWriting: getStr(freeWriting),
    imageUrl: getStr(imageUrl),
    willPowerBase: getInt(willPowerBase),
    willPower: getInt(willPower),
    staminaBase: getInt(staminaBase),
    stamina: getInt(stamina),
    carryingCapacity: getInt(carryingCapacity),
    totalExperience: getInt(totalExperience),
    unusedExperience: getInt(unusedExperience),
    quote: getStr(quote),
    summary: getStr(summary),
    appearance: getStr(appearance),
    campId: getStr(campId),
    campName: getStr(campName),
    useStrangeField: getBool(useStrangeField),
    backbones: getArray(backbones, (item) => ({
      id: getStr(item.id),
      name: getStr(item.name),
      type: getStr(item.type),
      effect: getStr(item.effect),
    })),
  }
  return ret
}
export const getCharactersRecord = async (id: string) => {
  if (!id) throw new Error('empty id')
  const data = await fetchFromFirestore(`systems/lost/charactersRecords/${id}`)

  const { scenarioTitle, uid, recordId, characterId } = data.fields
  const ret = {
    scenarioTitle: getStr(scenarioTitle),
    uid: getStr(uid),
    recordId: getStr(recordId),
    characterId: getStr(characterId),
  }
  return ret
}

export const getBoss = async (id: string) => {
  if (!id) throw new Error('empty id')
  const data = await fetchFromFirestore(`systems/lost/bosses/${id}`)

  const {
    name,
    uid,
    creatorName,
    createdAt,
    updatedAt,
    freeWriting,
    imageUrl,
    level,
    abilities,
    statusAilments,
    damagedSpecialties,
    specialties,
    gaps,
    willPower,
    stamina,
    summary,
  } = data.fields
  const ret: lost.Boss = {
    name: getStr(name),
    uid: getStr(uid),
    creatorName: getStr(creatorName),
    level: getInt(level),
    createdAt: getTimestamp(createdAt),
    updatedAt: getTimestamp(updatedAt),
    specialties: getArray(specialties, (item) => getStr(item)),
    gaps: getArray(gaps, (item) => getStr(item)),
    abilities: getArray(abilities, (item) => ({
      name: getStr(item.name),
      target: getStr(item.target),
      specialty: getStr(item.specialty),
      type: getStr(item.type),
      recoil: getStr(item.recoil),
      group: getStr(item.group),
      effect: getStr(item.effect),
    })),
    statusAilments: getArray(statusAilments, (item) => getStr(item)),
    damagedSpecialties: getArray(damagedSpecialties, (item) => getStr(item)),
    freeWriting: getStr(freeWriting),
    imageUrl: getStr(imageUrl),
    willPower: getInt(willPower),
    stamina: getInt(stamina),
    summary: getStr(summary),
  }
  return ret
}
