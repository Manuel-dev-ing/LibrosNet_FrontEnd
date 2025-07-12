import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-5 footer ">
        <div className="row d-flex justify-content-around">
            <div className="col-3 col-md-3 mb-3">
                <h5 className="gradient-text navbar-title nav-brand fs-3">Libros Net</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Tu librería online de confianza. Descubre, lee y explora mundos infinitos con nuestra amplia colección de libros digitales y físicos.</a></li>
                    
                </ul>
            </div>
            <div className="col-3 col-md-2 mb-3">
                <h5 className="text-white">Enlaces Rápidos</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Inicio</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Catalogo</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Ofertas</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Novedades</a></li>
                    
                </ul>
            </div>
            <div className="col-3 col-md-2 mb-3">
                <h5 className="text-white">Categorias</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Ficcion</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">No Ficcion</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Ciencia</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-secondary">Arte y Cultura</a></li>
                    
                </ul>
            </div>
            <div className="col-3 col-md-3 mb-3">
                <h5 className="text-white">Contacto</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2 d-flex gap-2 my-2"><MapPin color="#60a5fa" /> <a href="#" className="nav-link p-0 text-secondary">Calle Principal 123, Ciudad</a></li>
                    <li className="nav-item mb-2 d-flex gap-2 my-2"><Phone color="#4ade80" /> <a href="#" className="nav-link p-0 text-secondary">+1 (555) 123-4567</a></li>
                    <li className="nav-item mb-2 d-flex gap-2 my-2"><Mail color="#9469c6" /> <a href="#" className="nav-link p-0 text-secondary">info@librosnet.com</a></li>
                </ul>
            </div>
            
        </div>
        <div className="d-flex justify-content-end me-4">
                <form className="col-12 col-md-3 ">
                    <h5 className="text-white">Subscribe to our newsletter</h5>
                    <p className="text-secondary">Monthly digest of what's new and exciting from us.</p>
                    <div className="d-flex flex-column flex-sm-row w-100 gap-2"> 
                        <label htmlFor="newsletter1"className="visually-hidden text-secondary">Email address</label> 
                        <input id="newsletter1" type="email" className="form-control" placeholder="Email address" />
                        <button className=" btn text-white rounded btn-gradient" type="button">Subscribe</button> 
                    </div>
                </form>
            </div>
        <div className=" d-flex justify-content-between p-4 my-4 border-top border-secondary">
            <p className="text-secondary">&copy; 2025 Libros Net Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
                <li className="ms-3">
                    <a className="text-white">
                        Términos de Servicio
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-white">
                        Política de Privacidad
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-white">
                        Cookies
                    </a>
                </li>
            </ul>
        </div>
    </footer>
  )
}
