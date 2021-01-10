import React, { useEffect } from 'react'
import { getCharacter } from '~/api/firestoreAPI'
import { getLocaleProps } from '~/lib/i18n'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import CharacterPage from '~/components/pages/lostrpg/ja/CharacterPage'
import { readCharacters } from '~/firestore/character'

function Page(props) {
  const { character, id, lng, lngDict } = props
  const authUser = useAuth()
  return (
     <CharacterPage character={character} id={id} authUser={authUser} />
  );
}

// SSGのビルド時のみ呼ばれるライフサイクル
//   -- `getStaticProps` より前に実行される
//   -- 対応する動的パラメータを配列で返す
export async function getStaticPaths() {
  const result = await readCharacters(null,1000)

  const paths = result.characters.map((c) => ({
    params: { id: c.id },
  }))

  return { paths };
}

// SSGのビルド時のみ呼ばれるライフサイクル
//   -- `getStaticPaths` より後に実行される
//   -- 引数には動的パラメータを含むコンテキストが渡される
export async function getStaticProps(context) {
  const id = context.params.id;
  const lng = 'ja'
  const { lngDict } = await getLocaleProps({ params: { lng } })
  const character = await getCharacter(id)
  return {
    props: {
      character,
      lng,
      id,
      lngDict
    },
  };
}

export default Page;
