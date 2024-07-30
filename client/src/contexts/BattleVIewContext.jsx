import { createContext, useState, useContext, useEffect } from 'react';
import { set } from 'firebase/database';

const dataSourceUrl = 'http://localhost:8000/frostgrave2e/refData.json';

const AppContext = createContext();

// Still a work in progress not implemented yet
export function ContextProvider({ children }) {
    const [battleStatus, setBattleStatus] = useState(
        {
            'battle': false,
            'wizardHP': 0,
            'apprenticeHP': 0,
            'soldier1HP': 0,
            'soldier2HP': 0,
            'soldier3HP': 0,
            'soldier4HP': 0,
            'soldier5HP': 0,
            'soldier6HP': 0,
            'soldier7HP': 0,
            'soldier8HP': 0,
            'soldier9HP': 0,
        }
    );


    const value = {
        battleStatus, setBattleStatus
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

export function useBattleContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useBattleContext must be used within a ContextProvider');
    }
    return context;
}