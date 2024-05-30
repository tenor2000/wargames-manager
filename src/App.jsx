import { useState } from 'react';
import { AuthProvider } from './AuthContext.jsx';
import { ContextProvider } from './AppContext.jsx';
import { MenuBar, ContentArea, MobileBottomNav } from './ContentLayout.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';



function App() {
  return (
      
      <Router>
        <AuthProvider>
          <ContextProvider>
            <MenuBar />
            <ContentArea />
            <MobileBottomNav />
          </ContextProvider>
        </AuthProvider>
      </Router>
  );
}

export default App;

