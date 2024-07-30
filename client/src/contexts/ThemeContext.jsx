import { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { set } from 'firebase/database';

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
    const [themeMode, setThemeMode] = useState('dark');

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
                    backgroundColor: 'black',
                    '& svg': {
                      fill: 'darkblue !important',
                    }
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
    
      const toggleThemeMode = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      };

    const value = {
        themeMode, toggleThemeMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ContextProvider');
    }
    return context;
}