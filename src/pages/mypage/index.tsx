import React, { useState, useEffect, ChangeEvent } from 'react'
import Router from 'next/router'
import logout from '../../utils/auth/logout'
import {
  Container,
  Box,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Footer from '../../components/organisms/common/Footer'
import { useAuth } from '~/store/modules/authModule'

// スタイルを適用する
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      color: 'inherit',
      padding: '8px',
    },
    headerTitleStyle: {
      flexGrow: 1,
      color: 'inherit',
    },
    avatar: {
      margin: '8px',
    },
  }),
)

const MyPage = () => {
  const authUser = useAuth()
  useEffect(() => {
    if (!authUser) {
      Router.push('/')
    }
  }, [])
  // CSSを適用する。
  const classes = useStyles()

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <>
          <AppBar position="static" aria-label="Global Navi">
            <Toolbar>
              <Typography
                className={classes.headerTitleStyle}
                variant="subtitle1"
              >
                Create Now
              </Typography>
              <IconButton className={classes.menuButton} aria-label="Menu">
                {!authUser.photoURL ? (
                  <Avatar className={classes.avatar}></Avatar>
                ) : (
                  <Avatar
                    alt={authUser.displayName}
                    src={authUser.photoURL}
                  ></Avatar>
                )}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container>
            <Box height="100vh">
              <h2>マイページ</h2>
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
export default MyPage
