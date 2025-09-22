
import React from "react";
import "../App.css";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">📚 Library</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/members">Members</Link></li>
        <li><Link to="/loans">Loans</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
