import { isAxiosError } from "axios";
import api from "../lib/axios";
import { totalesShema } from "../types";



export async function getTotals() {
    try {
        console.log("totales...");
        
        const {data} = await api('/dashboard');
        console.log(data);
        const response = totalesShema.safeParse(data)
        
        if (response.success) {
            return response.data
        }
        
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}






