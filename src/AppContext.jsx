import { createContext, useState, useContext } from 'react';
import { referenceData } from './database';
import { set } from 'firebase/database';

const AppContext = createContext();

export function ContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolFilterId, setSchoolFilterId] = useState(0);
    const [spellViewList, setSpellViewList] = useState(referenceData.spells);
    const [currentWizard, setCurrentWizard] = useState(null);
    const [ newWizard, setNewWizard ] = useState(referenceData.templates.wizard);
    const [themeMode, setThemeMode] = useState('light');
    const [refData, setRefData] = useState(referenceData);
    const [ editMode, setEditMode ] = useState({'wizard': false, 
                                                'apprentice': false, 
                                                'spells': false, 
                                                'soldiers': false,
                                                'vault': false,
                                                'base': false
                                                });
    const [ currRefTable, setCurrRefTable ] = useState('all');
    const [ sourceFilter, setSourceFilter ] = useState(['all']);

    const value = {
        isLoggedIn, setIsLoggedIn,
        themeMode, setThemeMode,
        schoolFilterId, setSchoolFilterId,
        spellViewList, setSpellViewList,
        currentWizard, setCurrentWizard,
        newWizard, setNewWizard,
        refData, setRefData,
        editMode, setEditMode,
        currRefTable, setCurrRefTable,
        sourceFilter, setSourceFilter
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