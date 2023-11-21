
// export const generarId = () => {
//     const currentTime = new Date().getTime().toString();
//     return currentTime.slice(-6); // Obtén los últimos 6 caracteres
// }

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);
    // const horaCompleta = fechaNueva.toLocaleTimeString();//* 11:17:39
    const hora = fechaNueva.getHours();
    const minutos = fechaNueva.getMinutes();
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones) + ' ' + '-' + ' ' + hora + ':' + minutos + 'hs';
}