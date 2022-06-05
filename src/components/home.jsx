import React, {Component, useState, useEffect} from "react";
import {db, auth, logout, getInventory, addToCart} from "../firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
// import {useNavigate} from "react-router-dom";
// import {
//   collection,
//   getDocs,
//   query,
//   updateDoc,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";

function Home() {
  const nav = useNavigate();
  const [inventory, setInventory] = useState([]);
  const fetchInventory = async () => {
    try {
      const promise = getInventory(db);
      const response = await promise;
      setInventory(response);
    } catch(err) {
      console.error(err);
      alert("An error occured while fetching inventory data");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getItem = (id) => {
    return inventory.find((item) => item.id === id);

  };


  const handleAddToCart = (item) => {
    let uid = null;
    const auth = getAuth();
    const user = auth.currentUser;
    if(user) {
      uid = user.uid;
      addToCart(item, uid);
    }
    else {
      nav("/login");
    }
  };

  const handleItemDisplay = (id) => {
    nav(`/home/${id}`, {state: {item: (getItem(id))}});
  };

  return (
    <div className="container" style={{width: "50%", height: "auto"}}>
      <h1>Home</h1>
      {inventory.map((item) => (
        <ul
          key={item.id}
          style={{border: "2px solid black"}}
        // onClick={() => {
        //   getItem(item.id);
        //   handleItemDisplay(item.id);
        // }
        // }
        >
          <li>Title: {item.title}</li>
          <li>Category: {item.category}</li>
          <img
            style={{width: "auto", height: "200px", borderRadius: "30px"}}
            src={item.image}
            alt=""
          />
          <li>Description: {item.description}</li>
          <li>Price: {item.price}</li>
          <li>Rating: {item.rating}</li>
          <li>Count: {item.count}</li>
          <button onClick={() => {handleAddToCart(item);}}>Add to Cart</button>
        </ul>
      ))
      }
    </div >
  );
}

export default Home;