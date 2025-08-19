import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, Minus, Plus, RotateCcw, Shield, ShoppingCart, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { createCalificacion, getDetailBook } from '../services/LibrosAPI'
import type { CalificacionFormData, Item } from '../types'
import { useCarritoStore } from '../storeCarrito'
import { toast } from 'react-toastify'
import Comentarios from '../components/Comentarios'


export default function DetalleLibroView() {
    const [counter, setCounter] = useState(1)
    const [rating, setRating] = useState<number>()
    const [porcentaje, setPorcentaje] = useState(21/100)

    const guardar = useCarritoStore((state) => state.guardar)
    
    
    
    const params = useParams()
    const libroId = Number(params.LibroId)!
    // console.log(libroId);

    const {data, isLoading} = useQuery({
        queryFn: () => getDetailBook(libroId),
        queryKey: ['detailBook', libroId],
        retry: false
    })
    const mutation = useMutation({
        mutationFn: createCalificacion,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Calificacion exitosa")
        }

    })

    const resultado = useMemo(() => data?.precio! - (data?.precio! * porcentaje),[data])
    console.log(resultado.toFixed(2));
    

    // Catch Rating value
    const handleRating = (rate: number, id: number) => {
        setRating(rate)
        console.log("rating: ", rating);
        console.log("Id rating: ", id);
        const calificacion: CalificacionFormData = {cantidad: rate, id_libro: id} 

        mutation.mutate(calificacion)
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
                <Link className='text-decoration-none fw-semibold text-dark d-flex align-items-center gap-2' to={'/libros'}><ArrowLeft size={19} />  Volver al carrito</Link>

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
                            onClick={(rate) => handleRating(rate, data.id)}
                            initialValue={data.calificacion == null ? 0 : data.calificacion}
                            size={25}
                            allowFraction
                            transition
                        /> <span className="text-secondary">({data.calificacion == null ? 0 : data.calificacion})</span>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <p className='m-0 fs-3 fw-bold'>${resultado.toFixed(2)}</p>
                        <p className='m-0 fs-5 text-decoration-line-through'>${data.precio}</p>
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

            <Comentarios 
                libroId={libroId}
            />

        </div>
    
    </>
  )
}
