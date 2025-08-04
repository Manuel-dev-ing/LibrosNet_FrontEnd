import { ArrowLeft, CreditCard } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCarritoStore } from '../storeCarrito'
import type { Item } from '../types'

export default function CheckoutView() {

    const carrito = useCarritoStore((state) => state.carrito as Item[])
    const subTotal = useMemo(() => carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0), [carrito])
    const impuestos = useMemo(() => carrito.reduce((total, item) => total + (item.cantidad * 2.20), 0), [carrito])
    const total = subTotal + impuestos

  return (
    <>
        <div className='container-fluid'>
            
            <div className='my-4'>
                <Link className='text-decoration-none fw-semibold text-secondary d-flex align-items-center gap-2' to={'/carrito'}><ArrowLeft size={19} />  Volver al carrito</Link>

            </div>

            <div className='col-12  d-flex justify-content-between mb-4'>
                <div className='w-64 border bg-white rounded-1 p-4 align-self-start'>
                    <h5><CreditCard /> Informacion de Pago</h5>

                </div>
                <div className='w-64 border bg-white rounded-1 p-4 align-self-start'>
                    <h5>Resumen del Pedido</h5>

                    {carrito.map((item) => (
                        <>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <p className='m-0 fs-6 fw-semibold'>{item.titulo}</p>
                                    <p className='m-0 text-secondary fs-9'>{item.autor}</p>
                                    <p className='text-start mt-1 fs-9'><span className="border-gray bg-white rounded-4 px-2 fw-semibold">Cantidad: {item.cantidad}</span>
                                    </p>
                                </div>
                                <p className='m-0 fw-semibold'>${item.precio.toFixed(2)}</p>   
                            </div>
                        
                        </>
                    ))}

                    
                    <hr className='m-0' />
                    <div className='mt-2'>
                        <p className='d-flex justify-content-between m-1 fs-6'>SubTotal: <span className='text-black'>${subTotal.toFixed(2)}</span></p>
                        <p className='d-flex justify-content-between m-1 fs-6'>Envio: <span className='text-black'>Gratis</span></p>
                        <p className='d-flex justify-content-between m-1 fs-6'>Inpuestos: <span className='text-black'>${impuestos.toFixed(2)}</span></p>
                        <hr className='m-0'/>
                        <p className='d-flex justify-content-between text-black fw-semibold fs-6 mt-2'>Total: <span className='text-black fw-semibold'>${total.toFixed(2)}</span></p>
                    </div>
                    <div className='bg-info-25 p-3 rounded'>
                        <p className='text-dark fw-semibold fs-10'>Informacion de Entrega</p>
                        <ul className='m-0'>
                            <li className='fs-9 text-secondary'>Entrega en 3-5 dias habiles</li>
                            <li className='fs-9 text-secondary'>Envio gratuito en pedidos superiores en $50</li>
                            <li className='fs-9 text-secondary'>Garantia en devolucion de 30 dias</li>
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    
    </>
  )
}
