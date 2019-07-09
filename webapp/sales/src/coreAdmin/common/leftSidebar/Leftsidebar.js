import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import Header from '../header/Header.js'


import './Leftsidebar.css';

export default class Leftsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
componentDidMount(){
                 /*$(document).ready(function () {
                 $('#sidebarCollapse').on('click', function () {
                     $('#sidebar').toggleClass('active');
                 });
             });*/
          }    
  

  render(){
    return(
    <div>
            <aside className="leftsidebar">
            <div className="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h4>Sales Agent</h4>
                    <strong>PS</strong>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                    <a href="#">
                            <i className="glyphicon glyphicon-briefcase"></i>
                            Dashboard
                     </a>
                    </li>
                    <li className="">
                    <a href="/operation">
                            <i className="glyphicon glyphicon-wrench" data-toggle="collapse" aria-expanded="false"></i>
                            Operations
                     </a>
                    </li><li className="">
                    <a href="#">
                            <i className="glyphicon glyphicon-briefcase"></i>
                            Reports
                     </a>
                    </li>
                    <li>
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
                            <i className="glyphicon glyphicon-home"></i>
                            Master Data
                        </a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li><a href="/umlistofusers">Data 1</a></li>
                            <li><a href="#">Data 2</a></li>
                            <li><a href="#">Data 3</a></li>
                        </ul>

                        
                    </li>
                    
                    
                </ul>

               </nav>

        </div>
 
            </aside>
      </div>
    );
  }
}
