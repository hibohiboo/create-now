import * as _ from 'lodash'
import React, { useState } from 'react'
import Head from 'next/head'
import { Box, Checkbox, Paper, Tabs, Tab } from '@material-ui/core'
import MaterialTable from 'material-table'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { AuthUser } from '~/store/modules/authModule'
import InputField from '~/components/form/InputField'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { useBossViewModel, Scenario } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'
import SocialMeta from '~/components/SocialMeta'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import ScenarioTree from '~/components/organisms/lostrpg/ScenarioTree'
import ScenarioView from '~/components/organisms/lostrpg/ScenarioView'
import ScenarioChart from '~/components/organisms/lostrpg/ScenarioChart'

const Page: React.FC<{
  scenario: Scenario
  id: string
  authUser: AuthUser
  lng: string
  lngDict: any
}> = (ctx) => {
  const { scenario, id, authUser, lng, lngDict } = ctx
  const t = lngDict
  const [tabValue, setTabValue] = useState(0)
  const changeTabHandler = (e, v) => setTabValue(v)
  const tabs = {
    preview: t['lostrpg_common_scenario'],
    chart: t['common_chart'],
  }
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
        <title>{scenario.name}</title>
      </Head>
      <SocialMeta
        title={scenario.name}
        description={``}
        url={`/lostrpg/public/${lng}/scenario?id=${id}`}
        image={scenario.imageUrl}
      />
      <Box my={4}>
        <h1>{scenario.name}</h1>

        {authUser && authUser.uid !== scenario.uid ? (
          <></>
        ) : (
          <Box my={1}>
            <Link
              href={{
                pathname: `/lostrpg/scenario/[lng]/edit`,
                query: { id },
              }}
              as={`/lostrpg/scenario/${lng}/edit?id=${id}`}
            >
              {t['common_edit']}
            </Link>
          </Box>
        )}
      </Box>

      <Box style={{ width: '100%' }} display="flex" flexWrap="wrap">
        {scenario.imageUrl ? (
          <Box
            border={1}
            style={{
              minWidth: '320px',
            }}
          >
            <img alt={t['common_image']} src={scenario.imageUrl} />{' '}
          </Box>
        ) : (
          <></>
        )}
      </Box>

      <Paper>
        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={changeTabHandler}
          variant="scrollable"
          scrollButtons="on"
        >
          {_.map(tabs, (value, key) => (
            <Tab key={key} label={value} />
          ))}
        </Tabs>
      </Paper>
      <Paper>
        {tabValue === 0 ? (
          <article>
            <Box display="flex" flexWrap="wrap" my={2}>
              <ScenarioTree scenario={scenario} />
              <ScenarioView scenario={scenario} t={(key) => t[key]} />
            </Box>
          </article>
        ) : (
          <ScenarioChart scenario={scenario} />
        )}
      </Paper>

      <Link
        href={`/lostrpg/scenario/[lng]/list`}
        as={`/lostrpg/scenario/${lng}/list`}
      >
        {t['common_back']}
      </Link>
    </Container>
  )
}

export default Page
