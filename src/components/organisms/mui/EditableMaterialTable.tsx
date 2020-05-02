import { forwardRef } from 'react'
import { AddBox, Edit, DeleteOutline, Check, Clear } from '@material-ui/icons'
import MaterialTable from 'material-table'
import { deleteMessage } from '~/config/messages'

const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => (
    <AddBox {...props} ref={ref} />
  )),
  Delete: forwardRef<SVGSVGElement>((props, ref) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  Edit: forwardRef<SVGSVGElement>((props, ref) => (
    <Edit {...props} ref={ref} />
  )),
  Check: forwardRef<SVGSVGElement>((props, ref) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef<SVGSVGElement>((props, ref) => (
    <Clear {...props} ref={ref} />
  )),
}

const waitTime = 600

interface Prop {
  title: string
  columns: any[]
  data: any[]
  rowAddHandler: (newData: any) => void
  rowUpdateHandler: (newData: any, oldData: any) => void
  rowDeleteHandler: (oldData: any) => void
}
const editableTable = ({
  title,
  columns,
  data,
  rowAddHandler,
  rowUpdateHandler,
  rowDeleteHandler,
}: Prop) => (
  <MaterialTable
    title={title}
    icons={tableIcons}
    options={{
      search: false,
      sorting: false,
      paging: false,
      rowStyle: {
        whiteSpace: 'nowrap',
      },
      headerStyle: {
        whiteSpace: 'nowrap',
      },
    }}
    localization={{
      header: {
        actions: '',
      },
      body: { editRow: { deleteText: deleteMessage } },
    }}
    columns={columns}
    data={data}
    editable={{
      onRowAdd: (newData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve()
            rowAddHandler(newData)
          }, waitTime)
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve()
            if (oldData) {
              rowUpdateHandler(newData, oldData)
            }
          }, waitTime)
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve()
            rowDeleteHandler(oldData)
          }, waitTime)
        }),
    }}
  />
)
export default editableTable
