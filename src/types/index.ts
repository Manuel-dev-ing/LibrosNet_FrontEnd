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


export const autorsShema = z.array(autorShema);


export type Autor = z.infer<typeof autorShema>
export type AutorFormData = Pick<Autor, 'nombre' | 'primerApellido' | 'segundoApellido' | 'telefono' | 'correo'>


