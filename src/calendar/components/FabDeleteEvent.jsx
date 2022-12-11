
import { useMemo } from "react";
import { getAlertConfirm } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";


export const FabDeleteEvent = () => {
  
    const {  activeEvent, startDeletingEvent} = useCalendarStore();
    const { hasDataModalOpen } = useUiStore();

  
    const conditionalShowFab = useMemo(() => {
         return ( !hasDataModalOpen && !!activeEvent?.id)
            ? true
            : false
    }, [hasDataModalOpen, activeEvent])

    const onClick = async() => {

        
        const isConfirmed = await getAlertConfirm(); 

        if( !isConfirmed )return;

        await startDeletingEvent( activeEvent.id );

    };

    return (
    <button
        className="btn btn-danger fab-trash"
        onClick={ onClick }
        style={{
            display: conditionalShowFab ? '' : 'none'
        }}
    >
        <i className=" fa fa-trash-alt"></i>
    </button>
  )
}
