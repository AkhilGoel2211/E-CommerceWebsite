import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(loading) {
      // maybe trigger a loading screen
      return;
    }
    if(user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <center
      style={{
        padding: "20px",
        margin: "30px 200px",
        border: "1px solid gray",
      }}
    >
      <h1>Login</h1>
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
        variant="contained"
        style={{margin: "10px"}}
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Login
      </Button>
      <br />
      <Button
        style={{margin: "10px"}}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Login with Google
      </Button>
      <div style={{margin: "10px"}}>
        <Link to="/reset">Forgot Password</Link>
      </div>
    </center>
  );
}
export default LoginForm;
