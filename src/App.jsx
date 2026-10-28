import {Routes , Route , Navigate} from "react-router-dom";
import FullPageLoader from "./components/FullPageLoader";
import "./api/axiosInterceptors";
import AdminLayout from "./components/layout/AdminLayout";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/login';
import DashboardHome from './pages/dashboardHome';
import ProductsList from './pages/productsList';
import AddProduct from './pages/addProduct';
import EditProduct from './pages/editProduct';
import OrdersList from './pages/OrdersList';
import OrderDetails from './pages/OrderDetails';
import CartsView from './pages/CartsView';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}/>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<DashboardHome />}/>
            <Route path="products" element={<ProductsList />}/>
            <Route path="products/new" element={<AddProduct />}/>
            <Route path="products/:id/edit" element={<EditProduct />}/>
            <Route path="orders" element={<OrdersList />}/>
            <Route path="orders/:id" element={<OrderDetails />}/>
            <Route path="users" element={<Users />}/>
            <Route path="carts" element={<CartsView />}/>
            <Route path="settings" element={<Settings />} />
          {/* </Route> */}
        </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
          <Route path="fullPageLoader" element={<FullPageLoader />} />
      </Routes>
    </div>
  );
}


export default App;
