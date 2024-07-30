import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [alertDialog, setAlertDialog] = useState({open: false, title: '', message: ''});
    const [ alerts, setAlerts ] = useState([]);

    const showAlert = (message, severity='info') => {
        const id = new Date().getTime();
        setAlerts([...alerts, {id, message, severity}]);
    };

    const showAlertDialog = (title, message) => {
        return new Promise((resolve) => {
            setAlertDialog({open: true, title, message, resolve });
        })
    };

    const hideAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id)) 
        // setAlerts({open: false, message: '' });
    };

    const hideDialogAlert = () => {
        setAlertDialog({open: false, title: '', message: ''});
    };

    const value = {
        alerts,
        showAlert,
        showAlertDialog,
        alertDialog,
        hideAlert,
        hideDialogAlert
    }


    return (
        <AlertContext.Provider value={ value }>
            {children}
        </AlertContext.Provider>
    );
};
