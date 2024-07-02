import {WelcomePanel} from "../components/WelcomePanel";

export function SignupPage() {
    return (
        <div>
            <WelcomePanel/>
            <div className="row justify-content-center mt-5">
                <div className="col-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="card-title">
                                <h3>Signup</h3>
                                <div className="card-text">
                                    <p className="small text-muted">
                                        Fill in the information and sign up in <span
                                        className="fw-bold">ESM</span> website
                                    </p>
                                    <form>
                                        <div className="mb-3">
                                            <input placeholder="First Name" type="text" id="signupFirstName"
                                                   className="form-control form-control mt-2"
                                                   required/>
                                        </div>
                                        <div className="mb-3">
                                            <input placeholder="Last Name" type="text" id="signupLastName"
                                                   className="form-control form-control mt-2"
                                                   required/>
                                        </div>
                                        <div className="mb-3">
                                            <input placeholder="Email" type="email" id="signupEmail"
                                                   className="form-control form-control mt-2"
                                                   required/>
                                        </div>
                                        <div className="mb-3">
                                            <input placeholder="Password" type="password" id="signupPassword"
                                                   className="form-control form-control mt-2"
                                                   required/>
                                        </div>
                                        <div className="mb-3 d-grid">
                                            <input type="submit" className="btn btn-success" value="Signup"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
