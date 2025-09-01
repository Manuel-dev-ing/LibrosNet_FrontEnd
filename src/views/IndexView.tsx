import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import CardCategoria from "../components/CardCategoria";
import { getBooks } from "../services/LibrosAPI";
import { getAllCategories, getCategories } from "../services/CategoriaAPI";
import { useState } from "react";


const overlayStyles : { [key: number] : string } = {
    1: 'image-overlay-purple',
    2: 'image-overlay-blue',
    3: 'image-overlay-green',
    4: 'image-overlay-red',
    6: 'image-overlay-yellow',
    8: 'image-overlay-pink'
}

export default function IndexView() {
    const [recordsPorPagina, setRecordPorPagina] = useState<number>(10)
    const [pagina, setPagina] = useState<number>(1) 

    const { data, isLoading } = useQuery({
        queryFn: () => getBooks(pagina, recordsPorPagina),
        queryKey: ['libros', pagina, recordsPorPagina]
    })

    const { data: Categorias, isLoading: isLoadingCategorias } = useQuery({
        queryFn: getAllCategories,
        queryKey: ['categorias']
    })

    if (isLoading) return  "Obteniendo libros...";
    if (isLoadingCategorias) return  "Obteniendo categorias...";
    
  return (
    <>
      <section className="py-5 text-center border">
        <div className="row py-lg-5" id="ofertas">
          <div className="col-lg-8 col-md-8 mx-auto">
            <span className="badge-section-primary">Libros Destacados</span>
            <h1 className="fw-bold mt-4">Los Mas <span className="text-primary">Populares</span> </h1>
            <p className="fs-5">
              Descubre los libros más leídos y mejor valorados por nuestra comunidad
            </p>
            
          </div>
        </div>
        <div className="d-flex gap-3 container justify-content-center" >
          { data?.length && (
            <>
              {data.slice(0, 4).map((libro) => (
                <div key={libro.id} className="col-3">
                  <Card 
                    libro={libro}
                  />
                </div>
                
              ))}
          
            </>
           
          )}
          
        </div>
      </section>

      {/* seccion categorias */}
      <section className="py-5 text-center" id="categorias">
        <div className="row py-lg-5">
          <div className="col-lg-8 col-md-8 mx-auto">
            <span className="badge-section-purple">Categorias</span>
            <h1 className="fw-bold mt-4">Explora por <span className="text-purple">Genero</span> </h1>
            <p className="fs-5">
              Descubre los libros más leídos y mejor valorados por nuestra comunidad
            </p>
            
          </div>
        </div>
        <div className="border row row-cols-3 container-fluid">
          
            {Categorias?.length && (
              <>
                {Categorias.slice(0, 6).map((categoria) => (
                  <div key={categoria.id} className="col py-3">
                      <CardCategoria
                        categoria={categoria}
                        overlayStyle={overlayStyles[categoria.id]}
                      />
                  </div>
                ))}
              </>
            )}
        </div>

      </section>
    </>
    
  )
}
