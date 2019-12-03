import React, { Component } 			from 'react';
import $ 								from "jquery";
import {connect} 						from 'react-redux';
import { Link } 						from 'react-router-dom';
import { Route , Redirect, withRouter}  from 'react-router-dom';
import LoginMobNum              		from '../../WebsiteSecurity/LoginMobNum/LoginMobNum.js';
import LoginOtp                 		from '../../WebsiteSecurity/LoginOtp/LoginOtp.js';
import WebSignupForm            		from '../../WebsiteSecurity/WebSignup/WebSignupForm.js';
import BasicInfo                        from '../../PostProperty/BasicInfo/BasicInfo.js';
import PropertyDetails                  from '../../PostProperty/PropertyDetails/PropertyDetails.js';
import Financials                       from '../../PostProperty/Financials/Financials.js';
import Amenities                		from '../../PostProperty/Amenities/Amenities.js';
import Availability             		from '../../PostProperty/Availability/Availability.js';
import Location                 		from '../../PostProperty/Location/Location.js';

import CongratsPage             		from '../../PostProperty/CongratsPage/CongratsPage.js';
import ImageUpload              		from '../../PostProperty/ImageUpload/ImageUpload.js';
import SearchProperty           		from '../../SearchProperty/SearchProperty.js';

import'./Header.css';


class Header extends Component {


	removeBackdrop(){
 		$(".modal-backdrop").remove();
   		window.location.reload();
	}	

	login(val){
		const originPage = "header" ;
		this.props.loginMobNum(originPage);
	}

	postLogin(){
		const originPage = "post" ;
		const uid = localStorage.getItem("uid");
		if(uid){
			this.props.already_loggedIn(originPage,uid);
		}else{
			this.props.loginMobNum(originPage);
		}
	}

	logout(){
		localStorage.removeItem("token");
		localStorage.removeItem("uid");
		this.props.logoutMe();
		window.location.reload();
		this.props.history.push("/SearchResults")
	}

	myFunction(x) {
  		x.classList.toggle("change");
	}
	componentDidMount(){
		
    $('#nav-icon1').click(function(){
	 	$(this).toggleClass('open');
	 });

	}
	openMenu(event){
		
	 console.log("Inopen")
 		//$(this).toggleClass('open');
		$(".showClass").toggleClass('hideClass');
		// $(".showClass1").toggleClass('hideClass');
		 // $(".showClass").addClass("hideClass");
		 /*$('#nav-icon1').click(function(){
		 $(this).toggleClass('open');
 });*/

	}
	openMenu1(event){
		
	 console.log("Inopen")
		$(".showClass1").toggleClass('hideClass');

	}
	handleContact(event){
		window.scrollTo(0,2300);
	}
	handleContact1(event){
		window.scrollTo(0,4700);
	}

