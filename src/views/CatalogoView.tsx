import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../services/LibrosAPI';
import CardProduct from '../components/CardProduct';
import { getCategories } from '../services/CategoriaAPI';
import type { Libros } from '../types';

export default function CatalogoView() {
    const [Libros, setLibros] = useState<Libros>()
    const [isSelect, setIsSelect] = useState<number>(1)
    const [minimoNumero, setMinimoNumero] = useState<number>(0)
    const [maximomoNumero, setMaximoNumero] = useState<number>(100)
    const [buscar, setBuscar] = useState<string>("")

    
    const { data, isLoading } = useQuery({
        queryFn: getBooks,
        queryKey: ['libros']
    })

    console.log(data);
    

    const { data: categorias, isLoading: isLoadingCategorias } = useQuery({
        queryFn: getCategories,
        queryKey: ['categorias']
    })

    useEffect(() => {
        console.log("useEffect");
        if (!data?.length) return;
        
        let ordenado = [...data]
        if (isSelect === 1) {
            // Menor a mayor
            ordenado.sort((a, b) => a.precio - b.precio);

        } else if (isSelect === 2){
            // Mayor a menor
            ordenado.sort((a, b) => b.precio - a.precio);
        }
        // console.log(ordenado);
        
        setLibros(ordenado)
        console.log("fin useEFFECT...");
        

    }, [data, isSelect])
    
    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {

        const nombre_categoria = e.target.value
        if (nombre_categoria === 'all') {
            setLibros(data)
            return 
        }
        const Libros = data?.filter(item => item.categoria === nombre_categoria)
        setLibros(Libros)
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        const opcion : number = Number(e.target.value)
        console.log(opcion);
        
        setIsSelect(opcion)
    }

    const handleChangeMinimoPrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinimoNumero(Number(e.target.value))
    }

    const handleChangeMaximoPrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaximoNumero(Number(e.target.value))
    }

    const handleClickRangoPrecio = () => {
        let ordenado = [...data as Libros]
        const resultado = ordenado.filter( item => item.precio > minimoNumero && item.precio <= maximomoNumero)
        setLibros(resultado)
    }

    const handleChangeBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscar(e.target.value)
        const valor = e.target.value
        const resultado = data?.filter(item => item.titulo.includes(valor) || item.autor.includes(valor))
        setLibros(resultado)
        
    }

    if (isLoading || isLoadingCategorias) return  "Obteniendo datos...";

  return (
    <>
        <div className="col-lg-8 col-md-8 mx-auto mt-4 ">
            <h1 className="fw-bold text-center">Catalogo de <span className="text-primary">Libros</span> </h1>
            <p className="fs-5 text-center">
              Descubre los libros más leídos y mejor valorados por nuestra comunidad
            </p>
            
            <div className='col-10 mx-auto'>
                <input className='form-control p-3 shadow' value={buscar} onChange={handleChangeBuscar} type="text" placeholder='Buscar por titulo, autor'/>

            </div>
        </div>
        <section className='container-fluid row p-0 d-flex justify-content-between mb-5 mt-5'>
            <div className='row d-flex flex-column gap-3 col-3'>
                
                <div className='border shadow-sm bg-white p-4 rounded-3'>
                    <p className='fs-6 fw-semibold'>Ordenar Por</p>

                    <select className="form-select" value={isSelect} onChange={handleChange}>
                        <option value="1">Precio: Menor a Mayor</option>
                        <option value="2">Precio: Mayor a Menor</option>
                        
                    </select>
                </div>
                <div className='border shadow-sm bg-white p-4 rounded-3'>
                    <p className='fs-6 fw-semibold'>Categorias</p>
                    {categorias?.length && (
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id={`exampleRadioAll`} value="all" onClick={handleClick}/>
                            <label className="form-check-label" htmlFor={`exampleRadioAll`}>
                                Todas las categorias
                            </label>
                        </div>
                    )}

                    {categorias?.length && (
                        
                        categorias?.map((categoria) => (
                            
                            <div key={categoria.id} className="form-check mt-2">
                                <input className="form-check-input" type="radio" name="exampleRadios" id={`exampleRadio${categoria.id}`} value={categoria.nombre} onClick={handleClick} />
                                <label className="form-check-label" htmlFor={`exampleRadio${categoria.id}`}>
                                    {categoria.nombre}
                                </label>
                            </div>
                            
                        ))
                    )}

                </div>
                <div className='border shadow-sm bg-white p-4 rounded-3'>
                    <p className='fs-6 fw-semibold'>Rango de Precios</p>
                    <div className='d-flex justify-content-between'>
                        <input type="number" min={1} id='minimo' value={minimoNumero} onChange={handleChangeMinimoPrecio} className='col-3 p-1 rounded-2 border border-secondary' />
                        -
                        <input type="number" min={1} id='maximo' value={maximomoNumero} onChange={handleChangeMaximoPrecio} className='col-3 p-1 rounded-2 border border-secondary' />

                        <button className='btn btn-sm btn-dark align-self-start' onClick={handleClickRangoPrecio}>Buscar</button>
                    </div>
                    
                </div>


            </div>
            <div className='col-9 p-0'>
                <div className='d-flex justify-content-start flex-wrap gap-4'>
                    { data?.length && (
                        <>
                            {Libros?.map((libro) => (
                                
                                <CardProduct  
                                    key={libro.id}
                                    libro={libro}
                                />
                                
                            ))}
                    
                        </>
                        
                    )}
                </div>

            </div>


        </section>

    
    </>
  )
}
