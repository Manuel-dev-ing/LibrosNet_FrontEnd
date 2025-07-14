import { BookCopy, Contact, LayoutGrid, Newspaper, Users } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
    return (
        <>
            <div className="backg-white-100 ">
                
                <nav className="navbar fixed-top shadow bg-white">
                    <div className="container-fluid ps-3 pe-4 d-flex border justify-content-beetwen">
                        <a className="navbar-brand fw-semibold text-blue-bold" href="#">Libros Net</a>

                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Nombre usuario
                            </a>
                            <ul className="dropdown-menu text-small">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <main className="d-flex">
                    <div className="bg-white shadow w-30 d-flex flex-column p-3">
                       
                        <ul className="nav flex-column mb-auto">
                        <li className="nav-item p-2 mt-5 d-flex gap-3 align-items-center">
                            <Contact size={20} color="#012974" />

                            <Link className="nav-link-sidebar text-blue-bold fw-semibold" to={'/administracion/autores'} >Autores</Link>
                            
                        </li>
                        <li className="nav-item p-2 d-flex gap-3 align-items-center">
                            <LayoutGrid size={20} color="#012974" />
                            <Link to={'/administracion/categorias'} className="nav-link-sidebar text-blue-bold fw-semibold">
                            Categorias
                            </Link>
                        </li>
                        <li className="nav-item p-2 d-flex gap-3 align-items-center">
                            <Newspaper size={20} color="#012974" />

                            <a href="#" className="nav-link-sidebar text-blue-bold fw-semibold">
                            Editoriales
                            </a>
                        </li>
                        <li className="nav-item p-2 d-flex gap-3 align-items-center">
                            <BookCopy size={20} color="#012974" />
                            <a href="#" className="nav-link-sidebar text-blue-bold fw-semibold">
                            Libros
                            </a>
                        </li>
                        <li className="nav-item p-2 d-flex gap-3 align-items-center">
                            <Users size={20} color="#012974" />

                            <a href="#" className="nav-link-sidebar text-blue-bold fw-semibold">
                            Usuarios
                            </a>
                        </li>
                        </ul>
                      
                    </div>
                    <section className="height-100 container ms-5 mt-10">
                        <Outlet />

                    </section>

                </main>
                
            </div>
            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        
        </>

    )
}
