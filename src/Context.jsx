import { useState, createContext, useContext } from "react";

const AppContext = createContext();

export function ContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ 
        currentPage, setCurrentPage,
        isLoggedIn, setIsLoggedIn
         }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};