import React, {Component} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

class Contact extends Component {
  render() {
    return (
      <div style={{padding: "20px"}}>
        <center>
          <h1>Contact</h1>
        </center>
        <br />
        <h3>You can Reach us directly at customercare@shopstop.com</h3>
        <center>
          <h2>or</h2>
        </center>
        <h3>
          Enter your Questions here and we will connect you with our customer
          support
        </h3>
        <br />
        <div style={{display: "flex"}}>
          <div style={{marginRight: "30px"}}>
            <h4>Name</h4>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              type="text"
            />
          </div>
          <div>
            <h4>Email</h4>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            />
          </div>
        </div>
        <br />
        <h4>Description</h4>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          height="200px"
          fullWidth="true"
          type="text"
        />
        <br />
        <br />
        <Button variant="contained">Submit</Button>
      </div>
    );
  }
}

export default Contact;
