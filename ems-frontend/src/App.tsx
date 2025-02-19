import React from 'react';
import {Navbar} from "./components/Navbar";
import {SignupPage} from "./pages/SignupPage";
import {LoginPage} from "./pages/LoginPage";
import {DashboardPage} from "./pages/DashboardPage";
import {HomePage} from "./pages/HomePage";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserProfile} from "./components/users/UserProfile";
import {CompaniesList} from "./components/companies/CompaniesList";
import {JobsList} from "./components/jobs/JobsList";

export function App() {
    return (
        <div className="container-fluid px-0">
            <Navbar/>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <UserProfile/>
                    </ProtectedRoute>
                }/>
                <Route path="/jobs" element={
                    <ProtectedRoute>
                        <JobsList/>
                    </ProtectedRoute>
                }/>
                <Route path="/companies" element={
                    <ProtectedRoute>
                        <CompaniesList/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
}
