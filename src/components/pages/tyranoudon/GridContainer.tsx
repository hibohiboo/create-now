import { FC, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import ChatPanel from '~/components/organisms/tyranoudon/gridcontainer/ChatPanel'
import CommandTabs from '~/components/organisms/tyranoudon/gridcontainer/CommandTabs'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '200px 800px 1fr',
      // gridGap: '10px',
      gridTemplateRows: '1px 650px 200px 1fr',
    },
    top: {
      gridColumn: '1/4',
      gridRow: '1',
      // backgroundColor: 'red',
    },
    left: {
      gridColumn: '1/2',
      gridRow: '2/6',
      // backgroundColor: 'green',
    },

    right: {
      gridColumn: '3/4',
      gridRow: '2/6',
      // backgroundColor: 'blue',
    },
    main: {
      gridColumn: '2/3',
      gridRow: '2/3',
      // backgroundColor: 'palegreen',
    },
    bottom: {
      gridColumn: '2/3',
      gridRow: '3',
      // backgroundColor: 'skyblue',
      zIndex: 1,
    },
  }),
)

const GridContainer: FC<{ vm: TyranoUdonViewModel; ctx: any }> = ({
  vm,
  ctx,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <div className={classes.top}></div>
      <div className={classes.left}>
        <CommandTabs vm={vm} ctx={ctx} />
      </div>
      <div className={classes.right}>
        <UdonariumPanel is2d={ctx.is2d} />
      </div>
      <div className={classes.main}>
        <TyranoPanel
          name={ctx.tyrano_name}
          defaultHeight={650}
          defaultWidth={800}
          sheet={ctx.tyrano_sheet}
          loaded={vm.tyranoStatus}
          draggable={false}
          resizable={false}
        />
      </div>
      <div className={classes.bottom}>
        <ChatPanel vm={vm} />
      </div>
    </div>
  )
}
export default GridContainer
