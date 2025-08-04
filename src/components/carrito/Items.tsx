import { Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Item } from '../../types'
import { useCarritoStore } from '../../storeCarrito'

type ItemsProps = {
    libro: Item
}

export default function Items({libro} : ItemsProps) {
    const cantidad : number = libro.precio

    const [counter, setCounter] = useState(libro.cantidad)
    const [precio, setPrecio] = useState(cantidad * counter) 
    const [libroId, setLibroId] = useState(libro.id) 

    const setCantidades = useCarritoStore((state) => state.setCantidades)
    const eliminar = useCarritoStore((state) => state.eliminar)

    const handleClickMinus = (id : number) => {
        setLibroId(id)
        setCounter(prev => {
            const nuevoValor = prev - 1
            setPrecio(nuevoValor * cantidad)
            setCantidades(nuevoValor, libroId)
            
            return nuevoValor < 1 ? 1 : nuevoValor;   
        })
    }

    const handleClickPlus = (id : number) => {
        setLibroId(id)
        setCounter(sum => {
            const nuevoValor = sum + 1
            setPrecio(nuevoValor * cantidad)
            setCantidades(nuevoValor, libroId)

            return nuevoValor
        })
    }

    const handleClickEliminar = (id : number) => {
        console.log(id);
        eliminar(id)
        
    }

  return (
    <>
        <div className='d-flex gap-3 mb-2 bg-white p-4 rounded-2 border'>
            <img className='rounded imagen-sm' src={libro.portada as string} alt={`Imagen ${libro.titulo}`}  />
            <div className='w-full'>
                <div className='d-flex justify-content-between'>
                    <p className='m-0 fw-semibold fs-5'>{libro.titulo}</p>
                    <a title='Eliminar articulo' onClick={() => handleClickEliminar(libro.id)}>
                        <Trash2 size={20} color={'#dc3545'} />
                    </a>
                </div>
                <p className='m-0 text-secondary fw-semibold font-7'>{libro.autor}</p>
                <p className='m-0 text-secondary fw-semibold font-8'>{libro.categoria}</p>
                <div className='d-flex justify-content-between mt-3'>
                <div className='m-0 w-56 h-36 d-flex justify-content-between align-items-center'>
                    <button className='button' onClick={() => handleClickMinus(libro.id)} disabled={counter === 1}>
                    <Minus
                        size={18}
                    />
                    </button>
                    <span className='fw-semibold'>{counter}</span>   
                    <button className='button' onClick={() => handleClickPlus(libro.id)}>
                    <Plus
                        size={18}
                    />
                    </button>
                </div>
                
                <div className='d-flex flex-column '>
                    <p className='m-0 text-black fw-semibold align-self-end'>${precio}</p>
                    <p className='m-0 text-secondary fw-medium font-8'>${cantidad} c/u</p>
                </div>
                </div>  
            </div>
        </div>
    </>
  )
}
