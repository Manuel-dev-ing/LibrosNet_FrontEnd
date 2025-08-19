import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarritoStore } from '../storeCarrito'
import type { ClienteTarjeta, Item, Pedido } from '../types'
import { useLibrosStore } from '../store'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { json } from 'zod/v4'
import { useMutation } from '@tanstack/react-query'
import { createPedido } from '../services/PedidosAPI'

const initialValues: ClienteTarjeta = {
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "",
    nombreTarjeta: "",
    numeroTarjeta: "",
    fechaVencimiento: "",
    cvv: ""

}

export default function CheckoutView() {
    const usuarioAutenticado = useLibrosStore((state) => state.usuarioAutenticado);
    const carrito = useCarritoStore((state) => state.carrito as Item[])
    const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)
    const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues : initialValues})
    
    const subTotal = useMemo(() => carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0), [carrito])
    const impuestos = useMemo(() => carrito.reduce((total, item) => total + (item.cantidad * 2.20), 0), [carrito])
    const total = subTotal + impuestos

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: createPedido,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Pedido creado correctamente")
            vaciarCarrito()
            reset()
            navigate('/')
        }

    })


    const handlePay = (data: ClienteTarjeta) => {
        console.log("realizando pago...");
        const libros = localStorage.getItem('libros')
        const libros_arr : Item[] = libros ? JSON.parse(libros) : [] 
        console.log(libros_arr);
        console.log("cliente tarjeta...");

        const pedido: Pedido = {data, libros_arr} 

        console.log(pedido);
        mutation.mutate(pedido)
        

    }

  return (
    <>
        <div className='container-fluid'>
            
            <div className='my-4'>
                <Link className='text-decoration-none fw-semibold text-secondary d-flex align-items-center gap-2' to={'/carrito'}><ArrowLeft size={19} />  Volver al carrito</Link>

            </div>

            <div className='col-12 d-flex justify-content-between mb-4'>
                <form onSubmit={handleSubmit(handlePay)} className='w-64 border bg-white rounded-1 p-4 align-self-start'>
                    <h5><CreditCard /> Informacion de Pago</h5>
                    <div>
                        <h6 className='my-3 fw-semibold'>Informacion Personal</h6>

                        <div className='d-flex justify-content-between'>
                            <div className='d-flex flex-column w-28'>
                                <label className='fw-medium' htmlFor="nombre">Nombre</label>
                                <input type="text" className='border border-secondary border-opacity-50 ptb-1 rounded'
                                    {...register("nombre", {
                                        required: "El nombre es obligatorio"
                                    })}
                                />
                                {errors.nombre && (
                                    <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                                )}

                            </div>
                            <div className='d-flex flex-column w-28'>
                                <label className='fw-medium' htmlFor="nombre">Apellido</label>
                                <input type="text" className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                    {...register("apellido", {
                                        required: "El apellido es obligatorio"
                                    })}
                                />
                                {errors.apellido && (
                                    <ErrorMessage>{errors.apellido.message}</ErrorMessage>
                                )}
                            </div>  
                        </div>
                        <div className='d-flex flex-column mt-2'>
                            <label className='fw-medium' htmlFor="email">Email</label>
                            <input type="email" className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                {...register("email", {
                                    required: "El Correo electronico es obligatorio"
                                })}
                            />
                            {errors.email && (
                                <ErrorMessage>{errors.email.message}</ErrorMessage>
                            )}


                        </div>
                    </div>
                    <hr />
                    <div>
                        <h6 className='mb-3'>Direccion de Envio</h6>
                        <div className='d-flex flex-column'>
                            <label className='fw-medium' htmlFor="direccion">Direccion</label>
                            <input type="direccion" className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                {...register("direccion", {
                                    required: "La direccion es obligatoria"
                                })}
                            />
                            {errors.direccion && (
                                <ErrorMessage>{errors.direccion.message}</ErrorMessage>
                            )}

                        </div>

                        <div className='mt-3 d-flex justify-content-between col-12'>
                            <div className='d-flex flex-column w-18'>
                                <label className='fw-medium' htmlFor="ciudad">Ciudad</label>
                                <input type="text" id='ciudad' className='border border-secondary border-opacity-50 ptb-1 rounded'
                                    {...register("ciudad", {
                                        required: "La ciudad es obligatoria"
                                    })}
                                />

                                {errors.ciudad && (
                                    <ErrorMessage>{errors.ciudad.message}</ErrorMessage>
                                )}
                            
                            </div>

                            <div className='d-flex flex-column w-18'>
                                <label className='fw-medium' htmlFor="codigoPostal">Codigo Postal</label>
                                <input type="text" id='codigoPostal' className='border border-secondary border-opacity-50 ptb-1 rounded'
                                    {...register("codigoPostal", {
                                        required: "El codigo postal es obligatorio"
                                    })}
                                />
                                {errors.codigoPostal && (
                                    <ErrorMessage>{errors.codigoPostal.message}</ErrorMessage>
                                )}
                            </div>
                            <div className='d-flex flex-column w-18'>
                                <label className='fw-medium' htmlFor="pais">Pais</label>
                                <input type="text" id='pais' className='border border-secondary border-opacity-50 ptb-1 rounded'
                                    {...register("pais", {
                                        required: "El pais es obligatorio"
                                    })}
                                />
                                {errors.pais && (
                                    <ErrorMessage>{errors.pais.message}</ErrorMessage>
                                )}
                            </div>  
                        </div>

                    </div>
                    <hr />
                    <div>
                        <h6 className='fw-semibold'>Informacion de Tarjeta</h6>
                        <div className='d-flex flex-column mt-3'>
                            <label className='fw-medium' htmlFor="nombreTarjeta">Nombre de la Tarjeta</label>
                            <input type="nombreTarjeta" className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                {...register("nombreTarjeta", {
                                    required: "El nombre de la tarjeta es obligatorio"
                                })}
                            />
                            {errors.nombreTarjeta && (
                                <ErrorMessage>{errors.nombreTarjeta.message}</ErrorMessage>
                            )}

                        </div>
                        <div className='d-flex flex-column mt-2'>
                            <label className='fw-medium' htmlFor="numeroTarjeta">Numero de la Tarjeta</label>
                            <input type="numeroTarjeta" placeholder='1234 4567 9874 3594' className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                {...register("numeroTarjeta", {
                                    required: "El numero de la tarjeta es obligatorio"
                                })}
                            />
                            {errors.numeroTarjeta && (
                                <ErrorMessage>{errors.numeroTarjeta.message}</ErrorMessage>
                            )}

                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <div className='d-flex flex-column w-28'>
                                <label className='fw-medium' htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                                <input type="text" id='fechaVencimiento' placeholder='MM/AA' className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                    {...register("fechaVencimiento", {
                                        required: "La fecha vencimiento es obligatoria"
                                    })}
                                />
                                {errors.fechaVencimiento && (
                                    <ErrorMessage>{errors.fechaVencimiento.message}</ErrorMessage>
                                )}

                            </div>
                            <div className='d-flex flex-column w-28'>
                                <label className='fw-medium' htmlFor="cvv">CVV</label>
                                <input type="text" placeholder='123' className='border border-secondary border-opacity-50 ptb-1 rounded' 
                                    {...register("cvv", {
                                        required: "El codigo de seguridad es obligatorio"
                                    })}
                                />
                                {errors.cvv && (
                                    <ErrorMessage>{errors.cvv.message}</ErrorMessage>
                                )}
                            </div>  
                        </div>

                    </div>

                    <button type='submit' className='text-white btn btn-dark col-12 mt-3 d-flex justify-content-center align-items-center gap-2'>
                        <Lock strokeWidth={2} size={17} /> 
                        <span>Realizar Pedido -</span>
                        <span>${total.toFixed(2)}</span>
                    </button>

                </form>
                <div className='w-64 border bg-white rounded-1 p-4 align-self-start'>
                    <h5>Resumen del Pedido</h5>

                    {carrito.map((item) => (
                        
                        <div key={item.id} className='d-flex justify-content-between'>
                            <div>
                                <p className='m-0 fs-6 fw-semibold'>{item.titulo}</p>
                                <p className='m-0 text-secondary fs-9'>{item.autor}</p>
                                <p className='text-start mt-1 fs-9'><span className="border-gray bg-white rounded-4 px-2 fw-semibold">Cantidad: {item.cantidad}</span>
                                </p>
                            </div>
                            <p className='m-0 fw-semibold'>${item.precio.toFixed(2)}</p>   
                        </div>
                        
                        
                    
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
