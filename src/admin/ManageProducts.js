import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  getAllProducts,
  deleteProduct,
} from "./helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  // const [productsPhoto, setProductsPhoto] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        // const photos = data.map((product) => {
        //   return getProductPhoto(product._id).then((info) => {
        //     console.log(info.url);
        //     return info.url;
        //   });
        // });
        // console.log(photos);
        // setProductsPhoto(photos);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // const getPhoto = (productId) => {
  //   getProductPhoto(productId);
  // };

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-outline-warning" to={`/admin/dashboard`}>
        <span className="">Back to Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-3">
            Total products : {products.length}
          </h2>

          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="row text-center mb-2  d-flex justify-content-center align-items-center text-center bg-secondary py-3 rounded"
              >
                <div className="col-md-2">
                  <ImageHelper productId={product._id} />
                </div>
                <div className="col-md-6">
                  <h3 className="text-white text-left">{product.name}</h3>
                  <p className="text-white text-left">{product.subject}</p>
                  <div className="d-md-flex justify-content-around align-items-center bg-white text-dark rounded w-50 mx-auto">
                    <p className="text-left">
                      <span className="badge bg-danger">MRP</span> {product.mrp}
                    </p>
                    <p className="text-left">
                      <span className="badge bg-success">Selling Price</span> {product.sellingPrice}
                    </p>
                  </div>
                </div>

                <div className="col-md-1">
                  <h5 className="text-white bg-dark rounded-pill text-left p-2">
                    Stock: {product.stock}
                  </h5>
                  <p className="text-white text-left">Sold: {product.sold}</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-1">
                  <NavLink
                    className="btn btn-success"
                    to={`/admin/update/product/${product._id}`}
                  >
                    <span className="">Update</span>
                  </NavLink>
                </div>
                <div className="col-md-1">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
