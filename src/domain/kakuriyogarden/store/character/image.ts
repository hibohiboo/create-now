import { useCallback, useState } from "react"
import { createSetImageFile } from '~/utils/formHelper';

export const useCharacterImage = ()=>{
  const [prevUrl, setPrevUrl] = useState('')
  const [file, setFile] = useState<File>(null)

  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const handleOnDrop = useCallback(
    (files: File[]) => {
      setImageFile(files[0])
    },
    [file],
  )
  return [
    prevUrl,
    handleOnDrop,
    setPrevUrl
  ] as const

}
