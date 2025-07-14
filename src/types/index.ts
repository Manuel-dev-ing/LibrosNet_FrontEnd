import { X } from "lucide-react";
import z, { boolean } from "zod";

// Autors
const autorShema = z.object({
    id: z.number(),
    nombre: z.string(),
    primerApellido: z.string(),
    segundoApellido: z.string(),
    telefono: z.string(),
    correo: z.string(),
    estado: boolean()
});

// Categorias
const categoriaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  estado: z.boolean(),
});


export const autorsShema = z.array(autorShema);

export const categoriasShema = z.array(categoriaSchema);

export type Autor = z.infer<typeof autorShema>
export type AutorFormData = Pick<Autor, 'nombre' | 'primerApellido' | 'segundoApellido' | 'telefono' | 'correo'>

export type Categoria = z.infer<typeof categoriaSchema>
export type CategoryFormData = Pick<Categoria, 'nombre'>

