import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Home } from 'lucide-react';
const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logoutAdmin } = useAuthStore();
  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  ];
  return (
    <div className="flex min-h-screen bg-[#f5f5f5] w-full">
      <aside className="w-64 bg-white dark:bg-black text-black dark:text-white p-6 flex flex-col fixed h-full">
        <div className="mb-10 px-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <Home size={20} />
            <span className="text-xl font-bold tracking-tight">NIKE ADMIN</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Store Management</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-800">
          <div className="px-4 mb-4">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-medium truncate">{admin?.username || 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
