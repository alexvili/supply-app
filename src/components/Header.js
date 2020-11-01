import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="container flex">
        <h1 className="logo">Water Supply</h1>
        <div className="dropdown">
          <button className="dropbtn">
            <i className="fas fa-user"></i>
            <span>admin</span>
            <i className="fa fa-angle-down"></i>
          </button>
          <div className="dropdown-content">
            <a>Settings</a>
            <a>Sign out</a>
          </div>
        </div>
      </div>
    </header>
  );
}
