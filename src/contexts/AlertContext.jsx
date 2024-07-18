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
        setAlertDialog({open: true, title: title, message: message});
    };

    const hideAlert = () => {
        setAlert({open: false, message: '' });
        setAlertDialog({open: false, title: '', message: ''});
    };


    return (
        <AlertContext.Provider value={{ alert, showAlert, showAlertDialog, alertDialog, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
