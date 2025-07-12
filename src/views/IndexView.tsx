import Card from "../components/Card";
import CardCategoria from "../components/CardCategoria";

export default function IndexView() {

  return (
    <>
      <section className="py-5 text-center border">
        <div className="row py-lg-5">
          <div className="col-lg-8 col-md-8 mx-auto">
            <span className="badge-section-primary">Libros Destacados</span>
            <h1 className="fw-bold mt-4">Los Mas <span className="text-primary">Populares</span> </h1>
            <p className="fs-5">
              Descubre los libros más leídos y mejor valorados por nuestra comunidad
            </p>
            
          </div>
        </div>
        <div className="border d-flex gap-3 container justify-content-center">
          <div className="col-3">
            <Card />
          </div>
          <div className="col-3">
            <Card />
          </div>
          <div className="col-3">
            <Card />
          </div>
          <div className="col-3">
            <Card />
          </div>
        </div>
      </section>

      {/* seccion categorias */}
      <section className="py-5 text-center">
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
          <div className="col py-3">
            <CardCategoria />
          </div>
          <div className="col py-3">
            <CardCategoria />
          </div>
          <div className="col py-3">
            <CardCategoria />
          </div>
          <div className="col py-3">
            <CardCategoria />
          </div>
          <div className="col py-3">
            <CardCategoria />
          </div>
          <div className="col py-3">
            <CardCategoria />
          </div>

        </div>

      </section>
    </>
    
  )
}
