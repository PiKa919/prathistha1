import React from 'react';
import Menu from './menu'; // Adjust the import path as needed

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
};

export default Layout;