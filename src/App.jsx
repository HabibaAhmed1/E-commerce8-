import { Routes, Route, Navigate } from "react-router-dom";
import FullPageLoader from "./components/FullPageLoader";
import "./api/axiosInterceptors";
import AdminLayout from "./components/layout/AdminLayout";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/login';
import Register from './pages/register';
import Logout from './pages/logout';
import DashboardHome from './pages/dashboardHome';
import ProductsList from './pages/productsList';
import AddProduct from './pages/addProduct';
import EditProduct from './pages/editProduct';
import OrdersList from './pages/OrdersList';
import OrderDetails from './pages/OrderDetails';
import CartsView from './pages/CartsView';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="users" element={<Users />} />
            <Route path="carts" element={<CartsView />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="fullPageLoader" element={<FullPageLoader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;