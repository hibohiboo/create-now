import fetch from 'isomorphic-unfetch'
const fetchUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
const key = process.env.GOOGLE_API_KEY
export const getSheetData = async (
  spreadId: string,
  sheet: string,
  range: string,
) => {
  const res = await fetch(
    `${fetchUrl}/${spreadId}/values/${sheet}!${range}?key=${key}`,
  )
  return (await res.json()) as { values: string[][] }
}
