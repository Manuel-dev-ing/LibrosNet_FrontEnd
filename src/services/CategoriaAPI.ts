import { isAxiosError } from "axios";
import api from "../lib/axios";
import { categoriasShema, libroShema, librosSchema, obtenerLibro, type CategoryFormData } from "../types";

type CategoryAPI = {
    formData: CategoryFormData
    id: number
}


export async function getCategories(pagina : number, recordsPorPagina : number) {
    
    try {
        const responses = await api('/categoria', {
            params: {pagina, recordsPorPagina}
        });

        const totalRegistros = Number(responses.headers['cantidad-total-registros'])
    
        localStorage.setItem('totalRegistros', JSON.stringify(totalRegistros))

        const response = categoriasShema.safeParse(responses.data)

        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllCategories() {
    
    try {
        const responses = await api('/categoria/getAllCategories');

        const response = categoriasShema.safeParse(responses.data)

        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function createCategory(formData : CategoryFormData) {
    
    try {
        const {data} = await api.post('/categoria', formData)
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function editCategory( { formData, id } : Pick<CategoryAPI, 'formData' | 'id' >) {
    
    try {

        const { data } = await api.put(`/categoria/${id}`, formData)
        console.log(data);
        

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteCategory( id : number) {
    
    try {

        const { data } = await api.delete(`/categoria/${id}`)
        console.log(data);
        

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getBooksByCategory(id : number) {
    try {

        const {data} = await api.get(`/categoria/${id}/libros`);
        const response = librosSchema.safeParse(data);
        console.log(response.data);
        
        if (response.success) {

            return response.data
        }

        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}








