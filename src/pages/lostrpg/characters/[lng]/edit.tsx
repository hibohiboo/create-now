/* eslint-disable react/display-name */
import cloneDeep from 'lodash/cloneDeep'
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
import InputField from '~/components/form/memo/InputField'
import SelectField from '~/components/form/memo/SelectField'
import TextAreaField from '~/components/form/memo/TextAreaField'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import SpecialtiesTable from '~/components/organisms/lostrpg/memo/SpecialtiesTable'
import DamageTable from '~/components/organisms/lostrpg/memo/DamageTable'
import EditableMaterialTable from '~/components/organisms/mui/memo/EditableMaterialTable'
import SpecialtiesTooltip from '~/components/organisms/lostrpg/SpecialtiesTooltip'
import { contentLanguageMap } from '~/lib/i18n'
import {
  useCharacterEditViewModel,
  Item,
  Bag,
} from '~/store/modules/lostModule'
import * as tableConfig from '~/lib/constants'
import EquipmentsTable from '~/components/organisms/mui/memo/EquipmentsTable'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'

const Page: NextPage = () => {
  let t0 = null
  if (globalThis.performance) t0 = globalThis.performance.now()
  const vm = useCharacterEditViewModel()
  let t1 = null
  if (globalThis.performance) t1 = globalThis.performance.now()
  console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.')
  const t = vm.i18n.t
  // if (!vm.authUser) return <></>
  const titleSuffix = vm.id ? t('common_edit') : t('common_create')

  return (
    <Container>
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[vm.i18n.activeLocale]}
        />
        <title>{t('lostrpg_index_title')}</title>
      </Head>
      <div style={{ display: 'none' }}>
        <LanguageSelector i18n={vm.i18n} />
      </div>
      <Box my={4} style={{ maxWidth: '800px', minWidth: '200px' }}>
        <Title
          title={t('lostrpg_character_edit_title')}
          titleSuffix={titleSuffix}
        />
        <Box my={2}>
          <InputField
            value={vm.character.playerName}
            labelText={t('common_playerName')}
            changeHandler={vm.playerNameHandler}
          />
          <Supplement
            label={t('lostrpg_character_common_use_supplement')}
            useStrangeFieldHandler={vm.useStrangeFieldHandler}
            useStrangeField={vm.character.useStrangeField}
            strangeFieldLabel={t('lostrpg_character_common_strange_field')}
            useDragonPlain={vm.character.useDragonPlain}
            useDragonPlainHandler={vm.useDragonPlainHandler}
            labelDragonPlain={t('lostrpg_character_common_dragon_plain')}
          />
          <Box my={1}>
            <SelectField
              id="camp-select"
              items={React.useMemo(() => cloneDeep(vm.camps), [
                vm.camps.length,
              ])}
              value={vm.character.campId}
              valueProp={'id'}
              unselectedText={t('common_unselected')}
              labelText={t('lostrpg_common_camp')}
              changeHandler={vm.campHandler}
            />
          </Box>
          <CharacterName
            label={t('lostrpg_character_common_characterName')}
            error={!vm.character.name && vm.isValidError}
            helperText={vm.characterNameHelperText}
            value={vm.character.name}
            onChange={vm.characterNameHandler}
          />
        </Box>
        <CharacterImage
          label={t('common_image')}
          prevUrl={vm.prevUrl}
          onDrop={vm.handleOnDrop}
        />
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
          <CharacterClasses
            classes={vm.character.classes}
            classItemHandler={vm.classItemHandler}
          />
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
          data={React.useMemo(() => cloneDeep(vm.character.abilities), [
            vm.character.abilities.length,
            vm.abilityTableCount,
          ])}
          rowAddHandler={vm.abilityAddhandler}
          rowUpdateHandler={vm.abilityUpdateHandler}
          rowDeleteHandler={vm.abilityDeleteHandler}
        />
        <Box my={2} display="flex">
          <InputField
            value={vm.character.staminaBase}
            type="number"
            labelText={t('lostrpg_character_common_staminaBase')}
            changeHandler={vm.staminaBaseHandler}
          />
          <InputField
            value={vm.character.stamina}
            type="number"
            labelText={t('lostrpg_character_common_stamina')}
            changeHandler={vm.staminaHandler}
          />
        </Box>
        <Box my={2} display="flex">
          <InputField
            value={vm.character.willPowerBase}
            type="number"
            labelText={t('lostrpg_character_common_willPowerBase')}
            changeHandler={vm.willPowerBaseHandler}
          />
          <InputField
            value={vm.character.willPower}
            type="number"
            labelText={t('lostrpg_character_common_willPower')}
            changeHandler={vm.willPowerHandler}
          />
        </Box>
        <Box my={2} display="flex">
          <InputField
            value={vm.character.carryingCapacity}
            type="number"
            labelText={t('lostrpg_character_common_carryingCapacity')}
            changeHandler={vm.carryingCapacityHandler}
          />
          <InputField
            value={vm.totalWeight}
            type="number"
            labelText={t('lostrpg_character_common_item_weight')}
            readonly={true}
          />
          <InputField
            value={vm.totalValue}
            type="number"
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
            data={React.useMemo(() => cloneDeep(vm.character.items), [
              vm.itemTableEditCount,
            ])}
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
          <Bags
            t={t}
            bags={vm.character.bags}
            items={vm.items}
            itemsColumns={vm.itemsColumns}
            bagChangeHandler={vm.bagChangeHandler}
            bagRemoveHandler={vm.bagRemoveHandler}
            bagCapacityHandler={vm.bagCapacityHandler}
            bagItemSelectHandler={vm.bagItemSelectHandler}
            addBagItemHandler={vm.addBagItemHandler}
            updateBagItemHandler={vm.updateBagItemHandler}
            deleteBagItemHandler={vm.deleteBagItemHandler}
          />
        </Box>
        <Box my={2}>
          {/* <Equipments
            t={t}
            vmItems={vm.items}
            equipmentColumns={vm.equipmentColumns}
            equipments={vm.equipments}
            equipmentChangeHandler={vm.equipmentChangeHandler}
            equipmentMap={vm.equipmentMap}
          /> */}
          <EquipmentsTable
            title={t('lostrpg_character_common_equipment')}
            unselectedText={t('common_unselected')}
            labelText={`${t('lostrpg_character_common_equipment')}${t(
              'common_add',
            )}`}
            columns={vm.equipmentColumns}
            data={vm.equipments}
            equipmentMap={vm.equipmentMap}
            equipmentChangeHandler={vm.equipmentChangeHandler}
          />
        </Box>

        <Box my={2}>
          <Aliments
            t={t}
            statusAilmentsHandler={vm.statusAilmentsHandler}
            statusAilments={vm.statusAilments}
          />
        </Box>
        <Backbone
          t={t}
          useStrangeField={vm.character.useStrangeField}
          backbones={vm.character.backbones}
          backboneList={vm.backboneList}
          backboneColumns={vm.backboneColumns}
          backboneHandler={vm.backboneHandler}
          addBackBoneHandler={vm.addBackBoneHandler}
          updateBackboneHandler={vm.updateBackboneHandler}
          deleteBackboneHandler={vm.deleteBackboneHandler}
        />
        <Box my={2} display="flex">
          <InputField
            value={vm.character.unusedExperience}
            type="number"
            labelText={t('lostrpg_character_common_unusedExperiencePoint')}
            changeHandler={vm.unUsedExperienceHandler}
          />
          <InputField
            value={vm.character.totalExperience}
            type="number"
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
            value={vm.character.quote}
            type="text"
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
        <DeleteButton vm={vm} t={t} />
        <RecordSheets vm={vm} t={t} />
      </Box>
      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={vm.exportXml}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
        >
          ユドナリウムコマ出力
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={vm.exportJson}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
        >
          TRPGスタジオ用テキスト出力
        </Button>
      </Box>
      <Link href={`/lostrpg/characters/[lng]/list`} as={vm.beforePage}>
        {t('common_back')}
      </Link>
    </Container>
  )
}

