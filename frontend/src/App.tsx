import React from 'react';
import {Navbar} from "./components/Navbar";
import {Route} from "./components/Route";
import {SignupPage} from "./pages/SignupPage";
import {LoginPage} from "./pages/LoginPage";
import {EmployeeListPage} from "./pages/EmployeeListPage";
import {JobsListPage} from "./pages/JobsListPage";
import {DashboardPage} from "./pages/DashboardPage";

export function App() {
    return (
        <div className="container-fluid px-0">
            <Navbar/>

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
                <EmployeeListPage/>
            </Route>
            <Route path='/jobs'>
                <JobsListPage/>
            </Route>
        </div>
    );
}
