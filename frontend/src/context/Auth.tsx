import {createContext, ReactNode, useEffect, useMemo, useState} from "react";

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [token, setToken_] = useState<string | null>(localStorage.getItem('token'));

    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Memoized value of the authentication context
    const value = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
