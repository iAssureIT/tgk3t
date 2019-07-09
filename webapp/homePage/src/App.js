import React 				from 'react';
import LayoutSystemSecurity from './coreAdmin/LayoutSystemSecurity/LayoutSystemSecurity.js';
import Layout 				from './coreAdmin/Layout/Layout.js';
import axios 				from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lib/router.js';

axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
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
