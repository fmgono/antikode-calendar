import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, {useContext} from 'react'
import GlobalContext from '../context/GlobalContext'

function CalendarHeader() {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext)
  const handleReset = () => setMonthIndex(dayjs().month())
  const handlePrevMonth = () => setMonthIndex(monthIndex - 1)
  const handleNextMonth = () => setMonthIndex(monthIndex + 1)
  return (
    <Flex as="header" alignItems="center" px="4" py="2" >
      <Text as="h1" fontSize="larger">Calendar</Text>
      <Button ml="2" rounded="md" onClick={handleReset} >Today</Button>
      <Button ml="2" variant="ghost" onClick={handlePrevMonth}>
        <ChevronLeftIcon w={6} h={6} color="gray.600" />
      </Button>
      <Button ml="2" variant="ghost" onClick={handleNextMonth}>
        <ChevronRightIcon w={6} h={6} color="gray.600" />
      </Button>
      <Text ml="4" as="h2" fontWeight="bold" fontSize="lg">{ dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY") }</Text>
    </Flex>
  )
}

export default CalendarHeader