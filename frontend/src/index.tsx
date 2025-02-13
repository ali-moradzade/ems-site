import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from "./context/User";
import {EmployeeProvider} from "./context/Employee";
import {JobProvider} from "./context/Job";
import {AuthProvider} from "./context/Auth";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <AuthProvider>
                <JobProvider>
                    <EmployeeProvider>
                        <UserProvider>
                            <React.StrictMode>
                                <App/>
                            </React.StrictMode>
                        </UserProvider>
                    </EmployeeProvider>
                </JobProvider>
            </AuthProvider>
        </Provider>
    </BrowserRouter>
);
