import React from "react";
import logo from "./logo.png";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} width="100px" alt="logo" />
      <h1>Assignment</h1>
    </div>
  );
};

export default Header;
