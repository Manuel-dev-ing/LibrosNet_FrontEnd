import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Autor, AutorFormData, Categoria, CategoryFormData, editorial, EditorialFormData, Libro } from "./types";

type LibrosStore = {
    data: AutorFormData | CategoryFormData | EditorialFormData | Libro
    set: (formData: Autor | Categoria | editorial | Libro) => void
    reset: (formData: AutorFormData | CategoryFormData | Libro) => void
    activeId: number
}



export const useLibrosStore = create<LibrosStore>()(devtools((set, get) => ({
    data: {},
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
    }
    


})))





