import {createContext, ReactNode, useState} from "react";

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function Provider({children}: { children: ReactNode }) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const value = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
