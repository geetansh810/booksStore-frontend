import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";
import JSAlert from "js-alert";

const UpdateCategory = () => {
  const { categoryId } = useParams();

  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getCategory(categoryId).then((name) => {
      console.log(name);
      setName(name.name);
    });
  };

  useEffect(() => {
    preLoad();
  }, {});

  const handleOnChange = (event) => {
    console.log(event.target.value);
    setErrorMsg(false);
    setName(event.target.value);
  };

  const updateACategory = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccess(false);
    console.log({ name });
    updateCategory(user._id, token, categoryId, { name }).then((data) => {
      if (data.error) {
        setErrorMsg(true);
      } else {
        setName("");
        setErrorMsg("");
        setSuccess(true);
        JSAlert.alert("Category updated").dismissIn(1000 * 1);
      }
    });
  };

  const goBack = () => {
    return (
      <NavLink
        to="/admin/dashboard"
        className="btn rounded-pill btn-outline-warning px-4"
      >
        Back
      </NavLink>
    );
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead">Enter the category</div>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Ex. CSE"
            value={name}
            onChange={handleOnChange}
          />
          <div className="d-flex justify-content-center">
            {goBack()}
            <button
              onClick={updateACategory}
              className="btn btn-outline-info mx-4"
            >
              Update Category
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base title="Create Category">
      <div className="row rounded">
        <div className="col-md-8 offset-md-2">{categoryForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
