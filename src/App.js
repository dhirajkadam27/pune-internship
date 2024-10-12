import React from 'react';
import Login from './login';
import AdminLogin from './admin/login';
import AdminSites from './admin/sites';
import AdminSite from './admin/site';
import Sites from './sites';
import Site from './site';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AdminUser from './admin/user';
import AdminUsers from './admin/users';
import Adminsplash from './admin/splash';
import Splash from './splash';
import DailyReport from './dailyReport';
import VisitReport from './admin/visitreport';
import VisitForm from './admin/visitform';
import Visits from './admin/Visits';
import Mainsplash from './main/splash';
import MainLogin from './main/login';
import MainSites from './main/sites';
import MainUsers from './main/users';
import MainAdmins from './main/admins';
import MainAdmin from './main/admin';

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Splash />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sites",
      element: <Sites />,
    },
    {
      path: "/site",
      element: <Site />,
    },
    {
      path: "/dailyreport",
      element: <DailyReport />,
    },
    {
      path: "/admin",
      element: <Adminsplash />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/sites",
      element: <AdminSites />,
    },
    {
      path: "/admin/site",
      element: <AdminSite />,
    },
    {
      path: "/admin/user",
      element: <AdminUser />,
    },
    {
      path: "/admin/users",
      element: <AdminUsers />,
    },
    {
      path: "/admin/visit",
      element: <VisitReport />,
    },
    {
      path: "/admin/form",
      element: <VisitForm />,
    },
    {
      path: "/admin/visits",
      element: <Visits />,
    },
    {
      path: "/main",
      element: <Mainsplash />,
    },
    {
      path: "/main/login",
      element: <MainLogin />,
    },
    {
      path: "/main/sites",
      element: <MainSites />,
    },
    {
      path: "/main/users",
      element: <MainUsers />,
    },
    {
      path: "/main/admins",
      element: <MainAdmins />,
    },
    {
      path: "/main/admin",
      element: <MainAdmin />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
