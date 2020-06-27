/* eslint-disable react/display-name */
import * as _ from 'lodash'
import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Dropzone from 'react-dropzone'
import {
  Box,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteOutline, Save } from '@material-ui/icons'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import InputField from '~/components/form/InputField'
import SelectField from '~/components/form/SelectField'
import TextAreaField from '~/components/form/TextAreaField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import DamageTable from '~/components/organisms/lostrpg/DamageTable'
import EditableMaterialTable from '~/components/organisms/mui/EditableMaterialTable'
import SpecialtiesTooltip from '~/components/organisms/lostrpg/SpecialtiesTooltip'
import { contentLanguageMap } from '~/lib/i18n'
import { useCharacterEditViewModel, Item } from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'

const Page: NextPage = () => {
  const vm = useCharacterEditViewModel()
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
            <title>{t('lostrpg_index_title')}</title>
          </Head>
          <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
            <h2>
              {t('lostrpg_character_edit_title')}
              {vm.id ? t('common_edit') : t('common_create')}
            </h2>
            <Box my={2}>
              <InputField
                model={vm.character}
                type="text"
                prop="playerName"
                labelText={t('common_playerName')}
                changeHandler={vm.playerNameHandler}
              />
              <Box m={2}>
                <InputLabel>
                  {t('lostrpg_character_common_use_supplement')}
                </InputLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vm.character.useStrangeField}
                      onChange={vm.useStrangeFieldHandler}
                      color="primary"
                    />
                  }
                  label={t('lostrpg_character_common_strange_field')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vm.character.useDragonPlain}
                      onChange={vm.useDragonPlainHandler}
                      color="primary"
                    />
                  }
                  label={t('lostrpg_character_common_dragon_plain')}
                />
              </Box>

              <Box my={1}>
                <SelectField
                  id="camp-select"
                  items={_.cloneDeep(vm.camps)}
                  value={vm.character.campId}
                  valueProp={'id'}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_common_camp')}
                  changeHandler={vm.campHandler}
                />
              </Box>

              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <TextField
                  id="characterName"
                  required
                  label={t('lostrpg_character_common_characterName')}
                  error={!vm.character.name && vm.isValidError}
                  helperText={vm.characterNameHelperText}
                  value={vm.character.name}
                  onChange={vm.characterNameHandler}
                />
              </FormControl>
            </Box>

            <Box my={2}>
              <InputLabel>{t('common_image')}</InputLabel>
              <Dropzone onDrop={vm.handleOnDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <Box
                      border={1}
                      style={{
                        maxWidth: '480px',
                        minHeight: '100px',
                        overflow: 'hidden',
                      }}
                    >
                      {vm.prevUrl ? (
                        <img
                          style={{ width: '100%' }}
                          alt={t('common_image')}
                          src={vm.prevUrl}
                        />
                      ) : (
                        <></>
                      )}
                    </Box>
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
            </Box>

            <Box my={2}>
              <Box my={1}>
                <SelectField
                  id="class-select"
                  items={vm.classList}
                  value={''}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_character_edit_addClass')}
                  changeHandler={vm.classHandler}
                />
              </Box>
              <InputLabel>{t('lostrpg_character_common_class')}</InputLabel>
              <List aria-label="classes">
                {vm.character.classes.map((item) => (
                  <ListItem button key={item.name}>
                    <ListItemIcon onClick={() => vm.classItemHandler(item)}>
                      <DeleteOutline />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box my={2}>
              <SpecialtiesTooltip
                label={t('lostrpg_character_common_specialty')}
                help={t('lostrpg_character_edit_specialtiesHelp')}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={vm.specialtiesHandler}
              >
                {t('lostrpg_character_edit_resetDamage')}
              </Button>

              <SpecialtiesTable
                columns={vm.specialtiesTableColumns}
                rows={vm.specialtiesTableRows}
                gapHandler={vm.gapHandler}
                specialtyHandler={vm.specialtyHandler}
                damageHandler={vm.damageHandler}
              />
            </Box>
            <Box my={2}>
              <InputLabel>
                {t('lostrpg_character_common_choosedSpacialty')}
              </InputLabel>
              <Box m={2}>
                {vm.character.specialties.map((name) => (
                  <Chip style={{ margin: '0.5rem' }} key={name} label={name} />
                ))}
              </Box>
            </Box>
            <Box my={2}>
              <InputLabel>
                {t('lostrpg_character_common_bodyPartsTable')}
              </InputLabel>

              <DamageTable
                sevenLabel={t('lostrpg_character_common_attackersChoice')}
                rows={vm.damageBodyParts}
                damageHandler={vm.damageHandler}
              />
            </Box>

            <Box my={2}>
              <SelectField
                id="ability-select"
                items={vm.abilityList}
                value={''}
                unselectedText={t('common_unselected')}
                labelText={t('lostrpg_character_edit_addAbility')}
                changeHandler={vm.abilitySelectHandler}
              />
            </Box>

            <EditableMaterialTable
              title={t('lostrpg_character_common_ability')}
              columns={vm.abilitiesColumns}
              data={_.cloneDeep(vm.character.abilities)}
              rowAddHandler={vm.abilityAddhandler}
              rowUpdateHandler={vm.abilityUpdateHandler}
              rowDeleteHandler={vm.abilityDeleteHandler}
            />

            <Box my={2} display="flex">
              <InputField
                model={vm.character}
                type="number"
                prop="staminaBase"
                labelText={t('lostrpg_character_common_staminaBase')}
                changeHandler={vm.staminaBaseHandler}
              />
              <InputField
                model={vm.character}
                type="number"
                prop="stamina"
                labelText={t('lostrpg_character_common_stamina')}
                changeHandler={vm.staminaHandler}
              />
            </Box>
            <Box my={2} display="flex">
              <InputField
                model={vm.character}
                type="number"
                prop="willPowerBase"
                labelText={t('lostrpg_character_common_willPowerBase')}
                changeHandler={vm.willPowerBaseHandler}
              />
              <InputField
                model={vm.character}
                type="number"
                prop="willPower"
                labelText={t('lostrpg_character_common_willPower')}
                changeHandler={vm.willPowerHandler}
              />
            </Box>

            <Box my={2} display="flex">
              <InputField
                model={vm.character}
                type="number"
                prop="carryingCapacity"
                labelText={t('lostrpg_character_common_carryingCapacity')}
                changeHandler={vm.carryingCapacityHandler}
              />
              <InputField
                model={vm}
                type="number"
                prop="totalWeight"
                labelText={t('lostrpg_character_common_item_weight')}
                readonly={true}
              />
              <InputField
                model={vm}
                type="number"
                prop="totalValue"
                labelText={t('lostrpg_character_common_totalValue')}
                readonly={true}
              />
            </Box>
            <Box my={2}>
              <Box my={2}>
                <SelectField
                  id="items-select"
                  items={vm.items}
                  value={''}
                  unselectedText={t('common_unselected')}
                  labelText={t('lostrpg_character_edit_addItem')}
                  changeHandler={vm.itemSelectHandler}
                />
              </Box>
              <EditableMaterialTable
                title={t('lostrpg_character_common_item')}
                columns={vm.itemsColumns}
                data={_.cloneDeep(vm.character.items)}
                rowAddHandler={vm.addItemHandler}
                rowUpdateHandler={vm.updateItemHandler}
                rowDeleteHandler={vm.deleteItemHandler}
              />
            </Box>
            <Box
              my={2}
              style={{
                padding: '5px',
                border: 'solid 1px rgba(224, 224, 224, 1)',
              }}
            >
              <InputLabel>{t('lostrpg_character_common_bag')}</InputLabel>
              <Box my={2}>
                <Button
                  onClick={vm.addBagHandler}
                  variant="contained"
                  color="primary"
                >
                  {`${t('lostrpg_character_common_bag')}${t('common_add')}`}
                </Button>
              </Box>
              {vm.character.bags.map((bag) => {
                return (
                  <Box
                    key={bag.id}
                    my={2}
                    style={{
                      padding: '5px',
                      border: 'solid 1px rgba(224, 224, 224, 1)',
                    }}
                  >
                    <Box display="flex">
                      <InputField
                        model={bag}
                        type="string"
                        prop="name"
                        labelText={t('common_name')}
                        changeHandler={(e) => vm.bagChangeHandler(e, bag)}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => vm.bagRemoveHandler(bag)}
                      >
                        <DeleteOutline />
                      </Button>
                    </Box>

                    <Box my={2} display="flex">
                      <InputField
                        model={bag}
                        type="number"
                        prop="capacity"
                        labelText={t('lostrpg_character_common_bag_capacity')}
                        changeHandler={(e) => vm.bagCapacityHandler(e, bag)}
                      />
                      <InputField
                        model={{
                          weight: bag.items.reduce(
                            (sum, { weight, number }) => sum + weight * number,
                            0,
                          ),
                        }}
                        type="number"
                        prop="weight"
                        labelText={t('lostrpg_character_common_item_weight')}
                        readonly={true}
                      />
                    </Box>
                    <SelectField
                      id={`${bag.id}-items-select`}
                      items={vm.items}
                      value={''}
                      unselectedText={t('common_unselected')}
                      labelText={t('lostrpg_character_edit_addItem')}
                      changeHandler={(item: Item | null) =>
                        vm.bagItemSelectHandler(item, bag)
                      }
                    />

                    <EditableMaterialTable
                      title={t('lostrpg_character_common_item')}
                      columns={vm.itemsColumns}
                      data={_.cloneDeep(bag.items)}
                      rowAddHandler={(n) => vm.addBagItemHandler(n, bag)}
                      rowUpdateHandler={(n, o) =>
                        vm.updateBagItemHandler(n, o, bag)
                      }
                      rowDeleteHandler={(o) => vm.deleteBagItemHandler(o, bag)}
                    />
                  </Box>
                )
              })}
            </Box>
            <Box my={2}>
              <MaterialTable
                title={t('lostrpg_character_common_equipment')}
                options={tableConfig.viewTable}
                columns={[
                  {
                    title: t('lostrpg_character_common_area'),
                    field: 'equipedArea',
                  },
                  {
                    title: t('common_name'),
                    field: 'name',
                    render: (rowData) => {
                      const items = vm.items.filter(
                        (i) =>
                          i.area === rowData['equipedArea'] ||
                          ([
                            t('lostrpg_character_common_rightHand'),
                            t('lostrpg_character_common_leftHand'),
                          ].includes(rowData['equipedArea']) &&
                            [
                              t('lostrpg_character_common_oneHand'),
                              t('lostrpg_character_common_twoHand'),
                            ].includes(i.area)),
                      )
                      return (
                        <Box style={{ minWidth: '100px' }}>
                          <SelectField
                            id={`${rowData['equipedArea']}-equip-items-select`}
                            items={items}
                            value={rowData['name']}
                            unselectedText={t('common_unselected')}
                            labelText={`${t(
                              'lostrpg_character_common_equipment',
                            )}${t('common_add')}`}
                            changeHandler={(item: Item | null) =>
                              vm.equipmentChangeHandler(item, rowData)
                            }
                          />
                        </Box>
                      )
                    },
                  },
                  ...vm.equipmentColumns,
                ]}
                data={vm.equipments}
              />
            </Box>

            <Box my={2}>
              <MaterialTable
                title={t('lostrpg_character_common_statusAilments')}
                options={tableConfig.viewTable}
                columns={[
                  {
                    title: '',
                    render: (rowData) => {
                      return (
                        <Checkbox
                          checked={rowData['isChecked']}
                          onChange={() => vm.statusAilmentsHandler(rowData)}
                        />
                      )
                    },
                  },
                  {
                    title: t('common_name'),
                    field: 'name',
                  },
                  {
                    title: t('common_effect'),
                    field: 'effect',
                  },
                ]}
                data={vm.statusAilments}
              />
            </Box>
            {!vm.character.useStrangeField ? (
              <></>
            ) : (
              <>
                <Box my={2}>
                  <SelectField
                    id="backbone-select"
                    items={vm.backboneList}
                    value={''}
                    unselectedText={t('common_unselected')}
                    labelText={t('lostrpg_character_common_backbone')}
                    changeHandler={vm.backboneHandler}
                  />
                </Box>
                <EditableMaterialTable
                  title={t('lostrpg_character_common_backbone')}
                  columns={vm.backboneColumns}
                  data={_.cloneDeep(vm.character.backbones)}
                  rowAddHandler={vm.addBackBoneHandler}
                  rowUpdateHandler={vm.updateBackboneHandler}
                  rowDeleteHandler={vm.deleteBackboneHandler}
                />
              </>
            )}

            <Box my={2} display="flex">
              <InputField
                model={vm.character}
                type="number"
                prop="unusedExperience"
                labelText={t('lostrpg_character_common_unusedExperiencePoint')}
                changeHandler={vm.unUsedExperienceHandler}
              />
              <InputField
                model={vm.character}
                type="number"
                prop="totalExperience"
                labelText={t('lostrpg_character_common_totalExperiencePoint')}
                changeHandler={vm.totalExperienceHandler}
              />
            </Box>

            <TextAreaField
              model={vm.character}
              prop="summary"
              labelText={t('common_summary')}
              changeHandler={vm.summaryHandler}
            />
            <TextAreaField
              model={vm.character}
              prop="appearance"
              labelText={t('lostrpg_character_common_appearance')}
              changeHandler={vm.appearanceHandler}
            />
            <TextAreaField
              model={vm.character}
              prop="freeWriting"
              labelText={t('lostrpg_character_common_memo')}
              changeHandler={vm.freeWritingHandler}
            />

            <Box my={2}>
              <InputField
                model={vm.character}
                type="text"
                prop="quote"
                labelText={t('lostrpg_character_common_quote')}
                changeHandler={vm.quoteHandler}
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
                  onClick={vm.deleteHandler}
                  variant="contained"
                  color="secondary"
                >
                  {t('common_delete')}
                </Button>
              </Box>
            )}
          </Box>
          {!vm.id ? (
            <></>
          ) : (
            <Box my={3}>
              <InputLabel>{t('lostrpg_records_common_recordsheet')}</InputLabel>
              <Box my={2} display="flex">
                <Link
                  href={{
                    pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                    query: {
                      lng: vm.i18n.activeLocale,
                      characterId: vm.id,
                    },
                  }}
                  as={`/lostrpg/records/${vm.i18n.activeLocale}/${vm.id}/edit`}
                >
                  {t('common_create')}
                </Link>
                <Box style={{ maxWidth: '100px', marginLeft: '20px' }}>
                  <InputField
                    model={vm}
                    type="number"
                    prop="totalRecordExp"
                    labelText={t(
                      'lostrpg_character_common_totalExperiencePoint',
                    )}
                    readonly={true}
                  />
                </Box>
              </Box>

              {vm.records.length === 0 ? (
                <></>
              ) : (
                <MaterialTable
                  title={t('lostrpg_records_common_recordsheet')}
                  options={tableConfig.viewTable}
                  columns={[
                    {
                      title: t('lostrpg_record_common_scenarioTitle'),
                      render: (rowData) => (
                        <Link
                          href={{
                            pathname: `/lostrpg/public/[lng]/record`,
                            query: {
                              lng: vm.i18n.activeLocale,
                              id: rowData['recordId'],
                            },
                          }}
                          as={`/lostrpg/public/${vm.i18n.activeLocale}/record?id=${rowData['recordId']}`}
                        >
                          {rowData['scenarioTitle']}
                        </Link>
                      ),
                    },
                    ...vm.recordsColumns,
                    {
                      title: '',
                      // eslint-disable-next-line react/display-name
                      render: (rowData) => {
                        if (!vm.authUser) return <></>
                        if (vm.authUser.uid !== rowData['uid']) return <></>
                        return (
                          <Link
                            href={{
                              pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                              query: {
                                lng: vm.i18n.activeLocale,
                                characterId: rowData['characterId'],
                                id: rowData['recordId'],
                              },
                            }}
                            as={`/lostrpg/records/${vm.i18n.activeLocale}/${vm.id}/edit?id=${rowData['recordId']}`}
                          >
                            {t('common_edit')}
                          </Link>
                        )
                      },
                    },
                  ]}
                  data={_.cloneDeep(vm.records)}
                />
              )}
            </Box>
          )}
          <Link href={`/lostrpg/characters/[lng]/list`} as={vm.beforePage}>
            {t('common_back')}
          </Link>
        </Container>
      )}
    </>
  )
}

export default Page
