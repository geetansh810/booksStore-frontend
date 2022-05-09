import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  console.log(products);

  return (
    <Base title="Home Page">
      <div className="row">
        <div className="col">
          <h5 className="text-center">~ An online book store to sell old books with Razorpay Payment Integration~</h5>
        </div>
      </div>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div className="col-md-3" key={index}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
