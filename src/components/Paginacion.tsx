import React, { useEffect, useState } from 'react'
import { createArrayNums } from '../helpers/array_nums'
import type { number } from 'zod/v4'

type PaginacionProps = {
    pagina: number
    setPagina: React.Dispatch<React.SetStateAction<number>>
    recordsPorPagina: number
}

export default function Paginacion({pagina, setPagina, recordsPorPagina} : PaginacionProps) {
 
    const [arrNums, setArrNums] = useState<number[]>([])

    useEffect(() => {
        const total = localStorage.getItem('totalRegistros')
        const total_registros = total ? JSON.parse(total) : 0 
        const resultado = Math.ceil(total_registros/recordsPorPagina)
        const arr_numero_paginas = createArrayNums(resultado)
       
        setArrNums(arr_numero_paginas)

    }, [])
    // useEffect(() => {
    //     console.log("use effect pagina...");
        

    // }, [pagina])

    const handleClickPagina = (pagina : number) => {
        setPagina(pagina)
    }

    const handleClickAnterior = (pagina : number) => {
        setPagina(pagina)
    }

        
    const handleClickSiguiente = (pagina : number) => {
        setPagina(pagina)
    }

  return (
    <>
        <div className='mb-4'>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-start">
                    <li className={`page-item ${pagina === arrNums.length - (arrNums.length -1) ? 'disabled' : ''}`}>
                        <a className="page-link cusror-pointer" onClick={() => handleClickAnterior(pagina-1)}>Previous</a>
                    </li>
                    {arrNums.map((elemento) => (
                        <li key={elemento} className={`page-item ${elemento === pagina ? 'active' : ''}`}>
                            <a className="page-link cusror-pointer" onClick={() => handleClickPagina(elemento)}>{elemento}</a>
                        </li>
                    ))}
                    
                    <li className={`page-item ${pagina === arrNums.length ? 'disabled' : ''}`}>
                        <a className="page-link cusror-pointer" onClick={() => handleClickSiguiente(pagina+1)}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}
