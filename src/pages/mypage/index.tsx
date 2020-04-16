import React, { useState, useEffect, ChangeEvent } from 'react'
import Router from 'next/router'
import withAuthUser, {
  getUserInfo,
} from '../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo, {
  userInfoPropTypes,
  defaultUserProps,
} from '../../utils/pageWrappers/withAuthUserInfo'
import logout from '../../utils/auth/logout'
import { Container, Box, Avatar } from '@material-ui/core'
import Footer from '../../components/organisms/common/Footer'

const MyPage = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = getUserInfo(AuthUserInfo)
  useEffect(() => {
    if (!authUser) {
      Router.push('/')
    }
  }, [])
  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <>
          <Container>
            <Box height="100vh">
              <h2>マイページ</h2>
              {/* <Avatar
                alt={authUser.displayName}
                src={authUser.twitterProfileImageUrl}
              /> */}
              <div>ユーザー: {authUser.displayName}</div>
              <button
                onClick={async () => {
                  try {
                    await logout()
                    Router.push('/')
                  } catch (e) {
                    console.error(e)
                  }
                }}
              >
                ログアウト
              </button>
            </Box>
            {/* <pre className="text-xs">{JSON.stringify(authUser, null, 2)}</pre> */}
            <Footer />
          </Container>
        </>
      )}
    </>
  )
}

MyPage.propTypes = userInfoPropTypes
MyPage.defaultProps = defaultUserProps

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(MyPage))
