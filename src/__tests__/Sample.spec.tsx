import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import Index from '~/pages/index'

// https://stackoverflow.com/questions/59018071/mock-usedispatch-in-jest-and-test-the-params-with-using-that-dispatch-action-in
const mockDispatch = jest.fn()

// https://stackoverflow.com/questions/56827300/how-to-test-a-component-using-react-redux-hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
}))
// https://github.com/vercel/next.js/issues/7479
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))
jest.mock('~/store/modules/authModule', () => ({
  useAuth: () => null,
  createAuthClientSide: () => null,
}))

afterEach(cleanup)

describe('Index page', (): void => {
  // テキストのリンク先テスト
  it('link to 僕の私のTRPG説明書', (): void => {
    const { getByText } = render(<Index />)
    expect(getByText('僕の私のTRPG説明書').getAttribute('href')).toBe(
      '/trpg-manual',
    )
  })
  // TODO を書ける
  it.todo('Index TODO')
})
