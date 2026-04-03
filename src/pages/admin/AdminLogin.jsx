import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../api/axios';
import { Lock, User, Terminal } from 'lucide-react';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loginAdmin } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admins');
      const admins = response.data;
      const admin = admins.find(a => a.username === username && a.password === password);
      if (admin) {
        loginAdmin(admin);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6 w-full">
      <div className="w-full max-w-md bg-white dark:bg-[#0b0b0b] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-white dark:bg-black text-black dark:text-white p-3 rounded-full mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">NIKE ADMIN</h1>
          <p className="text-gray-500 text-sm">Please sign in to your administrator account.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 font-medium">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
                placeholder="Enter your username"/>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
                placeholder="Enter your password"/>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white dark:bg-black text-black dark:text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg active:scale-[0.98]">
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Authorized Access Only</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-gray-400">
             <Terminal size={14} />
             <p className="text-[10px] font-mono">SYSTEM READY [VER: 1.0.4]</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
