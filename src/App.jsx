import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";


const fakeUser = {
  name: "Admin",
  email: "admin@koda.com",
  role: "admin",
};

function Page({ title }) {
  return <h1 className="text-2xl font-bold">{title}</h1>;
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={<Login onSubmit={() => navigate("/dashboard")} />}
      />

      <Route
        element={
          <AdminLayout user={fakeUser} onLogout={() => navigate("/login")} />
        }
      >
        <Route path="/dashboard" element={<Page title="Dashboard" />} />
        <Route path="/dashboard/products" element={<Page title="Products" />} />
        <Route path="/dashboard/products/new" element={<Page title="Add Product" />} />
        <Route path="/dashboard/orders" element={<Page title="Orders" />} />
        <Route path="/dashboard/users" element={<Page title="Users" />} />
        <Route path="/dashboard/carts" element={<Page title="Carts" />} />
      </Route>
    </Routes>
  );
}
