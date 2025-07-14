import { useEffect, useRef } from 'react'
import ErrorMessage from '../ErrorMessage'
import { useForm } from 'react-hook-form'
import { useLibrosStore } from '../../store'
import type { AutorFormData } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { editAutor } from '../../services/AutorAPI'
import { toast } from 'react-toastify'
import { Modal } from 'bootstrap'
import FormAutor from './FormAutor'

const initialValues: AutorFormData = {
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: ""
}

export default function EditAutorModal() {

    const autores = useLibrosStore((state) => state.data as AutorFormData)
    const activeId = useLibrosStore((state) => state.activeId)
    const resetAutor = useLibrosStore((state) => state.reset)

    const { register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    // Referencia al modal
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(autores);
        console.log(activeId);
        if (activeId) {
            reset({
                nombre: autores.nombre,
                primerApellido: autores.primerApellido,
                segundoApellido: autores.segundoApellido,
                telefono: autores.telefono,
                correo: autores.correo
            })

            return
        }
    }, [activeId])

    const mutation = useMutation({
        mutationFn: editAutor,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Autor Actualizado Correctamente")
            reset()
            cerrarModal()

            resetAutor(initialValues)
        }

    })


    const handleForm = (data : AutorFormData) => {
        // reset()
        console.log("Actualizando...");
        const formData = {data, autorId: activeId }
        
        mutation.mutate(formData)

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
        <div className="modal fade" id="editarmodalAutor" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Autor</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(handleForm)}>
                            
                            <FormAutor
                                register={register}
                                errors={errors}

                            />

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
