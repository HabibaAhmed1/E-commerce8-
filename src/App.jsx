
import { Routes, Route, Navigate } from "react-router-dom";
import "./api/axiosInterceptors";

import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/protectedRoute";

import Login from "./pages/login";
import Dashboard from "./pages/dashboardHome";
import ProductsList from "./pages/productsList";
import AddProduct from "./pages/addProduct";
import EditProduct from "./pages/editProduct";
import OrdersList from "./pages/OrdersList";
import OrderDetails from "./pages/OrderDetails";
import Users from "./pages/Users";
import CartsView from "./pages/CartsView";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Redirect the root path to the dashboard */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route
              path="products/:id/edit"
              element={<EditProduct />}
            />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="users" element={<Users />} />
            <Route path="carts" element={<CartsView />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );
}

export default App;
