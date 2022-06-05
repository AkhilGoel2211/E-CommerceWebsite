import React, {Component, useState} from "react";
import {collection, query, where, getDocs, QuerySnapshot} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {db} from "../firebase";


async function Cart() {
  const [cart, setCart] = useState([]);
  const getUserId = () => {
    let uid = null;
    const auth = getAuth();
    const user = auth.currentUser;
    if(user) {
      uid = user.uid;
      return uid;
    }
  };
  const uid = getUserId();
  console.log(uid);
  const q = query(collection(db, "ordersList"), where("user", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    setCart(doc.data());
    console.log(cart);
  });
  // setCart(q);
  // console.log(cart);

  return (
    <div className="container" style={{width: "50%", height: "auto"}}>
      <h1>Cart</h1>
      {cart.map((item) => (
        <ul
          key={item.id}
          style={{border: "2px solid black"}}
        >
          <li>Title: {item.title}</li>
          <li>Price: {item.price}</li>
          <li>Count: {item.count}</li>
          <img
            style={{width: "auto", height: "200px", borderRadius: "30px"}}
            src={item.image}
            alt=""
          />
        </ul>
      ))
      }
    </div>
  );
};


export default Cart;