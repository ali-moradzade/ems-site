import {ReactNode} from "react";
import {useNavigationContext} from "../hooks/use-navigation-context";

interface RouteProps {
    children: ReactNode;
    path: string;
}

export function Route({children, path}: RouteProps) {
    const {currentPath} = useNavigationContext();

    if (path === currentPath) {
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
