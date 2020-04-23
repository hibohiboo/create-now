import * as React from 'react'
import { NextPage } from 'next'
import { Container, Box, Typography } from '@material-ui/core'
import Footer from '../components/organisms/common/Footer'
import OuterCreated from '../components/organisms/home/OuterCreated'
import Created from '../components/organisms/home/Created'
import CreatedWithLogin from '../components/organisms/home/CreatedWithLogin'

import { useAuth } from '~/store/modules/authModule'

const Home: NextPage = () => {
  const authUser = useAuth()
  return (
    <Container maxWidth="sm">
      <Box my={4} style={{ minHeight: '100vh' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          なう! 開発工房
        </Typography>
        <Created />
        <CreatedWithLogin authUser={authUser} />
        <OuterCreated />
      </Box>
      <Footer />
    </Container>
  )
}

export default Home
