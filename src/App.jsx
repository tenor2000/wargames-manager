import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ContextProvider } from './contexts/AppContext.jsx';
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';
import { AlertProvider } from './contexts/AlertContext.jsx';
import { MenuBar, ContentArea, MobileBottomNav } from './ContentLayout.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { DialogAlert, TransitionAlert } from './alerts/Alerts.jsx';

const dataUrl = import.meta.env.VITE_API_DATA_URL;
// const userDataUrl = process.env.REACT_APPUSER_API_DATA_URL;

function App() {
  return (
      
      <Router>
        <AuthProvider>
          <ContextProvider dataUrl={dataUrl}>
            <ThemeContextProvider>
              <AlertProvider>
                <MenuBar />
                <ContentArea />
                <MobileBottomNav />
                <DialogAlert />
              </AlertProvider>
            </ThemeContextProvider>
          </ContextProvider>
        </AuthProvider>
      </Router>
  );
}

export default App;

