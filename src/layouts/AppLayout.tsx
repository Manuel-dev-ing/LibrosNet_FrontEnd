import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <>
        <Header />

        <div className="container-fluid backg-white">
            <Outlet />
        </div>
       
        <Footer />
    </>
        
  )
}
