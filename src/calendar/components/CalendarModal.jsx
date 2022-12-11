import { useEffect, useMemo} from 'react';
import { addHours } from 'date-fns';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useForm} from '../../hooks';
import { useCalendarModal } from '../../hooks/calendar';


registerLocale('es',es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { formState: formValues, onInputChange: onChange, onDateChange, onSetObjectFormState} = useForm({
        title: '',
        notes: '',
        start: new Date(),
        end:addHours( new Date(), 2 )
    })
     
    const { onCloseModal, onSubmit, isDateModalOpen, formSubmitted, activeEvent} = useCalendarModal(formValues);
    
    const titleClass = useMemo(() => {
        if( !formSubmitted ) return "";
        return ( formValues.title.length > 0 )
            ? "" 
            : "is-invalid";
        

    }, [formValues.title, formSubmitted])

    useEffect(() => {
      
        if( activeEvent !== null){
            onSetObjectFormState( activeEvent )
        }
        

      
    }, [activeEvent])
    
    

  return (
    <Modal
       
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }

    >
        <h1> { activeEvent?.title || 'Nuevo evento' } </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                    locale="es"
                    className="form-control mt-2" 
                    selected={ formValues.start }
                    onChange={ (date) => onDateChange(date, 'start')} 
                    dateFormat="Pp"
                    showTimeSelect
                    timeCaption="Hora"
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                    className="form-control mt-2" 
                    minDate={formValues.start} 
                    selected={ formValues.end } 
                    onChange={ (date) => onDateChange(date, 'end')} 
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control mt-2 ${ titleClass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
    
  )
}
