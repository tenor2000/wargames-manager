import { createContext, useState, useContext, useEffect } from 'react';
import { set } from 'firebase/database';

const dataSourceUrl = 'http://localhost:8000/frostgrave2e/refData.json';

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolFilterId, setSchoolFilterId] = useState(0);
    const [spellViewList, setSpellViewList] = useState(null);
    const [currentWizard, setCurrentWizard] = useState(null);
    const [ newWizard, setNewWizard ] = useState(null);
    const [refData, setRefData] = useState(null);
    const [ isSidebarVisible, setIsSidebarVisible ] = useState(false);
    const [ editMode, setEditMode ] = useState({'wizard': false, 
                                                'apprentice': false, 
                                                'spells': false, 
                                                'soldiers': false,
                                                'vault': false,
                                                'base': false
                                                });
    const [ currRefTable, setCurrRefTable ] = useState('all');
    const [ sourceFilter, setSourceFilter ] = useState(['all']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const value = {
        isLoggedIn, setIsLoggedIn,
        schoolFilterId, setSchoolFilterId,
        spellViewList, setSpellViewList,
        currentWizard, setCurrentWizard,
        newWizard, setNewWizard,
        refData, setRefData,
        isSidebarVisible, setIsSidebarVisible,
        editMode, setEditMode,
        currRefTable, setCurrRefTable,
        sourceFilter, setSourceFilter,
        loading, setLoading,
        error, setError,
    };

    // Fetch data
    useEffect(() => {
        const url = dataSourceUrl;
        const fetchData = async () => {
            try {
            const response = await fetch(url, {method: 'GET', mode: 'cors'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRefData(data);
            setSpellViewList(data.spells);
            setNewWizard(data.templates.wizard);

            } catch (error) {
                console.error('Error fetching data', error);
                setError(error);           
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a ContextProvider');
    }
    return context;
}