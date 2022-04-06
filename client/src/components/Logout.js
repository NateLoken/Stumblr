import { GoogleLogout } from 'react-google-login';

function logout() {
    window.sessionStorage.removeItem("access_token");
     window.sessionStorage.removeItem("nama");
     this.setState(state => ({
         isLogined: false,
         token: ''
     }),
     );
 }

<GoogleLogout
clientId="121811007491-rvsk1pg56rngirigasq10chsup8ek1sn.apps.googleusercontent.com"
buttonText="Logout"
onLogoutSuccess={logout}
>
</GoogleLogout>

export default GoogleLogout;