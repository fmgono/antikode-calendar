import { Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

export default function Day({ day, rowIdx }) {
  const { monthIndex, setSelectedDay, setShowEventModal, savedEvents, setSelectedEvent } = useContext(GlobalContext)
  
  const [dayEvents, setDayEvents] = useState([])
  useEffect(() => {
    const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
    setDayEvents(events)
  }, [savedEvents, day])
  
  const getCurrentDayProps = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? {
      bgColor: "blue.500",
      textColor: "white",
      rounded: "full",
      width: "7",
    } : {}
  }
  return (
    <Flex _hover={{
        backgroundColor: "blue.50"
      }} flexDir="column" cursor="pointer" border="1px" borderColor="gray.100"
      onClick={() => {
        setSelectedDay(day)
        setShowEventModal(true)
      }} flexDirection="column">
      <Flex as="header" flexDir="column" alignItems="center" justifyContent="flex-end">
        <Text fontSize="sm" p="1" my={1} textAlign="right" textColor={day.month() !== monthIndex ? 'gray.400' : 'gray.700' } {...getCurrentDayProps()}>
          {day.format('DD')}
        </Text>
      </Flex>
      <Box as="section" cursor="pointer" flex="1">
        {dayEvents.map(evt => (
          <Text key={evt.id} bgColor={`${evt.labelBg}.200`} p="1" mx="1" fontSize="sm" color="gray.600" rounded="md" mb="1" _hover={{
            backgroundColor: `${evt.labelBg}.300`
          }} isTruncated
          onClick={() => setSelectedEvent(evt)} >
            {evt.title}
          </Text>
        ))}
      </Box>
    </Flex>
  )
}
