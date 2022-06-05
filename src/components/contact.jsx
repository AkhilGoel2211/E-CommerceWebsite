import React, {Component} from "react";

class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <center>
          <h1>Contact</h1>
        </center>
        <br />
        <h3>You can Reach us directly at customercare@shopstop.com</h3>
        <center>
          <br />
          <h2>or</h2>
          <br />
        </center>
        <h3>
          Enter your Questions here and we will connect you with our customer
          support
        </h3>
        <h4>Name</h4>
        <input type="text" />
        <h4>Email</h4>
        <input type="email" />
        <h4>Description</h4>
        <textarea
          type="text"
          placeholder="Enter your Grieviences"
          style={{width: "100%", height: "200px"}}
        />
        <button>Submit</button>
      </React.Fragment>
    );
  }
}

export default Contact;
