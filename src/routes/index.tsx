import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import {SalesDash, ZoneDash} from "../pages/dashboards/index"
import Cookies from 'js-cookie';
import Home from '../pages/wecome';
import Auth from '../pages/auth';
import "../styles/styles.css"
import MeterDetailPage from '../pages/meters/MeterDetails';
import SubscriberDetailPage from '../pages/subscribers/view';
import ManagerById from '../pages/sales/ManagerById'
import Manager from '../pages/sales/index'
import Meters from '../pages/meters';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = Cookies.get('auth');
  
  // <Navigate to={role === 'sales' ? '/manager/sales/dashboard' : '/manager/zone/dashboard'} replace />;
  return token ? children : <Navigate to="/auth" />;
};

  
export const AppRoutes: React.FC = () => {
  
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Zone Manager Routes */}
        <Route path="/manager/zone/dashboard" element={<ProtectedRoute><ZoneDash /></ProtectedRoute>}/>
        <Route path="/manager/zone/meters" element={<ProtectedRoute><Meters /></ProtectedRoute>} />
        <Route path="/manager/zone/meter/id" element={<ProtectedRoute><MeterDetailPage /></ProtectedRoute> } />
        <Route path="manager/zone/managers" element={<ProtectedRoute><Manager /></ProtectedRoute>} />
        <Route path='/manager/zone/manager/id' element={<ProtectedRoute><ManagerById /></ProtectedRoute> } />
        
        {/* Sales Manager Routes */}
        <Route path="/manager/sales/dashboard" element={<SalesDash />} />
        <Route path='/manager/zone/subscriber/id' element={<ProtectedRoute><SubscriberDetailPage /></ProtectedRoute> } />


      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

    </Routes>
  );
};