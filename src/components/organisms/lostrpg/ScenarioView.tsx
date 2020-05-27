import React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'
import sanitize from 'sanitize-html'
import type { Scenario } from '~/store/modules/lostModule'

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

const createEvent = (event, pi) => (
  <section key={`event-${pi}-${event.name}`}>
    <h4>{event.name}</h4>
    {event.lines.map((line) => (
      <p key={line}>{line}</p>
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

const createScene = (scene, pi) => (
  <section key={`scene-${pi}-${scene.name}`}>
    <h3>{scene.name}</h3>
    {scene.lines.map((line) => (
      <p key={line}>{line}</p>
    ))}
    {scene.events.map(createEvent)}
  </section>
)

const createPhase = (phase, pi) => (
  <section key={`phase-${pi}-${phase.name}`}>
    <h2>{phase.name}</h2>
    {phase.scenes.map(createScene)}
  </section>
)

const ScenarioView: React.FC<{
  scenario: Scenario
  t: any
}> = ({ scenario, t }) => {
  return (
    <Box mx={3} flex="1">
      <h1>{scenario.name}</h1>

      {scenario.players ? (
        <p>
          <strong>
            {t('common_players')}:{scenario.players}
          </strong>
        </p>
      ) : (
        <></>
      )}
      {scenario.time ? (
        <p>
          <strong>
            {t('common_play_time')}:{scenario.time}
          </strong>
        </p>
      ) : (
        <></>
      )}
      {scenario.lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {scenario.phases.map(createPhase)}
    </Box>
  )
}
export default ScenarioView
