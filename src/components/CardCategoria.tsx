import { ArrowRight } from 'lucide-react'
import React from 'react'
import type { Categoria } from '../types'

type CardCategoriaProps = {
  categoria: Categoria,
  overlayStyle: string
}

export default function CardCategoria({categoria, overlayStyle} : CardCategoriaProps) {

  

  return (
    <div className="card shadow w-40 rounded-top-4">

        <div className="image-container ">
            <img
            className="bd-placeholder-img rounded-top-4"
            src="../../public/img/card-image.jpg"
            alt="Imagen categoria"
            />
            <div className={`image-overlay ${overlayStyle} d-flex flex-column align-items-center justify-content-center rounded-top-4`}>

                <p className='text-white fs-4 fw-bold'>{categoria.nombre}</p>
                <span className='badge-section-white'>2,352 libros</span>

            </div>
        </div>
        
        <div className="card-body">
            
            <p className="text-start fs-6 my-3">{categoria.descripcion}</p>

            <button className="w-37 rounded btn-black rounded-4 d-flex justify-content-center align-items-center gap-2 fs-6">Explorar Categoria <ArrowRight size={20} /> </button>
        </div>
    </div>
  )
}
