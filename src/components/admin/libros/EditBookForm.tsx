import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { Autor, Categoria, editorial, LibroFormData } from "../../../types"
import ErrorMessage from "../../ErrorMessage"

type EditBookFormProps = {
    preview: string
    errors: FieldErrors<LibroFormData>
    register: UseFormRegister<LibroFormData>
    autores: Autor[]
    categorias: Categoria[]
    editoriales: editorial[]
}

export default function EditBookForm({preview, errors, register, autores, categorias, editoriales} : EditBookFormProps) {
  return (
    <>
    
        <div className="col-xl-4">
            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <div>
                        {preview && (
                            <img id="portada" src={preview}/>
                        )}
                            
                    </div>
                    
                    <div>
                        <label className="form-label">Seleciona una imagen</label>
                        <input type='file' className="form-control" id="portada" accept="image/*" 
                            {...register("portada", {
                                required: false,
                            })}
                        />
                        
                    </div>
                
                </div>
            </div>
        </div>
        
        <div className="col-xl-8">
            <div className="card">
                <div className="card-body pt-3">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Autor</label>
                            <select className="form-select" id='idAutor' 
                            {...register("idAutor", {
                                required: "El Autor del libro es obligatorio",
                            })}
                            >
                            <option value="">-- Selecciona --</option>
                            {autores?.map(autor => (
                                <option key={autor.id} value={autor.id}>{autor.nombre + " " + autor.primerApellido}</option>

                            ))}
                            </select>

                            {errors && (
                                <ErrorMessage>{errors.idAutor?.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Categoria</label>
                            <select className="form-select" id='idCategoria'
                            {...register("idCategoria", {
                                required: "La Categoria del libro es obligatorio",
                            })}
                            >
                            <option value="">-- Selecciona --</option>
                            {categorias?.map( categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                            ))}
                            

                            </select>
                            {errors && (
                                <ErrorMessage>{errors.idCategoria?.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Editorial</label>
                            <select className="form-select" id='idEditorial'
                            {...register("idEditorial", {
                                required: "La Editorial del libro es obligatorio",
                            })}
                            >
                            <option value="" >-- Selecciona --</option>
                            {editoriales?.map( editorial => (
                                <option key={editorial.id} value={editorial.id}>{editorial.nombre}</option>
                            ))}

                            </select>
                            {errors && (
                                <ErrorMessage>{errors.idEditorial?.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Titulo</label>
                            <input className="form-control" type='text' placeholder='Titulo del libro'
                            {...register("titulo", {
                                required: "El Titulo del libro es obligatorio",
                            })} 
                            />
                            {errors && (
                            <ErrorMessage>{errors.titulo?.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor='precio' className="form-label">Precio</label>
                            <input id='precio' type="text" className="form-control" placeholder='$253' 
                                {...register("precio", {
                                    required: "El Precio del libro es obligatorio",
                                })}
                            />
                            {errors && (
                                <ErrorMessage>{errors.precio?.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor='stock' className="form-label">Stock</label>
                            <input id='stock' type="number" min="1" className="form-control" placeholder='5' 
                                {...register("stock", {
                                    required: "El Stock del libro es obligatorio",
                                })}
                            />
                            {errors && (
                                <ErrorMessage>{errors.precio?.message}</ErrorMessage>
                            )}  

                        </div>
                        <div className="col-md-4">
                            <label htmlFor='isbn' className="form-label">ISBN</label>
                            <input id='isbn' className="form-control" placeholder='13456789563' 
                                {...register("isbn", {
                                    required: "El ISBN del libro es obligatorio",
                                })}
                            />
                            {errors && (
                                <ErrorMessage>{errors.isbn?.message}</ErrorMessage>
                            )} 
                        </div>
                        <div className="col-md-6">
                            <label htmlFor='numeroPaginas' className="form-label">Numero de Paginas</label>
                            <input id='numeroPaginas' type='number' min="1" className="form-control" placeholder='233' 
                                {...register("numeroPaginas", {
                                    required: "El Numero de Paginas del libro es obligatorio",
                                })}
                            />

                            {errors && (
                                <ErrorMessage>{errors.numeroPaginas?.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor='idioma' className="form-label">Idioma</label>
                            <input id='idioma' className="form-control" placeholder='Español' 
                            {...register("idioma", {
                                required: "El Idioma del libro es obligatorio",
                            })}
                            />
                            {errors && (
                                <ErrorMessage>{errors.idioma?.message}</ErrorMessage>
                            )}  
                        </div>
                        <div className="col-md-12">
                            <label htmlFor='sipnosis' className="form-label">Sipnosis</label>
                            <textarea className='form-control' id="sipnosis" rows="5" 
                            {...register("sipnosis", {
                                required: "La Idioma del libro es obligatorio",
                            })}
                            />
                            {errors && (
                                <ErrorMessage>{errors.sipnosis?.message}</ErrorMessage>
                            )}
                        </div>


                        
                    </div>    
                    
                </div>
            </div>
        </div>
    
    </>
  )
}
