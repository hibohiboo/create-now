import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  td: { whiteSpace: 'nowrap' },
  th: { whiteSpace: 'nowrap' },
  flex: { display: 'flex' },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface Prop {
  title: string
  columns: { title: string; field: string; type?: 'numeric' }[]
  data: any[]
}
export default function BasicTable({ title, columns, data }: Prop) {
  const classes = useStyles()
  if (!columns || !columns.map || !data) {
    console.log(`null columns ${title}`, data)
    return <></>
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <caption style={{ captionSide: 'top' }}>{title}</caption>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.th}
                  component="th"
                  key={column.field}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    className={classes.td}
                    key={column.field}
                    scope="row"
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
