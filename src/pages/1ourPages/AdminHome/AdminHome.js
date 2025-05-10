import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../../components/common/AdminNavbar/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;