export default Page

const DeleteButton = ({ vm, t }) => {
  if (!vm.id) return <></>

  return (
    <Box my={4}>
      <Button onClick={vm.deleteHandler} variant="contained" color="secondary">
        {t('common_delete')}
      </Button>
    </Box>
  )
}

const RecordSheets = ({ vm, t }) => {
  if (!vm.id) return <></>
  return (
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
            value={vm.totalRecordExp}
            type="number"
            labelText={t('lostrpg_character_common_totalExperiencePoint')}
            readonly={true}
          />
        </Box>
      </Box>

      <RecordTable
        t={t}
        hasSheets={vm.records.length !== 0}
        lng={vm.i18n.activeLocale}
        recordsColumns={vm.recordsColumns}
        authUser={vm.authUser}
        id={vm.id}
        records={vm.records}
      />
    </Box>
  )
}

const RecordTable = React.memo<{
  t: any
  hasSheets: any
  lng: any
  authUser: any
  id: any
  recordsColumns: any
  records: any
}>(({ t, hasSheets, lng, authUser, id, recordsColumns, records }) => {
  console.log('render record sheet')
  if (!hasSheets) return <></>
  return (
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
                  lng,
                  id: rowData['recordId'],
                },
              }}
              as={`/lostrpg/public/${lng}/record?id=${rowData['recordId']}`}
            >
              {rowData['scenarioTitle']}
            </Link>
          ),
        },
        ...recordsColumns,
        {
          title: '',
          // eslint-disable-next-line react/display-name
          render: (rowData) => {
            if (!authUser) return <></>
            if (authUser.uid !== rowData['uid']) return <></>
            return (
              <Link
                href={{
                  pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                  query: {
                    lng: lng,
                    characterId: rowData['characterId'],
                    id: rowData['recordId'],
                  },
                }}
                as={`/lostrpg/records/${lng}/${id}/edit?id=${rowData['recordId']}`}
              >
                {t('common_edit')}
              </Link>
            )
          },
        },
      ]}
      data={cloneDeep(records)}
    />
  )
})

