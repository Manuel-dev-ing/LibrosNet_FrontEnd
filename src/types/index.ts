import { X } from "lucide-react";
import z, { boolean } from "zod";
import { id } from "zod/v4/locales";

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
  descripcion: z.string().nullable(),
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


// Libros
const libroShema = z.object({
  id: z.number(),
  autor: z.string(),
  categoria: z.string(),
  editorial: z.string(),
  titulo: z.string(),
  precio: z.number(),
  stock: z.number(),
  portada: z.string().nullable(),
  isbn: z.string(),
  fechaPublicacion: z.string(),
  numeroPaginas: z.number(),
  idioma: z.string(),
  sipnosis: z.string(),
  estado: z.boolean()
})

export const libroCreacionSchema = z.object({
    idAutor: z.string(),
    idCategoria: z.string(),
    idEditorial: z.string(),
    titulo: z.string(),
    precio: z.number(),
    stock: z.number(),
    portada: z.string(),
    isbn: z.string(),
    fechaPublicacion: z.string(),
    numeroPaginas: z.number(),
    idioma: z.string(),
    sipnosis: z.string(),
    estado: z.boolean()
})

export const libroEdicionSchema = z.object({
    idAutor: z.string(),
    idCategoria: z.string(),
    idEditorial: z.string(),
    titulo: z.string(),
    precio: z.number(),
    stock: z.number(),
    isbn: z.string(),
    fechaPublicacion: z.string(),
    numeroPaginas: z.number(),
    idioma: z.string(),
    sipnosis: z.string(),
    estado: z.boolean()
})


export const obtenerLibro = z.object({
    id: z.number(),
    idAutor: z.number(),
    idCategoria: z.number(),
    idEditorial: z.number(),
    titulo: z.string(),
    precio: z.number(),
    stock: z.number(),
    portada: z.string().nullable(),
    isbn: z.string(),
    numeroPaginas: z.number(),
    idioma: z.string(),
    sipnosis: z.string(),
})

export const autorsShema = z.array(autorShema);

export const categoriasShema = z.array(categoriaSchema);

export const editorialesSchema = z.array(editorialSchema);

export const librosSchema = z.array(libroShema);

export const itemSchema = libroShema.extend({
  cantidad: z.number()
})

export type Autor = z.infer<typeof autorShema>
export type AutorFormData = Pick<Autor, 'nombre' | 'primerApellido' | 'segundoApellido' | 'telefono' | 'correo'>

export type Categoria = z.infer<typeof categoriaSchema>
export type CategoryFormData = Pick<Categoria, 'nombre' | 'descripcion'>

export type editorial = z.infer<typeof editorialSchema> 
export type EditorialFormData = Pick<editorial, 'nombre' | 'correo' | 'telefono' | 'calle' | 'numero' | 'colonia' | 'ciudad' | 'estado' | 'codigoPostal'>

export type Libro = z.infer<typeof libroShema>
export type LibroFormData = z.infer<typeof libroCreacionSchema> // incluye la portada
export type LibroEdicionFormData = z.infer<typeof libroEdicionSchema> //no incluye la portada

export type Libros = z.infer<typeof librosSchema>
export type Item = z.infer<typeof itemSchema>

export type Alerta = {
  isSuccess: boolean
  mensaje: string
}


