import React from 'react'

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: () => {},
  selectedDay: 0,
  setSelectedDay: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  savedEvents: [],
  dispatchCalEvent: ({type, payload}) => {},
  selectedEvent: { id: '', title: '', time: '', email: '', labelBg: '' },
  setSelectedEvent: () => {},
})

export default GlobalContext