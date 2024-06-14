import { useState } from 'react';
import { AuthProvider } from './AuthContext.jsx';
import { ContextProvider } from './AppContext.jsx';
import { ThemeContextProvider } from './ThemeContext.jsx';
import { MenuBar, ContentArea, SideBar, MobileBottomNav } from './ContentLayout.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';



function App() {
  return (
      
      <Router>
        <AuthProvider>
          <ContextProvider>
            <ThemeContextProvider>
              <MenuBar />
              <ContentArea />
              <MobileBottomNav />
            </ThemeContextProvider>
          </ContextProvider>
        </AuthProvider>
      </Router>
  );
}

export default App;

