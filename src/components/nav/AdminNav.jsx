import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminNav = () => {
    const location = useLocation();
    const [currentMenuItem, setCurrentMenuItem] = useState();

    useEffect(() => {
       const pathname = location.pathname.split('/').pop()
        setCurrentMenuItem(pathname);
        const menuItemList = document.querySelectorAll('.nav-item');
        menuItemList.forEach(menuItem => {
            if (menuItem.id === pathname) { 
                menuItem.querySelector('a.nav-link').classList.add('bg-light')
            }
        })
    }, []);

    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item" id='dashboard'>
                    <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                </li>

                <li className="nav-item" id='product'>
                    <Link to="/admin/product" className="nav-link">Product</Link>
                </li>

                <li className="nav-item" id='products'>
                    <Link to="/admin/products" className="nav-link">Products</Link>
                </li>

                <li className="nav-item" id='category'>
                    <Link to="/admin/category" className="nav-link">Category</Link>
                </li>

                <li className="nav-item" id='sub'>
                    <Link to="/admin/sub" className="nav-link">Sub category</Link>
                </li>

                <li className="nav-item" id='coupon'>
                    <Link to="/admin/coupon" className="nav-link">Coupon</Link>
                </li>

            </ul>
        </nav>
    )
}

export default AdminNav
