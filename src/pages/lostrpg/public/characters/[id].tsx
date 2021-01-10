import React, { useEffect } from 'react'
import { getCharacter } from '~/api/firestoreAPI'
import { useAuth } from '~/store/modules/authModule'
import CharacterPage from '~/components/pages/lostrpg/ja/CharacterPage'
import { readCharacters } from '~/firestore/character'

function Page(props) {
  const { character, id } = props
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

  return { paths, fallback: 'blocking' };
}

// SSGのビルド時のみ呼ばれるライフサイクル
//   -- `getStaticPaths` より後に実行される
//   -- 引数には動的パラメータを含むコンテキストが渡される
export async function getStaticProps(context) {
  const id = context.params.id;
  const character = await getCharacter(id)
  return {
    props: {
      character,
      id,
    },
  };
}

export default Page;
