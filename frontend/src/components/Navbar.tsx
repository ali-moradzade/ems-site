import React from "react";
import {FaSearch} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store";
import {logout} from "../store/slices/authSlice";

export function Navbar() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    if (['/', '/signup', '/login'].includes(location.pathname)) {
        return (
            <div></div>
        );
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const linkItems = [
        {
            label: 'Profile',
            path: '/profile',
        },
        {
            label: 'Jobs',
            path: '/jobs',
        },
        {
            label: 'Companies',
            path: '/companies',
        }
    ];

    const renderedLinks = linkItems.map((item) => {
        return (
            <li className="nav-item" key={item.label}>
                <Link
                    to={item.path}
                    className="nav-link"
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
                    Hi, {user?.firstName} {user?.lastName}
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
