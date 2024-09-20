import React, { FC } from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { getCookie } from '../../scripts/cookie/function';

export const ProtectedRoute: FC = () => {
  const data = useLoaderData();
  const token = getCookie('login');

  // Return a valid JSX element
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};


