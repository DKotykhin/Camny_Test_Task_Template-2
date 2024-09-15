import React from 'react'

// Third-party Imports
import classNames from 'classnames'

// Type Imports
import { Status } from '../lessonData'

export const ColorStatus = ({ status }: { status: Status }) => {
  return (
    <div
      className={classNames(
        'rounded-full px-3 py-1 w-fit text-xs font-medium',
        status === Status.REQUESTED
          ? 'text-[#6324F4] bg-[#E4D9FF]'
          : status === Status.BOOKED
            ? 'text-[#B0470A] bg-[#FFE3D1]'
            : status === Status.COMPLETED
              ? 'text-[#0D7E1E] bg-[#D6FFDC]'
              : status === Status.CANCELLED
                ? 'text-[#C70B0B] bg-[#F7D6D9]'
                : 'text-[#0959BD] bg-[#D3E5FF]'
      )}
    >
      {status}
    </div>
  )
}
