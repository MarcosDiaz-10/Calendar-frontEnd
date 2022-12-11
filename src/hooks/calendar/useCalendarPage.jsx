import { useEffect, useState } from "react";
import { useCalendarStore,useUiStore } from "../";


export const useCalendarPage = () => {
    
  const { openDateModal } = useUiStore();
  const { events, activeEvent, hasEventSelected,setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) ?? 'month' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
    
  }

  const onDoubleClick = (event ) => {
    
    openDateModal();
    
  }

  const onSelect = (event ) => {

    setActiveEvent( event )

  }

  const onViewChanged = (event ) => {

    localStorage.setItem( 'lastView', event );
    setLastView( event )
  }
  
  useEffect(() => {
    
    startLoadingEvents();
    
  
  }, [])
  


  return {
      //*Propiedades
      lastView,
      events,
      activeEvent,
      hasEventSelected,
      //*Métodos
      eventStyleGetter,
      onDoubleClick,
      onSelect,
      onViewChanged,

  }
}
