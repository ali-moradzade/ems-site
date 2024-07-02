import React from 'react';
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";

export function App() {
    return (
        <div className="container-fluid">
            <LoginPage/>
            <SignupPage/>
        </div>
    );
}
