'use client'

import React from 'react'

// MUI Imports
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export const LessonBreadcrumbs: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div role='presentation' className='mb-4'>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link underline='hover' color='inherit' href='/apps/students'>
          <div className='flex items-center gap-1'>
            <i className='tabler-users' />
            <span>Students</span>
          </div>
        </Link>
        <div className='flex items-center gap-1'>
          <i className='tabler-user' />
          <span>{name}</span>
        </div>
      </Breadcrumbs>
    </div>
  )
}
