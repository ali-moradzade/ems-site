import {useUserContext} from "../hooks/use-user-context";
import React from "react";
import {FaSearch} from "react-icons/fa";
import {Link} from "./Link";
import {useNavigationContext} from "../hooks/use-navigation-context";
import {useAuthContext} from "../hooks/use-auth-context";

export function Navbar() {
    const {user} = useUserContext()!;
    const {firstName, lastName} = user;
    const {setToken} = useAuthContext();
    const {currentPath, navigate} = useNavigationContext();

    if (['/', '/signup', '/login'].includes(currentPath)) {
        return (
            <div></div>
        );
    }

    const handleLogout = () => {
        setToken(null);
        navigate('/login');
    };

    const linkItems = [
        {
            label: 'Employees',
            path: '/employees',
        },
        {
            label: 'Jobs',
            path: '/jobs',
        }
    ];

    const renderedLinks = linkItems.map((item) => {
        return (
            <li className="nav-item" key={item.label}>
                <Link
                    to={item.path}
                    className="nav-link"
                    activeClassName="active"
                >
                    {item.label}
                </Link>
            </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={'/dashboard'} className="navbar-brand">
                    Hi, {firstName} {lastName}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {renderedLinks}
                    </ul>
                    <form className="d-flex" role="search">
                        <div className="input-group">
                            <input type="search" className="form-control form-control-sm" placeholder="Search .."
                                   aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-sm btn-success" type="submit">
                                <FaSearch/>
                            </button>
                        </div>
                    </form>
                    <button
                        className="btn btn-sm btn-warning ms-3"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
