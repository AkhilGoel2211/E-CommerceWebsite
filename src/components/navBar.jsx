import React, {Component, useState, useEffect} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db, logout, getUserId} from "../firebase";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

function NavBar() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setMoney(data.money);
    } catch(err) {}
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <div className="container-fluid">
        <ul className="navbar-nav d-none d-md-flex mr-auto">
          <Link className="navbar-brand" to="/home">
            ShopStop
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"> */}
          <li className="nav-item active">
            <NavLink className="nav-link" to="/home">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav d-flex align-items-center">
          <form className="d-flex container-fluid px-5" role="search">
            <input
              className="form-control me-2"
              style={{width: "500px"}}
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </ul>
        <ul className="navbar-nav d-flex align-items-center">
          <li className="nav-item">
            <div className="nav-link">Money ${money}</div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login/SignUp
            </NavLink>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
}

export default NavBar;
