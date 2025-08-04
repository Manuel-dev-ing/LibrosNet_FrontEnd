import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Resumen from '../components/carrito/Resumen'
import Items from '../components/carrito/Items'
import { useCarritoStore } from '../storeCarrito'
import type { Item } from '../types'

export default function CarritoView () {

  const carrito = useCarritoStore((state) => state.carrito)
  

  return (
    <div className='container-fluid mt-4 mb-4'>
        
      <div className='d-flex align-items-sm-center gap-5'>
          {carrito.length ? (
            <>
              <Link className='text-decoration-none fw-semibold text-black' to={'/libros'}><ArrowLeft size={20} />  Seguir Comprando</Link>
              <h2 className='fw-bold'>Carrito de Compras</h2>
            </>
            
          ): ( <></> )}  
      </div>

      <div className='d-flex col-12 gap-3 mt-4'>
          {carrito.length ? (
            <>
              <div className='col-8 rounded align-self-start'>
              
                {carrito.map((libro) => (
                  <Items
                    key={libro.id}
                    libro={libro as Item}
                  />
                  
                ))} 

              </div>
              <div className='border col-4 rounded bg-white px-3'>
                <Resumen />

              </div>
            </>
          ) : (
            <>
              <div className='container-fluid d-flex flex-column align-items-center'>
                  <ShoppingBag
                    size={90}
                    color='#64748b'
                  /> 
                  <p className='fs-2 fw-bold'>Tu carrito esta vacio</p>
                  <p className='fs-6 text-secondary fw-normal'>¡Descubre nuestros libros y añade algunos a tu carrito!</p>
                  <Link to={'/libros'} className='btn btn-dark fw-semibold'>Explorar Catalogo</Link>
              </div>
            
            </>
          )}
          
      </div>

    </div>
  )
}
