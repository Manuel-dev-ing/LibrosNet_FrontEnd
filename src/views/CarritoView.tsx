import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Resumen from '../components/carrito/Resumen'
import Items from '../components/carrito/Items'

export default function CarritoView () {

  return (
    <div className='container-fluid mt-4 mb-4'>
      <div className='d-flex align-items-sm-center gap-5'>
          <Link className='text-decoration-none fw-semibold text-black' to={'/libros'}><ArrowLeft size={20} />  Seguir Comprando</Link>
          <h2 className='fw-bold'>Carrito de Compras</h2>
      </div>

      <div className='d-flex col-12 gap-3 mt-4'>
          <div className='col-8 rounded align-self-start'>
              
            <Items />
            <Items />

          </div>
          <div className='border col-4 rounded bg-white px-3 align-self-start'>
            <Resumen />

          </div>
      </div>

    </div>
  )
}
