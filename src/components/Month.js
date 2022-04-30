import { Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import Day from './Day'

export default function Month({ month }) {
  return (
    <Grid flex="1" templateColumns="repeat(7, minmax(0, 1fr))" templateRows="auto repeat(5, minmax(0, 1fr))">
      {month[0].map((day, i) => (
        <Flex key={i} flexDir="column" alignItems="center">
            <Text fontSize="sm" p="1" my={1} textAlign="center">
              {day.format('dddd')}
            </Text>
        </Flex>
      ))}
      {month.map( (row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  )
}
