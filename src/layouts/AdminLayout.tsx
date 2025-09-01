import { BookCopy, Contact, LayoutGrid, Newspaper, Package, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCarritoStore } from "../storeCarrito";
import { useLibrosStore } from "../store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/UsuariosAPI";

export default function AdminLayout() {

        const [open, setOpen] = useState(false);
        const usuarioAutenticado = useLibrosStore((state) => state.usuarioAutenticado)
        const resetUsuarioAuetenticado = useLibrosStore((state) => state.resetUsuarioAuetenticado)
        const setUsuarioAutenticado = useLibrosStore((state) => state.setUsuarioAutenticado)
        
        const navigate = useNavigate();
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
    
    
        useEffect(() => {
            console.log("use Effect usuario autenticado");
            console.log(usuarioAutenticado);
            if (usuarioAutenticado.rol === 'usuario' && usuarioAutenticado.auth === true) {
                console.log("redirigiendo a la pagina principal");
                navigate('/')
    
            }else if(usuarioAutenticado.rol === 'administrador' && usuarioAutenticado.auth === true){
                console.log("redirigiendo a la pagina administracion");
                navigate('/administracion')
    
            }else{
                navigate('/')
            }
    
    
        },[usuarioAutenticado])
       
        
        const handleCerrarSesion = () => {
            
            resetUsuarioAuetenticado()
            console.log(usuarioAutenticado);
            queryClient.removeQueries({queryKey: ['user']})
            navigate('/')
            console.log("Cerrando Sesion...");
            
        }

    return (
        <>
            <div className="">
                
                <nav className="navbar fixed-top shadow bg-white">
                    <div className="container-fluid ps-3 pe-4 d-flex border justify-content-beetwen">
                        <Link to={'/administracion'} className="navbar-brand fw-semibold text-blue-bold">Libros Net</Link>

                        <div className="dropdown text-end">
                                
                            <a className="dropdown-toggle dropdown-enlace text-decoration-none text-dark fw-medium text-capitalize" onClick={() => setOpen(!open)}>
                                Hola, {usuarioAutenticado.nombre}
                            </a>
                            <ul className={`dropdown-menu ${open ? 'show' : ''}`}>
                                
                                <li><a className="dropdown-item cusror-pointer" onClick={handleCerrarSesion}>Cerrar Sesion</a></li>
                            </ul>
                            
                        </div>
                    </div>
                </nav>
                <main className="">
                    <div className="position-fixed top-0 start-0 bg-white shadow w-30 h-100 d-flex flex-column p-3">
                       
                        <ul className="nav flex-column mb-auto">
                            <Link to={'/administracion/autores'} className="link nav-link-sidebar text-blue-bold fw-semibold p-2 mt-5 d-flex gap-3 align-items-center">
                                <Contact size={20} color="#012974" />

                                <p className="nav-link-sidebar text-blue-bold fw-semibold m-0">Autores</p>
                                
                            </Link>
                            <Link to={'/administracion/categorias'} className="link nav-link-sidebar text-blue-bold fw-semibold p-2 d-flex gap-3 align-items-center">
                                <LayoutGrid size={20} color="#012974" />
                                <p className="nav-link-sidebar text-blue-bold fw-semibold m-0">
                                Categorias
                                </p>
                            </Link>
                            <Link to={'/administracion/editoriales'} className="link nav-link-sidebar text-blue-bold fw-semibold nav-item p-2 d-flex gap-3 align-items-center">
                                <Newspaper size={20} color="#012974" />

                                <p className="nav-link-sidebar text-blue-bold fw-semibold m-0">
                                    Editoriales
                                </p>
                            </Link>
                            <Link to={'/administracion/libros'} className="link nav-link-sidebar text-blue-bold fw-semibold p-2 d-flex gap-3 align-items-center">
                                <BookCopy size={20} color="#012974" />
                                <p className="nav-link-sidebar text-blue-bold fw-semibold m-0">
                                    Libros
                                </p>
                            </Link>
                            <Link to={'/administracion/pedidos'} className="link nav-link-sidebar text-blue-bold fw-semibold p-2 d-flex gap-3 align-items-center">
                                <ShoppingCart size={20} color="#012974" />
                                <p className="nav-link-sidebar text-blue-bold fw-semibold m-0">
                                    Pedidos
                                </p>
                            </Link>
                            <Link to={'/administracion/inventario'} className="link nav-link-sidebar text-blue-bold fw-semibold p-2 d-flex gap-3 align-items-center">
                                <Package size={20} color="#012974" />
                                <p className="nav-link-sidebar text-blue-bold fw-semibold m-0">
                                    Gestionar Inventario
                                </p>
                            </Link>
                        </ul>
                      
                    </div>
                    <section className="height-100  ms-50 mt-10">
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
