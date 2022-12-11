import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email, password }) => {
        dispatch( onChecking() )

        try {
            
            const {data} = await calendarApi.post('/auth', { email,password })
            const { name, uid } = data.usuario;
            localStorage.setItem('token', data.token )
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: name, uid: uid}) )
            

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
            
        }
        

    }

    const startRegister = async({name, email, password }) => {
    
        dispatch( onChecking() )

        try {
            const {data} = await calendarApi.post('/auth/new', { name, email, password })
            const { uid } = data.usuario;
            localStorage.setItem('token', data.token )
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name,  uid}) )

        } catch( {response} ){

            dispatch( onLogout( response.data?.error ||'Error al ingresar los datos' ));
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
        }
        
    }

    const checkAuthToken = async() => {
    
        const token = localStorage.getItem('token');

        if( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew')
            const { uid, name } = data.usuario;
            localStorage.setItem('token', data.token )
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({name, uid}) )
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout())
        }
        
    }

    const startLogout = () => {
        localStorage.clear();
        
        dispatch( onLogout() );
    }
  
    return {
        // *Propiedades
        errorMessage,
        status,
        user,
        //*Métodos
        startLogin,
        checkAuthToken,
        startRegister,
        startLogout
  }
}
