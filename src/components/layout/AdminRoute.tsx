// components/layout/AdminRoute.tsx
import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute: React.FC = () => {
  const session = Cookies.get('session');
  const user = session ? JSON.parse(session)?.user : null;
  const ADMIN_EMAIL = user?.email;
  console.log('ADMIN_EMAIL', ADMIN_EMAIL);

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
