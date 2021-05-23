import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react'
import { loadData, saveData } from '../save-data';
import { useCharacterImage } from './image';

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
  const [prevUrl, handleOnDrop, setPrevUrl] = useCharacterImage()
  const character = {
    symbolName,
    symbolNameKana,
    magicalName,
    prevUrl
  }

  useEffect(()=>{
    const loadedData = loadData()
    if(!loadedData) return
    setSymbolName(loadedData.symbolName)
    setSymbolNameKana(loadedData.symbolNameKana)
    setMagicalName(loadedData.magicalName)
    setPrevUrl(loadedData.prevUrl)
  },[])
  useEffect(()=>{
    saveData(character)
  }, [character])
  return {
    character,
    inputModal,
    handleOnDrop,
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

export type CharacterViewModel = ReturnType<typeof useCharacterViewModel>
