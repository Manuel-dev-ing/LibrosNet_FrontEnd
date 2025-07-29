import { Link } from "react-router-dom";
import { useCarritoStore } from "../storeCarrito";

export default function Header() {
    const cantidadItems = useCarritoStore((state) => state.carrito)
    console.log(cantidadItems);
    

  return (
        <header className="">
            <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                <div className="container-fluid">
                  
                    <a className="navbar-brand gradient-text navbar-title nav-brand fs-3" href="#">Libros Net</a>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="">
                                <Link className="nav-link fw-normal fs-6 text-black navbar-link" to={'/'}>Inicio</Link>
                            </li>
                            <li className="">
                                <Link className="nav-link fw-normal fs-6 text-black navbar-link" to={'/libros'}>Libros</Link>
                            </li>
                          
                            <li className="">
                                <a className="nav-link fw-normal fs-6 text-black navbar-link" href="#">Categorias</a>
                            </li>

                            <li className="">
                                <a className="nav-link fw-normal fs-6 text-black navbar-link" href="#">Ofertas</a>
                            </li>

                        </ul>
                        <div className="form-nav d-flex justify-content-between gap-3" role="search">
                            <input className=" form-control me-2 rounded-4" id="search" type="search" placeholder="Search" aria-label="Search" />
                            <Link to={'/carrito'} className="icon-cart position-relative">
                                <i className="bi bi-cart icono-cart"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge-carrito-danger fs-9">
                                    {cantidadItems.length}
                                </span>
                            </Link>
                            <button className="rounded-4 btn text-white rounded btn-gradient min-width-8" type="submit">Iniciar Sesion</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
  )
}
