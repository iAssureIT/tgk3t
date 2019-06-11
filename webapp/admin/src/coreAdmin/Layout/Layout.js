import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
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

 class Layout extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
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
              
  }

  render(){
    return(

            <div className="App container-fluid">
                <div className="row">
                  <div id="headerid" className="headerbackgroundcolor ">
                    <div className="">
                      <Header />
                   </div>
                  </div>
                  <div className="">
                    <div id="dashbordid" className="">
                      <Router>
                          <Switch>
                          <Route path="/umlistofusers" component={UMListOfUsers} exact />
                          <Route path="/umroleslist" component={UMRolesList} exact />
                          <Route path="/edituserprofile" component={EditUserProfile} exact />

                          <Route path="/ViewTemplates" component={ViewTemplates} exact />
                          <Route path="/" component={Dashboard} exact />


                          <Route path="/companysetting" component={CompanySetting} exact />
                          </Switch>        
                      </Router>
                    </div>
                  </div>
                  <div className="leftsidebarbackgroundcolor">
                    <div className="row">
                       <Leftsidebar />
                    </div>
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
                    <div className="">
                      
                   </div>
                  </div>
                </div>
            </div>
              
        );
  }
}
export default Layout;
