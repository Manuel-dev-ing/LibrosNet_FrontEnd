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
export const libroShema = z.object({
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
  estado: z.boolean(),
  calificacion: z.number().nullable()
})

export const libroCreacionSchema = z.object({
    idAutor: z.string(),
    idCategoria: z.string(),
    idEditorial: z.string(),
    titulo: z.string(),
    precio: z.number(),
    stockMinimo: z.number(),    
    stockMaximo: z.number(),
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

// Comentarios

const comentarioShema = z.object({
  id: z.number(),
  id_usuario: z.number(),
  creado_por: z.string(),
  titulo: z.string(),
  calificacion: z.number(),
  cuerpo: z.string(),
  fechaPublicacion: z.string()

})

/* Auth and Users */ 
const authSchema = z.object({
    idRol: z.number(),
    nombre: z.string(),
    primerApellido: z.string(),
    segundoApellido: z.string(),
    correo: z.string(),
    current_password: z.string(),
    contrasena: z.string(),
    repetirContrasena: z.string(),
    token: z.string() 
});

export const userAuthenticateShema = z.object({
  id: z.number(),
  rol: z.string(),
  nombre: z.string(),
  email: z.string(),
  auth: z.boolean()

})

export const respuestaAutenticacion = z.object({
  token: z.string(),
  expiracion: z.string()

});

// Calificaciones
export const calificacionShema = z.object({
  id: z.number(),
  id_libro: z.number(),
  cantidad: z.number(),
  fecha: z.string()
})

// Pedidos
const pedidoShema = z.object({
  id: z.number(),
  cliente: z.string(),
  subtotal: z.number(),
  impuesto: z.number(),
  total: z.number(),
  fecha: z.string()

})

//totales
export const totalesShema = z.object({
  totalLibros: z.number(),
  totalClientes: z.number(),
  ingresos: z.number()

})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'correo' | 'contrasena'>
export type UserRegistrationForm = Pick<Auth, 'idRol' | 'nombre' | 'primerApellido' | 'segundoApellido' | 'correo' | 'contrasena' | 'repetirContrasena'>

export const comentariosShema = z.array(comentarioShema)

export const autorsShema = z.array(autorShema);

export const categoriasShema = z.array(categoriaSchema);

export const editorialesSchema = z.array(editorialSchema);

export const librosSchema = z.array(libroShema);

export const itemSchema = libroShema.extend({
  cantidad: z.number()
})

export const pedidosShema = z.array(pedidoShema);


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

export type Comentarios = z.infer<typeof comentarioShema>
export type ComentarioFormDara = Pick<Comentarios, 'id_usuario' | 'titulo' | 'cuerpo' | 'calificacion'>

export type UsuarioAutenticado = z.infer<typeof userAuthenticateShema>

export type Calificacion = z.infer<typeof calificacionShema>
export type CalificacionFormData = Pick<Calificacion, 'cantidad' | 'id_libro'>



export type Alerta = {
  isSuccess: boolean
  mensaje: string
}

export type ClienteTarjeta = {
  nombre: string
  apellido: string
  email: string
  direccion: string
  ciudad: string
  codigoPostal: string
  pais: string
  nombreTarjeta: string
  numeroTarjeta: string
  fechaVencimiento: string
  cvv: string
}

export type Pedido = {
  data: ClienteTarjeta
  libros_arr : Item[]
}

// nombre: "",
//     apellido: "",
//     email: "",
//     direccion: "",
//     ciudad: "",
//     codigoPostal: "",
//     pais: "",
//     nombreTarjeta: "",
//     numeroTarjeta: "",
//     fechaVencimiento: "",
//     cvv: ""


