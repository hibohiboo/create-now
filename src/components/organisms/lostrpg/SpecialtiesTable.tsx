import React from 'react'
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

const makeCol = (col) => (
  <>
    {['A', 'B', 'C', 'D', 'E'].includes(col) ? (
      <TableCell component="th" align="center" key={col} style={{ padding: 0 }}>
        <Checkbox style={{ padding: '3px' }} />
        <br />
        <span>{col}</span>
      </TableCell>
    ) : (
      <TableCell component="th" align="center" key={col}>
        {col}
      </TableCell>
    )}
  </>
)

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
              <TableCell align="right">
                {row.talent}
                <Checkbox />
              </TableCell>
              <TableCell>{row.a}</TableCell>
              <TableCell align="right">
                {row.head}
                <Checkbox />
              </TableCell>
              <TableCell>{row.b}</TableCell>
              <TableCell align="right">
                {row.arms}
                <Checkbox />
              </TableCell>
              <TableCell>{row.c}</TableCell>
              <TableCell align="right">
                {row.torso}
                <Checkbox />
              </TableCell>
              <TableCell>{row.d}</TableCell>
              <TableCell align="right">
                {row.legs}
                <Checkbox />
              </TableCell>
              <TableCell>{row.e}</TableCell>
              <TableCell align="right">
                {row.survival}
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
