import { ChangeEvent, useState } from "react"

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
export type OpenInputModal = (title: string, value: string, handler: InputHandler)=>void


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
