import React from 'react'
// import EditableMaterialTable from '../EditableMaterialTable'
import EditableMaterialTable from '../EditableMyMuiTable'

// eslint-disable-next-line react/display-name
export default React.memo<{
  title: string
  columns: any[]
  data: any
  rowAddHandler: (newData: any) => void
  rowUpdateHandler: (newData: any, oldData: any) => void
  rowDeleteHandler: (oldData: any) => void
}>((item) => {
  console.log(`editable memo ${item.title}`)
  return EditableMaterialTable(item)
})
