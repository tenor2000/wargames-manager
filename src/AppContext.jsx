import { createContext, useState, useContext } from 'react';
import { referenceData } from './database';
import { set } from 'firebase/database';

const AppContext = createContext();

export function ContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolFilterId, setSchoolFilterId] = useState(0);
    const [spellViewList, setSpellViewList] = useState(referenceData.spells);
    const [currentWizard, setCurrentWizard] = useState(null);
    const [themeMode, setThemeMode] = useState('light');
    const [refData, setRefData] = useState(referenceData);

    const value = {
        isLoggedIn, setIsLoggedIn,
        themeMode, setThemeMode,
        schoolFilterId, setSchoolFilterId,
        spellViewList, setSpellViewList,
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