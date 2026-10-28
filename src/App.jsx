import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";

const fakeUser = {
  name: "Admin",
  email: "admin@koda.com",
  role: "admin",
};

function Page({ title }) {
  return (
    <div className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] backdrop-blur-[var(--backdrop-blur)]">
      <h1 className="text-[var(--font-size-2xl)] font-[var(--font-weight-bold)] text-[var(--text-primary)]">
        {title}
      </h1>
      <p className="mt-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--text-secondary)]">
        Manage your {title.toLowerCase()} from here.
      </p>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/login"
        element={<Login onSubmit={() => navigate("/dashboard")} />}
      />

      <Route
        element={
          <AdminLayout user={fakeUser} onLogout={() => navigate("/login")} />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<Page title="Users" />} />
        <Route path="/dashboard/products" element={<Page title="Products" />} />
        <Route path="/dashboard/products/new" element={<Page title="Add Product" />} />
        <Route path="/dashboard/orders" element={<Page title="Orders" />} />
        <Route path="/dashboard/carts" element={<Page title="Carts" />} />
        <Route path="/dashboard/settings" element={<Page title="Settings" />} />
      </Route>
    </Routes>
  );
}
