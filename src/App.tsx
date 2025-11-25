import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <Router>
        <ToastContainer 
          stacked
          position='top-right'
          style={{ width: "20vw" }}
          />
      <AppRoutes />
    </Router>
  );
};

export default App;