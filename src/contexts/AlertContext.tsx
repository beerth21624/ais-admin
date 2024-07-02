// AlertContext.tsx
import React, { createContext, useState, useContext } from 'react';

type AlertType = 'loading' | 'success' | 'error' | null;

interface AlertContextType {
    alertType: AlertType;
    message: string;
    showAlert: (type: AlertType, message: string) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

let globalShowAlert: ((type: AlertType, message: string) => void) | null = null;
let globalHideAlert: (() => void) | null = null;

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alertType, setAlertType] = useState<AlertType>(null);
    const [message, setMessage] = useState('');

    const showAlert = (type: AlertType, message: string) => {
        setAlertType(type);
        setMessage(message);
    };

    const hideAlert = () => {
        setAlertType(null);
        setMessage('');
    };

    globalShowAlert = showAlert;
    globalHideAlert = hideAlert;

    return (
        <AlertContext.Provider value={{ alertType, message, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const showAlertGlobal = (type: AlertType, message: string) => {
    if (globalShowAlert) {
        globalShowAlert(type, message);
    } else {
        console.error('AlertProvider not initialized');
    }
};

export const hideAlertGlobal = () => {
    if (globalHideAlert) {
        globalHideAlert();
    } else {
        console.error('AlertProvider not initialized');
    }
};