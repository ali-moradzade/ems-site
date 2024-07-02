export function LoginPage() {
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-4">
                <div className="card shadow">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>Login as Admin</h3>
                            <div className="card-text">
                                <p className="small text-muted">Login with your username &amp; password</p>
                                <form>
                                    <div className="mb-3">
                                        <input placeholder="Username" type="text" id="username"
                                               className="form-control form-control mt-2"
                                               required/>
                                    </div>
                                    <div className="mb-3">
                                        <input placeholder="Password" type="password" id="password"
                                               className="form-control form-control mt-2"
                                               required/>
                                    </div>
                                    <div className="mb-3 d-grid">
                                        <input type="submit" className="btn btn-success" value="Login"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
