import React from 'react'

export default function Resumen() {
  return (
    <>
        <h5 className='mt-3'>Resumen del Pedido</h5>
        <div className=' mt-4'>
            <p className='d-flex justify-content-between text-secondary fw-medium'>SubTotal: <span className='text-black fw-semibold'>$60.97</span></p>
            <p className='d-flex justify-content-between text-secondary fw-medium'>Envio: <span className='text-black fw-semibold'>Gratis</span></p>
            <p className='d-flex justify-content-between text-secondary fw-medium'>Inpuestos: <span className='text-black fw-semibold'>$10.97</span></p>
            <hr />
            <p className='d-flex justify-content-between text-black fw-semibold fs-5'>Total: <span className='text-black fw-semibold'>$150.97</span></p>

        </div>
        <div className='d-flex flex-column my-3'>
            <button className='btn btn-dark mb-3 fw-semibold'>Proceder al Pago</button>
            <button className='button-light fw-semibold'>Vaciar Carrito</button>

        </div>
    
    
    </>
  )
}
