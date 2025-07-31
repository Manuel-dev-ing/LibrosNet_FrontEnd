import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutView() {
  return (
    <>
        <div className='container-fluid'>
            
            <div className='my-4'>
                <Link className='text-decoration-none fw-semibold text-secondary d-flex align-items-center gap-2' to={'/carrito'}><ArrowLeft size={19} />  Volver al carrito</Link>

            </div>

            <div className='col-12  d-flex justify-content-between mb-4'>
                <div className='w-64 border bg-white rounded-1 align-self-start'>
                    <h5>informacion del pago</h5>

                </div>
                <div className='w-64 border bg-white rounded-1 p-4 align-self-start'>
                    <h5>Resumen del Pedido</h5>
                    <div className=' d-flex justify-content-between mt-4'>
                        <div>
                            <p className='m-0 fs-6 fw-semibold'>1984</p>
                            <p className='m-0 text-secondary fs-9'>George Orwel</p>
                            <p className='text-start mt-1 fs-9'><span className="border-gray bg-white rounded-4 px-2 fw-semibold">Cantidad: 1</span>
                            </p>
                        </div>
                        <p className='m-0 fw-semibold'>$62.02</p>   
                    </div>
                    <hr className='m-0 ' />

                </div>
            </div>

        </div>
    
    </>
  )
}
