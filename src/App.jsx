import { useState } from 'react';
import { ContextProvider } from './Context.jsx';
import { NavigationSideBar } from './navigation.jsx';
import { ContentArea } from './ContentArea.jsx';
import './App.css';


function App() {
  return (
    <ContextProvider>
      <NavigationSideBar />
      <ContentArea />
    </ContextProvider>
  );
}

export default App;
