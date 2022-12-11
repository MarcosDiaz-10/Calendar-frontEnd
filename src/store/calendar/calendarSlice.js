import { createSlice } from '@reduxjs/toolkit';



export const calendarSlice = createSlice({
    name: 'calendar',
    initialState:{
        isLoadingEvents: true,
        events:[],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if( event.id === payload.id ) {
                    return payload;
                }
                return event;
            });
            state.activeEvent = payload;
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;
        },
        onClearEvents: ( state ) => {
            state.events = [];
            state.activeEvent = null;
        
        },
        onClearEvent: ( state ) => {
            state.activeEvent = null;
        },
        onLoadEvents: ( state, {payload} ) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id);
                if( !exists) {
                
                    state.events.push( event );
                    
                }
            });
        }

    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onClearEvent,onLoadEvents, onClearEvents } = calendarSlice.actions;