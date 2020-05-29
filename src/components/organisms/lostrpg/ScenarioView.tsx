import React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import sanitize from 'sanitize-html'
import type { Scenario } from '~/store/modules/lostModule'
export const useStyles = makeStyles((theme) => ({
  p: {
    whiteSpace: 'pre-line',
  },
}))

const createTable = (table) => {
  return (
    <Table>
      <caption style={{ captionSide: 'top' }}>{table.title}</caption>
      <TableHead>
        <TableRow>
          {table.columns.map((cell, i) => (
            <TableCell key={`${cell}-${i}`}>{cell}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {table.rows.map((row, i) => (
          <TableRow key={`row-${i}`}>
            {row.cells.map((cell) => (
              <TableCell key={`${cell}-${i}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const createEvent = (event, pi, classes) => (
  <section key={`event-${pi}-${event.name}`}>
    <h4>{event.name}</h4>
    {event.lines.map((line) => (
      <p className={classes.p} key={line}>
        {line}
      </p>
    ))}
    {event.tables.map(createTable)}
    {event.links.map((link) => (
      <p
        key={link.value}
        dangerouslySetInnerHTML={{
          __html: sanitize(`<a href="${link.url}">${link.value}</a>`, {
            allowedTags: ['a'],
            allowedAttributes: {
              a: ['href'],
            },
            allowedSchemes: ['http', 'https'],
          }),
        }}
      />
    ))}
  </section>
)

const createScene = (scene, pi, classes) => (
  <section key={`scene-${pi}-${scene.name}`}>
    <h3>{scene.name}</h3>
    {scene.lines.map((line) => (
      <p className={classes.p} key={line}>
        {line}
      </p>
    ))}
    {scene.events.map((e, i) => createEvent(e, i, classes))}
  </section>
)

const createPhase = (phase, pi, classes) => (
  <section key={`phase-${pi}-${phase.name}`}>
    <h2>{phase.name}</h2>
    {phase.scenes.map((s, i) => createScene(s, i, classes))}
  </section>
)

const ScenarioView: React.FC<{
  scenario: Scenario
  t: any
}> = ({ scenario, t }) => {
  const classes = useStyles()
  return (
    <Box mx={3} flex="1">
      <h1>{scenario.name}</h1>

      {scenario.players ? (
        <p>
          <strong>
            <i className="fas fa-user-friends"></i>
            {t('common_players')}:{scenario.players}
          </strong>
        </p>
      ) : (
        <></>
      )}
      {scenario.time ? (
        <p>
          <strong>
            <i className="far fa-clock"></i>
            {t('common_play_time')}:{scenario.time}
          </strong>
        </p>
      ) : (
        <></>
      )}
      {scenario.limit ? (
        <p>
          <strong>
            <i className="fas fa-hourglass-half"></i>
            {t('lostrpg_common_limit')}:{scenario.limit}
          </strong>
        </p>
      ) : (
        <></>
      )}
      {scenario.caution ? (
        <p>
          <strong>
            <i className="fas fa-exclamation-triangle"></i>
            {scenario.caution}
          </strong>
        </p>
      ) : (
        <></>
      )}
      {scenario.lines.map((line) => (
        <p className={classes.p} key={line}>
          {line}
        </p>
      ))}
      {scenario.phases.map((p, i) => createPhase(p, i, classes))}
    </Box>
  )
}
export default ScenarioView