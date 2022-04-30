import React, { useState, useContext, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  // Grid,
  // theme,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  VStack,
  Text,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import { getMonth } from './utils';
import Month from './components/Month';
import theme from './theme';
import CalendarHeader from './components/CalendarHeader';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  // const [modal, setModal] = useE(modalAtom)
  const { showEventModal, setShowEventModal, monthIndex, selectedDay } = useContext(GlobalContext)
  // console.log('modal', modal)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <ChakraProvider theme={theme}>
      {showEventModal && <EventModal />}
      <Flex minH="100vh" flexDir="column">
        <CalendarHeader />
        <Flex flex="1">
          <Month month={currentMonth} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
