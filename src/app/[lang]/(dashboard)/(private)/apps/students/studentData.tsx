import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'

// Data Imports
import { Lessons, Status } from './lessonData'

export type LessonsType = {
  id: number
  lesson: Lessons
  status: Status
  date: string
}

export type DataType = {
  id: number
  avatar: string
  fullName: string
  city: string
  registration_date: string
  program: string
  view: React.ReactNode
  lessons?: LessonsType[]
}

const ButtonLink = (href: string) => {
  return (
    <div className='flex items-center'>
      <Button>
        <Link href={href}>View</Link>
      </Button>
    </div>
  )
}

export const data: DataType[] = [
  {
    id: 1,
    avatar: '/images/avatars/1.png',
    fullName: 'John Doe',
    city: 'New York',
    registration_date: '2021-06-01',
    program: 'Full Stack Web Development',
    view: ButtonLink('/apps/students/1'),
    lessons: [
      {
        id: 1,
        lesson: Lessons.JAVASCRIPT_ESSENTIALS,
        status: Status.COMPLETED,
        date: '2021-06-01'
      },
      {
        id: 2,
        lesson: Lessons.REACT_FUNDAMENTALS,
        status: Status.BOOKED,
        date: '2021-06-02'
      },
      {
        id: 3,
        lesson: Lessons.REACT_ROUTER,
        status: Status.CANCELLED,
        date: '2021-06-03'
      },
      {
        id: 4,
        lesson: Lessons.REDUX,
        status: Status.DONE,
        date: '2021-06-04'
      },
      {
        id: 5,
        lesson: Lessons.NODE_JS,
        status: Status.REQUESTED,
        date: '2021-06-05'
      },
      {
        id: 6,
        lesson: Lessons.EXPRESS,
        status: Status.COMPLETED,
        date: '2021-06-06'
      },
      {
        id: 7,
        lesson: Lessons.MONGODB,
        status: Status.DONE,
        date: '2021-06-07'
      },
      {
        id: 8,
        lesson: Lessons.MONGOOSE,
        status: Status.COMPLETED,
        date: '2021-06-08'
      },
      {
        id: 9,
        lesson: Lessons.GRAPHQL,
        status: Status.DONE,
        date: '2021-06-09'
      },
      {
        id: 10,
        lesson: Lessons.APOLLO_CLIENT,
        status: Status.CANCELLED,
        date: '2021-06-10'
      },
      {
        id: 11,
        lesson: Lessons.NEXT_JS,
        status: Status.COMPLETED,
        date: '2021-06-11'
      },
      {
        id: 12,
        lesson: Lessons.TYPESCRIPT,
        status: Status.BOOKED,
        date: '2021-06-12'
      },
      {
        id: 13,
        lesson: Lessons.JEST,
        status: Status.COMPLETED,
        date: '2021-06-13'
      },
      {
        id: 14,
        lesson: Lessons.CYPRESS,
        status: Status.BOOKED,
        date: '2021-06-14'
      },
      {
        id: 15,
        lesson: Lessons.STORYBOOK,
        status: Status.REQUESTED,
        date: '2021-06-15'
      }
    ]
  },
  {
    id: 2,
    avatar: '/images/avatars/2.png',
    fullName: 'Jane Doe',
    city: 'Los Angeles',
    registration_date: '2021-06-02',
    program: 'Data Science',
    view: ButtonLink('/apps/students/2'),
    lessons: [
      {
        id: 1,
        lesson: Lessons.GITHUB,
        status: Status.COMPLETED,
        date: '2021-06-01'
      },
      {
        id: 2,
        lesson: Lessons.CI_CD,
        status: Status.BOOKED,
        date: '2021-06-02'
      },
      {
        id: 3,
        lesson: Lessons.DOCKER,
        status: Status.CANCELLED,
        date: '2021-06-03'
      },
      {
        id: 4,
        lesson: Lessons.TYPESCRIPT,
        status: Status.DONE,
        date: '2021-06-04'
      }
    ]
  },
  {
    id: 3,
    avatar: '/images/avatars/3.png',
    fullName: 'James Doe',
    city: 'Chicago',
    registration_date: '2021-06-03',
    program: 'Cyber Security',
    view: ButtonLink('/apps/students/3')
  },
  {
    id: 4,
    avatar: '/images/avatars/4.png',
    fullName: 'Judy Doe',
    city: 'Houston',
    registration_date: '2021-06-04',
    program: 'Digital Marketing',
    view: ButtonLink('/apps/students/4')
  },
  {
    id: 5,
    avatar: '/images/avatars/5.png',
    fullName: 'Jack Doe',
    city: 'Phoenix',
    registration_date: '2021-06-05',
    program: 'UI/UX Design',
    view: ButtonLink('/apps/students/5')
  },
  {
    id: 6,
    avatar: '/images/avatars/6.png',
    fullName: 'Jill Doe',
    city: 'Philadelphia',
    registration_date: '2021-06-06',
    program: 'Cloud Computing',
    view: ButtonLink('/apps/students/6')
  },
  {
    id: 7,
    avatar: '/images/avatars/7.png',
    fullName: 'Joe Doe',
    city: 'San Antonio',
    registration_date: '2021-06-07',
    program: 'Artificial Intelligence',
    view: ButtonLink('/apps/students/7')
  },
  {
    id: 8,
    avatar: '/images/avatars/8.png',
    fullName: 'Julie Doe',
    city: 'San Diego',
    registration_date: '2021-06-08',
    program: 'Machine Learning',
    view: ButtonLink('/apps/students/8')
  },
  {
    id: 9,
    avatar: '/images/avatars/9.png',
    fullName: 'Justin Doe',
    city: 'Dallas',
    registration_date: '2021-06-09',
    program: 'Internet of Things',
    view: ButtonLink('/apps/students/9')
  },
  {
    id: 10,
    avatar: '/images/avatars/10.png',
    fullName: 'Jenny Doe',
    city: 'San Jose',
    registration_date: '2021-06-10',
    program: 'Blockchain',
    view: ButtonLink('/apps/students/10')
  }
]
