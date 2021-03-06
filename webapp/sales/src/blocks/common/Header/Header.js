import React, { Component } from 'react';
import $ 					from "jquery";
import {connect} 			from 'react-redux';
import { Link } 			from 'react-router-dom';
import { Route , Redirect, withRouter}  from 'react-router-dom';
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
		localStorage.removeItem("token");
		localStorage.removeItem("uid");
		this.props.logoutMe();
		window.location.reload();
		this.props.history.push("/SearchResults")
	}

	render() {
		// console.log("this.props.uid",this.props.uid);
		let header;

		   if(this.props.LoginMobNum){
		     header = "Enter Your Mobile Number to Login." 
		   }else if(this.props.LoginOtp){
		     header = "Please verify your mobile number." 
		   }else if(this.props.WebSignupForm){
		     header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
		   }
		
		console.log("uid = ",localStorage.getItem("uid") );

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad  ">
				<div className="col-lg-2 col-md-2 col-sm-7 col-xs-8 row   ">
					<a href="/"><img alt=""  src="/images/new/logo.png" className="hImg pull-right" title="Go to Home Page"/></a>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right headerMenu ">
					<nav className="navbar  col-lg-12 col-xs-12">
					    <ul className="nav navbar-nav customNav col-lg-12 col-sm-12">
					    	 <li className=" col-xs-6"><Link to="/AboutUs">ABOUT US</Link></li>
					   
					      {localStorage.getItem("token") ? (
					      	<li className="dropdown col-xs-6"><a className="dropdown-toggle" data-toggle="dropdown" href="#Profile">Hello {localStorage.getItem('userName')} <span className="caret"></span></a>
						        <ul className="dropdown-menu">
						          <li><Link to="/MyPostedProperties">My Listings</Link></li>
						          <li><Link to="/MyInterestedProperties">My Interests</Link></li>
						          <li><Link onClick={this.logout.bind(this)} to="/">Logout</Link></li>
						        </ul>
					      	</li>
							) : 
					      	(
					      	<li className=""><a className="" data-toggle="dropdown" href="#Profile"  data-toggle="modal" data-target="#loginModal" onClick={this.login.bind(this)}>LOGIN </a>
						       
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
						        <button type="button" className="close" title="Close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>&times;</button>
						        <h4 className="modal-title">
						        	{/*<b> Owners earn upto 50% brokerage by selling/renting with us so let's get started </b>*/}
						        	<b style={{paddingLeft:"28px"}}> {header} </b>
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