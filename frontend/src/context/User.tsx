import {createContext, ReactNode, useState} from "react";
import {User, UserRestClient} from "../apis/users";

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User>({
        email: 'mock@gmail.com',
        firstName: 'mock',
        lastName: 'mock',
    });
    const restClient = UserRestClient.getUsersRestClient();

    const signup = async (email: string, password: string, firstName: string, lastName: string) => {
        const user = await restClient.signup(email, password, firstName, lastName);

        setUser(user);
    };

    const login = async (email: string, password: string) => {
        const user = await restClient.login(email, password);

        setUser(user);
    };

    const value = {
        user,
        setUser,
        signup,
        login,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
