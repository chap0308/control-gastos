import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
        gastos,
        setGastos,
        presupuesto,
        setPresupuesto,
        setIsValidPresupuesto
    }) => {

    const [porcentaje, setPorcentaje] = useState(10)//* lo iniciamos en un 10%
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto ) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

      // Calcular el porcentaje gastado
      const nuevoPorcentaje = (( ( presupuesto - totalDisponible ) / presupuesto  ) * 100).toFixed(2);

    
    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
    }, 1500);
    }, [gastos])//! esto va a ser actualizado cada vez que agreguemos un nuevo gasto. Es decir cuando le demos click "Añadir Gasto" en el modal. Cambiará el gasto y disponible

    //! con esto formateamos el valor a USD, pero no modificamos el original
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)//! para mostar el componente App.jsx inicial
            
        } 
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        //* Le damos validacion cuando nos pasamos del presuesto con colores
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',//? color del circulo
                        trailColor: '#F5F5F5',//? color del fondo del circulo
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',//? color de las letras del contenido del circulo
                    })}
                    value={porcentaje}//! este la cantidad del circulo
                    text={`${porcentaje}% Gastado`}//? texto del circulo
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>

                {/* Validacion para saldo negativo */}
                <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
