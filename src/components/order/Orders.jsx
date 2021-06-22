import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import React from 'react'
import ShowPaymentInfo from '../cards/ShowPaymentInfo'

function Orders({ orders, handleStatusChange }) {
    return (
        <>
            {orders.map(order =>
                <div key={order._id} className="row pb-5">
                    <div className='btn btn-block bg-light'>
                        <ShowPaymentInfo order={order} showStatus={false} />
                        <div className="row">
                            <div className="col-md-4 fw-bold">Delivery Status</div>
                            <div className="col-md-8">
                                <select
                                    className='form-control'
                                    name='status'
                                    defaultValue={order.orderStatus}
                                    onChange={e => handleStatusChange(order._id, e.target.value)}>
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
        
                            <table className='table table-bordered mt-3'>
                                <thead className='thead-light'>
                                    <tr>
                                        <th scope='col'>Title</th>
                                        <th scope='col'>Price</th>
                                        <th scope='col'>Brand</th>
                                        <th scope='col'>Color</th>
                                        <th scope='col'>Count</th>
                                        <th scope='col'>Shipping</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map(({ product, color, count }, i) => (
                                        <tr key={i}>
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                            <td>{product.brand}</td>
                                            <td>{color}</td>
                                            <td>{count}</td>
                                            <td>{product.shipping === 'Yes' ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
             
                    </div>
                </div>
            )}
        </>
    )
}

export default Orders
