import {WelcomePanel} from "../components/WelcomePanel";
import {Link} from "../components/Link";

export function HomePage() {
    return (
        <div className="container-fluid">
            <WelcomePanel/>
            <div className="row justify-content-center mt-5">
                <div className="col-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="card-title">
                                <div className="text-center">
                                    <h2>Welcome to Employee Management Site!</h2>
                                </div>

                                {/*<div className="card-text" style={{height: '400px'}}>*/}
                                {/*    <p className="small text-muted">*/}
                                {/*        /!*TODO: ADD SITE DESCRIPTION*!/*/}
                                {/*        Site description goes here ...*/}
                                {/*    </p>*/}


                                {/*</div>*/}
                                <div className="card-text" style={{height: '200px'}}>
                                </div>
                                <div className="text-center">
                                    <Link to={'/signup'} className="btn btn-success card-link w-25">
                                        Signup
                                    </Link>
                                    <Link to={'/login'} className="btn btn-success card-link w-25">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
