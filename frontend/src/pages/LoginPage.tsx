import {WelcomePanel} from "../components/WelcomePanel";
import {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector, useLoginMutation, useUserProfileQuery} from "../store";
import {setCredentials} from "../store/slices/authSlice";

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector(state => state.auth.token);
    const [login, {isLoading, error}] = useLoginMutation();
    const {data: user} = useUserProfileQuery(undefined, {skip: !token});

    useEffect(() => {
        if (user) {
            dispatch(setCredentials({token, user}));
            navigate("/dashboard");
        }
    }, [user, token, dispatch, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const {token} = await login({email, password}).unwrap();

            setPassword('');
            dispatch(setCredentials({token, user: null}));
        } catch (err: any) {
            console.error(err?.message || 'Login failed');
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
                                        <div className="alert alert-danger" role="alert" id="login_alert">
                                            {(error as any)?.data?.message || 'Login failed'}
                                        </div>
                                    )}
                                    <form id="login_form" onSubmit={handleSubmit}>
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
                                        <div className="mb-3 d-grid">
                                            <button
                                                type="submit" className="btn btn-success" name="login_btn"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>
                                                ) : (
                                                    'Login'
                                                )}
                                            </button>
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
