'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Type Imports
import type { DataType } from './studentData'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import { data } from './studentData'

// Column Definitions
const columnHelper = createColumnHelper<DataType>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: 'ID'
  }),
  columnHelper.accessor('fullName', {
    cell: info => info.getValue(),
    header: 'Name'
  }),
  columnHelper.accessor('registration_date', {
    cell: info => info.getValue(),
    header: 'Date'
  }),
  columnHelper.accessor('city', {
    cell: info => info.getValue(),
    header: 'City'
  }),
  columnHelper.accessor('program', {
    cell: info => info.getValue(),
    header: 'Program'
  })
]

const StudentTable = () => {
  // States
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [studentData, setStudentData] = useState(() => [...data])

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  return (
    <Card>
      <CardHeader title='Student Table' />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default StudentTable