import {Routes , Route , Navigate} from "react-router-dom";

import ProtectedRoute from './components/protectedRoute';
import DashboardLayout from './layouts/dashboardLayout';
import Login from './pages/login';
import DashboardHome from './pages/dashboardHome';
import ProductsList from './pages/productsList';
import AddProduct from './pages/addProduct';
import EditProduct from './pages/editProduct';
import OrdersList from './pages/OrdersList';
import OrderDetails from './pages/OrderDetails';
import UsersList from './pages/UsersList';
import CartsView from './pages/CartsView';
import NotFound from './pages/NotFound';
function App() {
  return (
    <div>
      <Routes>
        
        {/* public route */}
        <Route path="/login" element={<Login />}/>

        {/* protected dashboard routes (admin only) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />}/>
            <Route path="products" element={<ProductsList />}/>
            <Route path="products/new" element={<AddProduct />}/>
            <Route path="products/:id/edit" element={<EditProduct />}/>
            <Route path="orders" element={<OrdersList />}/>
            <Route path="orders/:id" element={<OrderDetails />}/>
            <Route path="users" element={<UsersList />}/>
            <Route path="carts" element={<CartsView />}/>
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;