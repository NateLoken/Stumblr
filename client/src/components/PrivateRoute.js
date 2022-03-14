import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    const authorized = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return authorized ? <Outlet /> : <Navigate to="/login" />;
}

// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             auth.isAuthenticated === true ? (
//                 <Component {...props} />
//             ) : (
//                 <Navigate to="/login" />
//             )
//         }
//     />
// );
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);