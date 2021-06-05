import { ChangeEvent, Dispatch, useState } from "react"
import { Character } from ".";
import { Gadget } from "../../classes/gadget";
import { Gemory, GemoryType } from "../../classes/gemory";
import { gemory, Magic } from "../../classes/gemory/magic";
import { Hope } from "../../classes/hope";

type InputHandler = (a:string)=>void
export type InputType = 'text' | 'textarea' | 'number'
const inputModalBase = {
  title: '',
  value: '',
  changeHandler: (value:string)=>{},
  show: false,
  closeHandler: ()=>{},
  type: 'text' as InputType
}
export type InputModal = typeof inputModalBase;



export const useInputModal = ()=>{
  const [inputModal, setInputModal] = useState(inputModalBase)
  return {
    inputModal,
    openInputModal: (title: string, value: string, handler: InputHandler, type:InputType = 'text')=>{
      setInputModal(
        {
          title, value,
          show: true,
          changeHandler: (value: string) => {
            handler(value)
          },
          closeHandler: () =>
            setInputModal(inputModalBase),
            type,
      })
    },
  }
}
export type OpenInputModal = ReturnType<typeof useInputModal>['openInputModal']

const imageEditModalBase = {
  show: false,
  label: '',
  url: '',
  dropHandler: (event:any)=>{},
  closeHandler: ()=>{}
}
export type ImageEditModal = typeof imageEditModalBase;
export const useImageEditModal = ()=>{
  const [imageEditModal, setimageEditModal] = useState(imageEditModalBase)
  return {
    imageEditModal,
    openImageEditModal: (label: string, url: string, handler: any)=>{
      setimageEditModal(
        {
          label,
          url,
          show: true,
          dropHandler: (event: any) => {
            handler(event)
          },
          closeHandler: () =>
          setimageEditModal(imageEditModalBase)
      })
    },
  }
}
export type OpenImageEditModal = ReturnType<typeof useImageEditModal>['openImageEditModal']



const negaiModalBase = {
  show: false,
  hope: '献身',
  hopeHandler: (hope: Hope)=>{},
  closeHandler: ()=>{}
}
export type NegaiModal = typeof negaiModalBase;
export const useNegaiModal = ()=>{
  const [negaiModal, setNegaiModal] = useState(negaiModalBase)
  return {
    negaiModal,
    openNegaiModal: (hope: Hope, handler: any)=>{
      setNegaiModal(
        {
          hope,
          show: true,
          hopeHandler: (event: Hope) => {
            handler(event)
            setNegaiModal(negaiModalBase)
          },
          closeHandler: () =>
          setNegaiModal(negaiModalBase)
      })
    },
  }
}
export type OpenNegaiModal = ReturnType<typeof useNegaiModal>['openNegaiModal']


const gadgetModalBase = {
  show: false,
  gadget: '武器',
  gadgetHandler: (gadget: Gadget)=>{},
  closeHandler: ()=>{}
}
export type GadgetModal = typeof gadgetModalBase;
export const useGadgetModal = ()=>{
  const [gadgetModal, setGadgetModal] = useState(gadgetModalBase)
  return {
    gadgetModal,
    openGadgetModal: (gadget: Gadget, handler: Dispatch<Gadget>)=>{
      setGadgetModal(
        {
          gadget,
          show: true,
          gadgetHandler: (event: Gadget) => {
            handler(event)
            setGadgetModal(gadgetModalBase)
          },
          closeHandler: () =>
          setGadgetModal(gadgetModalBase)
      })
    },
  }
}
export type OpenGadgetModal = ReturnType<typeof useGadgetModal>['openGadgetModal']



const iframeModalBase = {
  url: '',
  show: false,
  closeHandler: ()=>{}
}
export type IframeModal = typeof iframeModalBase;


export const useIframeModal = ()=>{
  const [iframeModal, setIframeModal] = useState(iframeModalBase)
  return {
    iframeModal,
    openIframeModal: (url: string, )=>{
      setIframeModal(
        {
          url,
          show: true,
          closeHandler: () =>
            setIframeModal(iframeModalBase),
      })
    },
  }
}
export type OpenIframeModal = ReturnType<typeof useIframeModal>['openIframeModal']



const gemoryModalBase = {
  gemory: {
    description: '風景',
    episode: 'エピソード',
    strength: 3,
    type: '死' as GemoryType,
    cards: [],
  },
  garden:[],
  index:0,
  dispatch: {} as Record<string, Dispatch<any>>,
  show: false,
  closeHandler: ()=>{},
  openInputModal: (()=>{}) as OpenInputModal,
  openGemoryTypeModal:  (()=>{}) as OpenGemoryTypeModal
}
export type GemoryModal = typeof gemoryModalBase;
export const useGemoryModal = ()=>{
  const [gemoryModal, setGemoryModal] = useState(gemoryModalBase)
  return {
    gemoryModal: gemoryModal,
    openGemoryModal: (garden: Gemory[],gemory: Gemory, dispatch: Record<string, Dispatch<any>>,openInputModal: OpenInputModal, openGemoryTypeModal:  OpenGemoryTypeModal,index:number)=>{
      setGemoryModal(
        {
          gemory:{...gemory},
          garden,
          show: true,
          dispatch,
          index,
          closeHandler: () =>
            setGemoryModal(gemoryModalBase),
          openInputModal,
          openGemoryTypeModal
      })
    },
  }
}
export type OpenGemoryModal = ReturnType<typeof useGemoryModal>['openGemoryModal']


const gemoryTypeModalBase = {
  show: false,
  type: '死',
  gemoryTypeHandler: (gadget: GemoryType)=>{},
  closeHandler: ()=>{}
}
export type GemoryTypeModal = typeof gemoryTypeModalBase;
export const useGemoryTypeModal = ()=>{
  const [gemoryTypeModal, setGemoryTypeModal] = useState(gemoryTypeModalBase)
  return {
    gemoryTypeModal,
    openGemoryTypeModal: (type: GemoryType, handler: Dispatch<GemoryType>)=>{
      setGemoryTypeModal(
        {
          type,
          show: true,
          gemoryTypeHandler: (event: GemoryType) => {
            handler(event)
            setGemoryTypeModal(gemoryTypeModalBase)
          },
          closeHandler: () =>
          setGemoryTypeModal(gemoryTypeModalBase)
      })
    },
  }
}
export type OpenGemoryTypeModal = ReturnType<typeof useGemoryTypeModal>['openGemoryTypeModal']



const cardModalBase = {
  card: gemory,
  show: false,
  closeHandler: ()=>{},
}
export type CardModal = typeof cardModalBase;
export const useCardModal = ()=>{
  const [CardModal, setCardModal] = useState(cardModalBase)
  return {
    cardModal: CardModal,
    openCardModal: (card: Magic)=>{
      setCardModal(
        {
          card,
          show: true,
          closeHandler: () =>
            setCardModal(cardModalBase),
      })
    },
  }
}
export type OpenCardModal = ReturnType<typeof useCardModal>['openCardModal']
