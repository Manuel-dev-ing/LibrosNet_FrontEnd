import { isAxiosError } from "axios";
import api from "../lib/axios";
import { editorialesSchema, type EditorialFormData } from "../types";

type EditorialAPI = {
    formData: EditorialFormData
    id: number
}


export async function getEditorials() {
    try {
        
        const {data} = await api('/editorial');
        const response = editorialesSchema.safeParse(data)

        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function createEditorial(formData : EditorialFormData) {
    try {
        const {data} = await api.post('/editorial', formData);
        // const response = editorialesSchema.safeParse(data)

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function editEditorial({ formData, id } : Pick<EditorialAPI, 'formData' | 'id'>) {
    try {
        const response = await api.put(`/editorial/${id}`, formData);
        console.log(response);
        

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteEditorial(id : number) {
    try {
        const response = await api.delete(`/editorial/${id}`);
        console.log(response);
        

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}






