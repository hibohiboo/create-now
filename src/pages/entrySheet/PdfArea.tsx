import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import entrySheetModule, {
  useEntrySheet,
  usePdf,
} from '../../store/modules/entrySheetModule'

const makePdf = async (sheet, dispatch) => {
  const pdf = await (
    await fetch('/api/entrySheetPdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(sheet),
    })
  ).text()
  dispatch(entrySheetModule.actions.setPdf(pdf))
}

const PdfArea: React.FC = () => {
  const sheet = useEntrySheet()
  const pdf = usePdf()
  const dispatch = useDispatch()

  if (!sheet) {
    return <div>読込失敗</div>
  }
  return (
    <>
      <button onClick={(e) => makePdf(sheet, dispatch)}>PDFを作る</button>
      {pdf !== '' && (
        <a href={pdf} download="sheet.pdf">
          作成したPDFをダウンロード
        </a>
      )}
    </>
  )
}

export default PdfArea
