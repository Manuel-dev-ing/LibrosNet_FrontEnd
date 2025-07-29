import { Minus, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Items() {
    const cantidad : number = 37.36

    const [counter, setCounter] = useState(1)
    const [precio, setPrecio] = useState(cantidad) 

    const handleClickMinus = () => {
        setCounter( prev => {
        const nuevoValor = prev - 1
            
        return nuevoValor < 1 ? 1 : nuevoValor;   
        })
    }
    
    useEffect(() => {
     
        setPrecio(counter * cantidad)

    }, [counter, cantidad])

    const handleClickPlus = () => {
        setCounter(counter + 1)
        
    }

  return (
    <>
        <div className='d-flex gap-3 mb-2 bg-white p-4 rounded-4 border'>
            <img className='rounded imagen-sm' src="../../public/img/card-image.jpg" alt="" />
            <div className='w-full'>
                <div className='d-flex justify-content-between'>
                    <p className='m-0 fw-semibold fs-5'>1984</p>
                    <a title='Eliminar articulo'>
                        <Trash2 size={20} color={'#dc3545'} />
                    </a>
                </div>
                <p className='m-0 text-secondary fw-semibold font-7'>George Orwell</p>
                <p className='m-0 text-secondary fw-semibold font-8'>Distopia</p>
                <div className='d-flex justify-content-between mt-3'>
                <div className='m-0 w-56 h-36 d-flex justify-content-between  align-items-center'>
                    <button className='button' onClick={handleClickMinus} disabled={counter === 1}>
                    <Minus
                        size={18}
                    />
                    </button>
                    <span className='fw-semibold'>{counter}</span>   
                    <button className=' button' onClick={handleClickPlus}>
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
