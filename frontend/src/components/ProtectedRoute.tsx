import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../store";

interface RouteProps {
    children: ReactNode;
}

export function ProtectedRoute({children}: RouteProps) {
    const token = useAppSelector(state => state.auth.token);

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    return <>
        {children}
    </>;
}
