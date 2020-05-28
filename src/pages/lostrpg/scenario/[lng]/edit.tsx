/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, Paper, Tabs, Tab } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import { DeleteOutline, Save } from '@material-ui/icons'
import MaterialTable from 'material-table'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import ImageZone from '~/components/organisms/lostrpg/ImageZone'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import TextAreaField from '~/components/form/TextAreaField'
import SelectField from '~/components/form/SelectField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import { contentLanguageMap } from '~/lib/i18n'
import { useScenarioEditViewModel } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import SpecialtiesTooltip from '~/components/organisms/lostrpg/SpecialtiesTooltip'
import ScenarioTree from '~/components/organisms/lostrpg/ScenarioTree'
import ScenarioView from '~/components/organisms/lostrpg/ScenarioView'

const Page: NextPage = () => {
  const vm = useScenarioEditViewModel()
  const t = vm.i18n.t
  return (
    <>
      {!vm.authUser ? (
        <></>
      ) : (
        <Container>
          <Head>
            <meta
              httpEquiv="content-language"
              content={contentLanguageMap[vm.i18n.activeLocale]}
            />
            <title>{t('lostrpg_common_scenario')}</title>
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
              integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
              crossOrigin="anonymous"
            />
          </Head>
          <div style={{ display: 'none' }}>
            <LanguageSelector i18n={vm.i18n} />
          </div>
          <h2>{t('lostrpg_common_scenario')}</h2>
          <p>
            <Link
              href="/lostrpg/scenario/[lng]/sample"
              as={`/lostrpg/scenario/${vm.i18n.activeLocale}/sample`}
            >
              {t('lostrpg_scenario_sample_title')}
            </Link>
          </p>
          <Paper>
            <Tabs
              value={vm.tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={vm.changeTabHandler}
              variant="scrollable"
              scrollButtons="on"
            >
              {_.map(vm.tabs, (value, key) => (
                <Tab key={key} label={value} />
              ))}
            </Tabs>
          </Paper>
          <Paper>
            {vm.tabValue === 0 ? (
              <TextAreaField
                model={vm.scenario}
                prop="md"
                labelText={t('lostrpg_common_scenario')}
                changeHandler={vm.scenarioHandler}
              />
            ) : (
              <article>
                <Box display="flex" flexWrap="wrap" my={2}>
                  <ScenarioTree scenario={vm.scenario} />
                  <ScenarioView scenario={vm.scenario} t={t} />
                </Box>
              </article>
            )}
          </Paper>
        </Container>
      )}
    </>
  )
}
export default Page
