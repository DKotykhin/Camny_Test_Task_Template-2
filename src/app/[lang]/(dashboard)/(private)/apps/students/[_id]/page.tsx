import React, { useMemo } from 'react'

// Next Imports
import Image from 'next/image'

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

  return (
    <div>
      <LessonBreadcrumbs name={userData?.fullName || ''} />
      <div className='w-full flex gap-3 items-center p-3 bg-white mb-3 rounded-md'>
        <Image src={userData?.avatar || ''} alt='avatar' width={100} height={100} className='rounded-full' />
        <div>
          <p className='text-2xl font-medium'>{userData?.fullName}</p>
          <p className='leading-5'>
            <span className='text-xs text-[#87878A] mr-1'>Registration Date:</span>
            {format(new Date(userData?.registration_date || ''), 'dd.MM.yyyy')}
          </p>
          <p className='text-[#F8F9FD] text-xs font-medium px-3 py-1 bg-[#17B417] rounded-full mt-1 w-fit'>{userData?.program}</p>
        </div>
      </div>
      <LessonTable data={userData?.lessons || []} />
    </div>
  )
}

export default TripDetailsPage
