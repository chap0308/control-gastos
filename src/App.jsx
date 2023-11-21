import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import {nanoid} from 'nanoid';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  //! se recomienda que los atributos que estarán en varios componentes, sean definidos acá, para usarlo globalmente

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //! Los useEffect siempre se activan la primera vez

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ) {
        setModal(true)

        setTimeout(() => {
            setAnimarModal(true)
        }, 500);
    }
  }, [ gastoEditar ])//! cuando le demos editar cambiará el gastoEditar y se activará esto
  

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro) {
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltrados)//* lo guardamos en un state para luego usarlo en ListadoGastos
    }
  }, [filtro]);//! cuando colocamos un valor en el filtro, se ejecuta este useEffect

  //! si hay algo en el localStorage, entonces mostramos el otro modal
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if(presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, []);//! solo se ejecutará una vez
  
  

  //* Abre el modal(la pantalla oscura)
  const handleNuevoGasto = () => {
    //! para abrir el modal, primero se muestra la pantalla oscura y luego el contenido. Caso contrario es en cerrarlo
    setModal(true)//? primero mostramos la pantalla oscura
    setGastoEditar({})

    setTimeout(() => {
        setAnimarModal(true)//! esto permite ver el contenido de la pantalla negra
    }, 500);
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});//* limpiamos el state despues de editar
    } else {
      // Nuevo Gasto
      gasto.id = nanoid();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto ]);
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
      <div className={modal ? 'fijar' : '' }>
        <Header 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                  gastos={gastos}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                  filtro={filtro}
                  gastosFiltrados={gastosFiltrados}
              />
            </main>

            {/* icono para aperecer el modal */}
            <div className="nuevo-gasto">
                <img 
                    src={IconoNuevoGasto}
                    alt="icono nuevo gasto"
                    onClick={handleNuevoGasto}
                />
            </div>
          </>
        )}

        {modal && <Modal 
                    modal={modal}
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  />}

      </div>
  )
}

export default App
