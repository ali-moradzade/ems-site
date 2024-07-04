import React from 'react';
import {Navbar} from "./components/Navbar";
import {Route} from "./components/Route";
import {SignupPage} from "./pages/SignupPage";
import {LoginPage} from "./pages/LoginPage";
import {EmployeePage} from "./pages/EmployeePage";
import {JobsListPage} from "./pages/JobsListPage";
import {DashboardPage} from "./pages/DashboardPage";
import {HomePage} from "./pages/HomePage";

export function App() {
    return (
        <div className="container-fluid px-0">
            <Navbar/>

            <Route path='/'>
                <HomePage/>
            </Route>
            <Route path='/signup'>
                <SignupPage/>
            </Route>
            <Route path='/login'>
                <LoginPage/>
            </Route>
            <Route path='/dashboard'>
                <DashboardPage/>
            </Route>
            <Route path='/employees'>
                <EmployeePage/>
            </Route>
            <Route path='/jobs'>
                <JobsListPage/>
            </Route>
        </div>
    );
}
