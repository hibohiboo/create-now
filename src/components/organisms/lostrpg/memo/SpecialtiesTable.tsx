import React from 'react'
import SpecialtiesTable from '../SpecialtiesTable'

// eslint-disable-next-line react/display-name
export default React.memo<{
  rows: any[]
  columns: any[]
  check?: string | null
  gapHandler: (name: string) => void
  specialtyHandler: (name: string) => void
  damageHandler: (name: string) => void
}>((item) => {
  console.log('test specialtie')
  return SpecialtiesTable(item)
})
