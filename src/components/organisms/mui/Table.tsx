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
              <TableCell
                key={`${cell}-${i}`}
                dangerouslySetInnerHTML={{
                  __html: sanitize(cell, {
                    allowedTags: ['span', 'i', 'a'],
                    allowedAttributes: {
                      i: ['class'],
                    },
                  }),
                }}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const Page: React.FC<{
  table: { title: string; rows: { cells: string[] }[]; columns: string[] }
}> = ({ table }) => {
  return <Box>{createTable(table)}</Box>
}
export default Page
