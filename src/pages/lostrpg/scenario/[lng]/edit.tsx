/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core'
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

const createScene = (scene, pi) => (
  <section key={`scene-${pi}-${scene.name}`}>
    <h3>{scene.name}</h3>

    {/* <summary>{scene.name}</summary> */}
    {scene.lines.map((line) => (
      <p key={line}>{line}</p>
    ))}
  </section>
)

const createPhase = (phase, pi) => (
  <section key={`phase-${pi}-${phase.name}`}>
    <h2>{phase.name}</h2>
    {phase.scenes.map(createScene)}
  </section>
)

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
          <TextAreaField
            model={vm.scenario}
            prop="scenario"
            labelText={t('lostrpg_common_scenario')}
            changeHandler={vm.scenarioHandler}
          />
          <article>
            <Box display="flex">
              <ScenarioTree scenario={vm.scenario} />
              <Box mx={3}>
                <h1>{vm.scenario.name}</h1>
                {vm.scenario.phases.map(createPhase)}
              </Box>
            </Box>
          </article>
        </Container>
      )}
    </>
  )
}
export default Page
