import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const labelBackgrounds = ['purple', 'green', 'blue']

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function EventModal() {
  const { isOpen, onClose } = useDisclosure({isOpen: true})
  const { setShowEventModal, selectedDay, dispatchCalEvent, savedEvents, selectedEvent, setSelectedEvent } = useContext(GlobalContext)
  
  const handleSubmit = e => {
    e.preventDefault()
    let selectedLabelBg = [], randomIndexLabel = 0, labelBg = null
    if (savedEvents.length > 0) {
      selectedLabelBg = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === selectedDay.format("DD-MM-YY")).map(evt => evt.labelBg)
      const restLabelBg = labelBackgrounds.filter(labelBg => !selectedLabelBg.includes(labelBg))
      randomIndexLabel = getRandomInt(restLabelBg.length - 1)
      if (restLabelBg.length === 1) {
        labelBg = restLabelBg[0]
      } else {
        labelBg = restLabelBg[randomIndexLabel]
      }
    } else {
      randomIndexLabel = getRandomInt(labelBackgrounds.length - 1)
      labelBg = labelBackgrounds[randomIndexLabel]
    }
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData);
    const payload = { id: Date.now(), day: selectedDay.valueOf(), ...formProps, labelBg }
    if (selectedEvent) {
      console.log('selectedEvent', selectedEvent)
      console.log('payload', payload)
      payload.id = selectedEvent.id
      dispatchCalEvent({type: 'update', payload})
      setShowEventModal(false)
      setSelectedEvent(null)
    } else {
      dispatchCalEvent({type: 'store', payload})
      setShowEventModal(false)
    }
  }

  const handleDelete = _ => {
    dispatchCalEvent({ type: "delete", payload: selectedEvent })
    setShowEventModal(false)
    setSelectedEvent(null)
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event for <Text as="span" color="blue.500">{selectedDay.format("dddd, MMMM DD")}</Text></ModalHeader>
          <ModalBody>
              <VStack gap="2">
                <FormControl>
                  <FormLabel htmlFor="title" fontWeight="bold">Event Name</FormLabel>
                  <Input defaultValue={selectedEvent?.title} name="title" id="title" type="text" variant="filled" placeholder="B'Day John Doe" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="time" fontWeight="bold">Time</FormLabel>
                  <Input defaultValue={selectedEvent?.time} name="time" id="time" type="time" variant="filled" placeholder="19:20" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email" fontWeight="bold">Invites by Email</FormLabel>
                  <Input defaultValue={selectedEvent?.email} name="email" id="email" type="email" variant="filled" placeholder="fmgonoo@gmail.com" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
              </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={() => onClose && setShowEventModal(false)} >
              Close
            </Button>
            {selectedEvent && (
              <Button variant="outline" colorScheme="red" mr={3} onClick={handleDelete} >
                Delete
              </Button>
            )}
            <Button colorScheme="blue" type="submit">Save</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default EventModal