import {ReactNode, useEffect} from "react";
import {useNavigationContext} from "../hooks/use-navigation-context";
import {useAuthContext} from "../hooks/use-auth-context";

interface RouteProps {
    children: ReactNode;
    path: string;
}

export function ProtectedRoute({children, path}: RouteProps) {
    const {token} = useAuthContext();
    const {currentPath, navigate} = useNavigationContext();

    useEffect(() => {
        if (!token) {
            if (['/signup', '/login'].includes(currentPath)) {
                navigate(currentPath);
            } else {
                navigate('/login')
            }
        }
    }, [token, navigate]);

    if (path === currentPath && token) {
        return (
            <div>
                {children}
            </div>
        );
    }

    return (
        <div></div>
    );
}
