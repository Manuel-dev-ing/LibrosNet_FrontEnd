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

//Editoriales
const editorialSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  correo: z.string(),
  telefono: z.string(),
  calle: z.string(),
  numero: z.string(),
  colonia: z.string(),
  codigoPostal: z.string(),
  ciudad: z.string(),
  estado: z.string()
})


export const autorsShema = z.array(autorShema);

export const categoriasShema = z.array(categoriaSchema);

export const editorialesSchema = z.array(editorialSchema);

export type Autor = z.infer<typeof autorShema>
export type AutorFormData = Pick<Autor, 'nombre' | 'primerApellido' | 'segundoApellido' | 'telefono' | 'correo'>

export type Categoria = z.infer<typeof categoriaSchema>
export type CategoryFormData = Pick<Categoria, 'nombre'>

export type editorial = z.infer<typeof editorialSchema> 
export type EditorialFormData = Pick<editorial, 'nombre' | 'correo' | 'telefono' | 'calle' | 'numero' | 'colonia' | 'ciudad' | 'estado' | 'codigoPostal'>
