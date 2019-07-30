import React, { Component } from 'react';
import $ 					from "jquery";
import {connect} 			from 'react-redux';
import { Link } 			from 'react-router-dom';

import LoginMobNum              from '../../WebsiteSecurity/LoginMobNum/LoginMobNum.js';
import LoginOtp                 from '../../WebsiteSecurity/LoginOtp/LoginOtp.js';
import WebSignupForm            from '../../WebsiteSecurity/WebSignup/WebSignupForm.js';

import'./Header.css';


class Header extends Component {


	removeBackdrop(){
 		$(".modal-backdrop").remove();		
	}	

	login(){
		const originPage = "header" ;
		this.props.loginMobNum(originPage);
	}

	logout(){
		localStorage.removeItem("uid");
		this.props.logoutMe();
	}

	render() {
		// console.log("this.props.uid",this.props.uid);
		
		console.log("uid = ",localStorage.getItem("uid") );

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad  ">
				<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-lg-offset-5">
					<a href="/"><img alt=""  src="images/Logo.png" className="hImg pull-right"/></a>
				</div>
				<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right headerMenu ">
					<nav className="navbar">
					    <ul className="nav navbar-nav">
					      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#About">ABOUT US <span className="caret"></span></a>
					        <ul className="dropdown-menu">
					          <li><a href="#pag1">Company Profile</a></li>
					          <li><a href="#pag2">Our Team</a></li>
					        </ul>
					      </li>
					      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#Contact">CONTACT US <span className="caret"></span></a>
					        <ul className="dropdown-menu">
					          <li><a href="#pag1">Contact</a></li>
					          <li><a href="#pag2">Our Locations</a></li>
					        </ul>
					      </li>

					      {localStorage.getItem("uid") ? (
					      	<li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#Profile">MY PROFILE <span className="caret"></span></a>
						        <ul className="dropdown-menu">
						          <li><Link to="/MyPostedProperties">My Listing</Link></li>
						          <li><Link to="/MyInterestedProperties">My Interests</Link></li>
						          <li><Link onClick={this.logout.bind(this)} to="/">Logout</Link></li>
						        </ul>
					      	</li>
							) : 
					      	(
					      	<li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#Profile">LOGIN <span className="caret"></span></a>
						        <ul className="dropdown-menu">
						          <li><a href="#"  data-toggle="modal" data-target="#loginModal" onClick={this.login.bind(this)}>Login</a></li>
						          <li><a href="#">Signup</a></li>
						        </ul>
					      	</li>

					      	)
					  	}
					    </ul>
					</nav>
				</div>

				{/*=== Modal starts here ===*/}
				<div>
					<div id="loginModal" className="modal fade" role="dialog">
					  	<div className="modal-dialog modal-lg">
						    <div className="modal-content">
						      <div className="modal-header">
						        <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>&times;</button>
						        <h4 className="modal-title">
						        	{/*<b> Owners earn upto 50% brokerage by selling/renting with us so let's get started </b>*/}
						        	<b> Enter Your Mobile Number to Login </b>
						        </h4>
						      </div>
						      <div className="modal-body col-lg-12">
								{ this.props.LoginMobNum 	? <LoginMobNum /> 	  : null }
								{ this.props.LoginOtp 		? <LoginOtp /> 		  : null }
								{ this.props.WebSignupForm 	? <WebSignupForm />   : null }
						      </div>

						      <div className="modal-footer">
						        {/*<button type="button" class="btn btn-primary" data-dismiss="modal">Next</button>*/}
						      </div>
						    </div>
					  	</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
  return {
	LoginMobNum 	: state.LoginMobNum,
	LoginOtp 		: state.LoginOtp,
	WebSignupForm 	: state.WebSignupForm,
    uid 			: state.uid,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
  	loginMobNum  : (originPage)=>dispatch({type: "LOGIN_MOB_NUM", originPage: originPage}),
  	logoutMe : ()=>dispatch({type: "LOGOUT_ME"}),
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(Header);