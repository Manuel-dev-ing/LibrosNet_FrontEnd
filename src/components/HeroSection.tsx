import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
        <section className="col-xxl-8 px-4 py-5 hero-section">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img
                    src="../../public/img/hero-img.jpg"
                    className="d-block rounded mx-lg-auto img-fluid"
                    alt="Bootstrap Themes"
                    width="700"
                    height="500"
                    loading="lazy"
                    />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-4 fw-bold lh-1 mb-3 text-white">
                        Descubre Mundos <span className="gradient-text">Infinitos</span>
                    </h1>
                    
                    <p className="text-white">
                    Explora nuestra biblioteca digital con más de 10,000 libros. Desde bestsellers hasta joyas ocultas, encuentra tu próxima gran aventura literaria.
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <Link to={"/libros"} type="button" className="btn text-white btn-md rounded-4 btn-gradient d-flex justify-content-center align-items-center gap-1 ">
                        Explorar Catalogo
                        <ArrowRight size={20} />
                    </Link>
                  
                    </div>
                </div>
            </div>
        </section>
  )
}
