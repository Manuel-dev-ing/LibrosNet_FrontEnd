import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteBook, getBooks } from "../../services/LibrosAPI"
import { SquarePen, Trash2 } from "lucide-react"
import type { Libro } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLibrosStore } from "../../store"
import { useEffect } from "react"

const libro : Libro = {
    id: 0,
    autor: '',
    categoria: '',
    editorial: '',
    titulo: '',
    precio: 0,
    stock: 0,
    portada: '',
    isbn: '',
    fechaPublicacion: '',
    numeroPaginas: 0,
    idioma: '',
    sipnosis: '',
    estado: true
}

export default function LibrosView() {

    const setLibro = useLibrosStore((state) => state.set)
    const resetLibro = useLibrosStore((state) => state.reset)

    useEffect(() => {
        resetLibro(libro)

    }, [])

    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryFn: getBooks,
        queryKey: ['libros']
    })

    const mutation = useMutation({
        mutationFn: deleteBook,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Libro Eliminado Correctamente")
        }

    })


    const handleClickUpdate = (libro : Libro) => {
        setLibro(libro)
        navigate('/administracion/libros/editar')

    }

    const handleClickDelete = (id : number) => {
        console.log("Eliminando");
        console.log(id);
        mutation.mutate(id)

    }
    
    
    if(isLoading) return 'Loading...'


  if (data) return (
    <>
        <h4 className='text-blue-bold'>Libros</h4>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><a className='text-blue-bold fw-semibold' href="#">Home</a></li>
            <li className="breadcrumb-item fw-semibold active" aria-current="page">Libros</li>
            </ol>
        </nav>

        <Link to={'/administracion/libros/crear'} className='btn btn-outline-primary btn-sm mb-4 mt-3'>Nuevo Libro</Link>

        <table className="table table-hover table-responsive mb-5 border ">
            <thead className='custom-thead text-white'>
            <tr>
                <th></th>
                <th className="text-white fw-semibold">Autor</th>
                <th className="text-white fw-semibold">Categoria</th>
                <th className="text-white fw-semibold">Editorial</th>
                <th className="text-white fw-semibold">Libro</th>
                <th className="text-white fw-semibold">Precio</th>
                <th className="text-white fw-semibold">Acciones</th>
            </tr>
            </thead>
            <tbody className='cabecera-tabla'>
            {data.length ? (
                data.map((libro) => (
                <tr key={libro.id}>
                    <td>{libro.id}</td>
                    <td>{libro.autor}</td>
                    <td>{libro.categoria}</td>
                    <td>{libro.editorial}</td>
                    <td>{libro.titulo}</td>
                    <td>{libro.precio}</td>
                    <td>
                        <div className='d-flex gap-3'>
                            <a title='Editar Autor' onClick={() => handleClickUpdate(libro)}> 
                                <SquarePen size={20} color={'#1f2937'}  />

                            </a>
                            <a title='Eliminar Autor' onClick={() => handleClickDelete(libro.id)}>
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
    
    
    
    </>
  )
}
