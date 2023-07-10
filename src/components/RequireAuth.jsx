import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  //console.log("auth",auth)
  //console.log("aalo",allowedRoles)
  return (
   /* allowedRoles.includes(auth?.roles)
      ? <Outlet/>
      : auth.accessToken
      ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />*/
      allowedRoles?.includes(auth?.roles)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth