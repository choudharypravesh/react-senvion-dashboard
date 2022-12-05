import React from 'react';
import { applyMiddleware, createStore } from "redux"
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import promise from "redux-promise-middleware"
import reducer from "./reducers/index.js"
import routes from './routes'


const store = createStore(
    reducer,
    applyMiddleware(thunk, promise(), createLogger())
);


render(
    <Provider store={store}>
        <Router history={ browserHistory } routes={routes}/>
    </Provider>, document.getElementById('app')
);
