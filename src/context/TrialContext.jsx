import { createContext, useState } from 'react';

export const TrialContext = createContext();

// eslint-disable-next-line react/prop-types
export const TrialContextProvider = ({ children }) => {
    const [trial, setTrial] = useState("");
    const [user, setUser] = useState({});

    return (
        <TrialContext.Provider value={{ trial, setTrial, user, setUser }}>
            {children}
        </TrialContext.Provider>
    );
};
