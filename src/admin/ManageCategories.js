import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteACategory, getAllCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllCategories().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteCategory = (categoryId) => {
    console.log(categoryId);
    deleteACategory(user._id, token, categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
        console.log(data.message);
      }
    });
  };

  const manageCategories = () => {
    return (
      <div className="card bg-dark">
        {/* <div className="card-header bg-dark text-white"></div> */}
        <ul className="list-group bg-dark">
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                className="list-group-item text-success my-2 rounded"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{category.name}</span>
                  <div className="d-flex justify-content-between gap-3">
                  <NavLink
                    className="btn btn-outline-warning rounded-pill"
                    to={`/admin/update/category/${category._id}`}
                  >
                    <span className="">Update</span>
                  </NavLink>

                    <button
                      className="btn btn-outline-danger rounded-pill"
                      onClick={() => {
                        deleteCategory(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* <NavLink
                          to="/admin/create/category"
                          className="nav-link text-success"
                        >
                          Create Categories
                        </NavLink> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const goBack = () => {
    return (
      <NavLink
        to="/admin/dashboard"
        className="btn rounded-pill btn-outline-warning px-4"
      >
        Back to dashboard
      </NavLink>
    );
  };

  return (
    <Base title="Manage Categories">
      <div className="row">
        <div className="col-md-2 offset-1">{goBack()}</div>
      </div>

      <div className="row rounded">
        <div className="col-md-6 offset-md-2 m-auto">{manageCategories()}</div>
      </div>
    </Base>
  );
};

export default ManageCategories;