const Bags = React.memo<{
  t: any
  items: any
  itemsColumns: any
  bags: any
  bagChangeHandler: any
  bagRemoveHandler: any
  bagCapacityHandler: any
  bagItemSelectHandler: any
  addBagItemHandler: any
  updateBagItemHandler: any
  deleteBagItemHandler: any
}>(
  ({
    t,
    items,
    itemsColumns,
    bags,
    bagChangeHandler,
    bagRemoveHandler,
    bagCapacityHandler,
    bagItemSelectHandler,
    addBagItemHandler,
    updateBagItemHandler,
    deleteBagItemHandler,
  }) => {
    console.log(`bags render`)
    return bags.map((bag) => {
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
              value={bag.name}
              type="string"
              labelText={t('common_name')}
              changeHandler={(e) => bagChangeHandler(e, bag)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => bagRemoveHandler(bag)}
            >
              <DeleteOutline />
            </Button>
          </Box>

          <Box my={2} display="flex">
            <InputField
              value={bag.capacity}
              type="number"
              labelText={t('lostrpg_character_common_bag_capacity')}
              changeHandler={(e) => bagCapacityHandler(e, bag)}
            />
            <InputField
              value={bag.items.reduce(
                (sum, { weight, number }) => sum + weight * number,
                0,
              )}
              type="number"
              labelText={t('lostrpg_character_common_item_weight')}
              readonly={true}
            />
          </Box>
          <SelectField
            id={`${bag.id}-items-select`}
            items={items}
            value={''}
            unselectedText={t('common_unselected')}
            labelText={t('lostrpg_character_edit_addItem')}
            changeHandler={(item: Item | null) =>
              bagItemSelectHandler(item, bag)
            }
          />

          <EditableMaterialTable
            title={t('lostrpg_character_common_item')}
            columns={itemsColumns}
            data={cloneDeep(bag.items)}
            rowAddHandler={(n) => addBagItemHandler(n, bag)}
            rowUpdateHandler={(n, o) => updateBagItemHandler(n, o, bag)}
            rowDeleteHandler={(o) => deleteBagItemHandler(o, bag)}
          />
        </Box>
      )
    })
  },
)

const Equipments = React.memo<{
  t: any
  vmItems: any
  equipments: any
  equipmentChangeHandler: any
  equipmentColumns: any
  equipmentMap: any
}>(
  ({
    t,
    equipmentColumns,
    equipments,
    equipmentChangeHandler,
    equipmentMap,
  }) => {
    console.log('render equipment')
    return (
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
              const items = equipmentMap.get(rowData['equipedArea'])
              return (
                <Box style={{ minWidth: '100px' }}>
                  <SelectField
                    id={`${rowData['equipedArea']}-equip-items-select`}
                    items={items}
                    value={rowData['name']}
                    unselectedText={t('common_unselected')}
                    labelText={`${t('lostrpg_character_common_equipment')}${t(
                      'common_add',
                    )}`}
                    changeHandler={(item: Item | null) =>
                      equipmentChangeHandler(item, rowData)
                    }
                  />
                </Box>
              )
            },
          },
          ...equipmentColumns,
        ]}
        data={equipments}
      />
    )
  },
)

