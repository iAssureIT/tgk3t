import React 				from 'react';

import Layout 				from './Layout/Layout.js';
import axios 				from 'axios';

import './App.css';

import 'bootstrap/js/tab.js';
import 'bootstrap/js/modal.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './lib/router.js';



axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';



function App() {
  return (
    <div>
      <Layout />
     </div>    
    );  
}
  
export default App;
