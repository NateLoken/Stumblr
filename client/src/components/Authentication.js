import React, { Component } from "react";
import Button from '@mui/material/Button';
import "../App.css";

class Auth extends Component {
  render() {
    return (
      <form action="http://localhost:5000/auth/google">
        {/* <button type="submit" className="google-button"> </button> */}
          <Button variant="contained" size="large" href="http://localhost:5000/auth/google"> 🍺Login with Bitch ASS Google🍺</Button>
        </form>
    );

  }
}
export default Auth;
