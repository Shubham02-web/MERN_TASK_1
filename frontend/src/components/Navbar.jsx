import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin">Admin Page</Link>
        </li>
        <li>
          <Link to="/profile">Proofile</Link>
        </li>
        <li>
          <Link to="/update">update User</Link>
        </li>
        <li>
          <Link to="/login"> Login</Link>
        </li>
        <li>
          <Link to="/register"> registration</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
