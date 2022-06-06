import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import {addMoney} from "../../firebase";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [money, setMoney] = useState();
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
    if(!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, money);
  };
  useEffect(() => {
    if(loading) return;
    if(user) history("/dashboard");
  }, [user, loading]);
  return (
    <center
      style={{
        padding: "20px",
        margin: "30px 200px",
        border: "1px solid gray",
      }}
    >
      <h1>Sign Up</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          type="text"
          value={name}
          style={{margin: "10px"}}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="E-mail Address"
          variant="outlined"
          type="text"
          value={email}
          style={{margin: "10px"}}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          style={{margin: "10px"}}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          style={{margin: "10px"}}
          variant="contained"
          onClick={register}
        >
          Register
        </Button>
        <br />
        <Button
          style={{margin: "10px"}}
          variant="contained"
          onClick={() => signInWithGoogle(money)}
        >
          Register with Google
        </Button>
      </div>
      <br />
      <InputLabel>Enter the amount of money you want to start with:</InputLabel>
      <br />
      <TextField
        id="outlined-basic"
        label="Starting Balance"
        variant="outlined"
        type="text"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
        placeholder="Money"
      />
    </center>
  );
}
export default SignupForm;
