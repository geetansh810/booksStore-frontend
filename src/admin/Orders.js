import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "../core/helper/OrderHelper";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data.reverse());
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Orders Page">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-3">
            Total Orders : {orders.length}
          </h2>
          <div className="row text-center mb-2 d-flex justify-content-start align-items-center">
            <div className="col mx-auto d-flex-column align-items-center justify-content-between text-center">
              <div className="d-flex justify-content-around align-items-center my-2 py-3 rounded">
                <h3>Sno.</h3>
                <h3>User</h3>
                <h3>Amount</h3>
                <h3>Status</h3>
                <h3>{}</h3>
                <h3>Date</h3>
                <h3>{}</h3>
                <h3>Products</h3>
                <h3>{}</h3>
                <h3>{}</h3>
                <h3>{}</h3>
              </div>
              {orders.map((order, index) => {
                const date = new Date(order.createdAt);
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-around align-items-center bg-secondary my-2 py-3 rounded"
                  >
                    <h3 className="text-white">{index + 1}.</h3>
                    <h3 className="text-white">{order.user.name}</h3>
                    <h3 className="text-white">₹{order.amount}</h3>
                    <h5 className="badge bg-success">{order.status}</h5>
                    <h5 className="badge">{date.toUTCString()}</h5>
                    <h6 className="">
                      <ul>
                        {order.products.map((product, j) => {
                          return <li key={j}>{product.name}</li>;
                        })}
                      </ul>
                    </h6>
                    <NavLink
                      className="btn btn-success"
                      to={`/admin/update/order/${order._id}`}
                    >
                      <span className="">Update</span>
                    </NavLink>
                    {/* <div className="d-md-flex justify-content-around align-items-center bg-white text-dark rounded w-50 mx-auto">
                      <p className="text-left">
                        <span className="badge bg-danger">MRP</span> {product.mrp}
                      </p>
                      <p className="text-left">
                        <span className="badge bg-success">Selling Price</span> {product.sellingPrice}
                      </p>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Orders;
