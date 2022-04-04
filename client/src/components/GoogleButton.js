import React from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import { UserContext } from "../App";
const CLIENT_ID =
  "121811007491-rvsk1pg56rngirigasq10chsup8ek1sn.apps.googleusercontent.com";

const GoogleLoginComponent = (props)=> {
    const user = React.useContext(UserContext);
    //console.log("the value of user context object inside GButton is ", user);
    const responseGoogleSuccess = (response) => {
      console.log(response)
        user.setLoggedIn(true);
        user.setName(response.profileObj.name);
        user.setEmail(response.profileObj.email);
        user.setUserId(response.profileObj.googleId);
      };
    
      // Error Handler
      const responseGoogleError = (response) => {
        console.log(response);
      };
    
      // Logout Session and Update State
      const logout = (response) => {
        console.log(response);
        user.setLoggedIn(false);
        user.setUserId("");
        user.setName("");
        user.setEmail("");
      };

    return (
        <div className="row mt-5">
          <div className="col-md-12">
            {user.isLoggedIn ? (
              <div>
                <h1>Welcome to Stumblr</h1>
                  <h2>{user.userName}</h2> 
                  

                <GoogleLogout
                  clientId={CLIENT_ID}
                  buttonText={"Logout"}
                  onLogoutSuccess={logout}
                ></GoogleLogout>
              </div>
            ) : (
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleError}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </div>
        </div>
      );
}
export default GoogleLoginComponent;
