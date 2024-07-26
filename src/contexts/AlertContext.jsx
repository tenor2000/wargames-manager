import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [alertDialog, setAlertDialog] = useState({open: false, title: '', message: ''});
    const [ alert, setAlert ] = useState({open: false, message: '' });

    const showAlert = (message, severity='info') => {
        setAlert({open: true, message: message, severity: severity});
    };

    const showAlertDialog = (title, message) => {
        return new Promise((resolve) => {
            setAlertDialog({open: true, title, message, resolve });
        })
    };

    const hideAlert = () => {
        setAlert({open: false, message: '' });
        setAlertDialog({open: false, title: '', message: ''});
    };

    const value = {
        alert,
        showAlert,
        showAlertDialog,
        alertDialog,
        hideAlert
    }


    return (
        <AlertContext.Provider value={ value }>
            {children}
        </AlertContext.Provider>
    );
};
