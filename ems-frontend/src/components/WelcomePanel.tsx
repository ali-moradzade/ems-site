import {Link} from "react-router-dom";

export function WelcomePanel() {
    return (
        <Link to="/" className="text-decoration-none">
            <div className="row justify-content-center align-items-center bg-success text-light"
                 style={{height: '80px'}}>
                <div className="col text-center">
                    <h1>Welcome to EMS Website</h1>
                </div>
            </div>
        </Link>
    );
}
