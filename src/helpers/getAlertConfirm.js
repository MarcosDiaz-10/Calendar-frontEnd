import Swal from "sweetalert2";

export const getAlertConfirm = async() => {
   
    const { isConfirmed } = await Swal.fire({
        title: '¿Estas seguro de eliminar el evento?',
        text: "No podrás recuperarlo una vez eliminado!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })

    return isConfirmed
};