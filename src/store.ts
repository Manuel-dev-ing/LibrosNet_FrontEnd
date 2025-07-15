import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Autor, AutorFormData, Categoria, CategoryFormData, editorial, EditorialFormData } from "./types";

type LibrosStore = {
    data: AutorFormData | CategoryFormData | EditorialFormData
    set: (formData: Autor | Categoria | editorial) => void
    reset: (formData: AutorFormData | CategoryFormData) => void
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





