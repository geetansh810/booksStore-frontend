import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUserPurchases } from "./helper/userapicalls";

const UserDashBoard = () => {
  const [purchases, setPurchases] = useState([]);
  const { user, token } = isAuthenticated();
  console.log(user);

  const preLoad = () => {
    getUserPurchases(user._id, token).then((data) => {
      console.log(data);
      setPurchases(data.reverse());
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <Base title="User Dashboard Page">
      <div className="row">
        <div className="col">
          <div className="p-2">
            <p className="fw-bold">Name : {user.name}</p>
            <p className="fw-bold">Email : {user.email}</p>
            <p className="fw-bold">Role : {user.role === 1 ? "ADMIN" : "USER"}</p>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col">
          <div className="bg-secondary p-5 rounded">
            <h2>Orders : </h2>
            {purchases.length > 0 ? (
              purchases.map((order, index) => {
                const date = new Date(order.createdAt);
                return (
                  <div
                    key={index}
                    className="d-md-flex justify-content-around align-items-center bg-secondary my-2 py-3 rounded"
                  >
                    <p className="text-white">{index + 1}.</p>
                    <p className="text-white">{order.user.name}</p>
                    <p className="text-white">₹{order.amount}</p>
                    <h5 className="badge bg-success">{order.status}</h5>
                    <h5 className="badge">{date.toUTCString()}</h5>
                    <h6 className="">
                      <ul>
                        {order.products.map((product, j) => {
                          return <li key={j}>{product.name}</li>;
                        })}
                      </ul>
                    </h6>
                  </div>
                );
              })
            ) : (
              <h5>No orders</h5>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
