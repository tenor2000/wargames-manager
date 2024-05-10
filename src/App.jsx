import { useState } from 'react';
import { ContextProvider } from './Context.jsx';
import { MenuBar, SideBar } from './Navigate.jsx';
import { ContentArea } from './ContentArea.jsx';
import './styles/App.css';



function App() {
  return (
    <ContextProvider>
      <MenuBar />
      <SideBar />
      <ContentArea />
    </ContextProvider>
  );
}

export default App;
