import { FC, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import {
  Image,
  Person,
  MusicNote,
  MovieFilter,
  MenuBook,
} from '@material-ui/icons'

import BackgroundCommand from '~/components/organisms/tyranoudon/gridcontainer/commands/BackgroundCommand'
import CharacterCommand from '~/components/organisms/tyranoudon/gridcontainer/commands/CharacterCommand'
import MusicCommand from '~/components/organisms/tyranoudon/gridcontainer/commands/MusicCommand'
import EffectCommand from '~/components/organisms/tyranoudon/gridcontainer/commands/EffectCommand'
import Others from '~/components/organisms/tyranoudon/gridcontainer/commands/Others'

import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
)

const CommandTabs: FC<{
  vm: TyranoUdonViewModel
  ctx: any
}> = ({ vm, ctx }) => {
  const classes = useStyles()
  const [tab, setTab] = useState('background')
  const changeBacgroundHandler = () => setTab('background')
  const changeCharacterHandler = () => setTab('character')
  const changeMusicHandler = () => setTab('music')
  const changeEffectHandler = () => setTab('effect')
  const changeOtherHandler = () => setTab('other')

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={changeBacgroundHandler}>
          <ListItemIcon>
            <Image />
          </ListItemIcon>
          <ListItemText primary="背景" />
        </ListItem>
        <ListItem button onClick={changeCharacterHandler}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="キャラクター" />
        </ListItem>
        <ListItem button onClick={changeMusicHandler}>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="音楽" />
        </ListItem>
        <ListItem button onClick={changeEffectHandler}>
          <ListItemIcon>
            <MovieFilter />
          </ListItemIcon>
          <ListItemText primary="演出" />
        </ListItem>
        <ListItem button onClick={changeOtherHandler}>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="その他" />
        </ListItem>
      </List>
      <Divider />
      {tab === 'background' ? (
        <BackgroundCommand vm={vm} />
      ) : tab === 'character' ? (
        <CharacterCommand vm={vm} />
      ) : tab === 'music' ? (
        <MusicCommand vm={vm} />
      ) : tab === 'effect' ? (
        <EffectCommand vm={vm} />
      ) : tab === 'other' ? (
        <Others vm={vm} tyrano_sheet={ctx.tyrano_sheet} />
      ) : (
        <BackgroundCommand vm={vm} />
      )}
    </div>
  )
}
export default CommandTabs
