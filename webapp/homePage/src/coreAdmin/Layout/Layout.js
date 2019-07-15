import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";

// Section: 1 - SystemSecurity ******************************************************
import Login            from '../systemSecurity/Login.js';
import ConfirmOtp       from '../systemSecurity/ConfirmOtp.js';
import ForgotPassword   from '../systemSecurity/ForgotPassword.js';
import ResetPassword    from '../systemSecurity/ResetPassword.js';
import SignUp           from '../systemSecurity/SignUp.js';
import VerifyAccount    from '../systemSecurity/VerifyAccount.js';
// import CommonPage        from './components/layouts/CommonLayout.js';

import Header from '../common/header/Header.js'
import Footer from '../common/footer/Footer.js'
import Dashboard from '../dashboard/Dashboard.js'
import Leftsidebar from '../common/leftSidebar/Leftsidebar.js'
import Rightsidebar from '../common/rightSidebar/Rightsidebar.js'
import UMListOfUsers from '../userManagement/UM/UMListOfUsers.js';
import EditUserProfile from '../userManagement/UM/EditUserProfile.js';
import UMRolesList from '../userManagement/Roles/UMRolesList.js';
import CompanySetting from '../companysetting/Components/CompanySetting.js';
import ViewTemplates from '../NotificationManagement/ViewTemplates.jsx';

import ModalBackground from '../../components/ModalBackground/ModalBackground.js';
import HomePage from '../../components/HomePage/HomePage.js';
import LoginMobNum from '../../components/LoginMobNum/LoginMobNum.js';
import LoginOtp from '../../components/LoginOtp/LoginOtp.js';
import Form1 from '../../components/Form1/Form1.js';
import Form2 from '../../components/Form2/Form2.js';
import Form3 from '../../components/Form3/Form3.js';
import Form4 from '../../components/Form4/Form4.js';
import Form5 from '../../components/Form5/Form5.js';
import Form6 from '../../components/Form6/Form6.js';
import WebSignupFlow from '../../components/WebSignup/WebSignupFlow.js';
import WebSignupForm from '../../components/WebSignup/WebSignupForm.js';
import CongratsPage from '../../components/CongratsPage/CongratsPage.js';
import TransactionPage from '../../components/TransactionPage/TransactionPage.js';
import Location from '../../components/Location/Location.js';
import PropertyProfileView from '../../components/webPage/Profile/PropertyProfileView.js';
import WebPage from '../../components/webPage/HomePage/HomePage.js';

 class Layout extends Component{
  
  constructor(props) {
    super();
    this.state = {
      loggedIn : false,
    }
  }
   
componentDidMount(){
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           $('#sidebar').toggleClass('active');
       });
    });
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           $('#headerid').toggleClass('headereffect');
       });
    });
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           $('#dashbordid').toggleClass('dashboardeffect');
       });
    });
    const token = localStorage.getItem("token");
    console.log("Dashboard Token = ",token);
    if(token!==null){
    console.log("*********===***********imin ",token);
      this.setState({
        loggedIn : true
      })
    }
              
  }

  /*logout(){
    var token = localStorage.removeItem("token");
      if(token!==null){
      console.log("Header Token = ",token);
      this.setState({
        loggedIn : false
      })
      // browserHistory.push("/login");
      // this.props.history.push("/login");
    }
  }*/

  render(){
    {console.log("loggedIn status layput = ", this.state.loggedIn)}
    if(this.state.loggedIn===false){
      return(
            <div className="App container-fluid">
                <div className="row">
                  {/*<div id="headerid" className="headerbackgroundcolor ">
                    <div className="">
                      <Header />
                   </div>
                  </div>
                  */}<div className="">                  
                    <div id="dashbordid" className="container-fluid">
{/*                      <button className="btn btn-primary pull-right" onClick={this.logout.bind(this)}>Logout</button>
*/}                      <Router>
                          <Switch>
                          <Route path="/umlistofusers" component={UMListOfUsers} exact />
                          <Route path="/umroleslist" component={UMRolesList} exact />
                          <Route path="/edituserprofile" component={EditUserProfile} exact />

                          <Route path="/ViewTemplates" component={ViewTemplates} exact />
                          <Route path="/dashboard" component={Dashboard} exact />
                          <Route path="/companysetting" component={CompanySetting} exact />

                         { /*<Route path="/HomePage" component={HomePage} exact />
                          <Route path="/Form1" component={Form1} exact />
                          <Route path="/Form2" component={Form2} exact />
                          <Route path="/Form3" component={Form3} exact />
                          <Route path="/Form4" component={Form4} exact />
                          <Route path="/Form5" component={Form5} exact />
                          <Route path="/Form6" component={Form6} exact />*/}



                          
                          </Switch>        
                      </Router>
                    </div>
                  </div>
                  {/*<div className="leftsidebarbackgroundcolor">
                    <div className="row">
                       <Leftsidebar />
                   </div>
                  </div>*/}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                    <div className="">
                   </div>
                  </div>
                </div>
            </div> 
        );
    }else{
       return(
        <div>
          <Router>
            <Switch>
              <Route path="/"                exact strict component={ Login } />
              <Route path="/login"           exact strict component={ Login } />
              <Route path="/signup"          exact strict component={ SignUp } />
              <Route path="/forgot-pwd"      exact strict component={ ForgotPassword } />
              <Route path="/reset-pwd"       exact strict component={ ResetPassword } />
              <Route path="/verify-account"  exact strict component={ VerifyAccount } />
              <Route path="/confirm-otp"     exact strict component={ ConfirmOtp } />
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

            </Switch>        
          </Router>
        </div>
      );
    }
  }
}
export default Layout;
