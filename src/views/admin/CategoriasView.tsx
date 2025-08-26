import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCategory, getCategories } from "../../services/CategoriaAPI"
import { SquarePen, Trash2 } from "lucide-react"
import type { Categoria } from "../../types"
import AddCategoryModal from "../../components/admin/categories/AddCategoryModal"
import { toast } from "react-toastify"
import EditCategoryModal from "../../components/admin/categories/EditCategoryModal"
import { useLibrosStore } from "../../store"
import { useState } from "react"
import Paginacion from "../../components/Paginacion"

export default function CategoriasView() {
    const [recordsPorPagina, setRecordPorPagina] = useState<number>(5)
    const [pagina, setPagina] = useState<number>(1)  


   const setCategory = useLibrosStore((state) => state.set)

    const { data, isLoading } = useQuery({
        queryKey: ['categories', pagina, recordsPorPagina],
        queryFn: () => getCategories(pagina, recordsPorPagina)
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteCategory,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Cateogoria Eliminada Correctamente")
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            
        }

    })

    const handleClickDelete = (id : number) => {
        mutation.mutate(id)
    }


    const handleClickUpdate = ( categoria : Categoria ) => {
        console.log("Actualizando...");
        console.log(categoria);
        setCategory(categoria)
    }

    if (isLoading) 'Loading...'

  if(data) return (
    <>
        <h4 className='text-blue-bold'>Categorias</h4>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><a className='text-blue-bold fw-semibold' href="#">Home</a></li>
            <li className="breadcrumb-item fw-semibold active" aria-current="page">Categorias</li>
            </ol>
        </nav>

        <a className='btn btn-outline-primary btn-sm mb-4 mt-3' href="#" data-bs-toggle="modal" data-bs-target="#modalCategoria"> Nueva Categoria</a>

        <table className="table table-hover table-responsive mb-5 border ">
            <thead className='custom-thead text-white'>
            <tr>
                <th></th>
                <th className="text-white fw-semibold">Nombre</th>
                <th className="text-white fw-semibold">Acciones</th>
            </tr>
            </thead>
            <tbody className='cabecera-tabla'>
            {data.length ? (
                data.map((categoria) => (
                <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                    <td>
                        <div className='d-flex gap-3'>
                            <a data-bs-toggle="modal" data-bs-target="#editarmodalCategoria" title='Editar Categoria'> 
                                <SquarePen size={20} color={'#1f2937'} onClick={() => handleClickUpdate(categoria)} />

                            </a>
                            <a title='Eliminar Categoria' onClick={() => handleClickDelete(categoria.id)}>
                                <Trash2 size={20} color={'#dc3545'} />

                            </a>
                        </div>
                    </td>
                </tr>
                ))
            ): (
                <p className="text-center py-20">No hay Autores aun</p>
            )}
            
            </tbody>
        </table>

            <Paginacion
                pagina={pagina}
                setPagina={setPagina}
                recordsPorPagina={recordsPorPagina}
            />
        <EditCategoryModal />   
        <AddCategoryModal />    
    </>
  )
}
