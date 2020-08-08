import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Layout from '~/components/templates/tyrano/Layout'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import { useViewModel } from '~/store/modules/tyranoudon/viewModel'
import SelectField from '~/components/form/SelectField'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
)

export default function Home() {
  const classes = useStyles()
  const vm = useViewModel()
  console.log('viewModel', vm)
  const [height, setHeight] = useState(360)
  const [width, setWidth] = useState(1200)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  let firstTyranoPanelWidth = 200
  if (global.window && global.window.innerWidth < 1600) {
    firstTyranoPanelWidth = global.window.innerWidth - 850
    console.log('width', global.window.innerWidth)
  }
  return (
    <div className={classes.root}>
      <Head>
        <title>Loading Udonarium</title>
      </Head>

      <UdonariumPanel />
      <TyranoPanel
        name={vm.tyranoSample}
        defaultHeight={500}
        defaultWidth={firstTyranoPanelWidth}
      />
      <DraggablePanel
        title="チャット"
        width={width}
        height={height}
        onResize={onResize}
      >
        <Box my={2} mx={3} display="flex">
          <div style={{ width: '200px' }}>
            <SelectField
              id="name"
              labelText="名前"
              items={[{ name: 'あかね' }, { name: 'やまと' }]}
              unselectedText=""
              value={vm.name}
              changeHandler={({ name }) => vm.changeName(name)}
            />
          </div>
          <div style={{ width: '100px' }}>
            <SelectField
              id="face"
              labelText="表情"
              items={vm.faceList}
              unselectedText=""
              value={vm.face}
              changeHandler={({ name }) => vm.changeFace(name)}
            />
          </div>
        </Box>
        <Box my={1} mx={3}>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <TextareaAutosize
              aria-label={'text'}
              rowsMin={3}
              value={vm.text}
              onChange={(e) => vm.changeText(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box my={2} mx={4}>
          <Button variant="contained" color="primary" onClick={vm.sendMessage}>
            送信
          </Button>
        </Box>
      </DraggablePanel>
      <TyranoPanel
        name={vm.tyranoVchat}
        defaultHeight={800}
        defaultWidth={640}
      />
      <TyranoPanel name={'chat_talk'} defaultHeight={640} defaultWidth={430} />
      <button onClick={vm.sendMessage}>test send </button>
    </div>
  )
}
