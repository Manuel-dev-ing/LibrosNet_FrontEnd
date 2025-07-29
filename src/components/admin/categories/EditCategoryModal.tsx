
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';
import { useLibrosStore } from '../../../store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCategory } from '../../../services/CategoriaAPI';
import { toast } from 'react-toastify';
import type { Categoria, CategoryFormData } from '../../../types';
import { Modal } from 'bootstrap';

const initialValues : CategoryFormData = {
    nombre: '',
    descripcion: ''
}

export default function EditCategoryModal() {

    const category = useLibrosStore((state) => state.data as Categoria)
    const activeId = useLibrosStore( (state) => state.activeId )
    const resetCategory = useLibrosStore( (state) => state.reset )

    const { register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    
    useEffect(() => {
        if (activeId) {
            reset({
                nombre: category.nombre,
                descripcion: category.descripcion
            })
        }
    }, [category, activeId])
    
    // Referencia al modal
    const modalRef = useRef<HTMLDivElement>(null);

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: editCategory,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Categoria Actualizada Correctamente")
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            cerrarModal()
            reset()
            resetCategory(initialValues)

        }

    })

    const handleForm = (data : CategoryFormData) => {
        
        mutation.mutate({ formData: data, id: activeId  })
    }

    const cerrarModal = () => {
        const modalElement = modalRef.current;
        if (modalElement) {
            let modalInstance = Modal.getInstance(modalElement);
            if (!modalInstance) {
            modalInstance = new Modal(modalElement);
            }
            modalInstance.hide();
        }
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    };

  return (
    <>
        <div className="modal fade" id="editarmodalCategoria" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Crea Nueva Categoria</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form  onSubmit={handleSubmit(handleForm)}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="fw-semibold col-form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" 
                                    {...register("nombre", {
                                        required: "El Nombre de la Categoria es obligatorio",
                                    })} 
                                />
                                {errors.nombre && (
                                    <ErrorMessage>{errors.nombre.message}</ErrorMessage>

                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="fw-semibold col-form-label">Descripcion</label>
                                <textarea className="form-control" id="descripcion"
                                    {...register("descripcion", {
                                        required: "La Descripcion de la Categoria es obligatoria",
                                    })} 
                                />
                                {errors.descripcion && (
                                    <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
    
                                )}
                            </div>
                        
                            <div className='d-flex justify-content-end'>
                                <button type="submit" className="mt-3 btn btn-outline-primary">Guardar Cambios</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}






