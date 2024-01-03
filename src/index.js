import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom"
// import localStore from "./utils/storageUtils";
// import memoryUtils from "./utils/memoryUtils";
import {Provider} from "react-redux";
import store from './store'


const root = ReactDOM.createRoot(document.getElementById('root'));
// const user = localStore.getUser()
// memoryUtils.user = user

root.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
);

