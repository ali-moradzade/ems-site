import React from 'react';
import {Navbar} from "./components/Navbar";
import {SignupPage} from "./pages/SignupPage";
import {LoginPage} from "./pages/LoginPage";
import {JobsPage} from "./pages/JobsPage";
import {DashboardPage} from "./pages/DashboardPage";
import {HomePage} from "./pages/HomePage";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {Route, Routes} from "react-router-dom";

export function App() {
    return (
        <div className="container-fluid px-0">
            <Navbar/>

            <Routes>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>

                }/>
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/jobs" element={
                    <ProtectedRoute>
                        <JobsPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </div>
    );
}
