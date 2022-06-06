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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
      nav("/login");
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
    totalPrice += item.price * item.count;
  });

  const handleRemoveFromCart = (item) => {
    removeFromCart(item, uid, cart);
    let updateCart = [...cart];
    updateCart = updateCart.filter((curr_item) => curr_item !== item);
    setCart(updateCart);
  };

  const handleBuy = (cart) => {
    orderConfirmed(cart, totalPrice, uid);
    nav("/order-confirmed");
  };

  return (
    <React.Fragment>
      <center style={{color: "gray", margin: "20px"}}>
        <h1>Cart - Happy Shopping</h1>
        <h1>Total Order Price:</h1>
        <h2>${totalPrice}</h2>
        <Button
          variant="contained"
          onClick={() => {
            handleBuy(cart);
          }}
        >
          Proceed to Buy
        </Button>
      </center>
      <div style={{display: "flex", flexWrap: "wrap", padding: "20px 15px"}}>
        {cart.map((item) => (
          <Box
            sx={{
              backgroundColor: "lightgray",
              flexGrow: 1,
            }}
            key={item.id}
            style={{
              border: "1px solid gray",
              width: "48%",
              margin: "10px",
              borderRadius: "30px",
              padding: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <center>
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <h2>{item.title}</h2>
                  <h4>Price: ${item.price}</h4>
                  <h4>Count: {item.count}</h4>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleRemoveFromCart(item);
                    }}
                  >
                    Remove from Cart
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <img
                    style={{
                      width: "250px",
                      height: "auto",
                      border: "1px solid gray",
                      borderRadius: "30px",
                    }}
                    src={item.image}
                    alt=""
                  />
                </Grid>
              </Grid>
            </center>
          </Box>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Cart;