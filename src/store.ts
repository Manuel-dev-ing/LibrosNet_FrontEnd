import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Autor, AutorFormData, Categoria, CategoryFormData, editorial, EditorialFormData, Libro, UsuarioAutenticado } from "./types";


type LibrosStore = {
    data: AutorFormData | CategoryFormData | EditorialFormData | Libro
    
    set: (formData: Autor | Categoria | editorial | Libro) => void
    reset: (formData: AutorFormData | CategoryFormData | Libro) => void
    activeId: number
    usuarioAutenticado: UsuarioAutenticado
    setUsuarioAutenticado: (data: UsuarioAutenticado) => void
    resetUsuarioAuetenticado: () => void
    
}

const initialState: UsuarioAutenticado = {
    id: 0,
    rol: '',
    nombre: '',
    email: '',
    auth: false
}

export const useLibrosStore = create<LibrosStore>()(devtools((set, get) => ({
    data: {},
    usuarioAutenticado: initialState,
    set: (formData) => {
        const { id } = formData

        set(() => ({
            data: formData,
            activeId: id
        }))
    },
    reset: (formData) => {

        set(() => ({
            data: formData,
            activeId: 0
        }))
    },
    setUsuarioAutenticado: (data) => {
    

        set(() => ({
            usuarioAutenticado: data
        }))
    },
    resetUsuarioAuetenticado: () => {
        console.log("cerrando sesion...");    
       
        set(() => ({
            usuarioAutenticado: initialState
        }))
        localStorage.removeItem('auth_token')
    },
   
    


})))





