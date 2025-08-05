import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Alerta, Item, Libro } from "./types";

type CarritoStore = {
    carrito: Libro[] | Item[]
    guardar: (item : Libro | Item) => Alerta
    setCantidades: (cantidad: number, id: number) => void
    eliminar: (id: number) => void
    vaciarCarrito: () => void
}
const carrito = () => {
    const libros = localStorage.getItem('libros')
    const libros_arr : Item[] = libros ? JSON.parse(libros) : [] 
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
    setCantidades: (cantidad, id) => {
        const itemExist = get().carrito.findIndex(item => item.id === id)
        if(itemExist >= 0){
            //ya existe
            const cantidades_state = get().carrito.map((item) => {
                if (item.id === id) {
                    return {...item, cantidad: cantidad}
                }
                return item
            })

            set(()=>({
                carrito: cantidades_state
            }))
            localStorage.setItem('libros', JSON.stringify(cantidades_state))

        }else{//no existe

            // set(() => ({
            //     cantidades: [...get().cantidades, objCantidad]
            // }))

            // const cantidades = get().cantidades
            // localStorage.setItem('cantidades', JSON.stringify(cantidades))
        }
    },
    eliminar: (id) => {
        console.log(get().carrito);

        const carrito = get().carrito.filter(item => item.id !== id)
        console.log(carrito);
        set(()=>({
            carrito: carrito
        }))
        localStorage.setItem('libros', JSON.stringify(carrito))
    },
    vaciarCarrito: () => {
        set(()=>({
            carrito: []
        }))
        localStorage.setItem('libros', JSON.stringify([]))
        
    }






})))







