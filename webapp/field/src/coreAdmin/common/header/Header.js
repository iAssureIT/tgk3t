import React,{Component}     from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render }            from 'react-dom';
import { Route , withRouter} from 'react-router-dom';
import $                     from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './Header.css';
import Rightsidebar from '../rightSidebar/Rightsidebar.js';

export default class Header extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
              loggedIn : false,
              showProfile: false,
    }
  }
   
  componentDidMount(){
     const token = localStorage.getItem("token");
     // console.log("Dashboard Token = ",token);

     // $(".dropdown").hover(            
     //    function() {
     //        $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
     //        $(this).toggleClass('open');
     //        $('b', this).toggleClass("caret caret-up");                
     //    },
     //    function() {
     //        $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
     //        $(this).toggleClass('open');
     //        $('b', this).toggleClass("caret caret-up");                
     //    });
      $("#super").click(function(){
      $("#admin").toggle();
      });
    
   
  }
    
  
openNav() {
  var currentWidth =  document.getElementById("mySidenav").style.width;
  console.log("currentWidth",currentWidth);
  document.getElementById("mySidenav").style.width = "250px";
}

closeNav() {
  var currentWidth =  document.getElementById("mySidenav").style.width;
  console.log("currentWidth",currentWidth);
  document.getElementById("mySidenav").style.width = "0";

}

toggleNav(event){
  event.preventDefault();

  var currentWidth =  document.getElementById("mySidenav").style.width;
  console.log("currentWidth",currentWidth);

  if(currentWidth == "230px")
  {
   document.getElementById("mySidenav").style.width = "0"; 
 }else{
    document.getElementById("mySidenav").style.width = "230px";
 }

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

  showData(){
    this.setState({
      showProfile : true,
    })
  }


  render(){

    return(
    <div>
            <nav className="pageHeader">
              <div className="col-lg-12 padd0">
                <div className="col-lg-6 col-md-4 col-sm-4 col-xs-4 padd0">
                  <div className="">
                    <div id="sidebarCollapse" className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hover smallmar ">
                    <i className="fa fa-bars headicon barbtn"></i>
                  </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-8 col-sm-8 col-xs-8 padd0">
                  <div className="">
                   <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center pull-right hover">
                    <i className="fa fa-cogs headicon "></i>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 pull-right text-center padd0 hover">
                    <div className="row">
                     { /*<div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 ">
                      <img src="image/person.png" className="img "/>
                      </div>*/}
                      <div className="col-lg-12 col-md-10 col-xs-6 col-sm-6 dropdown " onClick={this.showData.bind(this)}>
                      <span className="headicon">{localStorage.userRole ? localStorage.userRole : "Super Admin" } &nbsp; </span>
                      

                     
                     <span className=" topmargin ">
                        <button className="dropbtn arrowbtn" id="super">
                         <span className="hidden-xs angleright"><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                        </button>
                        { this.state.showProfile == true ? 
                        <div className="dropdown-menu wid260 marTop" id="admin" >
                            <ul className="paddleft nomargin">
                              <li className="user-header">
                                <ul className="menu paddleft">
                                  <li>
                                    <a className="noneAtag">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padd0 " > 
                                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pull-left padd0 marTop ">
                                            <img src="/images/person.png" height="50px" className=" marLeft "/>
                                          </div>
                                          <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 pull-right padd0 marTop">
                                           <h5 className=" nomargin ">
                                             {localStorage.userRole ? localStorage.userRole : "Super Admin" }
                                           </h5>
                                            <h6> {localStorage.loginUserEmail ? localStorage.loginUserEmail : "superAdmin@gmail.com" }  </h6>
                                          </div>
                                      </div>
                                    </a>
                                   <hr className="borderline marTop"/>
                                    <div className="profilefoot"> 
                                    <div>                                     
                                      <span className="pull-left">
                                       {/* <a  className=" profileTitle btnpadd " >
                                         <button type="button" className="profilebtn btn">Profile</button></a>*/}
                                      </span>
                                      <span className="pull-right">
                                        <a  className="profileTitle btnpadd" href="/login">
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

                        :
                        null
                      }
                    </span>


                    </div>


                      {/*end here*/}

                  </div>
                  </div>
                
                  <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right hover paddLeft5">
                    <i className="fa fa-bell  headicon "><span className="label label-warning labelhead ">10</span></i>
                  </div>
                </div>
              </div>
            </div>
            </nav>
          <div id="mySidenav" className="sidenav">
         {/* <a href="javascript:void(0)" className="closebtn" onClick={this.toggleNav.bind(this)} >&times;</a>
         */}<Rightsidebar/>
        </div>
      </div>
    );
  }
}
