import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db, logout} from "../firebase";
import {query, collection, getDocs, where} from "firebase/firestore";
import {Button} from "@mui/material";

function Dashboard() {
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
    } catch(err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div style={{padding: "20px"}}>
      <Button
        variant="contained"
        onClick={() => {
          goHome();
        }}
      >
        Go Home
      </Button>
      <div style={{color: "dodgerblue"}}>
        <br />
        <br />
        <h1>Logged in as</h1>
        <h2>Name: {name}</h2>
        <h2>Email: {user?.email}</h2>
        <h2>Balance: ${money}</h2>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
        <br />
      </div>
    </div>
  );
}

export default Dashboard;
