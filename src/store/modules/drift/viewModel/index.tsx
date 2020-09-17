import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '~/store/rootState'
import * as chatStore from '~/firestore/drift/chat'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'

const {
  Elm: { Main },
} = require('~/elm/Main') // eslint-disable-line @typescript-eslint/no-var-requires
const {
  Elm: { Chat },
} = require('~/elm/Chat') // eslint-disable-line @typescript-eslint/no-var-requires

export const useViewModel = () =>
  useSelector((state: RootState) => {
    const authUser = useAuth()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(createAuthClientSide())
    }, [])
    useEffect(() => {
      if (!authUser) return

      const app = Main.init({ node: document.getElementById('elm-node') })

      const chat = Chat.init({
        node: document.getElementById('elm-node-chat'),
      })
      chat.ports.addCollection.subscribe(async (m) => {
        if (!authUser) return

        switch (m.collection) {
          case 'comments':
            chatStore.addComment(m.payload, authUser)
        }
      })
    }, [authUser])
    return {
      title: '漂流TRPG チャット',
    }
  })

export type TyranoUdonViewModel = ReturnType<typeof useViewModel>
