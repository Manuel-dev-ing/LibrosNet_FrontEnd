import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Autor, AutorFormData } from "./types";

type LibrosStore = {
    data: AutorFormData
    set: (formData: Autor) => void
    reset: (formData: AutorFormData) => void
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





