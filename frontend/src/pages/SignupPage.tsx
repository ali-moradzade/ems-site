import {WelcomePanel} from "../components/WelcomePanel";
import {Link} from "../components/Link";
import {FormEvent, useState} from "react";
import {useUserContext} from "../hooks/use-user-context";
import {useNavigationContext} from "../hooks/use-navigation-context";
import {AxiosError} from "axios";

export function SignupPage() {
    const {signup} = useUserContext();
    const {navigate} = useNavigationContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await signup(email, password, firstName, lastName);

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');

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
                    <div className="card shadow" id="signup_card">
                        <div className="card-body">
                            <div className="card-title">
                                <h3>Signup</h3>
                                <div className="card-text">
                                    <p className="small text-muted">
                                        Fill in the information and sign up in <span
                                        className="fw-bold">ESM</span> website
                                    </p>
                                    {error && (
                                        <div className="alert alert-danger" role="alert" id="signup_alert">
                                            {error}
                                        </div>
                                    )}
                                    <form id="signup_form" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input
                                                type="email" className="form-control form-control mt-2"
                                                placeholder="Email" required name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password" className="form-control form-control mt-2"
                                                placeholder="Password" required name="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text" className="form-control form-control mt-2"
                                                placeholder="First Name" required name="first_name"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text" className="form-control form-control mt-2"
                                                placeholder="Last Name" required
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 d-grid">
                                            <input type="submit" className="btn btn-success" value="signup"/>
                                        </div>
                                    </form>
                                    <div className="text-center text-muted mt-4 small">
                                        Already a User? <Link to={'/login'} className="text-decoration-none">
                                        Login
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
