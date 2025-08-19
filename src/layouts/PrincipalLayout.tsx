import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { ToastContainer } from "react-toastify";

import { useLibrosStore } from "../store";
import type { UsuarioAutenticado } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/UsuariosAPI";

export default function PrincipalLayout() {
  

  return (
    <>
        <Header 
          
        />
        
        <HeroSection />

        <div className="container-fluid">
            <Outlet />
        </div>
       
        <Footer />

        <ToastContainer 
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
    </>
  )
}
