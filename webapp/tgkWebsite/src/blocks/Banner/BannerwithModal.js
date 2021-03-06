
import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter} 		    from 'react-router-dom';
import { connect } 				from 'react-redux';
// import OwlCarousel             from 'react-owl-carousel';
import swal                     from 'sweetalert';

import LoginMobNum              from '../WebsiteSecurity/LoginMobNum/LoginMobNum.js';
import LoginOtp                 from '../WebsiteSecurity/LoginOtp/LoginOtp.js';
import WebSignupForm            from '../WebsiteSecurity/WebSignup/WebSignupForm.js';

import BasicInfo                from '../PostProperty/BasicInfo/BasicInfo.js';
import PropertyDetails          from '../PostProperty/PropertyDetails/PropertyDetails.js';
import Financials               from '../PostProperty/Financials/Financials.js';
import Amenities                from '../PostProperty/Amenities/Amenities.js';
import Availability             from '../PostProperty/Availability/Availability.js';
import Location                 from '../PostProperty/Location/Location.js';

import CongratsPage             from '../PostProperty/CongratsPage/CongratsPage.js';
import ImageUpload              from '../PostProperty/ImageUpload/ImageUpload.js';
import SearchProperty           from '../SearchProperty/SearchProperty.js';

import './Banner.css';

class BannerwithModal extends Component {

	constructor(){
		super();
		this.state = {
			inputData		: [],
			propertyType 	: "",
			transactionType : "",			
		}
	}

	login(){
		const originPage = "post" ;
		const uid = localStorage.getItem("uid");
		console.log("uid=====",uid)
		if(uid){
			this.props.already_loggedIn(originPage,uid);
		}else{
			this.props.login_mobileNum(originPage);
		}
	}

	removeBackdrop(){
 		$(".modal-backdrop").remove();
   		window.location.reload();
	}

