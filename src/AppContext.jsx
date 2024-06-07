import { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { set } from 'firebase/database';

const dataSourceUrl = 'http://localhost:8000/frostgrave2e/data.json';

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolFilterId, setSchoolFilterId] = useState(0);
    const [spellViewList, setSpellViewList] = useState(null);
    const [currentWizard, setCurrentWizard] = useState(null);
    const [ newWizard, setNewWizard ] = useState(null);
    const [themeMode, setThemeMode] = useState('light');
    const [refData, setRefData] = useState(null);
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
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

    const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
        components: {
          MuiTableHead: {
            styleOverrides: {
              root: {
                backgroundColor: '#1976d2',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            },
          },
        },
      });
    
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
        },
        components: {
          MuiTableHead: {
            styleOverrides: {
              root: {
                backgroundColor: '#90caf9',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            },
          },
        },
      });
    
      const theme = themeMode === 'light' ? lightTheme : darkTheme;
    
      const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      };

    const value = {
        isLoggedIn, setIsLoggedIn,
        themeMode, setThemeMode,
        schoolFilterId, setSchoolFilterId,
        spellViewList, setSpellViewList,
        currentWizard, setCurrentWizard,
        newWizard, setNewWizard,
        refData, setRefData,
        isSidebarOpen, setIsSidebarOpen,
        editMode, setEditMode,
        currRefTable, setCurrRefTable,
        sourceFilter, setSourceFilter,
        loading, setLoading,
        error, setError,
    };

    // Fetch data
    useEffect(() => {
        const url = dataSourceUrl;

        fetch(url, { method: 'GET', mode: 'cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } return response.json()
            })
            .then(data => {
                setRefData(data);
                setSpellViewList(data.spells);
                setNewWizard(data.templates.wizard);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setError(error);
                setLoading(false);
            });
    }, [refData]);

    return (
        <AppContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    {children}
            </ThemeProvider>
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