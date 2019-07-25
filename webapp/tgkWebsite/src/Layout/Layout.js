import React,{Component}                         from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import HomePage                                  from '../pages/HomePage/HomePage.js';
import PropertyProfile                           from '../pages/PropertyProfile/PropertyProfile.js';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import MyPostedProperties from '../blocks/MyProperties/MyPostedProperties/myPostedProperties.js';
import MyInterestedProperties from '../blocks/MyProperties/MyInterestedProperties/MyInterestedProperties.js';


 class Layout extends Component{

  render(){
       return(
        <div>
          <Router>
            <Switch>
              <Route path="/"                 exact strict component={HomePage}  />
              <Route path="/PropertyProfile"  exact strict component={PropertyProfile}  />
              <Route path="/MyPostedProperties"       exact strict component={MyPostedProperties}  />
              <Route path="/MyInterestedProperties"       exact strict component={MyInterestedProperties}  />
            </Switch>        
          </Router>
        </div>
      );
    } 
}
export default Layout;