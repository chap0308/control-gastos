import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
        gastos, 
        setGastoEditar, 
        eliminarGasto,
        filtro, 
        gastosFiltrados
    }) => {
    return (
        <div className="listado-gastos contenedor">
            
            
            { filtro ? (//! si existe el state filtro, entonces iteramos en el state gastosFiltrados(puede que no haya nada, pero aún así itera)
            
                    <>
                        <h2>{ //! en caso que no haya nada, entonces aparacerá el mensaje de que no hay gastos en esta categoría. PERO SÍ EXISTE EL FILTRO
                        gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta categoría'
                        }</h2>

                        {gastosFiltrados.map( gasto => (
                            <Gasto 
                                //! importante: pasarle un key, puede ser de la base de datos o uno creado.
                                key={gasto.id}
                                //!
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                ) : (
                    //* SINO, solo itera en todos los gastos que hay en el global
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                        {gastos.map( gasto => (
                            <Gasto 
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos
