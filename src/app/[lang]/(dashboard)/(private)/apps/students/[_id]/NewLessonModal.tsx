import React, { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'

// Third-party Imports
import { toast } from 'react-toastify'

// Data Imports
import { Lessons } from '../lessonData'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 16,
  height: '750px',
  display: 'flex',
  flexDirection: 'column'
}

interface NewLessonModalProps {
  open: boolean
  handleClose: () => void
  newLessons: (lessons: Lessons[]) => void
}

export const NewLessonModal: React.FC<NewLessonModalProps> = ({ open, handleClose, newLessons }) => {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  const lessonsArray = useMemo(() => {
    return Object.keys(Lessons).map(key => Lessons[key as keyof typeof Lessons])
  }, [])

  const lessonsToMap = useMemo(() => {
    return lessonsArray.filter(lesson => lesson.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
  }, [lessonsArray, debouncedSearchValue])

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    lessonsToMap.reduce((acc, item) => ({ ...acc, [item]: false }), {})
  )

  const handleChange = (event: { target: { name: string; checked: boolean } }) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    })
  }

  const handleSend = () => {
    const newLessonsArray = Object.keys(checkedItems).filter(key => checkedItems[key])
    if (!newLessonsArray.length) {
      toast.warn('Please select at least one lesson')
      return
    }
    newLessons(newLessonsArray as Lessons[])
    handleClose()
    setCheckedItems(lessonsToMap.reduce((acc, item) => ({ ...acc, [item]: false }), {}))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-new-lesson-title'
      aria-describedby='modal-new-lesson-description'
    >
      <Box sx={style}>
        <div
          className='fixed -top-4 -right-4 bg-white text-xl w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer'
          onClick={handleClose}
        >
          x
        </div>
        <div className='text-2xl font-medium mb-2'>Request New Lesson</div>
        <div className='text-[#5C5C5E]'>Please select the lesson you want to request for the student</div>
        <OutlinedInput
          placeholder='Search lesson'
          className='mt-6 w-full h-10'
          startAdornment={<i className='tabler-search mr-2 text-[#5C5C5E]' />}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <p className='text-lg font-medium mt-6'>{lessonsToMap.length} Options</p>
        <div className='mt-4 grow overflow-y-auto'>
          <FormGroup>
            {lessonsToMap.map(lesson => (
              <FormControlLabel
                key={lesson}
                control={<Checkbox onChange={handleChange} checked={checkedItems[lesson]} name={lesson} />}
                label={lesson}
                className='w-fit'
              />
            ))}
          </FormGroup>
        </div>
        <div className='mt-6 flex justify-end gap-4'>
          <Button variant='contained' color='secondary' className='rounded-full px-6' onClick={handleClose}>
            Close
          </Button>
          <Button variant='contained' color='primary' className='rounded-full px-10' onClick={handleSend}>
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
