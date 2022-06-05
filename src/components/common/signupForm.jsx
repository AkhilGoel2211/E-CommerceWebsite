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

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [money, setMoney] = useState(0);
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
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button className="register__btn" onClick={register}>
          Register
        </Button>
        <Button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </Button>
      </div>
      <div>Enter the amount of money you want to start with:</div>
      <input
        type="number"
        className="money__textBox"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
        placeholder="Money"
      />
    </div>
  );
}
export default SignupForm;
