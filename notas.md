## Usar rafce:
```bash
const App = () => {
  return (
    <div>App</div>
  )
}
export default App
```
## Los useEffect siempre se activan la primera vez.

## Operador lógico &&: SI ES VERDADERO EL PRIMERO, SE EJECUTA EL SEGUNDO.
```bash
expresion1 && expresion2
```
La evaluación de esta expresión es la siguiente:

1. Se evalúa expresion1. Si expresion1 se evalúa como falso (por ejemplo, false, null, undefined, 0, NaN o una cadena vacía ''), se devuelve ese valor y no se evalúa expresion2.
2. Si expresion1 se evalúa como verdadero, entonces se evalúa expresion2. Si expresion2 es verdadero, se ejecuta expresion2. Si expresion2 es falsa, se devuelve expresion2.

Nota: Si expresion1 es un objeto vacio, lo tomará como true

## Importante: STATE ARRAYS
Pasarle un key, puede ser de la base de datos o uno creado para los state de tipo arrays.
```bash
{ gastos.map( gasto => (
    <Paciente 
        //! importante
        key={gasto.id}
        //!
        gasto={gasto}
        setGasto={setGasto}
        eliminarGasto={eliminarGasto}
    />
))}
```
Pero no se necesita seleccionar:
```bash
const Gasto = ({gasto, setGasto, eliminarGasto}) => {
    const { descripcion } = gasto;
    return (
        <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
            <span className="font-normal normal-case">{descripcion}</span>
        </p>
    )
}
```
## Nota del ternario en className
Correcto: Colocar null
```bash
const OtherComponent = ({ enabled }) => {
  return ( <div className={enabled ? 'enabled' : null}> Hi </div> );
};

Output: <div>Hi</div>
```
Incorrecto: Ya que el output será:
```bash
const MyComponent = ({ enabled }) => {
  return ( <div className={enabled ? 'enabled' : ''}> Hi </div> );
};
Output: <div class>Hi</div>
```
