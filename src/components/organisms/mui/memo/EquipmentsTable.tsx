import React from 'react'
// import EditableMaterialTable from '../EditableMaterialTable'
import EquipmentsTable from '../EquipmentsTable'

// eslint-disable-next-line react/display-name
export default React.memo<{
  title: any
  columns: any
  data: any
  equipmentMap: any
  unselectedText: string
  labelText: string
  equipmentChangeHandler: any
}>((item) => {
  console.log(`editable memo ${item.title}`)
  return EquipmentsTable(item)
})
