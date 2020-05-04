import React from 'react'
import cn from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const makeCol = (col) => {
  const isGap = ['A', 'B', 'C', 'D', 'E'].includes(col.name)
  return (
    <TableCell
      component="th"
      align="center"
      key={col.name}
      style={{ padding: 0 }}
    >
      {isGap ? (
        <>
          <Checkbox style={{ padding: '3px' }} checked={col.selected} />
          <br />
          <span>{col.name}</span>
        </>
      ) : (
        <span>{col.name}</span>
      )}
    </TableCell>
  )
}

const SpecialtiesTable: React.FC<{ rows: any[]; columns: any[] }> = ({
  rows,
  columns,
}) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table
        className={`${classes.table} spacialty-table`}
        aria-label="spacialty table"
      >
        <TableHead>
          <TableRow>{columns.map(makeCol)}</TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.number}>
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ padding: '0 10px' }}
              >
                {row.number}
              </TableCell>
              <TableCell
                align="right"
                className={cn({
                  ['selected']: row.talent.selected,
                })}
              >
                {row.talent.name}
                <Checkbox />
              </TableCell>
              <TableCell
                className={cn({
                  ['selected']: row.a.selected,
                })}
              >
                {row.a.name}
              </TableCell>
              <TableCell
                align="right"
                className={cn({
                  ['selected']: row.head.selected,
                  ['body-parts']: row.head.isBodyParts,
                })}
              >
                <span>{row.head.name}</span>
                <Checkbox />
              </TableCell>
              <TableCell
                className={cn({
                  ['selected']: row.b.selected,
                })}
              >
                {row.b.name}
              </TableCell>
              <TableCell
                align="right"
                className={cn({
                  ['selected']: row.arms.selected,
                  ['body-parts']: row.arms.isBodyParts,
                })}
              >
                <span>{row.arms.name}</span>
                <Checkbox />
              </TableCell>
              <TableCell
                className={cn({
                  ['selected']: row.c.selected,
                })}
              >
                {row.c.name}
              </TableCell>
              <TableCell
                align="right"
                className={cn({
                  ['selected']: row.torso.selected,
                  ['body-parts']: row.torso.isBodyParts,
                })}
              >
                <span>{row.torso.name}</span>
                <Checkbox />
              </TableCell>
              <TableCell
                className={cn({
                  ['selected']: row.d.selected,
                })}
              >
                {row.d.name}
              </TableCell>
              <TableCell
                align="right"
                className={cn({
                  ['selected']: row.legs.selected,
                  ['body-parts']: row.legs.isBodyParts,
                })}
              >
                <span>{row.legs.name}</span>
                <Checkbox />
              </TableCell>
              <TableCell
                className={cn({
                  ['selected']: row.e.selected,
                })}
              >
                {row.e.name}
              </TableCell>
              <TableCell
                align="right"
                className={cn({
                  ['selected']: row.survival.selected,
                })}
              >
                {row.survival.name}
                <Checkbox />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpecialtiesTable
