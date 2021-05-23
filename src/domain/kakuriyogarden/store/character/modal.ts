import { ChangeEvent, useState } from "react"

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


export const useInputModal = ()=>{
  const [inputModal, setInputModal] = useState(inputModalBase)
  return {
    inputModal,
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
