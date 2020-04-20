import { NextPage } from 'next'
import React from 'react'
import { Container, Box } from '@material-ui/core'
import Footer from '~/components/organisms/common/Footer'

const Page: React.FC = (props) => {
  return (
    <Container>
      <Box my={4} style={{ minHeight: '100vh' }}>
        {props.children}
      </Box>
      <Footer />
    </Container>
  )
}

export default Page
