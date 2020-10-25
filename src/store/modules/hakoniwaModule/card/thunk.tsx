import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import * as api from '~/lib/api/hakoniwa'
import { actions } from '../index'

import type { SelectItem } from '~/components/form/SelectableInputField'
import type { Card } from '../card'
const csvToCard: (items: any[]) => Card = (items) => {
  const [
    id,
    name,
    type,
    kind,
    timing,
    strCount,
    range,
    target,
    strMaxLevel,
    // strLevel,
    strLink,
    effect,
    description,
    strTags,
    url,
    siteName,
    delFlg,
  ] = items

  const tags = strTags.split(',')
  const image = !url ? null : { text: siteName, url }
  const count = Number(strCount)
  const maxLevel = strMaxLevel ? Number(strMaxLevel) : null
  const level = maxLevel ? 1 : null
  const link: Card['link'] = strLink ? (Number(strLink) as Card['link']) : 0
  return {
    id,
    name,
    type,
    timing,
    count,
    range,
    target,
    link,
    maxLevel,
    level,
    effect,
    description,
    tags,
    image,
  }
}

export const fetchCards = (spreadId: string): AppThunk => async (dispatch) => {
  const json = await api.getCards(spreadId)
  console.log('result', json)
  const values = json.values
  const items = values.map(csvToCard)

  dispatch(actions.setCards(items))
}
