import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function Card() {
    const [rating, setRating] = useState(3)

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)
        console.log("rating: ", rate);
        
        // other logic
    }

  return (
    <div className="card shadow">
        <img className=" bd-placeholder-img card-img-top" src="../../public/img/card-image.jpg" alt="" />
        <div className="card-body">
            <p className='text-start mt-0'><span className="badge-section-secondary">Misterio</span>
            </p>
            <p className="text-start fs-6 fw-bold my-0">El Codigo Da Vinci</p>
            <p className="text-start text-secondary fw-semibold my-1">Dan Brow</p>
            <div className="text-start d-flex align-items-center gap-1">
            <Rating
                onClick={handleRating}
                initialValue={3}
                size={25}
                allowFraction
                transition
                /* Available Props */
            /> <span className="text-secondary">({rating})</span>
            </div>
                

            <p className="text-start fs-3 text-green fw-bold">$24.99</p>

            <button className="btn-card rounded btn-gradient rounded-4 d-flex justify-content-center gap-2"> <ShoppingCart size={20} /> Añadir al Carrito</button>
        </div>
    </div>
  )
}
