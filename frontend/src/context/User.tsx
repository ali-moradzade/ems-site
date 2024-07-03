import {createContext, ReactNode, useState} from "react";

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

const fakeUser: User = {
    firstName: 'fake firstName',
    lastName: 'fake lastName',
    email: 'fake@gmail.com',
};

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
    user: fakeUser,
    setUser: (user: User) => console.log('fake imp')
});

export function Provider({children}: { children: ReactNode }) {
    const [user, setUser] = useState(fakeUser);

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
