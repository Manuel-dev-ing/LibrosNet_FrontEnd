import { isAxiosError } from "axios";
import api from "../lib/axios";
import { librosSchema, obtenerLibro, type LibroEdicionFormData, type LibroFormData } from "../types";

type LibroAPI = {
    formData : LibroFormData | LibroEdicionFormData
    id : number
}

export async function getBooks() {
    try {
        const {data} = await api('/libros');
        const response = librosSchema.safeParse(data);

        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getBook(id : number) {
    try {
        const {data} = await api.get(`/libros/${id}`);
        const response = obtenerLibro.safeParse(data);
        
        if (response.success) {
            const { id, ...formData } = response.data
            

            return formData
        }

        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function createBook(formData : LibroFormData) {
    try {
        const {data} = await api.post('/libros', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateBook({id, formData} : Pick<LibroAPI, 'id' | 'formData' > ) {
    try {

        console.log(id);
        console.log(formData);
        

        const {data} = await api.put(`/libros/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(data);
        
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(JSON.stringify(error.response.data.title));
        }
    }
}

export async function deleteBook(id : number) {
    try {
        const {data} = await api.delete(`/libros/${id}`);

        console.log(data);
        
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


