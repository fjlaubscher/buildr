import React from 'react';
import type { RouteProps } from 'react-router-dom';

// containers
import SignIn from '../containers/admin/sign-in';

// helpers
import { USER_TOKEN } from '../helpers/storage';

const AdminRoute = ({ children }: RouteProps) => {
  const token = localStorage.getItem(USER_TOKEN);
  return token ? <>{children}</> : <SignIn />;
};

export default AdminRoute;
