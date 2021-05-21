import { useState, useEffect, useCallback, useMemo } from 'react'

const sampleCharacter = {
  symbolName: '灰花',
  magicalName: 'ユキスミレ'
}

export const useCharacterViewModel = ()=>{
  const [symbolName, setSymbolName] = useState(sampleCharacter.symbolName)
  const [magicalName, setMagicalName] = useState(sampleCharacter.magicalName)
  return {
    symbolName,
    magicalName,
    setSymbolName,
    setMagicalName
  }
}
