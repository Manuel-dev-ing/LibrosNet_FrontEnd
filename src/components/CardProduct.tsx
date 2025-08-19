import { useState } from 'react'
import type { CalificacionFormData, Item, Libro } from '../types'
import { Rating } from 'react-simple-star-rating'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCarritoStore } from '../storeCarrito'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { createCalificacion } from '../services/LibrosAPI'

type CardProps = {
    libro: Libro
}

export default function CardProduct({libro} : CardProps) {
    const [rating, setRating] = useState(libro.calificacion)
    const guardar = useCarritoStore((state) => state.guardar)
    
    const mutation = useMutation({
        mutationFn: createCalificacion,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Calificacion exitosa")
        }

    })

    // Catch Rating value
    const handleRating = (rate: number, id: number) => {
        setRating(rate)
        console.log("rating: ", rating);
        console.log("Id rating: ", id);
        const calificacion: CalificacionFormData = {cantidad: rate, id_libro: id} 

        mutation.mutate(calificacion)
    }

    const handleClick = (libro: Item) => {
        libro.cantidad = 1;

        const success = guardar(libro)
        // console.log(success);
        if (success.isSuccess) {

            toast.success(success.mensaje)
            return
        }
        toast.error(success.mensaje)
    
    }

  return (
    <>
        <div className="border bg-white w-35 d-flex flex-column">
            <img className="bd-placeholder-img" src={`${libro.portada}`} alt={libro.titulo} />
            <div className="card-body bg-white py-3 px-4">
                <p className='text-start mt-0'><span className="badge-section-secondary">{libro.categoria}</span>
                </p>
                <Link to={`/libro/${libro.id}`} className="text-start fs-6 fw-bold my-0 text-dark">{libro.titulo}</Link>
                <p className="text-start text-secondary fw-semibold my-1">{libro.autor}</p>
                <div className="text-start d-flex align-items-center gap-1">
                    <Rating 
                        onClick={(rate) => handleRating(rate, libro.id)}
                        initialValue={rating == null ? 0 : rating}
                        size={25}
                        allowFraction
                        transition
                    /> <span className="text-secondary">({rating == null ? 0 : rating})</span>
                </div>
    
                <p className="text-start fs-3 text-green fw-bold">${libro.precio}</p>
    
                <button className="btn-card rounded btn-gradient rounded-4 d-flex justify-content-center gap-2" onClick={()=> handleClick(libro as Item)}> <ShoppingCart size={20} /> Añadir al Carrito</button>
            </div>
        </div>
    
    </>
  )
}
