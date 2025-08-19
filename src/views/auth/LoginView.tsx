import React, { useEffect, useState } from 'react'
import type { UserLoginForm } from '../../types'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../components/ErrorMessage'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authenticateUser } from '../../services/UsuariosAPI'
import { toast } from 'react-toastify'

export default function LoginView() {
    const [isChecked, setChecked] = useState<boolean>(false)

    const initialValues: UserLoginForm = {
        correo: '',
        contrasena: '',
    }
  
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate(); 

    const mutation = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            console.log("authenticado...");
            navigate('/');
        }
    }) 

    const handleLogin = (formData : UserLoginForm) => {
        console.log(formData);
        mutation.mutate(formData)
    }

  return (
    <>
        <div className=' d-flex justify-content-center my-5'>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="w-48 bg-white border rounded-3 py-3 px-4"
                noValidate
            >
                <h4 className="fw-bold text-center mt-3">Bienvenido de vuelta</h4>
                <p className="text-center text-secondary">Ingresa tus credenciales para acceder a tu cuenta</p>
                <div className="d-flex flex-column gap-1 mt-4 ">
                    <label
                        className="fw-semibold"
                    >Correo electronico</label>
                    <div className='input-container'>
                        <input
                            id="correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                            {...register("correo", {
                            required: "El Email es obligatorio",
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
                            type={`${isChecked ? 'text' : 'password'}`}
                            placeholder="********"
                            className="w-100 border border-secondary border-opacity-50 pl-3 py-2 rounded"
                            {...register("contrasena", {
                            required: "La Contraseña es obligatoria",
                            })}
                        />
                        <span className='icono'><Lock strokeWidth={2} size={20} /></span>


                    </div>
                    {errors.contrasena && (
                        <ErrorMessage>{errors.contrasena.message}</ErrorMessage>
                    )}
                </div>
                <div className='mt-2 d-flex gap-2'>
                    <input type="checkbox" id="cbxpassword" checked={isChecked} onChange={() => setChecked(!isChecked)} />
                    <label htmlFor="cbxpassword">Mostrar contraseña</label>
                </div>

                <input
                type="submit"
                value='Iniciar Sesión'
                className="text-white btn btn-dark w-100 mt-3"
                />
                <nav className="mt-4 d-flex justify-content-center">
                    <span className="text-center text-secondary d-flex gap-2">¿No tienes una cuenta?<Link className='text-dark fw-semibold enlace' to={'/auth/register'}>Regístrate aquí</Link>  </span>
                  
                </nav>
            </form>
        </div>
    
    </>
  )
}
