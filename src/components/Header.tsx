import { Link } from "react-router-dom";

export default function Header() {
  return (
        <header className="">
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">
                  
                    <a className="navbar-brand gradient-text navbar-title nav-brand fs-3" href="#">Libros Net</a>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fw-normal fs-6 text-black navbar-link" to={'/'}>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-normal fs-6 text-black navbar-link" to={'/libros'}>Libros</Link>
                            </li>
                          
                            <li className="nav-item">
                                <a className="nav-link fw-normal fs-6 text-black navbar-link" href="#">Categorias</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link fw-normal fs-6 text-black navbar-link" href="#">Ofertas</a>
                            </li>

                        </ul>
                        <div className="form-nav d-flex justify-content-between gap-3" role="search">
                            <input className=" form-control me-2 rounded-4" id="search" type="search" placeholder="Search" aria-label="Search" />
                            <a className="icon-cart">
                                <i className="bi bi-cart icono-cart"></i>
                            </a>
                            <button className="rounded-4 btn text-white rounded btn-gradient min-width-8" type="submit">Iniciar Sesion</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
  )
}
