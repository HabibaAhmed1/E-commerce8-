import FullPageLoader from "./components/FullPageLoader";
import "./api/axiosInterceptors";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Users from "./pages/User";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Carts from "./pages/Carts";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="carts" element={<Carts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}


export default App;
