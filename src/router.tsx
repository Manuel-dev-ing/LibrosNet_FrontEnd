import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexView from "./views/IndexView";
import PrincipalLayout from "./layouts/PrincipalLayout";
import AppLayout from "./layouts/AppLayout";
import CatalogoView from "./views/CatalogoView";
import AdminLayout from "./layouts/AdminLayout";
import AdminIndexView from "./views/admin/AdminIndexView";
import AutoresView from "./views/admin/AutoresView";
import './index.css';
import CategoriasView from "./views/admin/CategoriasView";

export default function Router() {
  
  
  
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrincipalLayout />}>
                    <Route path="/" element={<IndexView/>} index />
                </Route>

                <Route element={<AppLayout />}>
                    <Route path="/libros" element={<CatalogoView />} />

                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/administracion" element={<AdminIndexView />} />
                    <Route path="/administracion/autores" element={<AutoresView />} />
                    <Route path="/administracion/categorias" element={<CategoriasView />} />

                </Route>    

            </Routes>
        </BrowserRouter>


    )
}
