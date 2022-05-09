import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Card from "../core/Card";
import PaymentCard from "../core/Payment";
import { loadCart } from "../core/helper/CartHelper";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setCartItems(loadCart());
    loadPaymentCard();
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className="col-md-6 text-center">
        <h3 className="mb-0">✦ — Cart Items — ✦</h3>
        <div className=" d-md-flex justify-content-around flex-wrap">
          {cartItems.map((product, index) => {
            return (
              <div className="col-md-6 px-2" key={index}>
                <Card
                  product={product}
                  removeFromCart={true}
                  addToCart={false}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const loadPaymentCard = () => {
    return (
      <div className="col-md-6 text-center">
        <h3 className="mb-4">✦ — Payment — ✦</h3>
        <PaymentCard products={cartItems} />
      </div>
    );
  };

  return (
    <Base title="Cart Page">
      <div className="row">
        {cartItems.length > 0 ? (
          <>
            {loadAllProducts()} {loadPaymentCard()}
          </>
        ) : (
          <div className="col">
            <div className="w-100 d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
              <h1 className="text-center">No items in the cart</h1>
            </div>
          </div>
        )}
      </div>
    </Base>
  );
};

export default Cart;
