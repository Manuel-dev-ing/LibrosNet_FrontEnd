import React, { useMemo } from 'react'
import { useLibrosStore } from '../../store'
import { useCarritoStore } from '../../storeCarrito'
import type { Item } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Resumen() {
  const usuarioAutenticado = useLibrosStore((state) => state.usuarioAutenticado);
  
  const carrito = useCarritoStore((state) => state.carrito as Item[]) 
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)
  const navigate = useNavigate()  

  const subTotal = useMemo(() => carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0), [carrito])
  const impuestos = useMemo(() => carrito.reduce((total, item) => total + (item.cantidad * 2.20), 0), [carrito])
  const total = subTotal + impuestos

  const handleClickVaciar = () => {
    vaciarCarrito()
  }

  const handleClickCheckout = () => {
    if (!usuarioAutenticado.auth) {
      navigate('/checkout')
      toast.error('No estas autenticado')
    }
    else{
      navigate('/checkout')

    }
  }

  return (
    <>
        <h5 className='mt-3'>Resumen del Pedido</h5>
        <div className=' mt-4'>
            <p className='d-flex justify-content-between text-secondary fw-medium'>SubTotal: <span className='text-black fw-semibold'>${subTotal.toFixed(2)}</span></p>
            <p className='d-flex justify-content-between text-secondary fw-medium'>Envio: <span className='text-black fw-semibold'>Gratis</span></p>
            <p className='d-flex justify-content-between text-secondary fw-medium'>Inpuestos: <span className='text-black fw-semibold'>${impuestos.toFixed(2)}</span></p>
            <hr />
            <p className='d-flex justify-content-between text-black fw-semibold fs-5'>Total: <span className='text-black fw-semibold'>${total.toFixed(2)}</span></p>

        </div>
        <div className='d-flex flex-column my-3'>
            <a onClick={handleClickCheckout} className='btn btn-dark mb-3 fw-semibold'>Proceder al Pago</a>
            <button className='button-light fw-semibold' onClick={() => handleClickVaciar()}>Vaciar Carrito</button>

        </div>
    
    
    </>
  )
}
