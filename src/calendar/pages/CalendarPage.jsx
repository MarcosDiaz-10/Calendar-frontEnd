import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Navbar,CalendarEvent, CalendarModal,FabAddNew,FabDeleteEvent  } from "../components"
import { localizer, getMessagesEs } from '../../helpers'
import { useCalendarPage } from '../../hooks/calendar'





export const CalendarPage = () => {

  const {lastView, eventStyleGetter, onDoubleClick, onSelect, onViewChanged, events } = useCalendarPage()
  

  return (
   <>
    <Navbar />
    
    <Calendar
      culture="es"
      className="animate__animated animate__fadeIn"
      localizer={localizer}
      events={events}
      defaultView={ lastView  }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )', padding: '0px 20px 20px 10px' }}
      messages={getMessagesEs()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent,
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

    <CalendarModal/>
    <FabAddNew/>
    <FabDeleteEvent/>

   </> 
  )
}
