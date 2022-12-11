import { useAuthStore } from "../../hooks";

export const Navbar = () => {

  const { user, startLogout } = useAuthStore();
  


  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 animate__animated animate__fadeIn">
        <span className="navbar-brand">
            <i className="fa fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <button className="btn btn-outline-danger" onClick={ startLogout }>
            <i className="fa fa-sign-out-alt"></i>
            
            <span> Salir</span>
        </button>
    </div>
  )
}
