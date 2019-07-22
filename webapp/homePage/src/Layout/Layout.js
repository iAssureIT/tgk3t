import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";


import ModalBackground from '../components/ModalBackground/ModalBackground.js';
import HomePage from '../components/HomePage/HomePage.js';
import LoginMobNum from '../components/LoginMobNum/LoginMobNum.js';
import LoginOtp from '../components/LoginOtp/LoginOtp.js';
import Form1 from '../components/Form1/Form1.js';
import Form2 from '../components/Form2/Form2.js';
import Form3 from '../components/Form3/Form3.js';
import Form4 from '../components/Form4/Form4.js';
import Form5 from '../components/Form5/Form5.js';
import Form6 from '../components/Form6/Form6.js';
import WebSignupFlow from '../components/WebSignup/WebSignupFlow.js';
import WebSignupForm from '../components/WebSignup/WebSignupForm.js';
import CongratsPage from '../components/CongratsPage/CongratsPage.js';
import TransactionPage from '../components/TransactionPage/TransactionPage.js';
import Location from '../components/Location/Location.js';
import PropertyProfileView from '../components/webPage/Profile/PropertyProfileView.js';
import WebPage from '../components/webPage/HomePage/HomePage.js';
import MyPostedProperties from '../components/MyProperties/MyPostedProperties/myPostedProperties.js';

 class Layout extends Component{

  render(){
       return(
        <div>
          <Router>
            <Switch>
              <Route path="/modalBackground" exact strict component={ModalBackground}  />
              <Route path="/HomePage"        exact strict component={HomePage}  />
              <Route path="/LoginMobNum"     exact strict component={LoginMobNum}  />
              <Route path="/LoginMobNum/:id"     exact strict component={LoginMobNum}  />
              <Route path="/LoginOtp/:id" exact strict component={LoginOtp}  />
              <Route path="/LoginOtp/" exact strict component={LoginOtp}  />
              <Route path="/WebSignupFlow"    exact strict component={WebSignupFlow}  />
              <Route path="/WebSignupForm/:mobile" exact strict component={WebSignupForm}  />
              <Route path="/WebSignupForm"   exact strict component={WebSignupForm}  />
              <Route path="/Form1"       exact strict component={Form1}  />
              <Route path="/Form2"       exact strict component={Form2}  />
              <Route path="/Form3"       exact strict component={Form3}  />
              <Route path="/Form4"       exact strict component={Form4}  />
              <Route path="/Form5"       exact strict component={Form5}  />
              <Route path="/Form6"       exact strict component={Form6}  />
              <Route path="/CongratsPage"       exact strict component={CongratsPage}  />
              <Route path="/TransactionPage"       exact strict component={TransactionPage}  />
              <Route path="/Location"       exact strict component={Location}  />
              <Route path="/PropertyProfileView"       exact strict component={PropertyProfileView}  />
              <Route path="/WebPage"       exact strict component={WebPage}  />
              <Route path="/MyPostedProperties"       exact strict component={MyPostedProperties}  />
            </Switch>        
          </Router>
        </div>
      );
    } //render
}//class
export default Layout;