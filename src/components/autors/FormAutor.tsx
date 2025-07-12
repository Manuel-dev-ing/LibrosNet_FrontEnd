import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { AutorFormData } from "../../types"
import ErrorMessage from "../ErrorMessage"


type FormAutorProps = {
    errors: FieldErrors<AutorFormData>
    register: UseFormRegister<AutorFormData>

}

export default function FormAutor({errors, register} : FormAutorProps) {
  return (
    <>
    
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
                {...register("segundoApellido")}
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
    
    
    </>
  )
}
