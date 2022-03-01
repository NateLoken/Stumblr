import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Map</Link>
        </li>
        <li>
          <Link to="/session">Session</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
