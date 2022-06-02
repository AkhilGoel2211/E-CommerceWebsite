import React, {Component} from "react";
import LoginForm from "./common/loginForm";
import SignupForm from "./common/signupForm";

class Register extends Component {
  render() {
    return (
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
        <LoginForm />
        <SignupForm />
      </div >
    );
  }
}

export default Register;
