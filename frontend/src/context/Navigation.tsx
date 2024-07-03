import {createContext, ReactNode, useEffect, useState} from "react";

interface NavigationContextType {
    navigate: (to: string) => void;
    currentPath: string;
}

export const NavigationContext = createContext<NavigationContextType>({
    navigate: (to) => {
        console.log('fake imp');
    },
    currentPath: '/',
});

export function NavigationProvider({children}: {children: ReactNode}) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handler = () => setCurrentPath(window.location.pathname);

        window.addEventListener('popstate', handler);

        return () => window.removeEventListener('popstate', handler);
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }

    const value = {
        navigate,
        currentPath,
    }

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    )
}
