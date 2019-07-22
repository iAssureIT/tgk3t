import React,{Component}                         from 'react';
import { render }                                from 'react-dom';
import { Redirect }                              from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import $                                         from "jquery";
import HomePage                                  from '../pages/HomePage/HomePage.js';
import PropertyProfile                           from '../pages/PropertyProfile/PropertyProfile.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';



 class Layout extends Component{

  render(){
       return(
        <div>
          <Router>
            <Switch>
              <Route path="/"                 exact strict component={HomePage}  />
              <Route path="/PropertyProfile"  exact strict component={PropertyProfile}  />

            </Switch>        
          </Router>
        </div>
      );
    } //render
}//class
export default Layout;