	render() {
		// console.log("this.props.uid",this.props.uid);
			let header;
			// console.log("this.props.CongratsPage",this.props.CongratsPage);
		   if (this.props.BasicInfo) {
		      header = "Let's provide details of your property ";
		   }else if(this.props.Location){
		     header = "Please provide location of your property"; 
		   }else if(this.props.PropertyDetails){
		     header = "Let's provide details of your property"; 
		   }else if(this.props.Amenities){
		     header = "My property has following Amenities"; 
		   }else if(this.props.Financials){
		     header = "Please provide financial details of your property"; 
		   }else if(this.props.Availability){
		     header = "Please tell us your availability to plan visit"; 
		   }else if(this.props.ImageUpload){
		     header = "Please Upload Images and a Video of your property"; 
		   }
		   else if(this.props.LoginMobNum){
		     header = "Enter Your Mobile Number to Login." 
		   }else if(this.props.LoginOtp){
		     header = "Please verify your mobile number." 
		   }else if(this.props.WebSignupForm){
		     header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
		   }
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad  ">
				<div className="col-lg-2 col-md-2 col-sm-7 col-xs-4 row   ">
					<a href="/"><img alt=""  src="/images/new/logo.png" className="hImg pull-right" title="Go to Home Page"/></a>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-8 pull-right headerMenu hidden-xs hidden-sm">
					{/*<nav className="navbar  col-lg-12 col-xs-12">
										    <ul className="nav navbar-nav customNav col-lg-12 col-sm-12">
											<button className="col-lg-4 col-lg-offset-5 col-xs-6 col-xs-offset-3 btn postAndEarnBtn" data-toggle="modal" data-target="#postPropertyModal" onClick={this.postLogin.bind(this)}>Post & Earn</button>
										    	<span className="headerName col-md-6">{localStorage.getItem("token") ? "Hello " +localStorage.getItem('userName') : "Hello Guest" }</span>	 
										    		 
										      {localStorage.getItem("token") ? (
										      	<li className="dropdown col-lg-2 col-xs-3 pull-right ">
										      		<div className="nav-icon dropdown-toggle col-lg-12" data-toggle="dropdown" >
													  <div></div>
													</div>
											        <ul className="dropdown-menu ">
										    			<li className="" style={{"paddingLeft":"30px"}}>{ "Hello " +localStorage.getItem('userName')} </li>	 
											          	<hr className="hrLine1 col-lg-9"/>
											          	<li><Link to="/MyPostedProperties">My Listings</Link></li>
											          	<li><Link to="/MyInterestedProperties">My Interests</Link></li>
											          	<li><Link to="/AboutUs">About Us</Link></li>
											          	<li onClick={this.handleContact.bind(this)} style={{"paddingLeft":"30px","fontSize":"12px","cursor":"pointer"}}>Contact Us</li>
											          	<li><Link onClick={this.logout.bind(this)} to="/">Logout</Link></li>
											        </ul>
										      	</li>
												) : 
										      	(
										      	<li className="dropdown col-lg-2 col-xs-3 pull-right ">
										      		<div className="nav-icon dropdown-toggle col-lg-12" data-toggle="dropdown" >
													  <div></div>
													</div>
											        <ul className="dropdown-menu ">
										    			<li className="" style={{"paddingLeft":"30px"}}>Hello Guest</li>	 
											          	<hr className="hrLine1 col-lg-9"/>
											          	<li><a className="" data-toggle="dropdown" href="#Profile"  data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}>Login</a></li>
											          	<li><Link to="/AboutUs">About Us</Link></li>
											          	<li onClick={this.handleContact.bind(this)} style={{"paddingLeft":"30px","fontSize":"12px","cursor":"pointer"}}>Contact Us</li>
											        </ul>
										      	</li>
										      	)
										  	}
										    </ul>
										</nav>*/}
					<ul className=" col-lg-12 col-sm-12 ">
							<button className="col-lg-4 col-lg-offset-5 col-xs-7 btn postAndEarnBtn" data-toggle="modal" data-target="#postPropertyModal" onClick={this.postLogin.bind(this)}>Post & Earn</button>
						    		 
						      {localStorage.getItem("token") ? (
						      	<li className=" col-lg-6 col-xs-10 noPad showClass1">
							        <ul className="loginList col-xs-11 col-lg-10">
						    			<li className="" style={{"paddingLeft":"30px","listStyle":"none","color":"#337ab7"}}>{ "Hello " +localStorage.getItem('userName')} </li>	 
							          	<hr className="hrLine1 col-xs-11"/>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link to="/MyPostedProperties">My Listings</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link to="/MyInterestedProperties">My Interests</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link to="/AboutUs">About Us</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link onClick={this.logout.bind(this)} to="/">Logout</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link onClick={this.handleContact1.bind(this)} >Contact Us</Link></li>
							        	{/*<li onClick={this.handleContact.bind(this)} style={{"paddingLeft":"30px","fontSize":"12px","cursor":"pointer"}}>Contact Us</li>*/}
							        </ul>
						      	</li>
								) 
						      : 
						      	(
						      	<li className=" col-lg-2 col-xs-10 noPad showClass">
							        <ul className=" col-xs-11">
						    			<li className="" style={{"paddingLeft":"30px","listStyle":"none","color":"#337ab7"}}>Hello Guest</li>	 
							          	<hr className="hrLine1 col-xs-11"/>
							          	<li style={{"listStyle":"none"}}><a className="" data-toggle="dropdown" href="#Profile"  data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}>Login</a></li>
							          	<li style={{"listStyle":"none"}}><Link to="/AboutUs">About Us</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link onClick={this.handleContact1.bind(this)} >Contact Us</Link></li>
							        	
							        </ul>
						      	</li>
						      	)
						  	}
						</ul>
						<div id="nav-icon2" onClick={this.openMenu1.bind(this)}>
						  <span></span>
						  <span></span>
						  <span></span>
						</div>	
				</div>
				{/*=======================resp===============*/}
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-8 pull-right headerMenu hidden-lg hidden-md ">
						<ul className=" col-lg-12 col-sm-12 ">
							<button className="col-lg-4 col-lg-offset-5 col-xs-7 btn postAndEarnBtn" data-toggle="modal" data-target="#postPropertyModal" onClick={this.postLogin.bind(this)}>Post & Earn</button>
						    		 
