import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MessageCircle, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { createComment, getComments } from '../services/ComentariosAPI'
import { toast } from 'react-toastify'
import type { ComentarioFormDara } from '../types'
import { Rating } from 'react-simple-star-rating'
import { useLibrosStore } from '../store'
import { CustomDate } from '../helpers/fecha'

type ComentariosProps = {
    libroId: number
}

const initialValues: ComentarioFormDara = {
    id_usuario: 0,
    titulo: "",
    calificacion: 0,
    cuerpo: ""
}

export default function Comentarios({libroId}: ComentariosProps) {
    const usuarioAutenticado = useLibrosStore((state) => state.usuarioAutenticado)
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const [rating, setRating] = useState(0)
    
    const [form, setForm] = useState(initialValues)

    const {data, isLoading} = useQuery({
        queryFn: () => getComments(libroId),
        queryKey: ['comentarios', libroId]

    })

    const fecha = new Date()

    // console.log(data);
    
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createComment,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Comentario Creado")
            setForm({
                "id_usuario": 0,
                "titulo": "",
                "cuerpo": "",
                "calificacion": 0
            })
            queryClient.invalidateQueries({queryKey: ['comentarios', libroId]})

        }

    })
    
    useEffect(() => {
        
        if (Object.values(form).includes("")) {
            setDisabled(true)
        }else{
            setDisabled(false)

        }
    }, [form])

    const handleRating = (rate: number) => {
        setRating(rate)
        setForm({
            ...form,
            calificacion: rate
        })
        // console.log("rating: ", form.calificacion);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
        
    }
    

    const handleClick = () => {
        
        if (usuarioAutenticado.auth) {
            form.id_usuario = usuarioAutenticado.id
            mutation.mutate({form, libroId})
            
        }else{
            toast.error("No estas autenticado, inicia sesion para publicar un comentario")
        }
    }

    if (isLoading) return "Obteniendo datos..." 

  return (
    <>
        <div className='mb-3 mt-5'>
            <div className='d-flex align-items-center gap-2'>
                <MessageCircle strokeWidth={2} />
                <h4 className='fw-bold'>Comentarios</h4>
                <p className='text-start m-0'>
                    <span className="badge-section-secondary fs-9 text-dark">5</span>
                </p>
            </div>


            <div className='border py-4 px-4 rounded mt-3'>
                <p className='fw-semibold fs-5'>Añade un comentario</p>

                <div className='mb-3'>
                    <label className='fw-semibold' htmlFor="cuerpo">Tu calificacion:</label>

                    <div className="text-start d-flex align-items-center gap-1">
                        <Rating 
                            onClick={handleRating}
                            initialValue={form.calificacion}
                            size={25}
                            allowFraction
                            transition
                        />
                    </div>
                </div>

                <div className='d-flex flex-column mb-3'>
                    <label className='fw-semibold' htmlFor="titulo">Titulo:</label>
                    <input type="text" name='titulo' id='titulo' value={form.titulo} placeholder='Escribe un titulo para el comentario' className='rounded border border-secondary border-opacity-50 p-2 w-50' 
                    onChange={handleChange} />
                </div>

                <div className='d-flex flex-column'>
                    <label className='fw-semibold' htmlFor="cuerpo">Tu comentario:</label>
                    <textarea className='rounded border border-secondary border-opacity-50 w-50 p-2' value={form.cuerpo} onChange={handleChange} rows={3} name="cuerpo" id="cuerpo" placeholder='Comparte tu opinion sobre este libro...'></textarea>

                    <button className='mt-3 w-25 btn btn-dark d-flex justify-content-center align-items-center gap-2' disabled={isDisabled} onClick={handleClick}>
                        <Send size={20} strokeWidth={1.25} /> 
                        Publicar comentario
                    </button>

                </div>
            
            </div>
            {data?.length ? (
                <>
                    {data.map(comentario => (
                        <div key={comentario.id} className='border py-3 px-4 rounded mt-3'>
                            <div className="text-start d-flex align-items-center gap-1">
                                <Rating 
                                    onClick={handleRating}
                                    initialValue={comentario.calificacion}
                                    size={25}
                                    allowFraction
                                    transition
                                />
                            </div>
                            <p className='fw-normal m-0 fw-medium'>{comentario.titulo}</p>
                            <p className='fw-normal m-0 fs-9'>Enviado <span className='fw-medium'>{CustomDate(comentario.fechaPublicacion)}</span> por <span className='fw-medium'>{comentario.creado_por}</span></p>
                            <p className='fw-normal m-0'>{comentario.cuerpo}</p>
                        </div>

                    ))}
                
                </>
            ): (
                <>
                </>
            )}
            

        </div>
    </>
  )
}
