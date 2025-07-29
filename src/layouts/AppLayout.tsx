import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function AppLayout() {
  return (
    <>
        <Header />

        <div className="container-fluid backg-white-100 border">
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
