import React from "react";
import Logo from "test.jpeg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="rightSide"></div>
    </div>
  );
}

export default Navbar;