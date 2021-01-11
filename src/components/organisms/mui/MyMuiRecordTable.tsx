import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Link from '~/components/atoms/mui/Link'
import MyMuiTable from '~/components/organisms/mui/MyMuiTable'
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
  canEdit: boolean
  id: string
}
export default function BasicTable({
  title,
  columns,
  data,
  canEdit,
  id,
}: Prop) {
  if (data.length === 0) {
    return <></>
  }
  const cols = [
    {
      title: 'シナリオ名',
      field: 'scenarioTitle',
    },
    ...columns,
  ]
  const classes = useStyles()
  if (!canEdit) {
    return (
      <ViewTable
        title={title}
        columns={cols}
        data={data}
        id={id}
        classes={classes}
      />
    )
  }
  const editCols = [
    ...cols,
    {
      title: '',
      field: 'recordId',
    },
  ]

  return (
    <>
      <TableContainer component={Paper}>
        <Link
          href={{
            pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
            query: {
              lng: 'ja',
              characterId: id,
            },
          }}
          as={`/lostrpg/records/ja/${id}/edit`}
        >
          新規作成
        </Link>
        <Table className={classes.table} aria-label="simple table">
          <caption style={{ captionSide: 'top' }}>{title}</caption>
          <TableHead>
            <TableRow>
              <TableCell className={classes.th} component="th">
                シナリオ名
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  className={classes.th}
                  component="th"
                  key={column.field}
                >
                  {column.title}
                </TableCell>
              ))}
              <TableCell className={classes.th} component="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {editCols.map((column) => (
                  <RecordCell
                    key={column.field}
                    column={column}
                    tdClass={classes.td}
                    rowData={row}
                    id={id}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const RecordCell = ({ column, tdClass, rowData, id }) => {
  if (column.field === 'scenarioTitle') {
    return (
      <TableCell className={tdClass} key={column.field} scope="row">
        <Link
          href={{
            pathname: `/lostrpg/public/[lng]/[view]`,
            query: {
              lng: 'ja',
              id: rowData['recordId'],
            },
          }}
          as={`/lostrpg/public/ja/record?id=${rowData['recordId']}`}
        >
          {rowData['scenarioTitle']}
        </Link>
      </TableCell>
    )
  }
  if (column.field === 'recordId') {
    return (
      <TableCell className={tdClass} key={column.field} scope="row">
        <Link
          href={{
            pathname: `/lostrpg/records/[lng]/[characterId]/edit`,
            query: {
              lng: 'ja',
              characterId: rowData['characterId'],
              id: rowData['recordId'],
            },
          }}
          as={`/lostrpg/records/ja/${id}/edit?id=${rowData['recordId']}`}
        >
          編集
        </Link>
      </TableCell>
    )
  }
  return (
    <TableCell className={tdClass} key={column.field} scope="row">
      {rowData[column.field]}
    </TableCell>
  )
}

const ViewTable = ({ classes, title, data, columns, id }) => (
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <caption style={{ captionSide: 'top' }}>{title}</caption>
      <TableHead>
        <TableRow>
          <TableCell className={classes.th} component="th">
            シナリオ名
          </TableCell>
          {columns.map((column) => (
            <TableCell className={classes.th} component="th" key={column.field}>
              {column.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <RecordCell
                key={column.field}
                column={column}
                tdClass={classes.td}
                rowData={row}
                id={id}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
