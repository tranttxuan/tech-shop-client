import './App.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //prevent from memory leak and all that stuff
    // Once app fetches user from firebase, it returns (cleanup) so no more calls to firebase is made.
    // By the way firebase is realtime so it keeps track of user authStateChanged when login or logout.
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // use token to chech auth in frontend and backend 
        currentUser(idTokenResult.token)
          .then(res => {
            const { email, name, role, _id } = res.data
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email, name, role, _id,
                token: idTokenResult.token,
              }
            })
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
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />

        {/* auth  */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComponent} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/login" component={Login} />

        {/* private routes  */}
        <UseRoute exact path="/user/history" component={History} />
        <UseRoute exact path="/user/password" component={Password} />
        <UseRoute exact path="/user/wishlist" component={Wishlist} />

        {/* admin  */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
      </Switch>
    </>
  );
}

export default App;
