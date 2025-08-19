import { isAxiosError } from "axios";
import api from "../lib/axios";
import type { ClienteTarjeta, Item, Pedido } from "../types";



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

