import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [stock, setStock] = useState('');

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "videojuegos", id)
    const data = {marca:marca, tipo:tipo, descripcion:descripcion, precio:parseFloat(precio), estado:estado, stock:parseInt(stock)}
    await updateDoc(product, data)
    navigate('/')
  }
  const getProductById = async (id) => {
    const product = await getDoc(doc(db, 'videojuegos', id))
    if (product.exists()) {
      //console.log(product.data())
      setMarca(product.data().marca)
      setTipo(product.data().tipo)
      setDescripcion(product.data().descripcion)  
      setPrecio(product.data().precio)
      setEstado(product.data().estado)
      setStock(product.data().stock)
    }else{
      console.log('No existe el producto')
    
    }
  }
  useEffect(() => {
    getProductById(id)
  }, [])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Editar Producto</h1>

          <form onSubmit={update}>
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
            <button type='submit' className='btn btn-primary'>Actualizar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit