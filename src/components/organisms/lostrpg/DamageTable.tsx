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
  head: {
    backgroundColor: '#303030',
    color: 'white',
  },
})

const DamageTable: React.FC<{
  rows: any[]
  damageHandler: Function
}> = ({ rows, damageHandler }) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={`spacialty-table`} aria-label="damage table">
        <TableHead>
          <TableRow>
            {rows.slice(5).map((row, index) => (
              <TableCell
                className={classes.head}
                component="th"
                align="center"
                key={row.name}
              >
                {index + 2}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {rows.slice(0, 5).map((row) => (
              <TableCell align="center" key={row.name}>
                {row.name}
                <Checkbox
                  checked={row.damaged}
                  onChange={() => damageHandler(row.name)}
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component="th" align="center" className={classes.head}>
              7
            </TableCell>
            <TableCell colSpan={5} align="center">
              任意の部位
            </TableCell>
          </TableRow>
          <TableRow>
            {rows.slice(5).map((row, index) => (
              <TableCell
                className={classes.head}
                component="th"
                align="center"
                key={row.name}
              >
                {index + 8}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {rows.slice(5, 11).map((row) => (
              <TableCell align="center" key={row.name}>
                {row.name}
                <Checkbox
                  checked={row.damaged}
                  onChange={() => damageHandler(row.name)}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DamageTable
