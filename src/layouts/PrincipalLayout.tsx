import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

export default function PrincipalLayout() {
  return (
    <>
        <Header />
        <HeroSection />

        <div className="container-fluid">
            <Outlet />
        </div>
       
        <Footer />
    </>
  )
}
