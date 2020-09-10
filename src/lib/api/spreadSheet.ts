import fetch from 'isomorphic-unfetch'
const fetchUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
const key = process.env.GOOGLE_API_KEY
export const getSheetData = async (
  spreadId: string,
  sheet: string,
  range: string,
): Promise<{ values: string[][] }> => {
  const res = await fetch(
    `${fetchUrl}/${spreadId}/values/${sheet}!${range}?key=${key}`,
  )
  if (res.status >= 400) {
    // throw new Error('spread sheet read failed')
    console.error('error', res.url)
    console.error(res.status, res.statusText)

    return { values: [[]] }
  }
  const json = await res.json()
  if (!json.values) {
    console.log('can not get values', json)
    return { values: [[]] }
  }

  return json as { values: string[][] }
}
