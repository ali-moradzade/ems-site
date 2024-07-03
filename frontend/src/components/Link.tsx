import {ReactNode} from "react";
import {useNavigationContext} from "../hooks/use-navigation-context";
import classNames from "classnames";

interface LinkProps {
    children: ReactNode;
    to: string;
    className?: string;
    activeClassName?: string;
}

export function Link({children, to, className, activeClassName}: LinkProps) {
    const {navigate, currentPath} = useNavigationContext();
    const classes = classNames(
        className,
        currentPath === to && activeClassName,
    );

    const handleClick = (event: any) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        event.preventDefault();
        navigate(to);
    };

    return (
        <a
            href={to}
            onClick={handleClick}
            className={classes}
        >
            {children}
        </a>
    );
}
