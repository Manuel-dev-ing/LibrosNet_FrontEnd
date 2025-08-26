import { isAxiosError } from "axios";
import api from "../lib/axios";
import { pedidosShema, type ClienteTarjeta, type Item, type Pedido } from "../types";


export async function getOrders() {
    try {
        const {data} = await api('/pedidos');
        const response = pedidosShema.safeParse(data)
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




export async function createPedido(pedido : Pedido) {
    try {
        console.log(pedido);
        const {data} = await api.post('/pedidos/pedido', pedido);
        console.log(data);
                
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

