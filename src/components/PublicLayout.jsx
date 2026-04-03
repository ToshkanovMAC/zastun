import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white transition-colors duration-500">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default PublicLayout;
