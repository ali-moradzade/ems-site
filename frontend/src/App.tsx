import React, {useEffect} from 'react';
import {Navbar} from "./components/Navbar";
import {SignupPage} from "./pages/SignupPage";
import {LoginPage} from "./pages/LoginPage";
import {EmployeePage} from "./pages/EmployeePage";
import {JobPage} from "./pages/JobPage";
import {DashboardPage} from "./pages/DashboardPage";
import {HomePage} from "./pages/HomePage";
import {useEmployeeContext} from "./hooks/use-employee-context";
import {useJobContext} from "./hooks/use-job-context";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {Route, Routes} from "react-router-dom";

export function App() {
    const {getAllEmployees} = useEmployeeContext();
    const {getAllJobs} = useJobContext();

    useEffect(() => {
        getAllEmployees().then();
        getAllJobs().then();
    }, []);

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
                <Route path="/employees" element={
                    <ProtectedRoute>
                        <EmployeePage/>
                    </ProtectedRoute>
                }/>
                <Route path="/jobs" element={
                    <ProtectedRoute>
                        <JobPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </div>
    );
}
