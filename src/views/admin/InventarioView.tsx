import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Package, RefreshCw, TrendingDown, TrendingUp, TriangleAlert, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getBooks, getDataInventory, restoreStock } from '../../services/LibrosAPI'
import { HasStock, HasStockBadge } from '../../helpers/isStock'
import { getAdapter } from 'axios'
import { getAllCategories } from '../../services/CategoriaAPI'
import type { Libros } from '../../types'
import { toast } from 'react-toastify'

export default function InventarioView() {
    const [recordsPorPagina, setRecordPorPagina] = useState<number>(5)
    const [pagina, setPagina] = useState<number>(1) 
    const [categoria, setCategoria] = useState<string>("")
    const [Libros, setLibros] = useState<Libros>()
    const [buscar, setBuscar] = useState<string>("")
    const [ordenar, setOrdenar] = useState<string>("titulo")

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryFn: () => getBooks(pagina, recordsPorPagina),
        queryKey: ['libros', pagina, recordsPorPagina]
    })

    const { data: categorias, isLoading: isLoadingCategorias } = useQuery({
        queryFn: getAllCategories,
        queryKey: ['categorias']
    })

    const { data: dataInventario, isLoading: loadingDataInventario } = useQuery({
        queryFn: getDataInventory,
        queryKey: ['dataInventario']
    })

    const mutation = useMutation({
        mutationFn: restoreStock,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Se restablecio el stock")
            queryClient.invalidateQueries({queryKey: ['libros', pagina, recordsPorPagina]})
            queryClient.invalidateQueries({queryKey: ['categorias']})
            queryClient.invalidateQueries({queryKey: ['dataInventario']})
        }

    })

    useEffect(() => {
        if (!data?.length) return;
        
        let libros = [...data]

        if (categoria !== "") {
            const filterLibros = libros.filter(x => x.categoria === categoria)
            
            setLibros(filterLibros)    

        }else if(categoria === ""){
            console.log("todas las categorias");
            setLibros(libros)    
        }

        console.log("fin useEffect");

    }, [data, categoria])

    useEffect(() => {

        console.log("useEffect ordenado");
        console.log(ordenar);
        if (!data?.length) return;
        
        let libros = [...data]


        if (ordenar === "titulo") {
            libros.sort(function(a,b){
                return a.titulo.localeCompare(b.titulo)
            });
            console.log(libros);
            
        }else if(ordenar === "stock"){
            libros.sort((a, b)=> a.stock - b.stock)
        
        }else if(ordenar === "precio"){
            libros.sort((a, b)=> a.precio - b.precio)
        }

        setLibros(libros)
        console.log("Fin useEffect ordenado");
        

    }, [ordenar, data])


    const handleChangeCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoria(e.target.value)
    }

    const handleChangeBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscar(e.target.value)
        const valor = e.target.value
        const resultado = data?.filter(item => item.titulo.includes(valor) || item.autor.includes(valor))
        setLibros(resultado)
    }

    const handleChangeOrdenar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setOrdenar(e.target.value)
    }

    const handleClickRestaurar = (id : number) => {
        console.log("restaurando stock...");
        console.log(id);
        mutation.mutate(id)
    }

    if (isLoading && loadingDataInventario) return 'obteniendo datos...'

  return (
    <>
        <div className='d-flex flex-wrap gap-3'>
            <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <p className='fs-6 fw-medium text-secondary m-0'>Total Libros</p>
                        <p className='fw-bold fs-4'>{dataInventario?.totalLibros}</p>
                    </div>
                    <div className=''>
                        <Package size={32} color={'#2563eb'}/>
                    </div>
                </div> 
            </div>
            <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <p className='fs-6 fw-medium text-secondary m-0'>Valor Total</p>
                        <p className='fw-bold fs-4'>${dataInventario?.valorTotal.toFixed(2)}</p>
                    </div>
                    <div className=''>
                        <TrendingUp size={32} color={'#16a34a'}/>
                    </div>
                </div> 
            </div>
            <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <p className='fs-6 fw-medium text-secondary m-0'>Artículos bajos de stock</p>
                        <p className='fw-bold fs-4'>{dataInventario?.bajoStock}</p>
                    </div>
                    <div className=''>
                        <TriangleAlert size={32}  color={'#ca8a04'}/>
                    </div>
                </div> 
            </div>
            <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <p className='fs-6 fw-medium text-secondary m-0'>Agotado</p>
                        <p className='fw-bold fs-4'>{dataInventario?.agotado}</p>
                    </div>
                    <div className=''>
                        <TrendingDown size={32} color={'#dc2626'}/>
                    </div>
                </div> 
            </div>


        </div>

        <div className='p-3 border mt-4 mx-auto d-flex justify-content-between rounded'>
            <div className='w-54'>
                <label className="form-label m-0 fw-medium">Buscar</label>
                <input className='form-control' type="text" value={buscar} onChange={handleChangeBuscar}  placeholder='Buscar por titulo, autor'/>
            </div>
            <div className='w-20'>
                <label className="form-label m-0 fw-medium">Categoria</label>
                <select className='form-select' onChange={handleChangeCategoria}>
                    <option value="">-- Selecciona --</option>
                    {categorias?.map(categoria => (
                        <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                    ))}

                </select>
            
            </div>
            <div className='w-20'>
                <label className="form-label m-0 fw-medium">Ordenar por</label>
                <select className='form-select' onChange={handleChangeOrdenar}>
                    
                    <option value="titulo">Titulo</option>
                    <option value="stock">Stock</option>
                    <option value="precio">Precio</option>

                </select>

            </div>
        </div>
        
        <div className='border p-3 mt-3 rounded'>
            <h4 className=''>Inventario de Libros</h4>


            {Libros?.map((libro) => (

                <div key={libro.id} className='border rounded p-3 d-flex justify-content-between mb-3'>
                    <div className='d-flex flex-column'>
                        <p className='fw-semibold m-0'>{libro.titulo}</p>
                        <p className='fw-medium text-secondary fs-9 m-0'>by {libro.autor}</p>
                        <p className='fw-medium text-secondary fs-9 m-0'>ISBN: {libro.isbn}</p>
                        <div className='d-flex justify-content-start gap-2 mt-2'>
                            <span className='badge-section-secondary'>{libro.categoria}</span>
                            <span className={`${HasStockBadge(libro.stock, libro.stockMinimo)}`}>{HasStock(libro.stock, libro.stockMinimo)}</span>
                        </div>
                    </div>

                    <div className=' d-flex gap-3'>
                        <div className='align-self-start d-flex flex-column align-items-center'>
                            <p className='m-0 text-secondary fs-6 '>Stock Actual</p>
                            <span className='fs-5 fw-bold'>{libro.stock}</span>
                        </div>
                        <div className='align-self-start d-flex flex-column align-items-center '>
                            <p className='m-0 text-secondary'>Min/Max</p>
                            <span className='fs-6'>{libro.stockMinimo}/{libro.stockMaximo}</span>
                        </div>
                        <div className='align-self-start d-flex flex-column align-items-center '>
                            <p className='m-0 text-secondary'>Price</p>
                            <span className='fw-semibold'>${libro.precio}</span>
                        </div>

                        <button className='btn border align-self-start d-flex flex-column align-items-center' title='Restablecer stock' onClick={() => handleClickRestaurar(libro.id)}>
                            <RefreshCw size={20} />
                        </button>

                    </div>
                </div>
            ))}    


        </div>


    </>
  )
}
