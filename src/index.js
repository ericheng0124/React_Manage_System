import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom"

import localStore from "./utils/storageUtils";
import loginData from "./utils/memoryUtils";


const root = ReactDOM.createRoot(document.getElementById('root'));
const user = localStore.getUser()
loginData.user = user

root.render(
    <Router>
      <App/>
    </Router>
);

