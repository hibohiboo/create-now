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
} from '@material-ui/core'

const useStyles = makeStyles({
  head: {
    backgroundColor: '#303030',
    color: 'white',
  },
})

const DamageTable: React.FC<{
  rows: any[]
}> = ({ rows }) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={`spacialty-table`} aria-label="damage table">
        <TableHead>
          <TableRow>
            {rows.map((row, index) => (
              <TableCell
                className={classes.head}
                component="th"
                align="center"
                key={row.name}
              >
                {index + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {rows.slice(0, 5).map((row) => (
              <TableCell align="center" key={row.name}>
                {row.name}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DamageTable
