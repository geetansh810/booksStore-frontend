import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "Book Name";

  const addNewItemToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/user/cart" />;
    }
  };

  const findBestValue = (mrp, sellingPrice) => {
    const discount = ((mrp - sellingPrice) / mrp) * 100;
    if (discount > 50) {
      return true;
    } else {
      return false;
    }
  };

  return (
    // <div className="card border m-2 shadow">
    //   {/* <div className="card-header lead text-center">{product.subject}</div> */}
    //   <div className="card-body text-center">
    //     <ImageHelper productId={product._id} />

    //     <p className="lead bg-success font-weight-normal text-center">
    //       {product.name}
    //     </p>

    //     <div className="d-flex justify-content-center align-items-center gap-2">
    //       <p className="badge bg-info text-dark">{product.author}</p>
    //       <p className="badge bg-secondary text-dark">{product.subject}</p>
    //       {findBestValue(product.mrp, product.sellingPrice) && (
    //         <p className="badge bg-warning text-dark">Best Value</p>
    //       )}
    //       {/* <p>{product.description}</p> */}
    //     </div>

    //     <div className="d-flex justify-content-center align-items-center">
    //       <p className="rounded px-4 fs-2 fw-normal">₹{product.sellingPrice}</p>
    //       <p className="text-decoration-line-through"> ₹{product.mrp}</p>
    //     </div>

    //     <div className="row text-center">
    //       {addToCart && (
    //         <div className="col-12">
    //           <button
    //             onClick={addNewItemToCart}
    //             className="btn btn-block btn-outline-success mt-2 mb-2"
    //           >
    //             Add to Cart
    //           </button>
    //         </div>
    //       )}

    //       {
    //         //to redirect thr user to cart page on add to cart button click
    //         getRedirect(redirect)
    //       }

    //       {removeFromCart && (
    //         <div className="col-12">
    //           <button
    //             onClick={() => {
    //               removeItemFromCart(product._id);
    //               setReload(!reload);
    //             }}
    //             className="btn btn-block btn-outline-danger mt-2 mb-2"
    //           >
    //             Remove from cart
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="product-card shadow rounded">
      {addToCart && findBestValue(product.mrp, product.sellingPrice) && (
        <div className="value-badge">BestValue</div>
      )}
      {addToCart && (
        <div className="product-tumb">
          <ImageHelper productId={product._id} />
        </div>
      )}
      <div className="product-details">
        <span className="product-catagory">{product.category.name}</span>
        <h4>{product.name}</h4>
        <h5>
          <small className="">Subject</small> : {product.subject}
        </h5>
        <h5>
          <small>Author</small> : {product.author}
        </h5>
        {addToCart && <p>{product.description} </p>}
        <div className="product-bottom-details">
          <div className="product-price">
            <small>₹{product.mrp}</small>₹{product.sellingPrice}
            {/* <div>50%</div> */}
          </div>
          <div className="product-links">
            {addToCart && (
              <button
                onClick={addNewItemToCart}
                className="btn btn-block btn-outline-success rounded"
              >
                Add to Cart
              </button>
            )}

            {
              //to redirect thr user to cart page on add to cart button click
              getRedirect(redirect)
            }

            {removeFromCart && (
              <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger rounded"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
