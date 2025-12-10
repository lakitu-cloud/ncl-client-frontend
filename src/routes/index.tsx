import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { SalesDash, ZoneDash } from "../pages/dashboards/index"
import Cookies from 'js-cookie';
import Home from '../pages/wecome';
// import Auth from '../pages/auth';
import "../styles/styles.css"
import MeterDetailPage from '../pages/meters/MeterDetails';
import SubscriberDetailPage from '../pages/subscribers/view';
import ManagerById from '../pages/manager/ManagerById'
import Manager from '../pages/manager/index'
import Meters from '../pages/meters';
import NotFound from '../pages/404';
import { SalesLogin } from '../pages/auth/salesLogin';
import ZoneLogin from '../pages/auth/login';
import AuthLayout from '../layout/AuthLayout';
import { Auth } from '../pages/auth';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = Cookies.get('auth');

  // <Navigate to={role === 'sales' ? '/manager/sales/dashboard' : '/manager/zone/dashboard'} replace />;
  return token ? children : <Navigate to="/auth" />;
};


export const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* ZONE MANAGER ROUTES */}
        <Route path="/manager/zone/dashboard" element={<ProtectedRoute><ZoneDash /></ProtectedRoute>} />
        <Route path="/manager/zone/meters" element={<ProtectedRoute><Meters /></ProtectedRoute>} />
        <Route path="/manager/zone/meter/id" element={<ProtectedRoute><MeterDetailPage /></ProtectedRoute>} />
        <Route path="manager/zone/managers" element={<ProtectedRoute><Manager /></ProtectedRoute>} />
        <Route path='/manager/zone/manager/id' element={<ProtectedRoute><ManagerById /></ProtectedRoute>} />

        {/* SALES MANAGER ROUTES */}
        <Route path="/manager/sales/dashboard" element={<ProtectedRoute><SalesDash /></ProtectedRoute>} />
        <Route path='/manager/sales/subscriber/id' element={<ProtectedRoute><SubscriberDetailPage /></ProtectedRoute>} />
      </Route>

      {/* AUTH ROUTES */}
      {/* <Route element={<AuthLayout />}>
        <Route path='manager/zone/login' element={<ProtectedRoute><ZoneLogin /></ProtectedRoute>} />
        <Route path="manager/sales/login" element={<ProtectedRoute><SalesLogin /></ProtectedRoute>} /> 
        <Route path="manager/zone/logout" element={<ProtectedRoute><ZoneLogin /></ProtectedRoute>} />
      </Route> */}
      <Route path="/" element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};