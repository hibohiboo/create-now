import usePagination from 'firestore-pagination-hook'
import { ExtendedFirestoreInstance } from 'react-redux-firebase'
import { Camp } from '~/@types/logtrpg'
import firestoreApi from '~/utils/firestore/api'
import { getFirestore } from '~/lib/firebase/initFirebase'
import firebase from 'firebase'
import { createAction } from '@reduxjs/toolkit'

let nextTodoId = 0
export const addTodo = createAction('ADD_TODO', (text: string) => ({
  payload: { id: nextTodoId++, text },
}))
