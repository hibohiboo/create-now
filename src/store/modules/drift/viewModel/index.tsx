import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '~/store/rootState'
import * as chat from '~/firestore/drift/chat'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
export const useViewModel = () =>
  useSelector((state: RootState) => {
    const authUser = useAuth()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(createAuthClientSide())
    }, [])
    useEffect(() => {
      if (!authUser) return
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { Elm } = require('~/elm/Main')
      const app = Elm.Main.init({ node: document.getElementById('elm-node') })
      app.ports.addCollection.subscribe(async (m) => {
        if (!authUser) return

        switch (m.collection) {
          case 'comments':
            chat.addComment(m.payload, authUser)
        }
      })
    }, [authUser])
    return {
      title: '漂流TRPG チャット',
    }
  })

export type TyranoUdonViewModel = ReturnType<typeof useViewModel>
