import {WelcomePanel} from "../components/WelcomePanel";
import {Link} from "../components/Link";
import {useUserContext} from "../hooks/use-user-context";
import {useNavigationContext} from "../hooks/use-navigation-context";
import {FormEvent, useState} from "react";
import {AxiosError} from "axios";

export function LoginPage() {
    const {login} = useUserContext();
    const {navigate} = useNavigationContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login(email, password);

            setEmail('');
            setPassword('');

            navigate('/dashboard');
        } catch (err: any) {
            err = err as AxiosError;

            setError(`Login failed: ${err.response.data.message}`);
        }
    };

    return (
        <div>
            <WelcomePanel/>
            <div className="row justify-content-center mt-5">
                <div className="col-4">
                    <div className="card shadow" id="login_card">
                        <div className="card-body">
                            <div className="card-title">
                                <h3>Login</h3>
                                <div className="card-text">
                                    <p className="small text-muted">Login with your username &amp; password</p>
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <form id="login_form" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input type="email" className="form-control form-control mt-2"
                                                   placeholder="Email" required name="email"
                                                   value={email}
                                                   onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control form-control mt-2"
                                                   placeholder="Password" required name="password"
                                                   value={password}
                                                   onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 d-grid">
                                            <input type="submit" className="btn btn-success" name="login_btn"
                                                   value="Login"/>
                                        </div>
                                    </form>
                                    <div className="text-center text-muted small mt-4">
                                        Don't have an account? <Link to={'/signup'} className="text-decoration-none">
                                            Signup
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