						      {localStorage.getItem("token") ? (
						      	<li className=" col-lg-2 col-xs-10 noPad showClass ">
							        <ul className="loginList col-xs-11">
						    			<li className="" style={{"paddingLeft":"30px","listStyle":"none","color":"#337ab7"}}>{ "Hello " +localStorage.getItem('userName')} </li>	 
							          	<hr className="hrLine1 col-xs-11"/>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link to="/MyPostedProperties">My Listings</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link to="/MyInterestedProperties">My Interests</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link to="/AboutUs">About Us</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link onClick={this.logout.bind(this)} to="/">Logout</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link onClick={this.handleContact1.bind(this)} >Contact Us</Link></li>
							        	{/*<li onClick={this.handleContact.bind(this)} style={{"paddingLeft":"30px","fontSize":"12px","cursor":"pointer"}}>Contact Us</li>*/}
							        </ul>
						      	</li>
								) 
						      : 
						      	(
						      	<li className=" col-lg-2 col-xs-10 noPad showClass">
							        <ul className=" col-xs-11">
						    			<li className="" style={{"paddingLeft":"30px","listStyle":"none","color":"#337ab7"}}>Hello Guest</li>	 
							          	<hr className="hrLine1 col-xs-11"/>
							          	<li style={{"listStyle":"none"}}><a className="" data-toggle="dropdown" href="#Profile"  data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}>Login</a></li>
							          	<li style={{"listStyle":"none"}}><Link to="/AboutUs">About Us</Link></li>
							          	<li className="col-xs-12" style={{"listStyle":"none"}}><Link onClick={this.handleContact1.bind(this)} >Contact Us</Link></li>
							        	
							        </ul>
						      	</li>
						      	)
						  	}
						</ul>
						<div id="nav-icon1" onClick={this.openMenu.bind(this)}>
						  <span></span>
						  <span></span>
						  <span></span>
						</div>				
						
				</div>
				{/*=====================end==============================*/}

				{/*=== Modal starts here ===*/}
				<div>
					<div id="postPropertyModal" className="modal fade" role="dialog">
					  	<div className="modal-dialog modal-lg">
						    <div className="modal-content">
						      <div className="modal-header">
						        <button type="button" className="close" title="Close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>X</button>
						        <h4 className="modal-title">
						        	{/*<b> Owners earn upto 50% brokerage by selling/renting with us so let's get started </b>*/}
						        	<b style={{paddingLeft:"28px"}}> {header} </b>
						        </h4>
						      </div>
						      <div className="modal-body col-lg-12">
								{ this.props.LoginMobNum 	? <LoginMobNum /> 	  : null }
								{ this.props.LoginOtp 		? <LoginOtp /> 		  : null }
								{ this.props.WebSignupForm 	? <WebSignupForm />   : null }
						      	{ this.props.BasicInfo 		? <BasicInfo /> 	  : null }
								{ this.props.PropertyDetails? <PropertyDetails /> : null }
								{ this.props.Financials 	? <Financials /> 	  : null }
								{ this.props.Amenities 		? <Amenities /> 	  : null }
								{ this.props.Availability 	? <Availability /> 	  : null }
								{ this.props.Location		? <Location /> 		  : null }
								{ this.props.CongratsPage	? <CongratsPage /> 	  : null }
								{ this.props.ImageUpload	? <ImageUpload /> 	  : null }
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
	BasicInfo		: state.BasicInfo,
	PropertyDetails	: state.PropertyDetails,
	Financials		: state.Financials,
	Amenities		: state.Amenities,
	Availability	: state.Availability,
	Location	 	: state.Location,
	ImageUpload     : state.ImageUpload,
	CongratsPage    : state.CongratsPage,
	formTitle 	    : state.formTitle
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
  	loginMobNum  : (originPage)=>dispatch({type: "LOGIN_MOB_NUM", originPage: originPage}),
  	logoutMe : ()=>dispatch({type: "LOGOUT_ME"}),
  	already_loggedIn : (originPage,uid)=>dispatch({type: "ALREADY_LOGGEDIN", originPage: originPage, uid:uid}),
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(Header);