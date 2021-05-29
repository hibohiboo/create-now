import { ChangeEvent, useState } from "react"
import { Hope } from "../../negai";

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
    openNegaiModal: (hope: '献身' | '利己' | '復讐', handler: any)=>{
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
