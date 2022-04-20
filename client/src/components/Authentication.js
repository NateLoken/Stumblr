import React, { Component } from "react";
import Button from '@mui/material/Button';
import "../App.css";
import GoogleIcon from '@mui/icons-material/Google';

class Auth extends Component {
  render() {
    return (
      <form action="http://localhost:5000/auth/google">
        {/* <button type="submit" className="google-button"> </button> */}
          <Button variant="outlined" endIcon={<GoogleIcon />} href="http://localhost:5000/auth/google">Login with Google</Button>
        </form>
    );
  }
}
export default Auth;
