import React, {Component, useState, useEffect} from "react";
import {db, auth, logout, getInventory, addToCart, favouriteItem} from "../firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
  const [open, setOpen] = React.useState(false);
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

  const handleFavourite = (item) => {
    let uid = null;
    const auth = getAuth();
    const user = auth.currentUser;
    if(user) {
      uid = user.uid;
      favouriteItem(item, uid);
    }
    else {
      nav("/login");
    }
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

  const handleAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleItemDisplay = (id) => {
    nav(`/home/${id}`, {state: {item: (getItem(id))}});
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
            style={{width: "auto", height: "200px", border: "1px solid black", borderRadius: "30px"}}
            src={item.image}
            alt=""
          />
          <li>Description: {item.description}</li>
          <li>Price: ${item.price}</li>
          <li>Rating: {item.rating}</li>
          <li>Count: {item.count}</li>
          <Button onClick={() => {handleAddToCart(item); handleAlert();}}>Add to Cart</Button>
          <Button onClick={() => {handleFavourite(item); handleAlert();}}>Like</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
              Success!
            </Alert>
          </Snackbar>
        </ul>
      ))
      }
    </div >
  );
}

export default Home;