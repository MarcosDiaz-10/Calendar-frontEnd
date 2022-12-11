import { addHours } from "date-fns";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore()
    const { user } = useAuthStore();
    

    const onClick = () => {
        setActiveEvent({
                title:'',
                notes: '',
                start: new Date(),
                end: addHours( new Date(), 2 ),
                bgColor: '#fafafa',
                user
            } 
        )

        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ onClick }
    >
        <i className=" fa fa-plus"></i>
    </button>
  )
}
