import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { Box, Chip, InputLabel } from '@material-ui/core'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import InputField from '~/components/form/InputField'
import { canEdit } from '~/firestore/camp'
import {
  Camp,
  useCampsCharacters,
  fetchCampsCharacters,
  useCampViewModel,
} from '~/store/modules/lostModule'
import { AuthUser } from '~/store/modules/authModule'
import * as data from '~/data/lostrpg'
import useI18n from '~/hooks/use-i18n'
import * as tableConfig from '~/lib/constants'
import SocialMeta from '~/components/SocialMeta'

const Page: React.FC<{ camp: Camp; id: string; authUser: AuthUser }> = (
  ctx,
) => {
  const { camp, id, authUser } = ctx
  const beforePage = '/lostrpg/camps/list'
  const campsCharacters = useCampsCharacters()
  const vm = useCampViewModel()
  const dispatch = useDispatch()
  const i18n = useI18n()
  const t = i18n.t
  useEffect(() => {
    dispatch(fetchCampsCharacters(id))
  }, [])

  return (
    <Container>
      <Head>
        <title>{camp.name}</title>
      </Head>
      <SocialMeta
        title={camp.name}
        description={camp.summary}
        url={`/lostrpg/public/ja/camp?id=${id}`}
        image={camp.imageUrl}
      />
      <Box my={4}>
        <div style={{ maxWidth: '500px', minWidth: '200px' }}>
          <h2>{camp.name}</h2>
          {!canEdit(authUser, camp) ? (
            <></>
          ) : (
            <Box my={1}>
              <Link href={{ pathname: '/lostrpg/camps/edit', query: { id } }}>
                {t('common_edit')}
              </Link>
            </Box>
          )}
        </div>
      </Box>
      <Box style={{ width: '100%' }} display="flex" flexWrap="wrap">
        {camp.imageUrl ? (
          <Box
            border={1}
            style={{
              minWidth: '320px',
            }}
          >
            <img alt="キャンプ画像" src={camp.imageUrl} />{' '}
          </Box>
        ) : (
          <></>
        )}

        {camp.summary.trim() ? (
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {camp.summary}
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box my={2}>
        <InputLabel>メンバー</InputLabel>
        {campsCharacters.map((c) =>
          i18n.activeLocale === 'ja' ? (
            <Link
              href={{
                pathname: `/lostrpg/public/ja/characters/[id]`,
                query: { id: c.characterId },
              }}
              as={`/lostrpg/public/ja/characters/${c.characterId}`}
              key={c.characterId}
              style={{ margin: '15px' }}
            >
              {c.characterName}
            </Link>
          ) : (
            <Link
              href={{
                pathname: `/lostrpg/public/[lng]/[view]`,
                query: { id: c.characterId },
              }}
              as={`/lostrpg/public/${i18n.activeLocale}/character?id=${c.characterId}`}
              key={c.characterId}
              style={{ margin: '15px' }}
            >
              {c.characterName}
            </Link>
          ),
        )}
      </Box>

      <Box my={4}>
        <MaterialTable
          title="施設"
          options={{
            search: false,
            sorting: false,
            paging: false,
            draggable: false, // error server contextがtrueだと発生
            rowStyle: {
              whiteSpace: 'nowrap',
            },
            headerStyle: {
              whiteSpace: 'nowrap',
            },
          }}
          localization={{
            header: {
              actions: '',
            },
          }}
          columns={data.facilitiesColumns}
          data={camp.facilities}
        />
      </Box>
      <Box my={4}>
        <MaterialTable
          title={t('lostrpg_common_storage')}
          options={tableConfig.viewTable}
          columns={vm.itemsColumns}
          data={camp.items}
        />
      </Box>
      <Box my={2} display="flex" style={{ maxWidth: 400, minWidth: 200 }}>
        <InputField
          model={camp}
          type="number"
          prop="unusedCampPoint"
          labelText={t('lostrpg_common_unusedCampPoint')}
          readonly={true}
        />
        <InputField
          model={camp}
          type="number"
          prop="totalCampPoint"
          labelText={t('lostrpg_common_totalCampPoint')}
          readonly={true}
        />
      </Box>
      {camp.freeWriting ? (
        <Box my={2} style={{ width: '100%' }}>
          <InputLabel>{t('common_detail')}</InputLabel>
          <Box
            border={1}
            p={1}
            style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
          >
            {camp.freeWriting}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Link href={beforePage}>戻る</Link>
    </Container>
  )
}

export default Page
