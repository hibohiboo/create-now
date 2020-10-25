import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initPage } from './didMount'
import type { HakoniwaState } from '../../index'
import type { PageContext } from './didMount'
export const useViewModel = (ctx: PageContext) =>
  useSelector((state: { hakoniwa: HakoniwaState }) => {
    const dispatch = useDispatch()
    const hState = state.hakoniwa

    useEffect(() => {
      initPage(ctx, dispatch)
    }, [])

    return {
      ...hState,
    }
  })

export type ViewModel = ReturnType<typeof useViewModel>
