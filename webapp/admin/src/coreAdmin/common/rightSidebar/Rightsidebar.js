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

        <aside className="leftsidebar">
            <div className="wrapper">
            <nav id="sidebar1">

       <div className="sidebar-header">
            <h4>CoreAdmin Sidebar</h4>
        </div>
          {<ul className="list-unstyled components">
                   
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
                   
                    
                </ul>}

                 {/*<ul className="list-unstyled components">
                    <li className="active">
                    <a href="#">
                            <i className="glyphicon fa fa-server"></i> &nbsp;
                           CoreAdmin Sidebar
                     </a>
                    </li>

                    <li>
                        <a href="#companysetting" data-toggle="collapse" aria-expanded="false">
                            <i className="glyphicon fa fa-building"></i> &nbsp;
                             Company Settings
                        </a>
                        <ul className="collapse list-unstyled" id="companysetting">
                            <li><a href="/companysetting"> Company Settings</a></li>
                          
                        </ul>
                       

                        <a href="#notifactions" data-toggle="collapse" aria-expanded="false">
                            <i className="glyphicon fa fa-envelope"></i> &nbsp;
                           Notification Management
                        </a>
                        <ul className="collapse list-unstyled" id="notifactions">
                            <li><a href="/ViewTemplates">Notification</a></li>
                           
                        </ul>
                      
                         <a href="#userman" data-toggle="collapse" aria-expanded="false">
                            <i className="glyphicon fa fa-user-circle"></i> &nbsp;
                            User Management
                        </a>
                         <ul className="collapse list-unstyled" id="userman">
                            <li><a href="/umlistofusers">List of Users</a></li>
                           
                        </ul>
                       
                        
                    </li>


                 </ul>
*/}
                  </nav>

        </div>
 
            </aside>
      </div>
      </Router>
    );
  }
}
