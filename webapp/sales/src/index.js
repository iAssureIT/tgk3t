import React 				from 'react';
import ReactDOM 			from 'react-dom';
import './index.css';
import App 					from './App';
import * as serviceWorker 	from './serviceWorker';
import {routes} 			from './lib/router.js';

import { createStore } 		from 'redux';
import { Provider } 		from 'react-redux';
import reducer 				from './store/reducer';

// ReactDOM.render(routes, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

global.jQuery = require('jquery');

const store = createStore(reducer);


ReactDOM.render(routes, document.getElementById('root'));
ReactDOM.render( <Provider store={store}> <App /> </Provider>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
