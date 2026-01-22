import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { SalesDash, ZoneDash } from "../pages/dashboards/index"
import Cookies from 'js-cookie';
import Home from '../pages/wecome';
// import Auth from '../pages/auth';
import "../styles/styles.css"
import SubscriberDetailPage from '../pages/subscribers/subscriberView';
import Manager from '../pages/manager/index'
import Meters from '../pages/meters';
import NotFound from '../pages/404';
import { Auth } from '../pages/auth';
import TopUp from '../pages/recharge/TopUp'
import { ManagerDetailPage } from '../pages/manager/ManagerById';
import Wakala from '../pages/wakala';
import Subscribers from '../pages/subscribers';
import SalesMeterDetails from '../pages/meters/SalesMeterDetails';
import ZoneMeterDetailPage from '../pages/meters/ZoneMeterDetails';
import Transaction from '../pages/transactions';
import IntegrationsPage from '../pages/intergration';
import { AnimatePresence } from 'framer-motion';
import { MotionWrapper } from '../components/motion/motionWrapper';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = Cookies.get('auth');
  const role = localStorage.getItem("prefferedAccountType") as 'zone' | 'sales' | null;

  // <Navigate to={role === 'sales' ? '/manager/sales/dashboard' : '/manager/zone/dashboard'} replace />;
  return token ? children : <Navigate to="/auth" />;
};


export const AppRoutes: React.FC = () => {
    const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>

          {/* ZONE MANAGER ROUTES */}
          <Route 
            path="/manager/zone/dashboard" 
            element={
              <MotionWrapper>
                <ProtectedRoute>
                    <ZoneDash />
                </ProtectedRoute>
              </MotionWrapper>
            } />
          <Route 
            path="/manager/zone/meters" 
            element={
              <MotionWrapper>
                <ProtectedRoute>
                  <Meters />
                </ProtectedRoute>
              </MotionWrapper>
              } />
          <Route 
              path="/manager/zone/meter/:id" 
              element={
                <MotionWrapper>
                  <ProtectedRoute>
                    <ZoneMeterDetailPage />
                  </ProtectedRoute>
                </MotionWrapper>
              }/>
          <Route 
              path="manager/zone/managers" 
              element={
                <MotionWrapper>
                  <ProtectedRoute>
                    <Manager />
                  </ProtectedRoute>
                </MotionWrapper>
                } />
          <Route 
              path='/manager/zone/manager/:id' 
              element={
                <MotionWrapper>
                  <ProtectedRoute>
                    <ManagerDetailPage />
                  </ProtectedRoute>
                </MotionWrapper>
              } />
          <Route 
              path="/manager/zone/intergration" 
              element={
                <MotionWrapper>
                  <ProtectedRoute>
                    <IntegrationsPage />
                  </ProtectedRoute>
                </MotionWrapper>
              } />

          {/* SALES MANAGER ROUTES */}
          <Route path="/manager/sales/dashboard" element={<ProtectedRoute><SalesDash /></ProtectedRoute>} />
          <Route path="/manager/sales/subscriber/:id" element={<ProtectedRoute><SubscriberDetailPage /></ProtectedRoute>} />
          <Route path="/manager/sales/subscribers" element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />
          <Route path="/manager/sales/wakalas" element={<ProtectedRoute><Wakala /></ProtectedRoute>} />
          <Route path="/manager/sales/meters" element={<ProtectedRoute><Meters /></ProtectedRoute>} />
          <Route path="/manager/sales/meter/:id" element={<ProtectedRoute><SalesMeterDetails /></ProtectedRoute>} />
          <Route path="/manager/sales/topup" element={<ProtectedRoute><TopUp /></ProtectedRoute>} />
          <Route path="/manager/transactions" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
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
    </AnimatePresence>

  );
};