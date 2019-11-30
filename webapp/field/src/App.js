import React 				from 'react';
import axios 				from 'axios';
import LayoutSystemSecurity from './coreAdmin/LayoutSystemSecurity/LayoutSystemSecurity.js';
import Layout 				from './coreAdmin/Layout/Layout.js';

import './lib/router.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';

axios.defaults.baseURL = 'http://prodapi.lyvo.in/';
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
