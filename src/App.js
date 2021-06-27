import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from 'react-router';
import { signin } from './actions/userActions';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons';

// import Home from './pages/Home';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Header from './components/nav/Header';
// import SideDrawer from './components/drawer/SideDrawer';
// import RegisterComponent from './pages/auth/RegisterComponent';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import History from './pages/user/History';
// import UseRoute from './components/routes/UseRoute';
// import Wishlist from './pages/user/Wishlist';
// import Password from './pages/user/Password';
// import AdminRoute from './components/routes/AdminRoute';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCreate from './pages/admin/sub/SubCreate';
// import SubUpdate from './pages/admin/sub/SubUpdate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import Product from './pages/Product';
// import CategoryPage from './pages/category/CategoryPage';
// import SubPage from './pages/admin/sub/SubPage';
// import Shop_CombinedFilters from './pages/Shop_CombinedFilters';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import CreateCoupon from './pages/admin/coupon/CreateCoupon';
// import Payment from './pages/Payment';

const Login = lazy(() => import('./pages/auth/Login'));

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/auth/Register'));
const Header = lazy(() => import('./components/nav/Header'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
const RegisterComponent = lazy(() => import('./pages/auth/RegisterComponent'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const UseRoute = lazy(() => import('./components/routes/UseRoute'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const Password = lazy(() => import('./pages/user/Password'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const Product = lazy(() => import('./pages/Product'));
const CategoryPage = lazy(() => import('./pages/category/CategoryPage'));
const SubPage = lazy(() => import('./pages/admin/sub/SubPage'));
const Shop_CombinedFilters = lazy(() => import('./pages/Shop_CombinedFilters'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/Payment'));


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        //prevent from memory leak and all that stuff
        // Once app fetches user from firebase, it returns (cleanup) so no more calls to firebase is made.
        // By the way firebase is realtime so it keeps track of user authStateChanged when login or logout.
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                // use token to check auth in frontend and backend 
                currentUser(idTokenResult.token)
                    .then(res => {
                        const { email, name, role, _id } = res.data
                        const token = idTokenResult.token;
                        dispatch(signin(email, name, role, _id, token));
                    })
                    .catch(error => toast.error(error.message))
            }
        })
        //clean up
        return () => unsubscribe();
    }, [dispatch])

    return (
        <Suspense fallback={
            <div className='col text-center p_5'>
                <LoadingOutlined />  TRAN XUAN __ Project E-commerce
            </div>
        }>
            <Header />
            <SideDrawer />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />

                {/* auth routes */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/complete" component={RegisterComponent} />
                <Route exact path="/forgot/password" component={ForgotPassword} />
                <Route exact path="/login" component={Login} />

                {/* private routes  */}
                <UseRoute exact path="/user/history" component={History} />
                <UseRoute exact path="/user/password" component={Password} />
                <UseRoute exact path="/user/wishlist" component={Wishlist} />

                {/* admin routes  */}
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/category" component={CategoryCreate} />
                <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
                <AdminRoute exact path="/admin/sub" component={SubCreate} />
                <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />

                <AdminRoute exact path="/admin/product" component={ProductCreate} />
                <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
                <AdminRoute exact path="/admin/products" component={AllProducts} />

                <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />

                {/* public routes  */}
                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/category/:slug" component={CategoryPage} />
                <Route exact path="/sub/:slug" component={SubPage} />
                {/* <Route exact path="/shop" component={Shop} /> */}
                <Route exact path="/shop" component={Shop_CombinedFilters} />
                <Route exact path="/cart" component={Cart} />

                {/* Checkout Route  */}
                <UseRoute exact path="/checkout" component={Checkout} />
                <UseRoute exact path="/payment" component={Payment} />
            </Switch>
        </Suspense>
    );
}

export default App;
