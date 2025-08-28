import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAutors } from '../../../services/AutorAPI';
import { getCategories } from '../../../services/CategoriaAPI';
import { getEditorials } from '../../../services/EditorialAPI';
import { useForm } from 'react-hook-form';
import type { Autor, Categoria, editorial, LibroFormData } from '../../../types';
import ErrorMessage from '../../../components/ErrorMessage';
import { createBook } from '../../../services/LibrosAPI';
import { toast } from 'react-toastify';
import AddBookForm from '../../../components/admin/libros/AddBookForm';

const initialValues: LibroFormData = {
    idAutor: '',
    idCategoria: '',
    idEditorial: '',
    titulo: '',
    precio: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    stock: 0,
    portada: '',
    isbn: '',
    fechaPublicacion: '',
    numeroPaginas: 0,
    idioma: '',
    sipnosis: '',
    estado: true,
}

export default function LibrosCreacionView() {
    const [preview, setPreview] = useState("");

    const { reset, register, handleSubmit, formState: {errors}, watch } = useForm({defaultValues: initialValues})

    const navigate = useNavigate();
    const imagenSeleccionada = watch('portada');

    useEffect(() => {
        const archivo = imagenSeleccionada?.[0];
        if (archivo) {
            const url = URL.createObjectURL(archivo);
            setPreview(url);

            return () => URL.revokeObjectURL(url); // Limpieza
        }

    }, [imagenSeleccionada])

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
        mutationFn: createBook,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Libro Creado Correctamente")
            queryClient.invalidateQueries({ queryKey: ['libros'] })
            navigate('/administracion/libros');
        }

    })

    const handleForm = (data : LibroFormData) => {

        data.portada = data.portada[0]
        mutation.mutate(data)
        
    }

    if (loadingAutores || loadingCategorias || loadingEditoriales) {
        return 'cargando datos'   
    }
    
  return (
    <>
      <h4 className='text-blue-bold'>Crear Libro</h4>
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/administracion/libros'} className='text-blue-bold fw-semibold'>Home</Link></li>
          <li className="breadcrumb-item fw-semibold active" aria-current="page">Crear Libro</li>
          </ol>
      </nav>

      <section className="section profile">

        <div className="row">

            <form className="row border bg-white" onSubmit={handleSubmit(handleForm)} encType="multipart/form-data">
            
                <AddBookForm
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
