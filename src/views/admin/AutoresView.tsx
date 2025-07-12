import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteAutor, getAutors } from '../../services/AutorAPI'
import { SquarePen, Trash2 } from 'lucide-react'
import AddAutorModal from '../../components/autors/AddAutorModal'
import { toast } from 'react-toastify'
import type { Autor } from '../../types'
import { useLibrosStore } from '../../store'
import EditAutorModal from '../../components/autors/EditAutorModal'

export default function AutoresView() {

  const setAutor = useLibrosStore((state) => state.set)

  const { data, isLoading } = useQuery({
      queryKey: ['autors'],
      queryFn: getAutors
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteAutor,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Autor Eliminado Correctamente")
      queryClient.invalidateQueries({queryKey: ['autors']})
    }
  }) 

  const handleClickDelete = (id : number) => {
    mutation.mutate(id)    
  }

  const handleClickUpdate = (autor: Autor) => {
    console.log("seting autor");
    console.log(autor);
    setAutor(autor)
    
  }

  if (isLoading) return 'cargando...'


  if (data) return (
    <>
      <h4 className='text-blue-bold'>Autores</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a className='text-blue-bold fw-semibold' href="#">Home</a></li>
          <li className="breadcrumb-item fw-semibold active" aria-current="page">Autores</li>
        </ol>
      </nav>

      <a className='btn btn-outline-primary btn-sm mb-4 mt-3' href="#" data-bs-toggle="modal" data-bs-target="#modalAutor"> Nuevo Autor</a>

      <table className="table table-hover table-responsive mb-5 border ">
        <thead className='custom-thead text-white'>
          <tr>
            <th></th>
            <th className="text-white fw-semibold">Nombre</th>
            <th className="text-white fw-semibold">Primer Apellido</th>
            <th className="text-white fw-semibold">Segundo Apellido</th>
            <th className="text-white fw-semibold">Telefono</th>
            <th className="text-white fw-semibold">Correo</th>
            <th className="text-white fw-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className='cabecera-tabla'>
          {data.length ? (
            data.map((autor) => (
              <tr key={autor.id}>
                <td>{autor.id}</td>
                <td>{autor.nombre}</td>
                <td>{autor.primerApellido}</td>
                <td>{autor.segundoApellido}</td>
                <td>{autor.telefono}</td>
                <td>{autor.correo}</td>
                <td>
                  <div className='d-flex gap-3'>
                    <a data-bs-toggle="modal" data-bs-target="#editarmodalAutor" title='Editar Autor'> 
                      <SquarePen size={20} color={'#1f2937'} onClick={() => handleClickUpdate(autor)} />

                    </a>
                    <a title='Eliminar Autor' onClick={() => handleClickDelete(autor.id)}>
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

       <AddAutorModal />   
       <EditAutorModal />   
    </>
  )
}
