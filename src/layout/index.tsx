import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => (
  <div 
    className="fixed inset-0 -z-10 bg-gradient-to-br bg-white"
    style={{
      backgroundSize: '400% 400%',
      animation: 'shimmer 8s ease infinite',
    }}
  >
    {children}
  </div>
);

export const Layout = () => {
  return (
    <div className='max-w-full relative min-h-screen bg-gray-50'>
      <AnimatedBackground>
        {/* Motion lines overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div className="absolute h-full w-1 bg-white animate-move-line left-20%"></div>
          <div className="absolute h-full w-1 bg-white animate-move-line left-45% delay-1000"></div>
          <div className="absolute h-full w-1 bg-white animate-move-line left-70% delay-2000"></div>
        </div>
      </AnimatedBackground>

      <Sidebar/>
      <div className='pr-4 sm:pl-24 md:pl-22 pl-4 relative'>
        <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
  )
}