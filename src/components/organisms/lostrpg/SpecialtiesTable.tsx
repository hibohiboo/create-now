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
  const isGap = ['A', 'B', 'C', 'D', 'E'].includes(col)
  return (
    <TableCell component="th" align="center" key={col} style={{ padding: 0 }}>
      {isGap ? (
        <>
          <Checkbox style={{ padding: '3px' }} />
          <br />
          <span>{col}</span>
        </>
      ) : (
        <span>{col}</span>
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
              <TableCell>{row.a.name}</TableCell>
              <TableCell align="right">
                {row.head.name}
                <Checkbox />
              </TableCell>
              <TableCell>{row.b.name}</TableCell>
              <TableCell align="right">
                {row.arms.name}
                <Checkbox />
              </TableCell>
              <TableCell>{row.c.name}</TableCell>
              <TableCell align="right">
                {row.torso.name}
                <Checkbox />
              </TableCell>
              <TableCell>{row.d.name}</TableCell>
              <TableCell align="right">
                {row.legs.name}
                <Checkbox />
              </TableCell>
              <TableCell>{row.e.name}</TableCell>
              <TableCell align="right">
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
