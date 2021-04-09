import './App.css';
import { ToastContainer } from "react-toastify";
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("check in App >> user")
    //prevent from memory leak and all that stuff
    // Once app fetches user from firebase, it returns (cleanup) so no more calls to firebase is made.
    // By the way firebase is realtime so it keeps track of user authStateChanged when login or logout.
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComponent} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
