import { Link } from "react-router-dom";
import { useCarritoStore } from "../storeCarrito";
import type { UsuarioAutenticado } from "../types";
import { use, useEffect, useState } from "react";
import { useLibrosStore } from "../store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/UsuariosAPI";




export default function Header() {

    const [open, setOpen] = useState(false);
    const cantidadItems = useCarritoStore((state) => state.carrito)
    const usuarioAutenticado = useLibrosStore((state) => state.usuarioAutenticado)
    const resetUsuarioAuetenticado = useLibrosStore((state) => state.resetUsuarioAuetenticado)
    const setUsuarioAutenticado = useLibrosStore((state) => state.setUsuarioAutenticado)
        
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        console.log("useEffect...");
        
        if (data !== undefined) {
            const usuarioData = {...data}
            console.log(usuarioData);
            setUsuarioAutenticado(usuarioData)
            return
        }

    }, [data])
   
    
    const handleCerrarSesion = () => {
        
        resetUsuarioAuetenticado()
        console.log(usuarioAutenticado);
        queryClient.removeQueries({queryKey: ['user']})
        console.log("Cerrando Sesion...");
        
    }

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
                                <a className="nav-link fw-normal fs-6 text-black navbar-link" href="#categorias">Categorias</a>
                            </li>

                            <li className="">
                                <a className="nav-link fw-normal fs-6 text-black navbar-link" href="#ofertas">Ofertas</a>
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

                            {usuarioAutenticado.auth ? (
                                <>
                                    <div className="dropdown">
                                            
                                        <a className="dropdown-toggle dropdown-enlace text-decoration-none text-dark fw-medium text-capitalize" onClick={() => setOpen(!open)}>
                                            Hola, {usuarioAutenticado.nombre}
                                        </a>
                                        <ul className={`dropdown-menu ${open ? 'show' : ''}`}>
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item cusror-pointer" onClick={handleCerrarSesion}>Cerrar Sesion</a></li>
                                        </ul>
                                        
                                    </div>
                                </>
                            ): (
                                <>
                                    <Link className="rounded-4 btn text-white rounded btn-gradient min-width-8" to={'/auth/login'}>
                                        Iniciar Sesion
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
  )
}
