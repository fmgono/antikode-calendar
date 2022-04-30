import React, { useState, useReducer, useEffect } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "store":
      return [...state, payload]
    case "update":
      return state.map(evt => evt.id === payload.id ? payload : evt)
    case "delete":
      return state.filter(evt => evt.id !== payload.id)
    default:
      throw new Error("No type reducer");
  }
}

const initEvents = _ => {
  const storageEvents = localStorage.getItem("savedEvents")
  return storageEvents ? JSON.parse(storageEvents): []
}

export default function ContextWrapper(props){
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(dayjs())
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents)
  const [selectedEvent, setSelectedEvent] = useState(false)

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents))
  }, [savedEvents])
  return (
    <GlobalContext.Provider value={{ 
        monthIndex, 
        setMonthIndex,
        showEventModal,
        setShowEventModal,
        selectedDay,
        setSelectedDay,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}