import { ChangeEvent, Dispatch, useState } from "react"
import { Gadget } from "../../classes/gadget";
import { Hope } from "../../classes/hope";

type InputHandler = (a:string)=>void

const inputModalBase = {
  title: '',
  value: '',
  changeHandler: (value:string)=>{},
  show: false,
  closeHandler: ()=>{},
  isTextArea: false
}
export type InputModal = typeof inputModalBase;



export const useInputModal = ()=>{
  const [inputModal, setInputModal] = useState(inputModalBase)
  return {
    inputModal,
    openInputModal: (title: string, value: string, handler: InputHandler, isTextArea = false)=>{
      setInputModal(
        {
          title, value,
          show: true,
          changeHandler: (value: string) => {
            handler(value)
          },
          closeHandler: () =>
            setInputModal(inputModalBase),
          isTextArea,
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
