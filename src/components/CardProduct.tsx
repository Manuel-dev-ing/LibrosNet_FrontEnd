import { useState } from 'react'
import type { Libro } from '../types'
import { Rating } from 'react-simple-star-rating'
import { ShoppingCart } from 'lucide-react'

type CardProps = {
    libro: Libro
}

export default function CardProduct({libro} : CardProps) {
    const [rating, setRating] = useState(3)
    
    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)
        console.log("rating: ", rate);
    }

  return (
    <>
        <div className="border bg-white w-35 d-flex flex-column">
            <img className="bd-placeholder-img" src={libro.portada} alt={libro.titulo} />
            <div className="card-body bg-white py-3 px-4">
                <p className='text-start mt-0'><span className="badge-section-secondary">{libro.categoria}</span>
                </p>
                <p className="text-start fs-6 fw-bold my-0">{libro.titulo}</p>
                <p className="text-start text-secondary fw-semibold my-1">{libro.autor}</p>
                <div className="text-start d-flex align-items-center gap-1">
                    <Rating 
                        onClick={handleRating}
                        initialValue={0}
                        size={25}
                        allowFraction
                        transition
                    /> <span className="text-secondary">({rating})</span>
                </div>
    
                <p className="text-start fs-3 text-green fw-bold">${libro.precio}</p>
    
                <button className="btn-card rounded btn-gradient rounded-4 d-flex justify-content-center gap-2"> <ShoppingCart size={20} /> Añadir al Carrito</button>
            </div>
        </div>
    
    </>
  )
}
