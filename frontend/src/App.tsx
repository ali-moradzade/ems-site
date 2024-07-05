import React, {useEffect} from 'react';
import {Navbar} from "./components/Navbar";
import {Route} from "./components/Route";
import {SignupPage} from "./pages/SignupPage";
import {LoginPage} from "./pages/LoginPage";
import {EmployeePage} from "./pages/EmployeePage";
import {JobPage} from "./pages/JobPage";
import {DashboardPage} from "./pages/DashboardPage";
import {HomePage} from "./pages/HomePage";
import {useEmployeeContext} from "./hooks/use-employee-context";

export function App() {
    const {getAllEmployees} = useEmployeeContext();

    useEffect(() => {
        getAllEmployees().then();
    }, []);

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
                <JobPage/>
            </Route>
        </div>
    );
}
