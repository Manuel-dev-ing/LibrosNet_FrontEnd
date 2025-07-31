import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import type { Item, Libro } from '../types'
import { useCarritoStore } from '../storeCarrito'
import { toast } from 'react-toastify'

type CardProps = {
    libro: Libro | Item
}

export default function Card({libro} : CardProps) {
    const [rating, setRating] = useState(3)
    const guardar = useCarritoStore((state) => state.guardar)

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)
        console.log("rating: ", rate);
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
    <div className="card shadow">
        <img className="bd-placeholder-img card-img-top" src={libro.portada as string} alt={libro.titulo} />
        <div className="card-body">
            <p className='text-start mt-0'><span className="badge-section-secondary">{libro.categoria}</span>
            </p>
            <p className="text-start fs-6 fw-bold my-0">{libro.titulo}</p>
            <p className="text-start text-secondary fw-semibold my-1">{libro.autor}</p>
            <div className="text-start d-flex align-items-center gap-1">
                <Rating
                    onClick={handleRating}
                    initialValue={3}
                    size={25}
                    allowFraction
                    transition
                /> <span className="text-secondary">({rating})</span>
            </div>

            <p className="text-start fs-3 text-green fw-bold">${libro.precio}</p>

            <button className="btn-card rounded btn-gradient rounded-4 d-flex justify-content-center gap-2" onClick={()=> handleClick(libro as Item)}> <ShoppingCart size={20} /> Añadir al Carrito</button>
        </div>
    </div>
  )
}
