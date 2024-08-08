import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function ContextProvider({ children, dataUrl }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [spellViewList, setSpellViewList] = useState(null);
    const [currentWizard, setCurrentWizard] = useState(null);
    const [currentCampaignData, setCurrentCampaignData] = useState({campaign: null, wizard: null});
    const [newWizard, setNewWizard] = useState(null);
    const [newCampaign, setNewCampaign] = useState(null);
    const [refData, setRefData] = useState(null);
    const [ isSidebarVisible, setIsSidebarVisible ] = useState(false);
    const [ editMode, setEditMode ] = useState({'wizard': false, 
                                                'apprentice': false, 
                                                'spells': false, 
                                                'soldiers': false,
                                                'vault': false,
                                                'base': false
                                                });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const value = {
        isLoggedIn, setIsLoggedIn,
        spellViewList, setSpellViewList,
        currentWizard, setCurrentWizard,
        currentCampaignData, setCurrentCampaignData,
        newWizard, setNewWizard,
        newCampaign, setNewCampaign,
        refData, setRefData,
        isSidebarVisible, setIsSidebarVisible,
        editMode, setEditMode,
        loading, setLoading,
        error, setError,
    };

    // Fetch data
    useEffect(() => {
        const url = dataUrl;
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