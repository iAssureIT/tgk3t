import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";


import './Rightsidebar.css';

export default class Rightsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
componentDidMount(){
                 
          }    
  

  render(){
    return(
      <Router>
    <div>
        <div className="sidebar-header">
            <h4>CoreAdmin Sidebar</h4>
        </div>
{/*           
          <li>
              <a href="#rightsidebar" data-toggle="collapse" aria-expanded="false">
                  
                  User Management
              </a>
              <ul className="collapse list-unstyled" id="rightsidebar">
                  <li><Link to="/umlistofusers">List of Users</Link></li>
                
              </ul>

          </li>
          {/* <a href="ViewTemplates">NotificationManagement</a> */}
          {/* <Link to="/companysetting">Company Settings</Link> */}
          {/* <Link to="/ViewTemplates">Notification Management</Link>  */}
          <ul className="list-unstyled components">
                    {/*<li className="active">
                    <a href="#">
                           
                            Dashboard
                     </a>
                    </li>*/}
                    <li>
                        <a href="#companysetting" data-toggle="collapse" aria-expanded="false">
                         
                            Company Settings
                        </a>
                        <ul className="collapse list-unstyled" id="companysetting">
                            <li><a href="/companysetting"> Company Settings</a></li>
                          
                        </ul>

                        <a href="#notifactions" data-toggle="collapse" aria-expanded="false">
                           
                           Notification Management
                        </a>
                        <ul className="collapse list-unstyled" id="notifactions">
                            <li><a href="/ViewTemplates">Notification</a></li>
                           
                        </ul>

                        <a href="#userman" data-toggle="collapse" aria-expanded="false">
                           
                           User Management
                        </a>
                        <ul className="collapse list-unstyled" id="userman">
                            <li><a href="/umlistofusers">List of Users</a></li>
                           
                        </ul>
                    </li>
                   
                    
                </ul>
      </div>
      </Router>
    );
  }
}
