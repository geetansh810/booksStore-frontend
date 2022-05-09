import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";

function Base({ title = "My title", className = "p-4", children }) {
  return (
    <div>
      <Menu />
      <div className="container-fluid px-0">
        {/* <div className="jumbotron text-center">
          <h3 className="text-success">{title}</h3>
        </div> */}
        <div className="banner mx-auto mt-3">
        {title}
          <div className="banner-left"></div>
          <div className="banner-right"></div>
        </div>

        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Base;
