import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './Header.css';
import Rightsidebar from '../rightSidebar/Rightsidebar.js';

export default class Header extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
              loggedIn : false,
    }
  }

   
  componentDidMount(){
     const token = localStorage.getItem("token");
     console.log("Dashboard Token = ",token);
   
  }
    
  
openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

closeNav() {
  document.getElementById("mySidenav").style.width = "0";

}

logout(){
    var token = localStorage.removeItem("token");
      if(token!==null){
      console.log("Header Token = ",token);
      this.setState({
        loggedIn : false
      })
      // browserHistory.push("/login");
      // this.props.history.push("/login");
    }
  }


  render(){
    return(
    <div>
            <header className="pageHeader">
              <div className="">
                <div className="col-lg-6 col-md-4 col-sm-4 col-xs-4 row">
                  <div className="">
                    <div id="sidebarCollapse" className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hover ">
                    <i className="fa fa-bars headicon"></i>
                  </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-8 col-sm-8 col-xs-8 ">
                  <div className="row">
                    <div onClick={this.openNav.bind(this)}className="col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right hover">
                    <i className="fa fa-cogs headicon "></i>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 pull-right hover">
                    <div className="row">
                     { <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 ">
                      <img src="image/person.png" className="img "/>
                      </div>}
                      <div className="col-lg-12 col-md-10 col-xs-6 col-sm-6 ">
                      <span className="headicon">Alexander Pierce</span>
                      

                     
                     <div className="dropdown topmargin ">
                        <button className="dropbtn arrowbtn">
                         <span className="hidden-xs angleright"><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                        </button>
                        <div className="dropdown-content" >
                            <ul className="paddleft nomargin">
                              <li className="user-header">
                                <ul className="menu paddleft">
                                  <li>
                                    <a className="noneAtag">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadd" > 
                                        <img src="images/person.png" height="40px" width="50%" className=" nopadd col-lg-3"/>
                                         <h5 className="col-lg-9 nomargin nopadd">
                                            Alexander Pierce
                                          </h5>
                                      </div>
                                    </a>
                                   <hr className="borderline"/>
                                    <div className="profilefoot"> 
                                    <div>                                     
                                      <span className="pull-left">
                                        <a  className=" profileTitle btnpadd " >
                                         <button type="button" className="profilebtn btn">Profile</button></a>
                                      </span>
                                      <span className="pull-right">
                                        <a  className="profileTitle btnpadd" >
                                        {/* <button type="button" className="profilebtn">Logout</button>*/}
                                      <button type="button" className="btn  profilebtn" onClick={this.logout.bind(this)}>Logout</button>
                                        </a>

                                     </span>  
                                    </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>                                        
                            </ul>
                        </div>
                    </div>


                    </div>


                      {/*end here*/}

                  </div>
                  </div>
                
                  <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right hover">
                    <i className="fa fa-bell  headicon "><span className="label label-warning labelhead ">10</span></i>
                  </div>
                 

                </div>
                
                
              </div>
            </div>
            </header>

          <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)} >&times;</a>
         <Rightsidebar/>
        </div>
      </div>
    );
  }
}
