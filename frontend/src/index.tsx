import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from "./context/User";
import {NavigationProvider} from "./context/Navigation";
import {EmployeeProvider} from "./context/Employee";
import {JobProvider} from "./context/Job";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <JobProvider>
        <EmployeeProvider>
            <NavigationProvider>
                <UserProvider>
                    <React.StrictMode>
                        <App/>
                    </React.StrictMode>
                </UserProvider>
            </NavigationProvider>
        </EmployeeProvider>
    </JobProvider>
);
