'use client'

import React, { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

// Type Imports
import type { Lessons } from '../lessonData'
import { Status } from '../lessonData'

// Component Imports
import { ColorStatus } from './ColorStatus'
import { NewLessonModal } from './NewLessonModal'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Style Imports
import styles from '@core/styles/table.module.css'

export type LessonsType = {
  id: number
  lesson: Lessons
  status: React.ReactNode
  date: string
}

// Column Definitions
const columnHelper = createColumnHelper<LessonsType>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: '#'
  }),
  columnHelper.accessor('lesson', {
    cell: info => info.getValue(),
    header: 'Name'
  }),
  columnHelper.accessor('date', {
    cell: info => format(new Date(info.getValue()), 'MMMM dd, yyyy'),
    header: 'Date'
  }),
  columnHelper.accessor('status', {
    cell: info => <ColorStatus status={info.getValue() as Status} />,
    header: 'Status'
  })
]

const LessonTable: React.FC<{ data: LessonsType[] }> = ({ data }) => {
  // State
  const [openModal, setOpenModal] = useState(false)
  const [localData, setLocalData] = useState(data)

  // Hooks
  const table = useReactTable({
    data: localData,
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

  const newLessons = (lessons: Lessons[]) => {
    const newLessons = lessons.map((lesson, index) => {
      return {
        id: localData.length + index + 1,
        lesson,
        status: Status.REQUESTED,
        date: format(new Date(), 'MMMM dd, yyyy')
      }
    })

    const uniqueLessons = newLessons.filter(lesson => !localData.some(t => t.lesson === lesson.lesson))
    const existedLessons = newLessons.filter(lesson => localData.some(t => t.lesson === lesson.lesson))
    if (existedLessons.length) {
      toast.warn(`You already have the following lessons: ${existedLessons.map(lesson => lesson.lesson).join(', ')}`)
    }

    setLocalData([...localData, ...uniqueLessons])
  }

  return (
    <>
      <NewLessonModal open={openModal} handleClose={() => setOpenModal(false)} newLessons={newLessons} />
      <Card>
        <CardHeader
          title=''
          action={
            <Button variant='contained' className='rounded-full' onClick={() => setOpenModal(true)}>
              Request Lab
            </Button>
          }
        />
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
                .rows.slice(0, table.getState().pagination.pageSize)
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

export default LessonTable
