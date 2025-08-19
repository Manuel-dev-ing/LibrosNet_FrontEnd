import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../components/ErrorMessage'
import { Lock, Mail, User } from 'lucide-react'
import type { UserRegistrationForm } from '../../types'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { createUser } from '../../services/UsuariosAPI'

export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    idRol: 0,
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    contrasena: '',
    repetirContrasena: ''

  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const mutate = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Usuario creado")
    },

  })

  const handleRegister = (data : UserRegistrationForm) => {
    data.idRol = 1
   
    if (data.repetirContrasena !== data.contrasena) {
      toast.error("Las contrtaseñas son direferentes")
      return
    }

    console.log("despues del if");
    mutate.mutate(data)
      
  }

  return (
    <>
      <div className=' d-flex justify-content-center my-5'>

        <form onSubmit={handleSubmit(handleRegister)} className="w-48 bg-white border rounded-3 py-3 px-4" noValidate>
          <h4 className="fw-bold text-center mt-3">Crear cuenta</h4>
          <p className="text-center text-secondary">Unete a LibrosNet y descubre miles de libros</p>
          <div className="d-flex flex-column gap-1 mt-4 ">
              <label
                  className="fw-semibold"
              >Nombre completo</label>
              <div className='input-container'>
                  <input
                      id="nombre"
                      type="nombre"
                      placeholder="Tu nombre completo"
                      className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                      {...register("nombre", {
                      required: "El Nombre es obligatorio",
                      
                      })}
                  />
                  <span className='icono'><User size={18} /></span>
              </div>
              {errors.nombre && (
                  <ErrorMessage>{errors.nombre.message}</ErrorMessage>
              )}
          </div>
          <div className="d-flex flex-column gap-1 mt-4 ">
              <label
                  className="fw-semibold"
              >Primer apellido</label>
              <div className='input-container'>
                  <input
                      id="primerApellido"
                      type="primerApellido"
                      placeholder="Tu primer apellido"
                      className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                      {...register("primerApellido", {
                        required: "El Primer apellido es obligatorio",
                      
                      })}
                  />
                  <span className='icono'><User size={18} /></span>
              </div>
              {errors.primerApellido && (
                  <ErrorMessage>{errors.primerApellido.message}</ErrorMessage>
              )}
          </div>
          <div className="d-flex flex-column gap-1 mt-4 ">
              <label
                  className="fw-semibold"
              >Segundo apellido</label>
              <div className='input-container'>
                  <input
                      id="segundoApellido"
                      type="segundoApellido"
                      placeholder="Tu segundo apellido"
                      className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                      {...register("segundoApellido", {
                        required: "El Segundo apellido es obligatorio",
                      
                      })}
                  />
                  <span className='icono'><User size={18} /></span>
              </div>
              {errors.segundoApellido && (
                  <ErrorMessage>{errors.segundoApellido.message}</ErrorMessage>
              )}
          </div>
          
          <div className="d-flex flex-column gap-1 mt-4 ">
            <label
                className="fw-semibold"
            >Correo electronico</label>
            <div className='input-container'>
                <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                    {...register("correo", {
                    required: "El Correo es obligatorio",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                    },
                    })}
                />
                <span className='icono'><Mail strokeWidth={2} size={18} /></span>
            </div>
            {errors.correo && (
                <ErrorMessage>{errors.correo.message}</ErrorMessage>
            )}
          </div>

          <div className="d-flex flex-column gap-1 mt-3">
              <label className="fw-semibold">Contraseña</label>
              <div className='input-container'>
                  <input
                      type="password"
                      id='contrasena'
                      placeholder="********"
                      className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                      {...register("contrasena", {
                      required: "La contraseña es obligatoria",
                      })}
                  />
                  <span className='icono'><Lock strokeWidth={2} size={20} /></span>


              </div>
              {errors.contrasena && (
                  <ErrorMessage>{errors.contrasena.message}</ErrorMessage>
              )}
          </div>
          <div className="d-flex flex-column gap-1 mt-3">
              <label className="fw-semibold">Confirmar contraseña</label>
              <div className='input-container'>
                  <input
                      id='repetirContrasena'
                      type="password"
                      placeholder="********"
                      className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                      {...register("repetirContrasena", {
                      required: "Confirmar contraseña es obligatorio",
                      })}
                  />
                  <span className='icono'><Lock strokeWidth={2} size={20} /></span>


              </div>
              {errors.repetirContrasena && (
                  <ErrorMessage>{errors.repetirContrasena.message}</ErrorMessage>
              )}
          </div>
    

          <input
          type="submit"
          value='Crear cuenta'
          className="text-white btn btn-dark w-100 mt-3"
          />
          <nav className="mt-4 d-flex justify-content-center">
              <span className="text-center text-secondary d-flex gap-2">¿Ya tienes una cuenta?
                <Link className='text-dark fw-semibold enlace' to={'/auth/login'}>Inicia sesion aquí</Link>  
              </span>
            
          </nav>
        </form>
        </div>
    </>
  )
}
