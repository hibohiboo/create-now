import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect } from 'react'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import TyranoHead from '~/components/organisms/tyranoudon/TyranoHead'
import TyranoBody from '~/components/organisms/tyranoudon/TyranoBody'
import Layout from '~/components/templates/tyrano/Layout'
interface Prop {
  setting: { configs: any[] }
  name: SettingKeys
}
declare global {
  interface Window {
    TYRANO: {
      kag: {
        ftag: {
          startTag: (a: string, b: any) => void
          buildTag: (a: any[]) => void
        }
        parser: { parseScenario: (a: string) => { array_s: any[] } }
      }
    }
  }
}
interface TyranoChat {
  type: 'chat'
  payload: { scenario: string }
}

export const isChatMessage = (data: any): data is TyranoChat =>
  data.type === 'chat'

// https://kido0617.github.io/tyrano/2018-08-02-make-plugin/
// https://qiita.com/diyin_near_j/items/7f94c080add33d045654
export default function Home({ setting, name }: Prop) {
  const router = useRouter()
  const sheet = router.query.sheet as string

  useEffect(() => {
    if (!window) return
    window.addEventListener(
      'message',
      (event: MessageEvent) => {
        console.log(event)
        if (event.origin !== process.env.TYRANO_DOMAIN) return
        if (!isChatMessage(event.data)) return
        console.log('received chat message', event.data)
        const array_s = window.TYRANO.kag.parser.parseScenario(
          event.data.payload.scenario,
        ).array_s
        console.log('array_s', array_s)
        console.log('ftag', window.TYRANO.kag.ftag.buildTag)
        window.TYRANO.kag.ftag.buildTag(array_s)
      },
      false,
    )
  }, [])

  return (
    <>
      <TyranoHead name={name} />
      {sheet ? (
        <TyranoBody configs={setting.configs} name={name} sheet={sheet} />
      ) : (
        <TyranoBody configs={setting.configs} name={name} sheet={''} />
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = settingsKeys.map((repo) => `/tyrano/chatwindow/${repo}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const key: SettingKeys = isSettingsKeys(params.name) ? params.name : 'sample'
  const setting = settings[key]
  return {
    props: {
      setting,
      name: key,
    },
  }
}

const settings = {
  sample: {
    configs: [['chSpeed', '0']],
  },
  vchat: {
    configs: [
      ['vchat', 'true'],
      ['vchatMenuVisible', 'false'],
      ['configLeft', '750'],
      ['configTop', '1170'],
      ['alreadyReadTextColor', '0x87cefa'],
      ['defaultFontSize', '26'],
      ['defaultChColor', '0x242424'],
      ['chSpeed', '0'],
    ],
  },
  vchat_add: {
    configs: [
      ['alreadyReadTextColor', '0x87cefa'],
      ['defaultFontSize', '26'],
      ['defaultChColor', '0x242424'],
      ['chSpeed', '0'],
      ['ScreenCentering', 'false'],
      ['ScreenRatio', 'fix'],
    ],
  },
  // chat story
  // chat_talk: {
  //   configs: [
  //     ['scWidth', '860'],
  //     ['scHeight', '1280'],
  //     ['configLeft', '750'],
  //     ['configTop', '1170'],
  //     ['alreadyReadTextColor', '0x87cefa'],
  //     ['defaultFontSize', '26'],
  //     ['defaultChColor', '0x000000'],
  //     ['chSpeed', '0'],
  //   ],
  // },
} as const
const settingsKeys = _.keys(settings)

type SettingKeys = keyof typeof settings
const isSettingsKeys = (key: any): key is SettingKeys =>
  settingsKeys.includes(key)
