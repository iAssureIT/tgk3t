import React 				from 'react';
import Layout 				from './Layout/Layout.js';
import axios 				from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lib/router.js';

axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


function App() {
  return (
    <div>
      <Layout />
      {/*<LayoutSystemSecurity />*/}
    </div>
    
    );  
}
  
export default App;
