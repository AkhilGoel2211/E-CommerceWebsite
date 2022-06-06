import React, {Component, useState, useEffect} from "react";
import {
  db,
  auth,
  logout,
  getInventory,
  addToCart,
  favouriteItem,
} from "../firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
    } else {
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
    } else {
      nav("/login");
    }
  };

  const handleAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if(reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleItemDisplay = (id) => {
    nav(`/home/${id}`, {state: {item: getItem(id)}});
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <React.Fragment>
      <center>
        <h1 style={{color: "dodgerblue"}}>Inventory - Happy Shopping</h1>
      </center>
      <div style={{display: "flex", flexWrap: "wrap", width: "100%", padding: "20px 15px"}}>
        {inventory.map((item) => (
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
          // onClick={() => {
          //   getItem(item.id);
          //   handleItemDisplay(item.id);
          // }
          // }
          >
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <h2>{item.title}</h2>
                <p>Category: {item.category}</p>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Rating: {item.rating}</p>
                <p>Count: {item.count}</p>
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
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              marginBottom={"10px"}
            >
              <Button
                label={'margin="normal"'}
                variant="contained"
                onClick={() => {
                  handleAddToCart(item);
                  handleAlert();
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleFavourite(item);
                  handleAlert();
                }}
              >
                Like
              </Button>
            </Stack>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{width: "100%"}}
              >
                Success!
              </Alert>
            </Snackbar>
          </Box>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
