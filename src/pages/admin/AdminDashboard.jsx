import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/order/Orders";
import { changeStatus, getOrders } from "../../functions/admin";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user);

    const loadOrders = useCallback(() => {
        getOrders(user.token).then(res => setOrders(res.data))
    });

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
            .then(res => {
                toast.success('Status updated');
                loadOrders()
            })
            .catch(err => toast.error(err));
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Admin Dashboard</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
