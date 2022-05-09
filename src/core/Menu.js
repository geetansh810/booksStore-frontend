import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top nav-color">
      <div className="container-fluid d-flex flex-md-row flex-column">
        <NavLink to="/" className="navbar-brand fw-bolder text-light">
          BookCart &#128722;
        </NavLink>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row text-center text-white ms-auto gap-md-4 gap-3 justify-content-end align-items-center">
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
                to="/"
                className="nav-link"
              >
                Home
              </NavLink>
              {/* <Link className="nav-link" to="/">
            Home
          </Link> */}
            </li>
            |
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
                to="/user/cart"
                className="nav-link"
              >
                Cart
              </NavLink>
            </li>
            |
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                  }}
                  to="/user/dashboard"
                  className="nav-link"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
                |
            {isAuthenticated() && isAuthenticated().user.role !== 0 && (
              <li className="nav-item d-flex align-items-center gap-2">
                |
                <NavLink
                  style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                  }}
                  to="/admin/dashboard"
                  className="nav-link"
                >
                  Admin Dashboard
                </NavLink>
                |
              </li>
            )}
            {!isAuthenticated() && (
              <Fragment>
                  |
                <li className="nav-item d-flex align-items-center">
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                      };
                    }}
                    to="/signup"
                    className="nav-link"
                  >
                    SignUp
                  </NavLink>
                </li>
                |
                <li className="nav-item d-flex align-items-center">
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                      };
                    }}
                    to="/signin"
                    className="nav-link"
                  >
                    SignIn
                  </NavLink>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <li className="nav-item  d-flex align-items-center">
                <span
                  className="nav-link text-warning"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    signout(() => {
                      navigate("/signin");
                    });
                  }}
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
