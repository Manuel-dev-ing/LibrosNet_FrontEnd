import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteEditorial, getEditorials } from "../../services/EditorialAPI"
import { SquarePen, Trash2 } from "lucide-react"
import type { editorial } from "../../types"
import AddEditorialModal from "../../components/admin/editoriales/AddEditorialModal"
import { toast } from "react-toastify"
import { useLibrosStore } from "../../store"
import EditEditorialModal from "../../components/admin/editoriales/EditEditorialModal"

export default function EditorialesView() {

    const setEditorial = useLibrosStore( (state) => state.set)

    const { data, isLoading } = useQuery({
        queryFn: getEditorials,
        queryKey: ['editoriales']
    })

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteEditorial,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Editorial Eliminada Corretamente")
            queryClient.invalidateQueries({ queryKey: ['editoriales']})

        }

    })

    if(isLoading) return 'Loading...'

    const handleClickUpdate = (editorial: editorial) => {
        
        setEditorial(editorial)
        
    }

    const handleClickDelete = (id : number) => {

        mutation.mutate(id)
    }

 
    if(data) return (
        <>
            <h4 className='text-blue-bold'>Editoriales</h4>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><a className='text-blue-bold fw-semibold' href="#">Home</a></li>
                <li className="breadcrumb-item fw-semibold active" aria-current="page">Editoriales</li>
                </ol>
            </nav>

            <a className='btn btn-outline-primary btn-sm mb-4 mt-3' data-bs-toggle="modal" data-bs-target="#modalEditorial"> Nueva Editorial</a>
            <div className="table-responsive">

                <table className="table align-middle table-hover table-sm mb-5 border ">
                    <thead className='custom-thead text-white'>
                    <tr>
                        <th></th>
                        <th className="text-white fw-semibold">Nombre</th>
                        <th className="text-white fw-semibold">Correo</th>
                        <th className="text-white fw-semibold">Telefono</th>
                        <th className="text-white fw-semibold">Calle</th>
                        <th className="text-white fw-semibold">Numero</th>
                        <th className="text-white fw-semibold">Colonia</th>
                        <th className="text-white fw-semibold">Ciudad</th>
                        <th className="text-white fw-semibold">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className='cabecera-tabla'>
                    {data.length ? (
                        data.map((editorial) => (
                        <tr key={editorial.id}>
                            <td>{editorial.id}</td>
                            <td>{editorial.nombre}</td>
                            <td>{editorial.correo}</td>
                            <td>{editorial.telefono}</td>
                            <td>{editorial.calle}</td>
                            <td>{editorial.numero}</td>
                            <td>{editorial.colonia}</td>
                            <td>{editorial.ciudad}</td>
                            <td>
                            <div className='d-flex gap-3'>
                                <a data-bs-toggle="modal" data-bs-target="#editarmodalEditorial" title='Editar Autor'> 
                                <SquarePen size={20} color={'#1f2937'} onClick={() => handleClickUpdate(editorial)} />

                                </a>
                                <a title='Eliminar Autor' onClick={() => handleClickDelete(editorial.id)}>
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
            </div>

            <AddEditorialModal />    
            <EditEditorialModal />    

        </>
    )
}