const Title = React.memo<{ title: string; titleSuffix: string }>(
  ({ title, titleSuffix }) => {
    console.log('title')
    return (
      <h2>
        {title}
        {titleSuffix}
      </h2>
    )
  },
)

const Supplement = React.memo<{
  label: string
  useStrangeField: boolean
  useStrangeFieldHandler: any
  strangeFieldLabel: string
  useDragonPlain: boolean
  useDragonPlainHandler: any
  labelDragonPlain: string
}>(
  ({
    label,
    useStrangeField,
    useStrangeFieldHandler,
    strangeFieldLabel,
    useDragonPlain,
    useDragonPlainHandler,
    labelDragonPlain,
  }) => {
    return (
      <Box m={2}>
        <InputLabel>{label}</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={useStrangeField}
              onChange={useStrangeFieldHandler}
              color="primary"
            />
          }
          label={strangeFieldLabel}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={useDragonPlain || false}
              onChange={useDragonPlainHandler}
              color="primary"
            />
          }
          label={labelDragonPlain}
        />
      </Box>
    )
  },
)

const CharacterName = React.memo<{
  label: string
  error: boolean
  helperText: string
  value: string
  onChange: any
}>(({ label, error, helperText, value, onChange }) => (
  <FormControl fullWidth style={{ marginTop: '10px' }}>
    <TextField
      id="characterName"
      required
      label={label}
      error={error}
      helperText={helperText}
      value={value}
      onChange={onChange}
    />
  </FormControl>
))

const CharacterImage = React.memo<{
  label: string
  prevUrl: string
  onDrop: any
}>(({ label, prevUrl, onDrop }) => {
  return (
    <Box my={2}>
      <InputLabel>{label}</InputLabel>
      <Dropzone onDrop={onDrop} accept="image/*">
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
              {prevUrl ? (
                <img style={{ width: '100%' }} alt={label} src={prevUrl} />
              ) : (
                <></>
              )}
            </Box>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </Box>
  )
})
const CharacterClasses = React.memo<{ classes: any; classItemHandler: any }>(
  ({ classes, classItemHandler }) => {
    console.log('class list')
    return (
      <List aria-label="classes">
        {classes.map((item) => (
          <ListItem button key={item.name}>
            <ListItemIcon onClick={() => classItemHandler(item)}>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    )
  },
)

const Aliments = React.memo<{
  t: any
  statusAilmentsHandler: any
  statusAilments: any
}>(({ t, statusAilmentsHandler, statusAilments }) => {
  console.log('render 変調')
  return (
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
                onChange={() => statusAilmentsHandler(rowData)}
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
      data={statusAilments}
    />
  )
})

const Backbone = React.memo<{
  t: any
  useStrangeField: any
  backbones: any
  backboneList: any
  backboneHandler: any
  backboneColumns: any
  addBackBoneHandler: any
  updateBackboneHandler: any
  deleteBackboneHandler: any
}>(
  ({
    t,
    useStrangeField,
    backbones,
    backboneList,
    backboneHandler,
    backboneColumns,
    addBackBoneHandler,
    updateBackboneHandler,
    deleteBackboneHandler,
  }) => {
    console.log('render backbone')
    if (!useStrangeField) return <></>
    return (
      <>
        <Box my={2}>
          <SelectField
            id="backbone-select"
            items={backboneList}
            value={''}
            unselectedText={t('common_unselected')}
            labelText={t('lostrpg_character_common_backbone')}
            changeHandler={backboneHandler}
          />
        </Box>
        <EditableMaterialTable
          title={t('lostrpg_character_common_backbone')}
          columns={backboneColumns}
          data={cloneDeep(backbones)}
          rowAddHandler={addBackBoneHandler}
          rowUpdateHandler={updateBackboneHandler}
          rowDeleteHandler={deleteBackboneHandler}
        />
      </>
    )
  },
)
