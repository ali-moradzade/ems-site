import {createContext, ReactNode, useState} from "react";
import {User, UserRestClient} from "../apis/users";

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    setUserByEmail: (email: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User>({
        email: 'mock@gmail.com',
        firstName: 'mock',
        lastName: 'mock',
    });

    const restClient = UserRestClient.getUsersRestClient();

    const setUserByEmail = async (email: string) => {
        const users = await restClient.getAllUsers(email);

        setUser(users[0]);
    };

    const value = {
        user,
        setUser,
        setUserByEmail,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
