import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useViewModel } from '~/store/modules/drift/viewModel'
export default function Home({
  allRoomData,
}: {
  allRoomData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const vm = useViewModel()
  return (
    <div className="chat-drift">
      <Head>
        <title>{vm.title}</title>
      </Head>
      <div id="elm-node"></div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allRoomData = []
  return {
    props: {
      allRoomData,
    },
  }
}
