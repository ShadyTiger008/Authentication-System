import { createContext, useContext, useState } from "react";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    return (
        <MainContext.Provider value={{ user, setUser }}>
            {children}
        </MainContext.Provider>
    );
};

export function useMainContext() {
    const context = useContext(MainContext);

    if (!context) {
        throw new Error("useMainContext must be used within a MainContextProvider");
    }

    return context;
}

export default MainContextProvider;
