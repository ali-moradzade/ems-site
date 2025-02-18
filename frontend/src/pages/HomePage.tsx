import {WelcomePanel} from "../components/WelcomePanel";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";

export function HomePage() {
    return (
        <div className="container-fluid">
            <WelcomePanel/>
            <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-10 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="card-title">
                                <div className="text-center">
                                    <h2>Welcome to Employee Management Site!</h2>
                                </div>
                                <div className="card-text p-2 mt-3" style={{minHeight: '200px'}}>
                                    <p className="text-muted">
                                        EMS site is a site where you can see different companies
                                        and their job opportunities.
                                    </p>
                                    <p className="text-muted">
                                        You can apply for each job, after that the owner of that company will be
                                        informed that you have applied for that job, and if they are willing, they will
                                        contact you for hiring you.
                                    </p>
                                    <p className="text-muted">
                                        If you have a company and want to put a job opportunity please contact admin of
                                        website through:
                                        <a
                                            href="https://t.me/moradzade_ali"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-dark ms-2"
                                        >
                                            <FontAwesomeIcon icon={faTelegram} className="homepage-social-icon"/>
                                        </a>
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Link to={'/signup'} className="btn btn-success card-link w-auto mx-2">
                                        Signup
                                    </Link>
                                    <Link to={'/login'} className="btn btn-success card-link w-auto mx-2">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .homepage-social-icon {
                      font-size: 1.2rem;
                    }

                    .homepage-social-icon:hover {
                      color: #0d6efd; /* Customize this to your preferred hover color */
                    }
                `}
            </style>
        </div>
    );
}
