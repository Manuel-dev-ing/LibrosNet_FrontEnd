import { isAxiosError } from "axios";
import api from "../lib/axios";
import { autorsShema, type Autor, type AutorFormData } from "../types";
import type { AutoPlacement } from "@popperjs/core";


type AutorAPI = {

    data : AutorFormData
    autorId : number 

}

export async function getAutors() {
    
    try {
        
        const {data} = await api('/autores');
        const response = autorsShema.safeParse(data);

        if (response.success) {
            return response.data
            
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function createAutor(formData: AutorFormData) {
    
    try {
        const {data} = await api.post('/autores', formData);
        console.log(data);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editAutor({data, autorId} : Pick<AutorAPI, 'data' | 'autorId'>) {
    
    try {
        console.log(data);
        console.log(autorId);

        const response = await api.put(`/autores/${autorId}`, data);
        console.log(response.data);

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteAutor(id: Autor['id']) {
    try {
        const {data} = await api.delete(`/autores/${id}`);
        console.log(data);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

