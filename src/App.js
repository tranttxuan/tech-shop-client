import './App.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import SideDrawer from './components/drawer/SideDrawer';
import RegisterComponent from './pages/auth/RegisterComponent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UseRoute from './components/routes/UseRoute';
import Wishlist from './pages/user/Wishlist';
import Password from './pages/user/Password';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import Product from './pages/Product';
import CategoryPage from './pages/category/CategoryPage';
import SubPage from './pages/admin/sub/SubPage';
import { signin } from './actions/userActions';
// import Shop from './pages/Shop';
import Shop_CombinedFilters from './pages/Shop_CombinedFilters';
import Cart from './pages/Cart';

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
        <>
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

                {/* public routes  */}
                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/category/:slug" component={CategoryPage} />
                <Route exact path="/sub/:slug" component={SubPage} />
                {/* <Route exact path="/shop" component={Shop} /> */}
                <Route exact path="/shop" component={Shop_CombinedFilters} />
                <Route exact path="/cart" component={Cart} />
            </Switch>
        </>
    );
}

export default App;
