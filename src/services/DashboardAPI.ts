import { isAxiosError } from "axios";
import api from "../lib/axios";
import { totalesShema } from "../types";



export async function getTotals() {
    try {
        const {data} = await api('/dashboard');
        const response = totalesShema.safeParse(data)
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






