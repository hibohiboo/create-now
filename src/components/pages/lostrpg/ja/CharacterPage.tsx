/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { Box, Chip, Checkbox, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { AuthUser } from '~/store/modules/authModule'
import InputField from '~/components/form/InputField'
import SpecialtiesTable from '~/components/organisms/lostrpg/SpecialtiesTable'
import {
  setCharacter,
  useCharacterEditViewModel,
  setLocale,
  Character,
  fetchCharactersRecords,
} from '~/store/modules/lostModule'
import { canEdit } from '~/firestore/character'
import * as tableConfig from '~/lib/constants'
import SocialMeta from '~/components/SocialMeta'
import styles from '../common.module.css'

const Page: React.FC<{
  character: Character
  id: string
  authUser: AuthUser
}> = (ctx) => {
  const dispatch = useDispatch()
  const vm = useCharacterEditViewModel()
  const { character, id, authUser } = ctx
  const beforePage = `/lostrpg/characters/ja/list`
  useEffect(() => {
    dispatch(setCharacter(character))
    dispatch(fetchCharactersRecords(id))
  }, [])
  const canedit = canEdit(authUser, character)

  return (
    <Container>
      <Head>
        <title>{character.name}</title>
      </Head>
      <SocialMeta
        title={character.name}
        description={character.summary}
        url={`/lostrpg/public/ja/character?id=${id}`}
        image={character.imageUrl}
      />

      <Box my={4}>
        <h1>{character.name}</h1>
      </Box>
      <CampName campId={character.campId} campName={character.campName} />
      <EditButton canedit={canedit} text="編集" id={id} />

      <Box my={4}>
        {character.quote ? (
          <q style={{ fontSize: '1.5rem' }}>{character.quote}</q>
        ) : (
          <></>
        )}
      </Box>
      <Box my={2}>
        <InputLabel>クラス</InputLabel>
        <Box m={2}>
          {character.classes.map((c) => (
            <Chip style={{ margin: '0.5rem' }} key={c.name} label={c.name} />
          ))}
        </Box>
      </Box>
      <Box style={{ width: '100%' }} display="flex" flexWrap="wrap">
        {character.imageUrl ? (
          <Box
            border={1}
            style={{
              minWidth: '320px',
            }}
          >
            <img alt="画像" src={character.imageUrl} id={vm.imgId} />
          </Box>
        ) : (
          <></>
        )}
        {character.summary.trim() ? (
          <Box
            className={styles.textArea}
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {character.summary}
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box my={2}>
        <SpecialtiesTable
          columns={vm.specialtiesTableColumns}
          rows={vm.specialtiesTableRows}
          gapHandler={() => {}}
          specialtyHandler={() => {}}
          damageHandler={() => {}}
        />
      </Box>
      <Box my={2}>
        <InputLabel>習得特技</InputLabel>
        <Box m={2}>
          {character.specialties.map((name) => (
            <Chip style={{ marginLeft: '0.5rem' }} key={name} label={name} />
          ))}
        </Box>
      </Box>
      <Box my={4}>
        <MaterialTable
          title="アビリティ"
          options={tableConfig.viewTable}
          columns={vm.abilitiesColumns}
          data={character.abilities}
        />
      </Box>

      <Box my={2} display="flex" flexWrap="wrap">
        <Box my={2} display="flex" style={{ maxWidth: 400, minWidth: 200 }}>
          <InputField
            model={character}
            type="number"
            prop="staminaBase"
            labelText="体力基準値"
            readonly={true}
          />
          <InputField
            model={character}
            type="number"
            prop="stamina"
            labelText="体力"
            readonly={true}
          />

          <InputField
            model={character}
            type="number"
            prop="willPowerBase"
            labelText="気力基準値"
            readonly={true}
          />
          <InputField
            model={character}
            type="number"
            prop="willPower"
            labelText="気力"
            readonly={true}
          />
        </Box>

        <Box my={2} display="flex" style={{ maxWidth: 300, minWidth: 150 }}>
          <InputField
            model={character}
            type="number"
            prop="carryingCapacity"
            labelText="所持限界"
            readonly={true}
          />
          <InputField
            model={vm}
            type="number"
            prop="totalWeight"
            labelText="アイテム重量"
            readonly={true}
          />
          <InputField
            model={vm}
            type="number"
            prop="totalValue"
            labelText="合計価格"
            readonly={true}
          />
        </Box>
      </Box>
      <Box my={4}>
        <MaterialTable
          title="アイテム"
          options={tableConfig.viewTable}
          columns={vm.itemsColumns}
          data={character.items}
        />
      </Box>
      <Box
        my={2}
        style={{
          padding: '5px',
          border: 'solid 1px rgba(224, 224, 224, 1)',
        }}
      >
        <InputLabel>袋</InputLabel>
        {character.bags.map((bag) => {
          return (
            <Box
              key={bag.id}
              my={2}
              style={{
                padding: '5px',
                border: 'solid 1px rgba(224, 224, 224, 1)',
              }}
            >
              <InputLabel>{bag.name}</InputLabel>
              <Box my={2} display="flex">
                <InputField
                  model={bag}
                  type="number"
                  prop="capacity"
                  labelText="袋容量"
                  readonly={true}
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
                  labelText="アイテム重量"
                  readonly={true}
                />
              </Box>
              <MaterialTable
                title="アイテム"
                options={tableConfig.viewTable}
                columns={vm.itemsColumns}
                data={bag.items}
              />
            </Box>
          )
        })}
      </Box>
      <Box my={2}>
        <MaterialTable
          title="装備"
          options={tableConfig.viewTable}
          columns={[
            { title: '部位', field: 'equipedArea' },
            { title: '名前', field: 'name' },
            ...vm.equipmentColumns,
          ]}
          data={vm.equipments}
        />
      </Box>
      <Box my={2}>
        <MaterialTable
          title={'変調'}
          options={tableConfig.viewTable}
          columns={[
            {
              title: '',
              // eslint-disable-next-line react/display-name
              render: (rowData) => <Checkbox checked={rowData['isChecked']} />,
            },
            {
              title: '名前',
              field: 'name',
            },
            {
              title: '効果',
              field: 'effect',
            },
          ]}
          data={vm.statusAilments}
        />
      </Box>
      {character.backbones.length === 0 ? (
        <></>
      ) : (
        <Box my={4}>
          <MaterialTable
            title="背景"
            options={tableConfig.viewTable}
            columns={vm.backboneColumns}
            data={character.backbones}
          />
        </Box>
      )}

      <Box my={2} display="flex" style={{ maxWidth: 300, minWidth: 150 }}>
        <InputField
          model={character}
          type="number"
          prop="unusedExperience"
          labelText="未使用経験点"
          readonly={true}
        />
        <InputField
          model={character}
          type="number"
          prop="totalExperience"
          labelText="総経験点"
          readonly={true}
        />
      </Box>

      {character.appearance ? (
        <Box my={2} style={{ width: '100%' }}>
          <InputLabel>容姿</InputLabel>
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {character.appearance}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {character.freeWriting ? (
        <Box my={2} style={{ width: '100%' }} className={styles.textArea}>
          <InputLabel>詳細</InputLabel>
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {character.freeWriting}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {!(character.useStrangeField || character.useDragonPlain) ? (
        <></>
      ) : (
        <Box my={2}>
          <InputLabel>使用サプリメント</InputLabel>
          {!character.useStrangeField ? (
            <></>
          ) : (
            <Chip style={{ margin: '0.5rem' }} label="終末列島百景" />
          )}
          {!character.useDragonPlain ? (
            <></>
          ) : (
            <Chip style={{ margin: '0.5rem' }} label="関ケ原暴竜平原" />
          )}
        </Box>
      )}
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
      <Box my={2}>
        レコードシート
        {!canEdit(authUser, character) ? (
          <></>
        ) : (
          <Box my={1}>
            <Link
              href={{
                pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                query: {
                  lng: 'ja',
                  characterId: id,
                },
              }}
              as={`/lostrpg/records/ja/${id}/edit`}
            >
              新規作成
            </Link>
            {vm.records.length === 0 ? (
              <></>
            ) : (
              <MaterialTable
                title="レコードシート"
                options={tableConfig.viewTable}
                columns={[
                  {
                    title: 'シナリオ名',
                    // eslint-disable-next-line react/display-name
                    render: (rowData) => (
                      <Link
                        href={{
                          pathname: `/lostrpg/public/[lng]/[view]`,
                          query: {
                            lng: 'ja',
                            id: rowData['recordId'],
                          },
                        }}
                        as={`/lostrpg/public/ja/record?id=${rowData['recordId']}`}
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
                      if (!authUser) return <></>
                      if (authUser.uid !== rowData['uid']) return <></>
                      return (
                        <Link
                          href={{
                            pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
                            query: {
                              lng: 'ja',
                              characterId: rowData['characterId'],
                              id: rowData['recordId'],
                            },
                          }}
                          as={`/lostrpg/records/ja/${id}/edit?id=${rowData['recordId']}`}
                        >
                          編集
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
      </Box>

      <Link href={`/lostrpg/characters/[lng]/list`} as={beforePage}>
        戻る
      </Link>
    </Container>
  )
}

export default Page

// eslint-disable-next-line react/display-name
const CampName = React.memo<{ campId: string; campName: string }>(
  ({ campId, campName }) => {
    console.log('Camp is renderd!')
    return campId ? (
      <h5>
        キャンプ:
        <Link
          href={{
            pathname: `/lostrpg/public/[lng]/[view]`,
            query: { id: campId },
          }}
          as={`/lostrpg/public/ja/camp?id=${campId}`}
        >
          {campName}
        </Link>
      </h5>
    ) : (
      <></>
    )
  },
)
const EditButton = React.memo<{
  canedit: boolean
  id: string
  text: string
}>(({ canedit, id, text }) => {
  return !canedit ? (
    <></>
  ) : (
    <Box my={1}>
      <Link
        href={{
          pathname: `/lostrpg/characters/[lng]/edit`,
          query: { id },
        }}
        as={`/lostrpg/characters/ja/edit?id=${id}`}
      >
        {text}
      </Link>
    </Box>
  )
})
