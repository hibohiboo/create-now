/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { AddBox, Edit, DeleteOutline, Check, Clear } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import { Input } from '@material-ui/core'
import SelectField from '~/components/form/memo/SelectField'

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
  equipmentMap: any
  unselectedText: string
  labelText: string
  equipmentChangeHandler: (item: any, row: any) => void
  rowUpdateHandler?: (newData: any, oldData: any) => void
  rowDeleteHandler?: (oldData: any) => void
}
export default function BasicTable({
  title,
  columns,
  data,
  equipmentMap,
  unselectedText,
  labelText,
  equipmentChangeHandler,
  rowUpdateHandler = () => {},
  rowDeleteHandler = () => {},
}: Prop) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [isDelete, setIsDelete] = React.useState(false)
  const [editData, setEditData] = React.useState({})
  const [oldData, setOldData] = React.useState({})
  const handleEditOpen = () => {
    setIsDelete(false)
    setOpen(true)
  }
  const handleDeleteOpen = () => {
    setIsDelete(true)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const changeData = (e, column) => {
    const newData = { ...editData }
    newData[column.field] =
      column.type === 'numeric' ? Number(e.target.value) : e.target.value
    setEditData(newData)
  }

  const body = (
    <div
      style={{ backgroundColor: 'white', padding: '10px', maxWidth: '90vw' }}
    >
      <h2 id="simple-modal-title">{'編集'}</h2>
      <div id="simple-modal-description">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
              <TableRow>
                <TableCell className={classes.flex}>
                  <IconButton
                    aria-label={'Save'}
                    onClick={() => {
                      rowUpdateHandler(editData, oldData)
                      handleClose()
                    }}
                  >
                    <Check />
                  </IconButton>
                  <IconButton aria-label="Cancel" onClick={handleClose}>
                    <Clear />
                  </IconButton>
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    className={classes.td}
                    key={column.field}
                    scope="row"
                  >
                    <Input
                      value={editData[column.field]}
                      type={column.type === 'numeric' ? 'number' : 'text'}
                      onChange={(e) => changeData(e, column)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <caption style={{ captionSide: 'top' }}>{title}</caption>
          <TableHead>
            <TableRow>
              <TableCell component="th">部位</TableCell>
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
            {data.map((row, index) => {
              const items = equipmentMap.get(row['equipedArea'])
              return (
                <TableRow key={index}>
                  <TableCell>
                    <SelectField
                      id={`${row['equipedArea']}-equip-items-select`}
                      items={items}
                      value={row['name']}
                      unselectedText={unselectedText}
                      labelText={labelText}
                      changeHandler={(item) =>
                        equipmentChangeHandler(item, row)
                      }
                    />
                  </TableCell>
                  {/* <TableCell className={classes.flex}>
                  <IconButton
                    onClick={() => {
                      setEditData(row)
                      setOldData(row)
                      handleEditOpen()
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setEditData(row)
                      setOldData(row)
                      handleDeleteOpen()
                    }}
                  >
                    <DeleteOutline />
                  </IconButton>
                </TableCell> */}
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
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
    </>
  )
}
