import { createContext, useState, useContext } from 'react';
import testData from './database';

const AppContext = createContext();

export function ContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolId, setSchoolId] = useState(0);
    const [spellList, setSpellList] = useState(testData.spells);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        schoolId,
        setSchoolId,
        spellList,
        setSpellList
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}