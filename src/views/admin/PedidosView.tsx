import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getOrders } from '../../services/PedidosAPI'

export default function PedidosView() {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['pedidos'],
        queryFn: getOrders

    })

    if (isLoading) 'Obteniendo pedidos'

 if (data) return (
    <>
        <h4 className='text-blue-bold'>Pedidos</h4>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><a className='text-blue-bold fw-semibold'>Home</a></li>
            <li className="breadcrumb-item fw-semibold active" aria-current="page">Pedidos</li>
            </ol>
        </nav>

        <table className="table table-hover table-responsive mb-5 border">
            <thead className='custom-thead text-white'>
            <tr>
                <th></th>
                <th className="text-white fw-semibold">Cliente</th>
                <th className="text-white fw-semibold">Subtotal</th>
                <th className="text-white fw-semibold">Impuesto</th>
                <th className="text-white fw-semibold">Total</th>
                <th className="text-white fw-semibold">Fecha</th>
                <th className="text-white fw-semibold">Acciones</th>
            </tr>
            </thead>
            <tbody className='cabecera-tabla'>
                {data.length ? (
                    data.map((pedido) => (
                    <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.cliente}</td>
                        <td>${pedido.subtotal.toFixed(2)}</td>
                        <td>${pedido.impuesto.toFixed(2)}</td>
                        <td>${pedido.total.toFixed(2)}</td>
                        <td>{pedido.fecha}</td>
                        <td>
                            <div className='d-flex gap-3'>
                                
                                <a className='btn btn-sm btn-outline-dark fw-medium' title='Ver detalle del pedido' >
                                    Ver
                                </a>
                            </div>
                        </td>
                    </tr>
                    ))
                ): (
                    <p className="text-center py-20">No hay Pedidos</p>
                )}
            
            </tbody>
        </table>


    </>
  )
}
