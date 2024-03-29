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
    maxWidth: 800,
  },
})

const makeCol = (col, gapHandler) => {
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
          <Checkbox
            style={{ padding: '3px' }}
            checked={col.selected}
            onChange={() => gapHandler(col.name)}
          />
          <br />
          <span>{col.name}</span>
        </>
      ) : (
        <span>{col.name}</span>
      )}
    </TableCell>
  )
}

const SpecialtiesTable: React.FC<{
  rows: any[]
  columns: any[]
  check?: string | null
  gapHandler: (name: string) => void
  specialtyHandler: (name: string) => void
  damageHandler: (name: string) => void
}> = ({
  rows,
  columns,
  gapHandler,
  specialtyHandler,
  damageHandler,
  check = null,
}) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table
        className={`${classes.table} spacialty-table`}
        aria-label="spacialty table"
      >
        <TableHead>
          <TableRow>{columns.map((col) => makeCol(col, gapHandler))}</TableRow>
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
              {[
                'talent',
                'a',
                'head',
                'b',
                'arms',
                'c',
                'torso',
                'd',
                'legs',
                'e',
                'survival',
              ].map((col) => (
                <TableCell
                  key={col}
                  align="right"
                  className={cn({
                    ['selected']: row[col].selected,
                    ['body-parts']: row[col].isBodyParts,
                    ['check-specialty']: row[col].name === check,
                  })}
                >
                  <span onClick={() => specialtyHandler(row[col].name)}>
                    {row[col].name}
                  </span>
                  {row[col].name === '' ? (
                    <></>
                  ) : (
                    <Checkbox
                      checked={row[col].damaged}
                      onChange={() => damageHandler(row[col].name)}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpecialtiesTable
