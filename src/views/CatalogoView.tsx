import React from 'react'
import Card from '../components/Card'
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../services/LibrosAPI';
import CardProduct from '../components/CardProduct';

export default function CatalogoView() {
    const { data, isLoading } = useQuery({
        queryFn: getBooks,
        queryKey: ['libros']
    })

    if (isLoading) return  "Obteniendo libros...";

  return (
    <>
        <div className="col-lg-8 col-md-8 mx-auto mt-4 ">
            <h1 className="fw-bold text-center">Catalogo de <span className="text-primary">Libros</span> </h1>
            <p className="fs-5 text-center">
              Descubre los libros más leídos y mejor valorados por nuestra comunidad
            </p>
            
            <div className='col-10 mx-auto'>
                <input className='form-control p-3 shadow' type="text" placeholder='Buscar por titulo, autor'/>

            </div>
        </div>
        <section className='container-fluid row p-0 d-flex justify-content-between mb-5 mt-5'>
            <div className='row d-flex flex-column gap-3 col-3'>
                
                <div className='border shadow-sm bg-white p-4 rounded-3'>
                    <p className='fs-6 fw-semibold'>Ordenar Por</p>

                    <select className="form-select" aria-label="Default select example">
                        <option selected>Mejor Valorados</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className='border shadow-sm bg-white p-4 rounded-3'>
                        <p className='fs-6 fw-semibold'>Categorias</p>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                            Todas las categorias
                            </label>
                        </div>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                            <label className="form-check-label" htmlFor="exampleRadios3">
                            Second default radio
                            </label>
                        </div>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" />
                            <label className="form-check-label" htmlFor="exampleRadios4">
                            Second default radio
                            </label>
                        </div>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option5" />
                            <label className="form-check-label" htmlFor="exampleRadios5">
                            Second default radio
                            </label>
                        </div>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="option6" />
                            <label className="form-check-label" htmlFor="exampleRadios6">
                            Second default radio
                            </label>
                        </div>
                        

                </div>
                <div className='border shadow-sm bg-white p-4 rounded-3'>
                    <p className='fs-6 fw-semibold'>Rango de Precios</p>

                    
                </div>


            </div>
            <div className='col-9 p-0'>
                <div className='d-flex justify-content-start flex-wrap gap-4'>
                    { data?.length && (
                        <>
                        {data.slice(0, 4).map((libro) => (
                            
                            <CardProduct  
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