	componentDidMount() {

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

          var formValues = {
            propertyType    : "Residential",
            transactionType : "Sell",
            startRange      : 0,
            limitRange      : 6,
            listing         :true,
            uid : localStorage.getItem("uid")
          }

         // console.log("formValues = ", formValues);
         axios
            .post('/api/properties/post/list',formValues)
            .then(resultData =>{
              	console.log("resultData",resultData);
		        this.setState({
		          	inputData : resultData.data,
		        },()=>{
		          	this.props.inputData(this.state.inputData);
		        })
            })
            .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
							localStorage.removeItem("uid");
							localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
            });




		this.props.setFormTitle("Owners earn upto 50% brokerage by selling/renting with us so let's get started");

	}

	getPropertyDetails(event,){
		event.preventDefault();

		this.setState({
			propertyType : $(event.target).attr('property-type'),
			transactionType : $(event.target).attr('transaction-type'),
		})

		var formValues = {
			propertyType : $(event.target).attr('property-type'),
			transactionType : $(event.target).attr('transaction-type'),
			startRange:0,
			limitRange:6,
			listing:true,
			uid : localStorage.getItem("uid")
		}

		  axios
            .post('/api/properties/post/list',formValues)
            .then(resultData =>{
              	console.log("resultData",resultData);
		        this.setState({
		          	inputData : resultData.data,
		        },()=>{
		          	this.props.inputData(this.state.inputData);
		        })
            })
            .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
							localStorage.removeItem("uid");
							localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
            });
	}
	
	inputData(inputData){
		this.setState({
			propertyType    : inputData.propertyType,
			transactionType : inputData.transactionType,
		})

		var formValues = {
			startRange:0,
			limitRange:6,
			propertyType    : inputData.propertyType,
			transactionType : inputData.transactionType,
			listing:true,
			uid : localStorage.getItem("uid")
		}

		 axios
        .post('/api/properties/post/list',formValues)
        .then(resultData =>{
          	console.log("resultData",resultData);
	        this.setState({
	          	inputData : resultData.data,
	        },()=>{
	          	this.props.inputData(this.state.inputData);
	        })
        })
        .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
							localStorage.removeItem("uid");
							localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
        });
	}

	render() {
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
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 banner">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hidden-sm hidden-xs">
					<h2 className="hText">EVERY DREAM HAS A KEY</h2>
					<h4 className="hText1">India's Only Property Portal sharing Brokerage with both Owners and Tenants!</h4>
				</div>
				{/*resp*/}
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hidden-lg hidden-md ">
					<h3 className="hText">EVERY DREAM HAS A KEY</h3>
					<h5 className="hText1">India's Only Property Portal sharing Brokerage with both Owners and Tenants!</h5>
				</div>
				{/*end*/}
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-lg-offset-3">
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPad banner ml-1">
					  {/*<ul className="nav nav-pills textC" role="tablist">
					    <li className="nav-item col-lg-4 col-md-4 col-sm-4 col-xs-3 active">
					      <a className="nav-link active btn-bg" property-type="Residential" transaction-type="Sell" data-toggle="pill" href="#Buy" onClick={this.getPropertyDetails.bind(this)}>Buy</a>
					    </li>
					    <li className="nav-item col-lg-4 col-md-4 col-sm-4 col-xs-4">
					      <a className="nav-link active btn-bg" property-type="Residential" transaction-type="Rent" data-toggle="pill" href="#Rent" onClick={this.getPropertyDetails.bind(this)}>Rent</a>
					    </li>
					    <li className="nav-item col-lg-4 col-md-4 col-sm-5 col-xs-5">
					      <a className="nav-link active btn-bg" property-type="Commercial" transaction-type="Sell"  data-toggle="pill" href="#Commercial" onClick={this.getPropertyDetails.bind(this)}>Commercial</a>
					    </li>	    
					  </ul>*/}

						<ul className="nav nav-tabs col-xs-12 textC noPad hidden-xs hidden-sm">
	  						<li className="active col-xs-2 noPad borderTab "><a data-toggle="tab" property-type="Residential" transaction-type="Sell" href="#Buy" onClick={this.getPropertyDetails.bind(this)}><b>BUY</b></a></li>
							<li className="bannerTab col-xs-2 noPad borderTab "><a data-toggle="tab" property-type="Residential" transaction-type="Rent" href="#Rent" onClick={this.getPropertyDetails.bind(this)}><b>RENT</b></a></li>
							<li className="col-xs-3 noPad borderTab "><a style={{paddingLeft:"5px"}} data-toggle="tab" property-type="Commercial" transaction-type="Sell"  href="#Commercial" onClick={this.getPropertyDetails.bind(this)}><b>COMMERCIAL</b></a></li>
							<li className="col-xs-4 noPad borderTab pointer"><a style={{paddingLeft:"5px"}} data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}><b>POST & EARN</b></a></li>
							{/*<button className="col-xs-3 borderTab noPad btn bannerBtn" data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}><b>POST & EARN</b></button>*/}
							{/*<li className="col-xs-3"><a data-toggle="tab" href="#menu2">Post & Earn</a></li>*/}
						</ul>
						{/*resp*/}
							<ul className="nav nav-tabs col-xs-12 textC1 noPad hidden-lg hidden-md">
	  						<li className="active col-xs-2 noPad borderTab "><a data-toggle="tab" property-type="Residential" transaction-type="Sell" href="#Buy" onClick={this.getPropertyDetails.bind(this)}><b>BUY</b></a></li>
							<li className="bannerTab col-xs-2 noPad borderTab "><a data-toggle="tab" property-type="Residential" transaction-type="Rent" href="#Rent" onClick={this.getPropertyDetails.bind(this)}><b>RENT</b></a></li>
							<li className="col-xs-3 noPad borderTab "><a style={{paddingLeft:"5px"}} data-toggle="tab" property-type="Commercial" transaction-type="Sell"  href="#Commercial" onClick={this.getPropertyDetails.bind(this)}><b>COMMERCIAL</b></a></li>
							<li className="col-xs-4 noPad borderTab pointer "><a style={{paddingLeft:"5px"}} data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}><b>POST & EARN</b></a></li>
							
							{/*<button className="col-xs-3 borderTab noPad btn bannerBtn1" data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}><b>POST & EARN</b></button>
							<li className="col-xs-3"><a data-toggle="tab" href="#menu2">Post & Earn</a></li>*/}
						</ul>
						{/*end*/}

				 	</div>
				</div>
				<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 mb-30 mt-1">
					<SearchProperty propertyType={this.state.propertyType} transactionType={this.state.transactionType} inputData={this.inputData.bind(this)}/>
				</div>
				<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 hidden-xs hidden-sm">
					{/*<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 br2">
											<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 postDetails">Welcome Owners</span>
											<br/>
											<button className="postBtn" data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}><span> Post & Earn</span></button>
											<br/>
											<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><b> Earn upto 50% Brokerage for <br/>Listing With Us!</b>
											</span>
										</div>
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 prText">
											<span className="postDetails ">For our Buyers / Tenants</span><br/>
											<p className="postDetails1"><b>Upto 50% Discount</b>
											<br/><b>On Brokerage <br/>for Renting/Buying with us!</b>
					
											</p>
											
										</div>*/}
					{/*<div className="col-lg-6 col-lg-offset-3 welcomeText">Welcome Owners</div>*/}
					
					<div className="col-lg-10 col-lg-offset-1">
						<div className="col-lg-2 earn">
							EARN 
						</div>
						<div className="col-lg-3 ownerBox noPad">
							<div className="col-lg-12 noPad">
								<h1 className="discount col-lg-12 row"><div className="smallText">Upto</div>50%</h1>
							</div>
							
						</div>
						<div className="col-lg-7 ">
							<h1 className="hText2">BROKERAGE FOR</h1>
							<h1 className="hText21">LISTING WITH US</h1>
						</div>
					</div>
					<hr className="col-lg-8 col-lg-offset-2 hrLineOwner"/>
					<div className="col-lg-12 hText3">Upto 50% Discount On Brokerage For Tenants/Buyers</div>
				</div>	
				{/*resp*/}
					<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 hidden-lg hidden-md ">
						{/*<div className="col-lg-6 col-lg-offset-3 col-xs-12 welcomeText1">Welcome Owners</div>*/}
						
						<div className="col-lg-10 col-lg-offset-1">
							<div className="col-lg-2 col-xs-3 earn1">
								EARN 
							</div>
							<div className="col-lg-3 col-xs-3 ownerBox1 noPad">
								<div className="col-lg-12 noPad">
									<h1 className="discount1 col-lg-12 row"><div className="smallText1">Upto</div>50%</h1>
								</div>
								
							</div>
							<div className="col-lg-7 col-xs-8 ">
								<h1 className="hText2R">BROKERAGE FOR</h1>
								<h1 className="hText21R">LISTING WITH US</h1>
							</div>
						</div>
						<hr className="col-lg-8 col-lg-offset-2 col-xs-10 col-xs-offset-1 "/>
						<div className="col-lg-12 hText3R col-xs-12">Upto 50% Discount On Brokerage For Tenants/Buyers</div>
					</div>	
				{/*end*/}

				{/*=== Modal starts here ===*/}
				<div>
					<div id="postPropertyModal" className="modal fade" role="dialog">
					  <div className="modal-dialog modal-lg">

					    <div className="modal-content "style={{marginTop:"52px"}}>
					      <div className="modal-header">
					        <button type="button" className="close" title="Close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>X</button>
					        <h4 className="modal-title">
					        	<b style={{paddingLeft:"28px"}}> {header} </b>
					        </h4>
					      </div>

					      <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
	// console.log("state",state)
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
		setFormTitle  : (formTitle)=> dispatch({
													type    	: "SET_FORM_TITLE",
													formTitle	: formTitle,
												}),
  		login_mobileNum  : (originPage)=>dispatch({type: "LOGIN_MOB_NUM", originPage: originPage}),
  		already_loggedIn : (originPage,uid)=>dispatch({type: "ALREADY_LOGGEDIN", originPage: originPage, uid:uid}),

	}
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BannerwithModal));
