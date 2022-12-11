import { useEffect, useMemo, useState } from "react";

export const useForm = ( initialForm = {}, formValidations = {}) => {

  const initialFormMemo = useMemo(() => ({ ...initialForm }), []);
   
   const [formState, setFormState] = useState( initialFormMemo );
   const [formValidation, setFormValidation] = useState({})

   useEffect(() => {
     
     createValidators();
     
   }, [ formState ])
   
   useEffect(() => {

     setFormState( initialFormMemo )
     
   }, [initialFormMemo])
   

   const isFormValid = useMemo(() => { 

       for (const formField of Object.keys( formValidation )) {
         
         if( formValidation[formField] !== null) return false;

       }

       return true
    }, [ formValidation ])


   const onInputChange = ( { target } ) => {
       const { name, value } = target;
       
      setFormState({...formState, [ name ]: value });

   };

   const onSetObjectFormState = ( object ) => {
     setFormState({ ...object });
   }

   const onResetForm = () => {
       setFormState( initialFormMemo )
   }

   const onCleanInput = ({ target }) => {
     const { name } = target;
       
     setFormState({...formState, [ name ]: '' });
   }

   
   const onDateChange = (date, changing) => {
        
      if(date === null) date = formState[changing];

      
      setFormState({
          ...formState,
          [changing]: date
      })
    
    }


   const createValidators = () => {

     const formCheckedValues = {};

     for (const formField of Object.keys( formValidations )) {
       const [ fn, errorMessage ] = formValidations[formField]
       
       formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
     }
     setFormValidation( formCheckedValues )
     
   };


 return {
   ...formState,
   ...formValidation,
   formState,
   formValidation,
   isFormValid,
   onCleanInput,
   onDateChange,
   onInputChange,
   onResetForm,
   onSetObjectFormState

 } 
}
