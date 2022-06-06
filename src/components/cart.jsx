import React, {Component, useState, useEffect} from "react";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {db, getCartList, removeFromCart, orderConfirmed} from "../firebase";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [uid, setUid] = useState();
  const nav = useNavigate();
  const fetchCarts = async () => {
    try {
      const promise = getCartList(db);
      const response = await promise;
      setCart(response);
    } catch(err) {
      console.error(err);
      alert("An error occured while fetching inventory data");
    }
  };

  const getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if(user) {
      let uid = user.uid;
      setUid(uid);
    }
  };

  // const q = query(collection(db, "cartList"), where("user", "==", uid));
  // const querySnapshot = getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  //   const DataFromDB = doc.data();
  //   console.log(DataFromDB);
  //   setCart(prevState => ({
  //     item: [...prevState, ...DataFromDB],
  //   }));
  // });

  useEffect(() => {
    getUserId();
    fetchCarts();
  }, []);
  // const userCart = cart.filter((item) => item.id === uid);
  // setCart(userCart);

  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += (item.price) * (item.count);
  });

  const handleRemoveFromCart = (item) => {
    removeFromCart(item, uid, cart);
  };

  const handleBuy = (cart) => {
    orderConfirmed(cart, totalPrice, uid);
    nav("/order-confirmed");
  };

  return (
    <div className="container" style={{width: "50%", height: "auto"}}>
      <h1>Cart</h1>
      <center>
        <h1>Total Order Price:</h1>
        <h2>${totalPrice}</h2>
        <Button onClick={() => {handleBuy(cart);}}>Proceed to Buy</Button>
      </center>
      {cart.map((item) => (
        <ul key={item.id} style={{border: "2px solid black"}}>
          <li>Title: {item.title}</li>
          <img
            style={{
              width: "auto",
              height: "200px",
              border: "1px solid grey",
              borderRadius: "30px",
            }}
            src={item.image}
            alt=""
          />
          <li>Price: ${item.price}</li>
          <li>Count: {item.count}</li>
          <Button onClick={() => {handleRemoveFromCart(item);}}>Remove from Cart</Button>
        </ul>
      ))}
    </div>
  );
}

export default Cart;