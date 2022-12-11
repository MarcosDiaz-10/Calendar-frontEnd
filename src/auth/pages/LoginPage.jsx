import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

export const LoginPage = () => {

    const { startLogin, startRegister,errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onInputLoginChange } = useForm({
        loginEmail: '',
        loginPassword: ''
    });

    const { registerName, registerEmail, registerPassword, registerRepeatPassword, onInputChange: onInputRegisterChange } = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerRepeatPassword: '',
  
    });

    

    const loginSubmit =  (e) => {
    
        e.preventDefault();

        startLogin( { email: loginEmail, password: loginPassword} );
        

    }

    const registerSubmit =  (e) => {
    
        e.preventDefault();

        if( registerPassword !== registerRepeatPassword ) {
            Swal.fire('Error en registro', 'Las contraseñas tiene que ser iguales', 'error');
            return;
        };

        startRegister({ name: registerName, email: registerEmail, password: registerPassword} );

        
        

    }

    useEffect(() => {
      
        if( errorMessage !== undefined ){
            Swal.fire('Error en la autenticación', errorMessage, 'error');

        }
      
    }, [errorMessage])
    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1 animate__animated animate__fadeInLeft">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onInputLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onInputLoginChange}

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2 animate__animated animate__fadeInRight">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={ registerName }
                                onChange={ onInputRegisterChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onInputRegisterChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onInputRegisterChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerRepeatPassword'
                                value={ registerRepeatPassword }
                                onChange={ onInputRegisterChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}