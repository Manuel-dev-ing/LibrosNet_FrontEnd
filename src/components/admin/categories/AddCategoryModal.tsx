import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import type { CategoryFormData } from '../../../types';
import ErrorMessage from '../../ErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../../../services/CategoriaAPI';
import { toast } from 'react-toastify';
import { Modal } from 'bootstrap';


const initialValues : CategoryFormData = {
    nombre: ""
}

export default function AddCategoryModal() {
    const { register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})
    
    // Referencia al modal
    const modalRef = useRef<HTMLDivElement>(null);

    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: createCategory,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Categoria Creada Correctamente")
            queryCliente.invalidateQueries({queryKey: ['categories']})
            cerrarModal();
            reset()
        }
    });


    const handleForm = (data : CategoryFormData) => {
        console.log("guardando...");
        mutation.mutate(data)   
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
        <div className="modal fade" id="modalCategoria" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
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
                    
                        <div className='d-flex justify-content-end'>
                            <button type="submit" className="mt-3 btn btn-outline-primary">Save Changes</button>

                        </div>
                    </form>
                </div>
            
                </div>
            </div>
        </div>
    
    </>
  )
}
