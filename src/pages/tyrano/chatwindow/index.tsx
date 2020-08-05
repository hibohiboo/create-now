import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import Layout from '~/components/templates/tyrano/Layout'
interface Prop {
  base_path: string
}
declare global {
  interface Window {
    TYRANO: {
      kag: {
        ftag: { startTag: (a: string, b: any) => void }
        parser: { parseScenario: (a: string) => { array_s: any[] } }
      }
    }
  }
}
export default function Home({ base_path }: Prop) {
  useEffect(() => {
    if (!window) return
    setTimeout(() => {
      window.TYRANO.kag.parser
        .parseScenario('[cm]\n#てすと\nさんぷる')
        .array_s.forEach((tag) => {
          window.TYRANO.kag.ftag.startTag(tag.name, tag.pm)
        })
      console.log('test')
    }, 3000)
  })

  return (
    <>
      <Head>
        <title>Loading TyranoScript</title>
        <base href="/" target="_self"></base>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
        />

        <meta name="robots" content="noindex,nofollow" />

        <link href="/tyrano/tyrano.css" rel="stylesheet" type="text/css" />

        <link
          href="/tyrano/libs/jquery-ui.css"
          rel="stylesheet"
          type="text/css"
        />

        <script
          type="text/javascript"
          src="/tyrano/libs/jquery-3.4.1.min.js"
        ></script>

        <script src="/tyrano/libs/jquery-migrate-1.4.1.js"></script>

        <script
          type="text/javascript"
          src="/tyrano/libs/jquery-ui.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/libs/jquery.a3d.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/libs/jsrender.min.js"
        ></script>
        <link
          href="/tyrano/libs/alertify/alertify.core.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/tyrano/libs/alertify/alertify.default.css"
          rel="stylesheet"
          type="text/css"
        />
        <script
          type="text/javascript"
          src="/tyrano/libs/alertify/alertify.min.js"
        ></script>

        <link rel="stylesheet" href="/tyrano/libs/remodal/remodal.css" />
        <link
          rel="stylesheet"
          href="/tyrano/libs/remodal/remodal-default-theme.css"
        />
        <script src="/tyrano/libs/remodal/remodal.js"></script>

        <script
          type="text/javascript"
          src="/tyrano/libs/html2canvas.js"
        ></script>

        <script src="/data/system/KeyConfig.js"></script>

        <script type="text/javascript" src="/tyrano/lang.js"></script>
        <script type="text/javascript" src="/tyrano/libs.js"></script>

        <script type="text/javascript" src="/tyrano/tyrano.js"></script>
        <script type="text/javascript" src="/tyrano/tyrano.base.js"></script>

        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.event.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.key_mouse.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.layer.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.menu.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.parser.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.rider.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.studio.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_audio.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_camera.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_ext.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_system.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_vchat.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_ar.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag_three.js"
        ></script>

        <script
          type="text/javascript"
          src="/tyrano/plugins/kag/kag.tag.js"
        ></script>

        <link
          href="/tyrano/libs/textillate/assets/animate.css"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="/tyrano/libs/textillate/assets/jquery.lettering.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/libs/textillate/jquery.textillate.js"
        ></script>
        <script
          type="text/javascript"
          src="/tyrano/libs/jquery.touchSwipe.min.js"
        ></script>
        <script type="text/javascript" src="/tyrano/libs/howler.js"></script>
        <script type="text/javascript" src="/tyrano/libs/jsQR.js"></script>

        <script
          type="text/javascript"
          src="/tyrano/libs/lz-string.min.js"
        ></script>
      </Head>
      <div
        id="tyrano_base"
        className="tyrano_base"
        style={{ overflow: 'hidden', position: 'absolute' }}
        unselectable="on"
      ></div>
      <div
        id="vchat_base"
        className="vchat_base"
        style={{ overflow: 'hidden' }}
        unselectable="on"
      ></div>
      <div className="remodal-bg"></div>

      <div
        className="remodal"
        data-remodal-id="modal"
        data-remodal-options="closeOnEscape:false, closeOnOutsideClick:false"
      >
        <h1 className="remodal_title"></h1>
        <p className="remodal_txt"></p>
        <br />
        <button data-remodal-action="cancel" className="remodal-cancel">
          Cancel
        </button>
        <button data-remodal-action="confirm" className="remodal-confirm">
          OK
        </button>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      base_path: '/',
    },
  }
}
