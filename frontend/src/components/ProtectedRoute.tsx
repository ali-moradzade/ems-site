import {ReactNode} from "react";
import {useAuthContext} from "../hooks/use-auth-context";
import {Navigate} from "react-router-dom";

interface RouteProps {
    children: ReactNode;
}

export function ProtectedRoute({children}: RouteProps) {
    const {token} = useAuthContext();

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    return <>
        {children}
    </>;
}
