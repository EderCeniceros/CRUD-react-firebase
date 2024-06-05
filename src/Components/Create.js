import Reacr, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate()

  const productosCollection = collection(db, 'videojuegos')

  const store = async (e) => {
    e.preventDefault()
    await addDoc(productosCollection, {marca:marca, tipo:tipo, descripcion:descripcion, precio:parseFloat(precio), estado:estado, stock:parseInt(stock)})
    navigate('/')
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Crear Producto</h1>

          <form onSubmit={store}>
          <div className='mb-3'>
              <label className='form-label'>Marca</label>
              <input 
                value={marca}
                onChange={(e) => {setMarca(e.target.value)}}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Tipo</label>
              <input 
                value={tipo}
                onChange={(e) => {setTipo(e.target.value)}}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <input 
                value={descripcion}
                onChange={(e) => {setDescripcion(e.target.value)}}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Precio</label>
              <input 
                value={precio}
                onChange={(e) => {setPrecio(e.target.value)}}
                type="number"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Estado</label>
              <input 
                value={estado}
                onChange={(e) => {setEstado(e.target.value)}}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Stock</label>
              <input 
                value={stock}
                onChange={(e) => {setStock(e.target.value)}}
                type="number"
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create