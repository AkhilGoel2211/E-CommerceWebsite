import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {auth, sendPasswordReset} from "../../firebase";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(loading) return;
    if(user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <center
      style={{
        padding: "20px",
        margin: "30px 200px",
      }}
    >
      <h1>Reset</h1>
      <div>
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
        <Button variant="contained" onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </Button>
        <br />
        <br />
        <InputLabel>
          Don't have an account? <Link to="/login">Register</Link> now.
        </InputLabel>
      </div>
    </center>
  );
}
export default Reset;
