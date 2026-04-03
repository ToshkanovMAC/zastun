import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  isAuthenticated: !!localStorage.getItem('admin'),
  loginAdmin: (adminData) => {
    localStorage.setItem('admin', JSON.stringify(adminData));
    set({ admin: adminData, isAuthenticated: true });
  },
  logoutAdmin: () => {
    localStorage.removeItem('admin');
    set({ admin: null, isAuthenticated: false });
  },
}));
