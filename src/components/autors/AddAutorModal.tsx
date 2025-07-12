import React, { useRef, useState, type ChangeEvent } from 'react'
import type { Autor, AutorFormData } from '../../types';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { createAutor } from '../../services/AutorAPI';
import { toast } from 'react-toastify';
import { Modal } from 'bootstrap';


const initialValues: AutorFormData = {
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: ""
}

export default function AddAutorModal() {

    const { register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    // Referencia al modal
     const modalRef = useRef<HTMLDivElement>(null);

    const mutation = useMutation({
        mutationFn: createAutor,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            console.log("Autor Creado Correctamente");
            toast.success("Autor Creado Correctamente")

            reset()
            cerrarModal()
            
        }

    });

    const handleForm = (data: AutorFormData) => {
        mutation.mutate(data);
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
        <div className="modal fade" id="modalAutor" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Crea Nuevo Autor</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form  onSubmit={handleSubmit(handleForm)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="fw-semibold col-form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" 
                            {...register("nombre", {
                                required: "El Nombre del Autor es obligatorio",
                            })} 
                        />
                        {errors.nombre && (
                            <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="primerApellido" className="fw-semibold col-form-label">Primer Apellido</label>
                        <input type="text" className="form-control" id="primerApellido"
                            {...register("primerApellido", {
                                required: "El Primer Apellido del Autor es obligatorio",
                            })} 
                        />
                        {errors.primerApellido && (
                            <ErrorMessage>{errors.primerApellido.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="segundoApellido" className="fw-semibold col-form-label">Segundo Apellido</label>
                        <input type="text" className="form-control" id="segundoApellido"  
                            
                        />
                      
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="fw-semibold col-form-label">Telefono</label>
                        <input type="tel" className="form-control" id="telefono" placeholder='555 123 4546' 
                            {...register("telefono", {
                                required: "El Telefono del Autor es obligatorio",
                            })}
                        />
                        {errors.telefono && (
                            <ErrorMessage>{errors.telefono.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coreeo" className="fw-semibold col-form-label">Correo Electronico:</label>
                        <input type="email" className=" form-control" id="coreeo" placeholder='ejemplo@gmail.com' 
                            {...register("correo", {
                                required: "El Correo del Autor es obligatorio",
                            })}
                        />

                        {errors.correo && (
                            <ErrorMessage>{errors.correo.message}</ErrorMessage>
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
