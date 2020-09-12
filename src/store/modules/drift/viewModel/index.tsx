import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '~/store/rootState'
export const useViewModel = () =>
  useSelector((state: RootState) => {
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { Elm } = require('~/elm/Main')
      const app = Elm.Main.init({ node: document.getElementById('elm-node') })
    }, [])

    return {
      title: '漂流TRPG チャット',
    }
  })

export type TyranoUdonViewModel = ReturnType<typeof useViewModel>
