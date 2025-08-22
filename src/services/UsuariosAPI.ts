import { isAxiosError } from "axios";
import api from "../lib/axios";
import { respuestaAutenticacion, userAuthenticateShema, type UserLoginForm, type UserRegistrationForm } from "../types";

export async function createUser(formData: UserRegistrationForm) {
    
    console.log(formData);
    

    try {
        const {data} = await api.post('/usuarios/registro', formData);
        console.log(data);


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function authenticateUser(formData: UserLoginForm) {


    
    try {
        const {data} = await api.post('/usuarios/login', formData);
        // const response = respuestaAutenticacion.safeParse(data)
     
        localStorage.setItem('auth_token', data.token)


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const {data} = await api('/usuarios/usuario');
        const response = userAuthenticateShema.safeParse(data)
        if (response.success) {
            return response.data
        }


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

