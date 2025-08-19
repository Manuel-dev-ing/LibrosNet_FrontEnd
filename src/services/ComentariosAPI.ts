import { isAxiosError } from "axios";
import api from "../lib/axios";
import { comentariosShema, type ComentarioFormDara } from "../types";

type ComentarioAPI = {
    form : ComentarioFormDara
    libroId: number
}

export async function getComments(libroId: number) {
    try {
        const {data} = await api.get(`/libros/${libroId}/Comentarios`);
        const response = comentariosShema.safeParse(data)
        console.log(response);
        
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createComment({form, libroId}: Pick<ComentarioAPI, 'form' | 'libroId'>) {
    
    
    
    try {
        const {data} = await api.post(`/libros/${libroId}/Comentarios`, form);
        console.log(data);
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

