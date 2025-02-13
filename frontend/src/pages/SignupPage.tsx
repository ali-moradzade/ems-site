import {WelcomePanel} from "../components/WelcomePanel";
import React, {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector, useLoginMutation, useSignupMutation} from "../store";
import {setToken} from "../store/slices/authSlice";

export function SignupPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector(state => state.auth.token);
    const [signup, {isLoading, error}] = useSignupMutation();
    const [login] = useLoginMutation();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await signup({email, password, firstName, lastName}).unwrap();

            const {token} = await login({email, password}).unwrap();
            dispatch(setToken(token));

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');

            navigate('/dashboard');
        } catch (err: any) {
            console.error(err?.message || 'Error signing up user');
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
                                            {(error as any)?.data?.message || 'Error signing up user'}
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
                                            <button type="submit" className="btn btn-success" disabled={isLoading}>
                                                {isLoading ? (
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>
                                                ) : (
                                                    'Signup'
                                                )}
                                            </button>
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
