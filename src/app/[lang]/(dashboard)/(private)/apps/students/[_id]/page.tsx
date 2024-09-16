'use client'

import React, { useMemo } from 'react'

// Next Imports
import Image from 'next/image'

// MUI Imports
import { useTheme } from '@mui/material'

// Third-party Imports
import { format } from 'date-fns'

// Data Imports
import { data } from '../studentData'

// Component Imports
import LessonTable from './LessonTable'
import { LessonBreadcrumbs } from './LessonBreadcrumps'

const TripDetailsPage = ({
  params
}: {
  params: {
    _id: string
  }
}) => {
  const userData = useMemo(() => {
    return data.find(user => user.id === parseInt(params._id))
  }, [params._id])

  const theme = useTheme()

  return (
    <div>
      <LessonBreadcrumbs name={userData?.fullName || ''} />
      <div
        className='w-full flex gap-3 items-center p-3 mb-3 rounded-md shadow'
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <Image src={userData?.avatar || ''} alt='avatar' width={100} height={100} className='rounded-full' />
        <div>
          <p className='text-2xl font-medium'>{userData?.fullName}</p>
          <p className='leading-5'>
            <span className='text-xs text-[#87878A] mr-1'>Registration Date:</span>
            {format(new Date(userData?.registration_date || ''), 'dd.MM.yyyy')}
          </p>
          <p className='text-[#F8F9FD] text-xs font-medium px-3 py-1 bg-[#17B417] rounded-full mt-2 w-fit'>
            {userData?.program}
          </p>
        </div>
      </div>
      <LessonTable data={userData?.lessons || []} />
    </div>
  )
}

export default TripDetailsPage
