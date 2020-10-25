import { getSheetData } from './spreadSheet'
export const getCards = async (spreadId) =>
  await getSheetData(spreadId, 'cards', 'B2:R')
