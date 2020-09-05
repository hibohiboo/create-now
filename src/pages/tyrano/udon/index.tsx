import Head from 'next/head'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useViewModel } from '~/store/modules/tyranoudon/viewModel'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import ChatPanel from '~/components/organisms/tyranoudon/ChatPanel'
import CommandPanel from '~/components/organisms/tyranoudon/CommandPanel'
import OtherPanel from '~/components/organisms/tyranoudon/OtherPanel'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
)

export default function Page(ctx) {
  const classes = useStyles()
  const vm = useViewModel(ctx)
  const width = 1200
  const height = 240

  // const firstTyranoPanelWidth = 800
  // if (global.window && global.window.innerWidth < 1600) {
  //   firstTyranoPanelWidth = global.window.innerWidth - 850
  //   console.log('width', global.window.innerWidth)
  // }

  return (
    <div className={classes.root}>
      <Head>
        <title>TyranoUdon</title>
      </Head>
      {ctx.tyranoOnly ? <></> : <UdonariumPanel is2d={ctx.is2d} />}
      {ctx.tyranoOnly ? (
        <div style={{ margin: '0 auto' }}>
          <TyranoPanel
            name={ctx.tyrano_name}
            defaultHeight={ctx.tyrano_height}
            defaultWidth={ctx.tyrano_width}
            sheet={ctx.tyrano_sheet}
            loaded={vm.tyranoStatus}
            draggable={!ctx.tyranoOnly}
            resizable={!ctx.tyranoOnly}
          />
        </div>
      ) : (
        <TyranoPanel
          name={ctx.tyrano_name}
          defaultHeight={ctx.tyrano_height}
          defaultWidth={ctx.tyrano_width}
          sheet={ctx.tyrano_sheet}
          loaded={vm.tyranoStatus}
          draggable={!ctx.tyranoOnly}
          resizable={!ctx.tyranoOnly}
        />
      )}
      {ctx.tyranoOnly ? (
        <></>
      ) : (
        <>
          <ChatPanel vm={vm} width={width} height={height} />
          <CommandPanel vm={vm} width={width} height={height} />
          <OtherPanel
            vm={vm}
            width={width}
            height={height}
            tyrano_sheet={ctx.tyrano_sheet}
          />
        </>
      )}
    </div>
  )
}
Page.getInitialProps = async ({ query }) => {
  const tyrano = (query.tyrano || 'vchat_add') as string
  const tyrano_sheet = (query.tyrano_sheet ||
    '1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58') as string
  const is2d = (query.is2d && query.is2d === 'true') || false
  const tyranoOnly =
    (query.tyrano_only && query.tyrano_only === 'true') || false
  const width = (query.tyrano_width && Number(query.tyrano_width)) || null
  const height = (query.tyrano_height && Number(query.tyrano_height)) || null

  if (tyrano === 'chat_talk') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 430,
      tyrano_height: 640,
      tyrano_sheet,
      tyranoOnly,
    }
  }
  if (tyrano === 'vchat') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 640,
      tyrano_height: 800,
      tyrano_sheet,
      tyranoOnly,
    }
  }
  if (tyrano === 'vchat_add') {
    return {
      tyrano_name: tyrano,
      tyrano_width: width || 480,
      tyrano_height: height || 640,
      tyrano_sheet,
      is2d,
      tyranoOnly,
    }
  }
  return {
    tyrano_name: 'sample',
    tyrano_width: width || 800,
    tyrano_height: height || 640,
    tyrano_sheet,
    tyranoOnly,
  }
}
