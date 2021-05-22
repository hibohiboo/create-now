import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react'
import { loadData, saveData } from '../save-data';

const sampleCharacter = {
  symbolName: '灰花',
  symbolNameKana: 'かいか',
  magicalName: 'ユキスミレ'
}

type InputHandler = (a:string)=>{}

const inputModalBase = {
  title: '',
  value: '',
  changeHandler: (event:ChangeEvent<HTMLInputElement>)=>{},
  show: false,
  closeHandler: ()=>{}
}
export type InputModal = typeof inputModalBase;
export type OpenInputModal = (title: string, value: string, handler: InputHandler)=>void

export const useCharacterViewModel = ()=>{
  const [symbolName, setSymbolName] = useState(sampleCharacter.symbolName)
  const [symbolNameKana, setSymbolNameKana] = useState(sampleCharacter.symbolNameKana)

  const [magicalName, setMagicalName] = useState(sampleCharacter.magicalName)
  const [inputModal, setInputModal] = useState(inputModalBase)
  const character = {
    symbolName,
    symbolNameKana,
    magicalName,
  }
  useEffect(()=>{
    const loadedData = loadData()
    if(!loadedData) return
    setSymbolName(loadedData.symbolName)
    setSymbolNameKana(loadedData.symbolNameKana)
    setMagicalName(loadedData.magicalName)
  },[])
  useEffect(()=>{
    saveData(character)
  }, [character])
  return {
    character,
    inputModal,
    setSymbolName,
    setSymbolNameKana,
    setMagicalName,
    openInputModal: (title: string, value: string, handler: InputHandler)=>{
      setInputModal(
        {
          title, value,
          show: true,
          changeHandler: (event: ChangeEvent<HTMLInputElement>) => {
            handler(event.target.value)
          },
          closeHandler: () =>
            setInputModal(inputModalBase)
      })
    },
  }
}
