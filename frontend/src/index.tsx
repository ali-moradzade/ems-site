import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "./context/User";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
);
