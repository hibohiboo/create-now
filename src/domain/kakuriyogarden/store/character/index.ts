import { useState, useEffect, useCallback, useMemo, ChangeEvent, Dispatch } from 'react'
import { loadData, saveData } from '../save-data';
import { useCharacterImage } from './image';
import { useGadgetModal, useImageEditModal, useInputModal, useNegaiModal } from './modal';
import type { Hope } from '../../classes/hope';
import { Gadget } from '../../classes/gadget';

const sampleCharacter = {
  symbolName: '灰花',
  symbolNameKana: 'はいばな',
  magicalName: 'ユキスミレ',
  profile: `「 私の邪魔をするお馬鹿さんは、 みんな 燃やしてあげる 」`,
  imageUrl: 'data:image/png;base64,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',
  hope: '復讐' as Hope,
  hopeDetail: `傷一つない美を。後ろ指を指したやつらが羨む成功を。`,
  gadgetDetail: `手榴弾を模したキーホルダー。ピンを抜く動作をトリガーに、爆炎に包まれ変身する。
変身後の衣装は黒紫色のドレス。`,
  gadget: '武器' as Gadget
}
type Character = typeof sampleCharacter;
type Exclude<T, U> = T extends U ? never : T;

// state -> setState
// const getSetName = (key:string)=>`set${key.replace(/^./, (match)=>match.toUpperCase())}`
const characterToState = (c:Character) =>{
  const char = {} as Character
  const sets = {} as {[K in Exclude<keyof Character, "imageUrl">]: Dispatch<Character[K]>}
  for(const key of Object.keys(c)){
    if(key === 'imageUrl') continue;
    const [a,b] = useState(c[key])
    char[key] = a;
    sets[key] = b;
  }
  return [char, sets] as const;
}

export const useCharacterViewModel = ()=>{
  const [character, characterDispatch] = characterToState(sampleCharacter)
  const {inputModal, openInputModal} = useInputModal()
  const {imageEditModal, openImageEditModal} = useImageEditModal()
  const {negaiModal, openNegaiModal} = useNegaiModal()
  const {gadgetModal, openGadgetModal} = useGadgetModal();
  const [imageUrl, handleOnDrop, setPrevUrl] = useCharacterImage()
  character['imageUrl'] = imageUrl;

  useEffect(()=>{
    const loadedData = loadData()
    if(!loadedData) return
    for(const key of Object.keys(character)){
      if(key === 'imageUrl') continue;
      const data = loadedData[key]
      if(data) characterDispatch[key](data)
    }
    setPrevUrl(loadedData.imageUrl)
  },[])
  useEffect(()=>{
    saveData(character)
  }, [character])
  return {
    character,
    inputModal,
    imageEditModal,
    negaiModal,
    gadgetModal,
    handleOnDrop,
    characterDispatch,
    openInputModal,
    openImageEditModal,
    openNegaiModal,
    openGadgetModal
  }
}

export type CharacterViewModel = ReturnType<typeof useCharacterViewModel>
