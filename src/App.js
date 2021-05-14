import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Products from "./pages/products";
import SingleProduct from "./pages/SingleProduct";
import Modal from "./components/Modal";
import Checkout from "./pages/checkout";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { useGlobalContext } from "./context";

const App = () => {
  const { setCurrentUser, currentUser, toggleLogin, loggedIn, setInitialCart } =
    useGlobalContext();
  let unsubscribeFromAuth = () => {
    return null;
  };
  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    setInitialCart();
    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  useEffect(() => {
    if (currentUser) toggleLogin(true);
    if (!currentUser) toggleLogin(false);
  }, [currentUser]);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/product/:id">
            <SingleProduct />
          </Route>
          <Route path="/checkout">
            {loggedIn ? <Checkout /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
      <Modal />
    </>
  );
};

export default App;
