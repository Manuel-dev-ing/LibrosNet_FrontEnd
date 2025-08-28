import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import { getTotals } from '../../services/DashboardAPI'
import { getOrders } from '../../services/PedidosAPI'

export default function AdminIndexView() {

  const { data, isLoading } = useQuery({
    queryKey: ['totales'],
    queryFn: getTotals
  })

   const { data: dataPedidos, isError, isLoading: isLoadingPedidos } = useQuery({
      queryKey: ['pedidos'],
      queryFn: getOrders
  
    })

  if(isLoading && isLoadingPedidos) return 'obteniendo datos...'

  return (
    <>
    
      <h3 className='fw-bold'>Dashboard</h3>
      <p className='text-secondary'>¡Bienvenido de nuevo! Esto es lo que está pasando con tu librería.</p>

      {data ? ( 
        <>
            <div className='d-flex gap-2'>
              <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <p className='fs-6 fw-medium text-secondary m-0'>Total Libros</p>
                      <p className='fw-bold fs-4'>{data.totalLibros}</p>
                    </div>
                    <div className='p-3 rounded-5 backg-blue-600'>
                        <BookOpen  color={'#2563eb'}/>
                    </div>
                </div> 
              </div>
              <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <p className='fs-6 fw-medium text-secondary m-0'>Total de Clientes</p>
                      <p className='fw-bold fs-4'>{data.totalClientes}</p>
                    </div>
                    <div className='p-3 rounded-5 backg-blue-600'>
                        <Users color={'#16a34a'}/>
                    </div>
                </div> 
              </div>
              <div className='card w-39 py-3 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <p className='fs-6 fw-medium text-secondary m-0'>Ingresos</p>
                      <p className='fw-bold fs-4'>${data.ingresos.toFixed(2)}</p>
                    </div>
                    <div className='p-3 rounded-5 backg-blue-600'>
                        <TrendingUp  color={'#ea580c'}/>
                    </div>
                </div> 
              </div>



            </div>
        
        </>
      ): (
        <></>
      )}
      <div className='border mt-4 rounded-2 p-3 w-102'>
        <h4>Pedidos Recientes</h4>
        <p className='text-secondary'>Últimos pedidos de clientes</p>
        <div className='d-flex flex-column gap-3'>
          
          {dataPedidos?.slice(0,3).sort((a,b) => b.id - a.id).map((item) => (
            <>
              <div key={item.id} className='border p-3 rounded-2 d-flex justify-content-between'>
                <div>
                  <p className='m-0 fw-semibold'>#{item.id}</p>
                  <p className='mb-1 text-secondary fs-9 fw-semibold text-capitalize'>{item.cliente}</p>
                  <p className='m-0 fw-semibold'>${item.total}</p>
                </div>
                <button className='align-self-center border rounded-1 bg-white py-1 px-3 cusror-pointer'>Ver</button>
              </div>
            </>
          ))}
          





        </div>
      
      </div>


    </>
  )
}
