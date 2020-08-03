import { useSelector } from 'react-redux'
import type { TyranoUdon } from '../reducer'
export const useViewModel = () =>
  useSelector((state: { tyranoudon: TyranoUdon }) => {
    const { text } = state.tyranoudon
    return {
      text,
    }
  })
