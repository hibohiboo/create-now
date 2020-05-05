import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { Box, Chip, InputLabel } from '@material-ui/core'
import MaterialTable from 'material-table'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'

import { canEdit } from '~/firestore/camp'
import {
  Camp,
  useCampsCharacters,
  fetchCampsCharacters,
} from '~/store/modules/lostModule'
import { AuthUser } from '~/store/modules/authModule'
import * as data from '~/data/lostrpg'
import useI18n from '~/hooks/use-i18n'
const Page: React.FC<{ camp: Camp; id: string; authUser: AuthUser }> = (
  ctx,
) => {
  const { camp, id, authUser } = ctx
  const beforePage = '/lostrpg/camps/list'
  const campsCharacters = useCampsCharacters()
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

        <Box
          border={1}
          p={1}
          style={{ whiteSpace: 'pre-wrap', minWidth: '320px' }}
        >
          {camp.freeWriting}
        </Box>
      </Box>
      <Box my={2}>
        <InputLabel>メンバー</InputLabel>
        {campsCharacters.map((c) => (
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
        ))}
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

      <Link href={beforePage}>戻る</Link>
    </Container>
  )
}

export default Page
