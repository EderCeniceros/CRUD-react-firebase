import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
    const [productos, setProductos] = useState([]);

    const pruductosCollection = collection(db, 'videojuegos');

    const getProductos = async () => {
      const data = await getDocs(pruductosCollection);
      
      setProductos(
        data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      );
    }

    //Función para eliminar un producto
    const deleteProduct = async (id) => {
      const productDoc = doc(db, "videojuegos", id);
      await deleteDoc(productDoc);
      getProductos();
    }

    const confirmDelete = (id) => {
      MySwal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(id);
          Swal.fire(
            '¡Eliminado!',
            'Tu archivo ha sido eliminado.',
            'success'
          )
        }
      })
    
    }

    useEffect(() => {
      getProductos();
    }, []);
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <td>Marca</td>
                  <td>Tipo</td>
                  <td>Descripción</td>
                  <td>Precio</td>
                  <td>Estado</td>
                  <td>Stock</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto)=>(
                  <tr key={producto.id}>
                    <td>{producto.marca}</td>
                    <td>{producto.tipo}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.estado}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <Link to={`/edit/${producto.id}`} className='btn btn-light'><i className="fa-solid fa-pencil"></i></Link>
                      <button onClick={ () => { confirmDelete(producto.id) } } className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show