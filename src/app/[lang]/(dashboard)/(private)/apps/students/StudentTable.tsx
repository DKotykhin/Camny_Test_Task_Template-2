'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns';

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
    header: '#'
  }),
  columnHelper.accessor('fullName', {
    cell: info => info.getValue(),
    header: 'Name'
  }),
  columnHelper.accessor('registration_date', {
    cell: info => format(new Date(info.getValue()), 'MMMM dd, yyyy'),
    header: 'Date'
  }),
  columnHelper.accessor('city', {
    cell: info => info.getValue(),
    header: 'City'
  }),
  columnHelper.accessor('program', {
    cell: info => info.getValue(),
    header: 'Program'
  }),
  columnHelper.accessor('view', {
    cell: info => info.getValue(),
    header: 'Lessons'
  })
]

const StudentTable = () => {

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
      <CardHeader title='Students Table' />
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
              .rows
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