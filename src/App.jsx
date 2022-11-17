import React from "react";
import { firebase } from "./firebase";

function App() {
  //hooks
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [id, setId] = React.useState('')
  const [lista, setLista] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState(null)

  //obtener datos
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData = data.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
        setLista(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])

  //guardar datos
  const guardarDato = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Ingrese Nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Ingrese Apellido')
      return
    }
    if (!telefono.trim()) {
      setError('Ingrese Número de Télefono')
      return
    }
    try {
      const db = firebase.firestore()
      const nuevoUsuario = { nombre, apellido, telefono }
      //agregar a db en firebase
      const dato = await db.collection('usuarios').add(nuevoUsuario)
      //agregar a lista
      setLista([
        ...lista,
        { id: dato.id, ...nuevoUsuario }
      ])
    } catch (error) {
      console.log(error)
    }
    //limpiar los estados
    setNombre('')
    setApellido('')
    setTelefono('')
    setId('')
    setError(null)
  }

  //eliminar dato
  const eliminarDato = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listraFiltrada = lista.filter((elemento) => elemento.id !== id)
      setLista(listraFiltrada)
    } catch (error) {
      console.log(error)
    }
  }

  //funcion para habilitar el modo edicion
  const editar = (elemento) => {
    setModoEdicion(true)
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setTelefono(elemento.telefono)
    setId(elemento.id)
  }

  //editar dato
  const editarDato = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Ingrese Nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Ingrese Apellido')
      return
    }
    if (!telefono.trim()) {
      setError('Ingrese Número de Télefono')
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).update({ nombre, apellido, telefono })
      const listaEditada = lista.map((elemento) => elemento.id === id ?
        { id, nombre, apellido, telefono } : elemento)
      setLista(listaEditada)
      //limpiar estados
      setModoEdicion(false)
      setNombre('')
      setApellido('')
      setTelefono('')
      setId('')
      setError(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card my-2 border-dark">
            <div className="card-header text-bg-dark">
              <h2 className='text-center'>{modoEdicion ? 'Edición de Usuarios'
                : 'Registro de Usuarios'}</h2>
            </div>
            <div className="card-body bg-card">
              {
                error ? <div className="alert alert-danger" role='alert'>
                  {error}
                </div> : null
              }
              <form onSubmit={modoEdicion ? editarDato : guardarDato}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control my-2"
                    onChange={(e) => { setNombre(e.target.value) }}
                    placeholder='Nombre'
                    value={nombre} id='nombre' />
                  <label for="nombre">Nombre</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control my-2"
                    onChange={(e) => { setApellido(e.target.value) }}
                    placeholder='Apellido'
                    value={apellido} id='apellido' />
                  <label for="apellido">Apellido</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control my-2"
                    onChange={(e) => { setTelefono(e.target.value) }}
                    placeholder="Número de Télefono"
                    value={telefono} id='telefono' />
                  <label for="telefono">Número de Télefono</label>
                </div>
                <div className="d-grid gap-2">
                  {modoEdicion ? <button className="btn btn-success border-dark"
                    type="submit">Editar</button> : <button className="btn btn-dark border-dark"
                      type="submit">Agregar</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <ul className="list-group my-2">
            <li className="list-group-item border-dark text-bg-dark">
              <h2 className="text-center">Lista de Usuarios Registrados</h2>
            </li>
            {
              lista.map((elemento) => (
                <li className="list-group-item border-dark" key={elemento.id}>{elemento.nombre} -
                  {elemento.apellido} - {elemento.telefono}
                  <button className="btn btn-danger float-end mx-2 border-dark"
                    onClick={() => eliminarDato(elemento.id)}>Eliminar</button>
                  <button className="btn btn-warning float-end mx-2 border-dark"
                    onClick={() => editar(elemento)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;