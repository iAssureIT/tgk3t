
import React from 'react';
// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Header from '/Users/omkar/Documents/Reactjs/TGK/src/coreAdmin/dashboard/Dashboard.js';

import Operation from '../fieldAgent/operations/Operation.js';


export const routes  =(
     
            <div className="col-lg-10 col-lg-offset-2">
                <Router>
                    <Route path="/operation" component={Operation} exact />
                </Router>
            </div>
  );

// export default routes;
