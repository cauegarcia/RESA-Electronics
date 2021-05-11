import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Products from "./pages/products";
import SingleProduct from "./pages/SingleProduct";
import Modal from "./components/Modal";

const App = () => {
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
        </Switch>
      </Router>
      <Modal />
    </>
  );
};

export default App;
