import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../../assets/images/fluffy.png";

export default function Authlayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid mx-5">
          <NavLink className="navbar-brand" to="/home">
            {/* Apply a height constraint to the image */}
            <img src={Logo} alt="" style={{ height: "100px" }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link position-relative d-flex"
                  to="/signin"
                >
                  SignIn
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link position-relative d-flex"
                  to="/signup"
                >
                  SignUp
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
