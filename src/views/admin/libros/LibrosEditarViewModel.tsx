import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import AddBookForm from '../../../components/admin/libros/AddBookForm'
import { getAutors } from '../../../services/AutorAPI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategories } from '../../../services/CategoriaAPI'
import { getEditorials } from '../../../services/EditorialAPI'
import type { Autor, Categoria, editorial,  LibroEdicionFormData,  LibroFormData } from '../../../types'
import { getBook, updateBook } from '../../../services/LibrosAPI'
import { useLibrosStore } from '../../../store'
import { toast } from 'react-toastify'
import EditBookForm from '../../../components/admin/libros/EditBookForm'

const initialValues : LibroFormData = {
    idAutor: '',
    idCategoria: '',
    idEditorial: '',
    titulo: '',
    precio: 0,
    stock: 0,
    portada: '',
    isbn: '',
    fechaPublicacion: '',
    numeroPaginas: 0,
    idioma: '',
    sipnosis: '',
    estado: true,
}


export default function LibrosEditarViewModel() {
    const [preview, setPreview] = useState("");
    const [isNewPreview, isSetNewPreview] = useState<boolean>(false);
    const navigate = useNavigate();

    const {handleSubmit, register, reset, formState: {errors}, watch, unregister }  = useForm({defaultValues: initialValues})

    const idLibro = useLibrosStore((state) => state.activeId)
    const { data, isLoading: loadinglibros } = useQuery({
        queryFn: () => getBook(idLibro),
        queryKey: ['libro', idLibro],
        enabled: !!idLibro
    })


    useEffect(() => {

        if (idLibro) {
            
            reset({
                titulo: data?.titulo,
                precio: data?.precio,
                stock: data?.stock,
                isbn: data?.isbn,
                // portada: '',
                numeroPaginas: data?.numeroPaginas,
                idioma: data?.idioma,
                sipnosis: data?.sipnosis,
                idAutor: data?.idAutor.toString(),
                idCategoria: data?.idCategoria.toString(),
                idEditorial: data?.idCategoria.toString()
            })

            setPreview(data?.portada!)
        }
      


    }, [idLibro, data]) 

    const { data: autores, isLoading: loadingAutores } = useQuery({
        queryFn: getAutors,
        queryKey: ['autores']
    })

    const { data: categorias, isLoading: loadingCategorias } = useQuery({
        queryFn: getCategories,
        queryKey: ['categorias']
    })
    
    const { data: editoriales, isLoading: loadingEditoriales } = useQuery({
        queryFn: getEditorials,
        queryKey: ['editoriales']
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateBook,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Libro actualizado correctamente")
            // queryClient.invalidateQueries({ queryKey: ['libros'] })
            navigate('/administracion/libros')
        }

    });
    const imagenSeleccionada = watch('portada');

    useEffect(() => {
        
        const archivo = imagenSeleccionada?.[0];
        
        if (archivo) {
           
            const url = URL.createObjectURL(archivo);
            
            setPreview(url);
            isSetNewPreview(true);
            
            return () => URL.revokeObjectURL(url); // Limpieza
        }

    }, [imagenSeleccionada])

    const handleForm = (data : LibroFormData) => {
        if (isNewPreview === false) {
            const { portada, ...datos } = data
            mutation.mutate({id: idLibro, formData: datos as LibroEdicionFormData})
            return
        }
        data.portada = data.portada[0]

        mutation.mutate({id: idLibro, formData: data})
    }

    if (loadingAutores || loadingCategorias || loadingEditoriales || loadinglibros) {
        return 'cargando datos'   
    }

  return (
    <>
        <h4 className='text-blue-bold'>Editar Libro</h4>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={'/administracion/libros'} className='text-blue-bold fw-semibold'>Home</Link></li>
            <li className="breadcrumb-item fw-semibold active" aria-current="page">Editar Libro</li>
            </ol>
        </nav>

        <section className='section profile'>
            
            <div className='row'>
                  
                <form className="row border bg-white" onSubmit={handleSubmit(handleForm)} encType="multipart/form-data">
                    
                    
                    <EditBookForm
                        preview={preview}
                        register={register}
                        errors={errors}
                        autores={autores as Autor[]}
                        categorias={categorias as Categoria[] }
                        editoriales={editoriales as editorial[] }
                    />
    
                    <div className="text-center d-flex gap-2 border justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>

                </form>
            </div>
        </section>
    
    </>
  )
}
