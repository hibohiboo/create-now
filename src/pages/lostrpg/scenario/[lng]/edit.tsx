/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
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
import ScenarioChart from '~/components/organisms/lostrpg/ScenarioChart'

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
          <h2>
            {t('lostrpg_common_scenario')}
            {vm.id ? t('common_edit') : t('common_create')}
          </h2>
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
              <Box display="flex" flexWrap="wrap">
                <Box flex={1} mx={2} style={{ maxWidth: '400px' }}>
                  <TextAreaField
                    model={vm.scenario}
                    prop="md"
                    labelText={t('lostrpg_common_scenario')}
                    changeHandler={vm.scenarioHandler}
                  />
                </Box>
                <article style={{ maxWidth: '650px', overflow: 'auto' }}>
                  <Box display="flex" flexWrap="wrap" my={2}>
                    <ScenarioTree scenario={vm.scenario} />
                    <ScenarioView scenario={vm.scenario} t={t} />
                  </Box>
                </article>
              </Box>
            ) : vm.tabValue === 1 ? (
              <article>
                <Box display="flex" flexWrap="wrap" my={2}>
                  <ScenarioTree scenario={vm.scenario} />
                  <ScenarioView scenario={vm.scenario} t={t} />
                </Box>
              </article>
            ) : (
              <ScenarioChart scenario={vm.scenario} />
            )}
          </Paper>
          <Paper>
            <Box my={2}>
              <ImageZone
                label={t('common_image')}
                fileHandler={vm.setImageHandler}
              />
            </Box>
            <Box my={2}>
              <InputField
                model={vm.scenario}
                prop="creatorName"
                labelText={t('lostrpg_boss_common_creatorName')}
                changeHandler={vm.creatorNameHandler}
              />
            </Box>
            <Box m={2}>
              <InputLabel>{t('lostrpg_common_publish')}</InputLabel>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                onChange={vm.publishHandler}
                checked={vm.scenario.isPublish}
                label={t('lostrpg_common_publish')}
                value={vm.scenario.isPublish}
              />
            </Box>

            <Box my={2}>
              <Button
                startIcon={<Save />}
                onClick={vm.editHandler}
                variant="contained"
                color="primary"
              >
                {t('common_save')}
              </Button>
            </Box>
            {!vm.id ? (
              <></>
            ) : (
              <Box my={4}>
                <Button
                  startIcon={<DeleteOutline />}
                  onClick={vm.deleteHandler}
                  variant="contained"
                  color="secondary"
                >
                  {t('common_delete')}
                </Button>
              </Box>
            )}

            <Link href={`/lostrpg/scenario/[lng]/list`} as={vm.beforePage}>
              {t('common_back')}
            </Link>
          </Paper>
        </Container>
      )}
    </>
  )
}
export default Page
