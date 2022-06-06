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
  return (
    <div style={{padding: "20px"}}>
      <div style={{color: "dodgerblue"}}>
        <h1>Logged in as</h1>
        <h1>Name: {name}</h1>
        <h1>Email: {user?.email}</h1>
        <h1>Balance: ${money}</h1>
        <Button variant="contained" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Dashboard;
