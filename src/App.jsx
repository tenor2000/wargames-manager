import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ContextProvider } from './contexts/AppContext.jsx';
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';
import { AlertProvider } from './contexts/AlertContext.jsx';
import { MenuBar, ContentArea, SideBar, MobileBottomNav } from './ContentLayout.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { AlertDialog, TransitionAlert } from './alerts/Alerts.jsx';


function App() {
  return (
      
      <Router>
        <AuthProvider>
          <ContextProvider>
            <ThemeContextProvider>
              <AlertProvider>
                <MenuBar />
                <ContentArea />
                <MobileBottomNav />
                {/* <AlertDialog /> */}
              </AlertProvider>
            </ThemeContextProvider>
          </ContextProvider>
        </AuthProvider>
      </Router>
  );
}

export default App;

