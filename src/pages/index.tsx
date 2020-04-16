import * as React from 'react'
import { NextPage } from 'next'
import { Container, Box, Typography } from '@material-ui/core'
import Footer from '../components/organisms/common/Footer'
import OuterCreated from '../components/organisms/home/OuterCreated'
import Created from '../components/organisms/home/Created'
import CreatedWithLogin from '../components/organisms/home/CreatedWithLogin'
import withAuthUser, { getUserInfo } from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo, {
  userInfoPropTypes,
  defaultUserProps,
} from '../utils/pageWrappers/withAuthUserInfo'

const Home: NextPage = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = getUserInfo(AuthUserInfo)

  return (
    <Container maxWidth="sm">
      <Box my={4}>
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
Home.propTypes = userInfoPropTypes
Home.defaultProps = defaultUserProps

export default withAuthUser(withAuthUserInfo(Home))
