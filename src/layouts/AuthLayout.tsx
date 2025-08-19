import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
        <div className="container-fluid backg-white-100 border">
            <Outlet />
        </div>

        <ToastContainer 
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
    
    </>
  )
}
