import React, {Component, useState, useEffect} from "react";
import {db, auth, logout, getInventory} from "../firebase";
import {useNavigate} from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

function Cart() {
  const [inventory, setInventory] = useState([]);
  const fetchInventory = async () => {
    try {
      const promise = getInventory(db);
      const response = await promise;
      // console.log(typeof response);
      setInventory(response);
    } catch(err) {
      console.error(err);
      alert("An error occured while fetching inventory data");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="container">
      <h1>Cart</h1>
      {inventory.map((item) => (
        <ul key={item.id}>
          <li>Title: {item.title}</li>
          <li>Category: {item.category}</li>
          <li>Description: {item.description}</li>
          <li>Price: {item.price}</li>
          <li>Rating: {item.rating}</li>
          <li>Count: {item.count}</li>
          <img src={item.image} alt="" />
        </ul>
      ))}
    </div>
  );
}

export default Cart;
