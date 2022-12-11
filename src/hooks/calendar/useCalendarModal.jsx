import { useState } from "react";
import { differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useUiStore, useCalendarStore } from "../../hooks";

export const useCalendarModal = ( formValues = {}) => {
    
    const { activeEvent, startSavingEvent, clearActiveEvent } = useCalendarStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
   
    const [formSubmitted, setformSubmitted] = useState(false);


    
    const onCloseModal = () => {
        closeDateModal();
        clearActiveEvent();

    }

    


    const onSubmit = async(event) => {
        event.preventDefault();
        setformSubmitted( true );
        const difference = differenceInSeconds(formValues.end, formValues.start);

        if(  difference <= 0 ) {
           Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')

            return;
        };
        
        if( formValues.title.length <= 0 )return;

        await startSavingEvent( formValues );

        closeDateModal();
        clearActiveEvent();
        setformSubmitted(false);
        
        
    }
  
    return {
        //*Propiedades
        isDateModalOpen,
        formSubmitted,
        activeEvent,
        differenceInSeconds: differenceInSeconds(formValues.end, formValues.start),
        //*Métodos
        onCloseModal,
        onSubmit,

  }
}
