import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

export default function Home({
  base,
}: {
  base: {
    title: string
  }[]
}) {
  return (
    <div>
      <Head>
        <title>Loading TyranoScript</title>
        <base href={`/`} target="_self"></base>
        <meta name="viewport" content=" user-scalable=no" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" href="/tyrano/tyrano.css" />
        <link rel="stylesheet" href="/tyrano/libs/jquery-ui.css" />
        <link rel="stylesheet" href="/tyrano/libs/remodal/remodal.css" />
        <link
          rel="stylesheet"
          href="/tyrano/libs/remodal/remodal-default-theme.css"
        />
        <link
          rel="stylesheet"
          href="/tyrano/libs/textillate/assets/animate.css"
        />
        <script src="/tyrano/libs/jquery-3.4.1.min.js"></script>
      </Head>
      <div id="tyrano_base" className="tyrano_base" unselectable="on"></div>
      <div id="vchat_base" className="vchat_base" unselectable="on"></div>

      <script src="/data/system/KeyConfig.js"></script>
      <script src="/tyrano/libs/jquery-migrate-1.4.1.js"></script>
      <script src="/tyrano/libs/jquery-ui.min.js"></script>
      <script src="/tyrano/libs/jquery.a3d.js"></script>
      <script src="/tyrano/libs/jsrender.min.js"></script>
      <script src="/tyrano/libs/remodal/remodal.js"></script>
      <script src="/tyrano/libs/html2canvas.js"></script>
      <script src="/tyrano/lang.js"></script>
      <script src="/tyrano/libs.js"></script>
      <script src="/tyrano/tyrano.js"></script>
      <script src="/tyrano/tyrano.base.js"></script>
      <script src="/tyrano/plugins/kag/kag.js"></script>
      <script src="/tyrano/plugins/kag/kag.event.js"></script>
      <script src="/tyrano/plugins/kag/kag.key_mouse.js"></script>
      <script src="/tyrano/plugins/kag/kag.layer.js"></script>
      <script src="/tyrano/plugins/kag/kag.menu.js"></script>
      <script src="/tyrano/plugins/kag/kag.parser.js"></script>
      <script src="/tyrano/plugins/kag/kag.rider.js"></script>
      <script src="/tyrano/plugins/kag/kag.studio.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_audio.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_camera.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_ext.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_system.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_vchat.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_ar.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag_three.js"></script>
      <script src="/tyrano/plugins/kag/kag.tag.js"></script>
      <script src="/tyrano/libs/textillate/assets/jquery.lettering.js"></script>
      <script src="/tyrano/libs/textillate/jquery.textillate.js"></script>
      <script src="/tyrano/libs/jquery.touchSwipe.min.js"></script>
      <script src="/tyrano/libs/howler.js"></script>
      <script src="/tyrano/libs/jsQR.js"></script>
      <script src="/tyrano/libs/lz-string.min.js"></script>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
