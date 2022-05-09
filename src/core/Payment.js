import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { processPayment } from "./helper/PaymentHelper";
import JSAlert from "js-alert";
import { createOrder } from "./helper/OrderHelper";
import { nanoid } from "nanoid";
import { emptyCart } from "./helper/CartHelper";
import { Navigate, useNavigate } from "react-router-dom";

const { user, token } = isAuthenticated();

const PaymentCard = ({ products }) => {
  // console.log(products);
  const navigate = useNavigate();

  var totalAmountToBePaid = 0;
  var totalAmountToPay = 0;
  const payProducts = products.map((product) => {
    totalAmountToBePaid += product.mrp;
    totalAmountToPay += product.sellingPrice;
    return {
      price: product.sellingPrice,
      mrp: product.mrp,
      name: product.name,
    };
  });

  var discount = (
    ((totalAmountToBePaid - totalAmountToPay) / totalAmountToBePaid) *
    100
  ).toFixed(2);

  // console.log(payProducts);
  // console.log(totalAmountToBePaid);
  // console.log(totalAmountToPay);
  // console.log(discount + " %");

  //load razorpay
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    console.log("RazorPay initiated");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    console.log(res);

    if (!res) {
      return alert("Razorpay Failed");
    }

    const orderInfo = {
      amount: totalAmountToPay,
      currency: "INR",
      receipt: nanoid(),
    };

    const data = await processPayment(user._id, token, orderInfo).then(
      function (result) {
        return result;
      }
    );

    console.log(data);

    const options = {
      key: "rzp_test_cwXPXZ9fjhUb0Z",
      amount: data.amount,
      currency: data.currency,
      name: "Online Book Store",
      description: "Wallet Transaction",
      // image: "http://localhost:3000/logo192.png",
      order_id: data.id,
      // callback_url: "http://localhost:3000/",
      handler: async function (response) {
        console.log(response);

        const createOrderInfo = {
          amount: orderInfo.amount,
          currency: orderInfo.currency,
          receipt: orderInfo.receipt,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          products: products,
        };

        await createOrder(user._id, token, createOrderInfo).then(
          (orderStatus) => {
            console.log(orderStatus);
            emptyCart(() => {
              JSAlert.alert("Payment Successfull").dismissIn(1000 * 5);
              navigate("/");
            });
          }
        );

        // JSAlert.alert("Payment Successfull").dismissIn(1000 * 2);

        // alert("PAYMENT ID ::" + response.razorpay_payment_id);
        // alert("ORDER ID :: " + response.razorpay_order_id);
        // alert("ORDER ID :: " + response.razorpay_signature);
      },
      prefill: {
        name: "Geetansh Agrawal",
        email: "geet@test.com",
        contact: "9874563210",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // useEffect(() => {
  //   loadScript("https://checkout.razorpay.com/v1/checkout.js");
  // });

  return (
    <article className="card text-dark shadow">
      {/* <img src={courseThumbnail} alt={courseName} style={{ width: "200px" }} /> */}
      <div className="card-content">
        <ul className="my-3">
          {payProducts.map((product, index) => {
            return (
              <li key={index} className="d-md-flex mx-md-3">
                <p>
                  {index + 1}. {product.name}
                </p>
                <div className="d-flex ms-auto gap-md-4 gap-2 align-items-center me-md-4 justify-content-center">
                  <p className="fw-bold">₹ {product.price}</p>
                  <p className="text-decoration-line-through">
                  ₹{product.mrp}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <header className="card-header d-md-flex justify-content-center align-items-center gap-3 shadow w-75 mx-auto">
          <p className="fw-bold">Total Amount : ₹{totalAmountToPay}</p>
          <h6 className="text-decoration-line-through">
          ₹{totalAmountToBePaid}
          </h6>
          <h6 className="text-success fw-bold">{discount} % OFF</h6>
        </header>
        <button
          type="button"
          className="btn btn-success my-3"
          onClick={displayRazorpay}
        >
          PAY NOW
        </button>
      </div>
    </article>
  );
};

export default PaymentCard;
