import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Alerta, Libro } from "./types";
import { json } from "zod/v4";


type CarritoStore = {
    carrito: Libro[]
    guardar: (item : Libro) => Alerta
}
const carrito = () => {
    const libros = localStorage.getItem('libros')
    const libros_arr : Libro[] = libros ? JSON.parse(libros) : [] 
    return libros_arr
}

export const useCarritoStore = create<CarritoStore>()(devtools((set, get) => ({
    carrito: carrito(),
    guardar: (item) => {
        if (item) {
            const itemExist = get().carrito.findIndex( cart => cart.id === item.id)
            if (itemExist >= 0) {
                return { isSuccess: false, mensaje: `${item.titulo} ya existe al carrito` }
            }else{

                set(() => ({
            
                    carrito: [...get().carrito, item],
                }));
                const libros = get().carrito
                localStorage.setItem('libros', JSON.stringify(libros))

                return { isSuccess: true, mensaje: `${item.titulo} se añadio al carrito` }
            }
        }
    },


  
    



})))







