import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../helpers";
import { onAddNewEvent, onClearEvent, onClearEvents, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { useAuthStore } from "./useAuthStore";

export const useCalendarStore = () => {

    const { user } = useAuthStore();
    
    const { events, activeEvent } = useSelector( ( state ) => state.calendar );
    const dispatch = useDispatch();
  
    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const clearActiveEvent = () => {
        dispatch( onClearEvent())
    }

    const startSavingEvent = async ( calendarEvent ) => {


        try {
            
            if( calendarEvent.id ) {
                //* Actualizando
                const {data} = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
                dispatch( onUpdateEvent({...calendarEvent, user }));
                return;
            }   
            //* Creando
            
            const { data } = await calendarApi.post( '/events', { ...calendarEvent } );

            const { id } = data.evento;
            
            dispatch( onAddNewEvent( { ...calendarEvent, id } ) );
                    
        } catch (error) {
            
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }


    }

    const startDeletingEvent = async ( id ) => {
    
        //TODO: llegar al backend

        dispatch( onDeleteEvent())
    }

    const startLoadingEvents = async ( id ) => {
        
        try {

            const { data } = await calendarApi.get( '/events' );
            const events = convertEventsToDate( data.eventos );

            dispatch( onLoadEvents( events));
            
            
            
        } catch (error) {
            console.log('Error cargando eventos  ', error);
            
        }

    }




    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected:!!activeEvent,
        //*Métodos
        setActiveEvent,
        clearActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
