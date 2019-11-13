import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Aux from './app/constants/hoc/_Aux';
import App from './app/App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import config from "./config";
import store from './store';


const Index = () => {
    return (
        <Provider store={store}>
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </Provider>

    );
};
ReactDOM.render(<Index />, document.getElementById('root'));