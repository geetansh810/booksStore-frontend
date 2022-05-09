import React from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeft = () => {
    return (
      <div className="card">
        <div className="card-header bg-dark text-white">Admin Navigation</div>
        <ul className="list-group">
          <li className="list-group-item">
            <NavLink
              to="/admin/create/category"
              className="nav-link text-success"
            >
              Create Categories
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/admin/categories"
              className="nav-link text-success"
            >
              Manage Categories
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/admin/create/product"
              className="nav-link text-success"
            >
              Create Product
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/admin/products" className="nav-link text-success">
              Manage Products
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  const adminRight = () => {
    return (
      <div className="card mb-4">
        <h3 className="card-header text-dark">Admin Info</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <h4 className="badge bg-success mr-2">Name :</h4> {name}
          </li>
          <li className="list-group-item">
            <h4 className="badge bg-success mr-2">Email :</h4> {email}
          </li>
          <li className="list-group-item">
            <h4 className="badge bg-success mr-2">Role :</h4>{" "}
            {role === 1 ? "ADMIN" : "USER"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Pannel"
      description="Manage all your products"
      className="container my-5"
    >
      <div className="row bg-secondary py-5">
        <div className="col-md-3">{adminLeft()}</div>
        <div className="col-md-9">{adminRight()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
