import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import AdminRoute from './components/admin-route';

// containers
const Home = lazy(() => import('./containers'));

const Admin = lazy(() => import('./containers/admin'));
const DataSheetAdmin = lazy(() => import('./containers/admin/datasheet'));
const SubFactionAdmin = lazy(() => import('./containers/admin/sub-faction'));

const NotFound = lazy(() => import('./containers/not-found'));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/sub-faction/:id"
      element={
        <AdminRoute>
          <SubFactionAdmin />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/datasheet/:id"
      element={
        <AdminRoute>
          <DataSheetAdmin />
        </AdminRoute>
      }
    />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
