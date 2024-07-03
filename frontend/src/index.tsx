import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "./context/User";
import {NavigationProvider} from "./context/Navigation";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <NavigationProvider>
        <Provider>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>
    </NavigationProvider>
);
