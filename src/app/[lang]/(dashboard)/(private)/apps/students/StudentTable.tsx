'use client'

import React from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'

// Type Imports
import type { DataType } from './studentData'

// Data Imports
import { data } from './studentData'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Style Imports
import styles from '@core/styles/table.module.css'

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

const StudentTable: React.FC = () => {
  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    },
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0
      }
    },
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
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
              {table.getRowModel().rows.map(row => (
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
      {/* Pagination */}
      {table.getFilteredRowModel().rows.length > table.getState().pagination.pageSize && (
        <TablePagination
          component={() => <TablePaginationComponent table={table as any} shape='circular' />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      )}
    </>
  )
}

export default StudentTable
