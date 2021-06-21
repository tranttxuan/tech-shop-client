import { CheckCircleOutlined, CloseCircleOutlined, ShopTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

const History = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        getUserOrders(user.token)
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {

            })
    }, []);

    const showOrderInTable = (order) => (
        <table className='table table-bordered'>
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
    )

    const showEachOrder = () =>
        orders.map((order, i) =>
            <div key={i} className='m-5 p-3 card'>
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className='col'>
                        {downloadLink(order)}
                    </div>
                </div>
            </div>
        )

    const downloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName='invoice.pdf'
            className='btn btn-sm btn-block btn-outline-primary'
        >
            Download PDF
        </PDFDownloadLink>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center ">
                    <h4>{orders.length > 0 ? 'User purchase orders' : 'No purchase order'}</h4>
                    {showEachOrder()}
                </div>
            </div>
        </div>
    )
}

export default History
