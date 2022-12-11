import PropType from 'prop-types';

export const CalendarEvent = ({event}) => {
    
    const { title, user } = event;
    
  
    return (
    <>
        <strong>{title}</strong>
        <span> -{user.name}</span>
        
    </>
  )
}


CalendarEvent.propTypes = {
    event: PropType.object.isRequired
}