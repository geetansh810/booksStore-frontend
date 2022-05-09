import React from "react";
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Cart from "./user/Cart";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import Orders from "./admin/Orders";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateOrder from "./admin/UpdateOrder";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />

        <Route
          path="/user/dashboard"
          element={
            <PrivateRoutes>
              <UserDashBoard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/user/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <AdminDashBoard />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/create/category"
          element={
            <AdminRoutes>
              <AddCategory />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminRoutes>
              <ManageCategories />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/create/product"
          element={
            <AdminRoutes>
              <AddProduct />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoutes>
              <ManageProducts />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoutes>
              <Orders />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/update/product/:productId"
          element={
            <AdminRoutes>
              <UpdateProduct />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/update/order/:orderId"
          element={
            <AdminRoutes>
              <UpdateOrder />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/update/category/:categoryId"
          element={
            <AdminRoutes>
              <UpdateCategory />
            </AdminRoutes>
          }
        />

        <Route
          path="*"
          element={
            <div className="text-center">
              <h1 className="text-muted">Page not found</h1>
            </div>
          }
        />
      </Switch>
    </Router>
  );
}
