import { useState, createContext, useContext } from "react";

const AppContext = createContext();

export function ContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageCount, setPageCount] = useState(0);

  return (
    <AppContext.Provider value={{ 
        currentPage, setCurrentPage,
         }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};