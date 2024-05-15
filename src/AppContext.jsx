import { createContext, useState, useContext } from 'react';
import referenceData from './database';
import { set } from 'firebase/database';

const AppContext = createContext();

export function ContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolTypeId, setSchoolTypeId] = useState(0);
    const [spellList, setSpellList] = useState(referenceData.spells);
    const [currentWizard, setCurrentWizard] = useState(null);
    const [themeMode, setThemeMode] = useState('light');
    const [refData, setRefData] = useState(referenceData);

    const value = {
        isLoggedIn, setIsLoggedIn,
        themeMode, setThemeMode,
        schoolTypeId, setSchoolTypeId,
        spellList, setSpellList,
        currentWizard, setCurrentWizard,
        refData, setRefData
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