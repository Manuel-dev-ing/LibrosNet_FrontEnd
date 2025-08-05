import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, MessageCircle, Minus, Plus, RotateCcw, Send, Shield, ShoppingCart, Truck } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { getDetailBook } from '../services/LibrosAPI'
import type { Item, Libro } from '../types'
import { useLibrosStore } from '../store'
import { useCarritoStore } from '../storeCarrito'
import { toast } from 'react-toastify'

export default function DetalleLibroView() {
    const [counter, setCounter] = useState(1)
    
    const [rating, setRating] = useState(3)

    const guardar = useCarritoStore((state) => state.guardar)
    
    const params = useParams()
    const libroId = Number(params.LibroId)!
    // console.log(libroId);

    const {data, isLoading} = useQuery({
        queryFn: () => getDetailBook(libroId),
        queryKey: ['detailBook', libroId],
        retry: false
    })
    
    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)
        console.log("rating: ", rate);
    }

    const handleClickMinus = () => {
        setCounter(prev => {
            const nuevoValor = prev - 1
      
            return nuevoValor < 1 ? 1 : nuevoValor;   
        })
    }

    const handleClickPlus = () => {
        
        setCounter(sum => {
            const nuevoValor = sum + 1
            return nuevoValor
        })
    }

    const handleClick = (data: Item) => {
        data.cantidad = counter
        const success = guardar(data)
        if (success.isSuccess) {
            toast.success(success.mensaje)
            return
        }
        toast.error(success.mensaje)


    }

    if (isLoading) return "Obteniendo libro..."

  if (data) return (
    <>
        <div className='container-fluid bg-white'>
            <div className='my-4'>
                <Link className='text-decoration-none fw-semibold text-dark d-flex align-items-center gap-2' to={'/carrito'}><ArrowLeft size={19} />  Volver al carrito</Link>

            </div>
            <div className='d-flex justify-content-center'>
                <div className='col-5 d-flex justify-content-center'>
                    <img
                        className="img-cover w-44 h-53 rounded-2"
                        src={`${data.portada}`}
                        alt="Imagen categoria"
                    />
                </div>
                <div className=' col-5 bg-white'>
                    <p className='text-start m-0'>
                        <span className="badge-section-secondary fs-9">{data.categoria}</span>
                    </p>
                    <p className='fs-2 m-0 fw-semibold'>{data.titulo}</p>
                    <p className='text-secondary fs-5'>por {data.autor}</p>
                    <div className="text-start d-flex align-items-center gap-1">
                        <Rating 
                            onClick={handleRating}
                            initialValue={rating}
                            size={25}
                            allowFraction
                            transition
                        /> <span className="text-secondary">({rating})</span>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <p className='m-0 fs-3 fw-bold'>${data.precio}</p>
                        <p className='m-0 fs-5 text-decoration-line-through'>$23.99</p>
                        <p className='m-0 badge badge text-bg-danger rounded-5'>21% OFF</p>
                    </div>
                    <p className='m-0 text-secondary'>Precio incluye impuestos</p>
                    <div className='mt-3'>
                        <p className='m-0 fw-semibold fs-5'>Descripcion</p>
                        <p className='m-0 text-secondary'>{data.sipnosis}</p>
                    </div>
                    <hr />
                    <div className='d-flex align-items-center gap-2'>
                        <p className='m-0 fw-semibold'>Cantidad: </p>
                        <div className=' m-0 w-11 h-36 d-flex justify-content-between align-items-center '>
                            <button className='button-2 border-radius-start' onClick={() => handleClickMinus()} disabled={counter === 1}>
                            <Minus
                                size={18}
                            />
                            </button>
                            <span className='fw-semibold border-cantidad d-flex justify-content-center align-items-center'>{counter}</span>   
                            <button className='button-2 border-radius-end' onClick={() => handleClickPlus()}>
                            <Plus
                                size={18}
                            />
                            </button>
                        </div>
                    </div>
                    <button className='btn btn-dark w-75 mt-3 d-flex align-items-center justify-content-center gap-3' onClick={() => handleClick(data as Item)}>
                        <ShoppingCart size={18} /> 
                        Añadir al Carrito
                    </button>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <p className='d-flex align-items-center gap-2'>
                            <Truck
                                strokeWidth={1.25}
                            />
                            Envio Gratis
                        </p>
                        <p className='d-flex align-items-center gap-2'>
                            <Shield 
                                strokeWidth={1.25} 
                            />
                            Compra Segura
                        </p>
                        <p className='d-flex align-items-center gap-2'>
                            <RotateCcw 
                                strokeWidth={1.25} 
                            />
                            30 dias devolucion
                        </p>
                    </div>

                </div>
            </div>

            <div className='mb-3 mt-5'>
                <div className='d-flex align-items-center gap-2'>
                    <MessageCircle strokeWidth={2} />
                    <h4 className='fw-bold'>Comentarios</h4>
                    <p className='text-start m-0'>
                        <span className="badge-section-secondary fs-9 text-dark">5</span>
                    </p>
                </div>
                <div className='border py-4 px-4 rounded mt-3'>
                    <p className='fw-semibold'>Añade un comentario</p>
                    <div className='d-flex flex-column'>
                        <label className='fw-semibold' htmlFor="">Tu comentario:</label>
                        <textarea className='rounded border border-secondary border-opacity-50' rows={3} name="" id="" placeholder='Comparte tu opinion sobre este libro...'></textarea>

                        <button className='mt-3 w-25 btn btn-dark d-flex justify-content-center align-items-center gap-2'>
                            <Send size={20} strokeWidth={1.25} /> 
                            Publicar comentario
                        </button>

                    </div>
                
                </div>

            </div>

        </div>
    
    </>
  )
}
