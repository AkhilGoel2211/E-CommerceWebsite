import React, {Component} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/navBar";
import "./App.css";
import NotFound from "./components/notFound";
import About from './components/about';
import Home from './components/home';
import Contact from './components/contact';
import Cart from './components/cart';
import Dashboard from './components/dashboard';
import ItemDetails from './components/common/itemDetails';
import Register from './components/register';
import Reset from "./components/common/reset";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/home/:id" element={<ItemDetails />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/login" element={<Register />}></Route>
            <Route path="/not-found" element={<NotFound />}></Route>
            <Route path="/" element={<Navigate to="/home" replace />}></Route>
            <Route element={<Navigate to="/not-found" replace />}></Route>
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
