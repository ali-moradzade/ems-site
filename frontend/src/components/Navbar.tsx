import {useUserContext} from "../hooks/use-user-context";

interface NavbarProps {
    activeLink: string;
}

const linkItems = [
    {
        label: 'Employees',
        link: '/employees',
    },
    {
        label: 'Jobs',
        link: '/jobs',
    }
];

export function Navbar({activeLink}: NavbarProps) {
    const {user} = useUserContext()!;
    const {firstName, lastName} = user;

    const renderedLinks = linkItems.map((item, index) => {
        return (
            <li className="nav-item" key={index}>
                <a className={`nav-link ${item.link === activeLink ? 'active' : ''}`} aria-current="page"
                   href={item.link}>
                    {item.label}
                </a>
            </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Hi, {firstName} {lastName}</a>
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
                            <button className="btn btn-sm btn-success" type="submit"><i
                                className="fa fa-search"></i></button>
                        </div>
                    </form>
                    <a href="#" role="button" className="btn btn-sm btn-warning ms-3">Logout</a>
                </div>
            </div>
        </nav>
    );
}
