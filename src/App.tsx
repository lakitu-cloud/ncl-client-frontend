import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/index';
import SalesDash from './pages/dashboards/sales/SalesDash';
import Cookies from 'js-cookie';
import Home from './pages/wecome';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = Cookies.get('auth');
  return token ? children : <Navigate to="/auth" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="/dashboard" element={<ProtectedRoute><SalesDash /></ProtectedRoute>} /> */}
                      <Route path="/dashboard" element={<SalesDash />} />

      </Route>
      <Route path="/" element={<Home />} />
              {/* <Route path="/dashboard" element={<SalesDash />} /> */}

    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;