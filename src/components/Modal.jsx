import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'
import { useRef } from 'react';

const Modal = ({
    modal,
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0 ) {
            //! coloca los datos en el formulario
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            // console.log(gastoEditar.id);
        }
    }, []);//! se ejecutará solo una vez, cuando este componente se llame o monte.
    

    //! para cerrar el modal, se hace lo opuesto a abrir el modal. Primero se cierra el contendio y luego la pantalla negra
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})//? borramos sus datos, por si es que primero editamos. Ya que se quedan los datos de gastoEditar de manera global.
        setTimeout(() => {
            setModal(false)
        }, 500);
    }
    //* ocultar con escape
    const docRef = useRef(null);

    useEffect(() => {
        docRef.current = document;

        docRef.current.addEventListener('keyup', (e) => {
            if (modal && e.key === 'Escape') {
            setAnimarModal(false);
            setGastoEditar({})//? borramos sus datos, por si es que primero editamos. Ya que se quedan los datos de gastoEditar de manera global.
            setTimeout(() => {
                setModal(false);
            }, 500);
            }
        }, true);
    }, [modal]);
    //*

    const handleSubmit = e => {
        e.preventDefault();

        if([ nombre, cantidad, categoria ].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }
        // if(id){

        // }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}//! esta clase permite ver el contenido del formulario
            >
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>

                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Añade La cantidad del gasto: ej. 300"
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />

            </form>
        </div>
    )
}

export default Modal
