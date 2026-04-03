import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import LoadingBar from './components/LoadingBar';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import ProductAdmin from './pages/admin/ProductAdmin';
import OrderAdmin from './pages/admin/OrderAdmin';
import Cart from './pages/Cart';
import { AnimatePresence } from 'framer-motion';
const ProtectedRoute = ({ children }) => {
 const { isAuthenticated } = useAuthStore();
 return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};
function App() {
 const location = useLocation();
 return (
 <div className={`font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif] min-h-screen flex flex-col items-center bg-white transition-colors duration-500`}>
 <LoadingBar />
 <div className="figma-container w-full">
 <AnimatePresence mode="wait">
 <Routes location={location} key={location.pathname}>
 <Route element={<PublicLayout />}>
 <Route path="/" element={<HomePage />} />
 <Route path="/product/:id" element={<ProductDetail />} />
 <Route path="/cart" element={<Cart />} />
 </Route>
 <Route path="/admin/login" element={<AdminLogin />} />
 <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
 <Route index element={<Navigate to="/admin/dashboard" replace />} />
 <Route path="dashboard" element={<AdminDashboard />} />
 <Route path="products" element={<ProductAdmin />} />
 <Route path="orders" element={<OrderAdmin />} />
 </Route>
 </Routes>
 </AnimatePresence>
 </div>
 </div>
 );
}
export default App
