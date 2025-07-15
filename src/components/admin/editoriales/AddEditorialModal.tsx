import React, { useRef } from 'react'
import ErrorMessage from '../../ErrorMessage'
import { useForm } from 'react-hook-form'
import type { EditorialFormData } from '../../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditorial } from '../../../services/EditorialAPI'
import { toast } from 'react-toastify'
import { Modal } from 'bootstrap'

const initialValues : EditorialFormData = {
    nombre: '',
    correo: '',
    telefono: '',
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    codigoPostal: '',
    estado: ''
}

export default function AddEditorialModal() {

    const { handleSubmit, register, reset, formState: {errors} } = useForm({defaultValues: initialValues})

    // Referencia al modal
    const modalRef = useRef<HTMLDivElement>(null);

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createEditorial,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Editoral Creada Correctamente")
            cerrarModal()
            reset()
            queryClient.invalidateQueries({ queryKey: ['editoriales'] })
        }

    })


    const handleForm = (data : EditorialFormData) => {
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
        <div className="modal fade" id="modalEditorial" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Crea Nueva Editorial</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='row g-3' onSubmit={handleSubmit(handleForm)}>
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder='nombre de la editorial' 
                                {...register("nombre", {
                                    required: "El Nombre de la Editorial es obligatorio",
                                })}
                            />
                            {errors.nombre && (
                                <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                            )}

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="correo" className="form-label">Correo Electronico</label>
                            <input type="email" className="form-control" id="correo" placeholder='correo@example.com'
                                {...register("correo", {
                                    required: "El Correo de la Editorial es obligatorio",
                                })}
                            />
                            {errors.correo && (
                                <ErrorMessage>{errors.correo.message}</ErrorMessage>
                            )}

                        </div>
                        
                        <div className="col-12">
                            <label htmlFor="calle" className="form-label">Calle</label>
                            <input type="text" className="form-control" id="calle" placeholder="1234 Main St" 
                                {...register("calle", {
                                    required: "La Calle de la Editorial es obligatorio",
                                })}
                            />
                            {errors.calle && (
                                <ErrorMessage>{errors.calle.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="col-12">
                            <label htmlFor="colonia" className="form-label">Colonia</label>
                            <input type="text" className="form-control" id="colonia" placeholder="Apartment, studio, or floor" 
                                {...register("colonia", {
                                    required: "La Colonia de la Editorial es obligatorio",
                                })}
                            />
                            {errors.calle && (
                                <ErrorMessage>{errors.calle.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="ciudad" className="form-label">Ciudad</label>
                            <input type="text" className="form-control" id="ciudad" placeholder='Nombre de la ciudad'
                                {...register("ciudad", {
                                    required: "La Ciudad de la Editorial es obligatorio",
                                })}
                            />

                            {errors.ciudad && (
                                <ErrorMessage>{errors.ciudad.message}</ErrorMessage>
                            )}
                        </div>
                         <div className="col-md-6">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <input type="text" className="form-control" id="estado" placeholder='Nombre del Estado'
                                {...register("estado", {
                                    required: "El Estado de la Editorial es obligatorio",
                                })}
                            />

                            {errors.estado && (
                                <ErrorMessage>{errors.estado.message}</ErrorMessage>
                            )}
                        </div>
                         <div className="col-md-4">
                            <label htmlFor="codigoPostal" className="form-label">Codigo Postal</label>
                            <input type="text" className="form-control" id="codigoPostal" placeholder='60780'
                                {...register("codigoPostal", {
                                    required: "El Codigo Postal de la Editorial es obligatorio",
                                })}
                            />
                            {errors.codigoPostal && (
                                <ErrorMessage>{errors.codigoPostal.message}</ErrorMessage>
                            )}
                        </div>    
                        <div className="col-md-4">
                            <label htmlFor="telefono" className="form-label">Telefono</label>
                            <input type="text" className="form-control" id="telefono" placeholder='555 123 4578'
                                {...register("telefono", {
                                    required: "El Telefono de la Editorial es obligatorio",
                                })}
                            />
                            {errors.telefono && (
                                <ErrorMessage>{errors.telefono.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="numero" className="form-label">Numero</label>
                            <input type="text" className="form-control" id="numero" placeholder='#23'
                                {...register("numero", {
                                    required: "El Numero de la Editorial es obligatorio",
                                })}
                            />
                            {errors.numero && (
                                <ErrorMessage>{errors.numero.message}</ErrorMessage>
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
