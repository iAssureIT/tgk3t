import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter} 		from 'react-router-dom';
import { connect } 				from 'react-redux';

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



import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

import './Banner.css';

class BannerwithModal extends Component {

	constructor(){
		super();
		this.state = {
			inputData:[],
			proprtyType:"",
			transactionType:"",
			
		}
	}

	removeBackdrop(){
 		$(".modal-backdrop").remove();		
	}

	componentDidMount() {
		var formValues = {
			startRange:0,
			limitRange:6,
		}
		this.setState({
			propertyType : "Residential",
			transactionType : "Sell",
		},()=>{
			 axios
	        .post('http://qatgk3tapi.iassureit.com/api/properties/listofproperty/'+this.state.propertyType+'/'+this.state.transactionType,formValues)
	        .then( (res) =>{
	          this.setState({
	          	inputData : res.data,
	          },()=>{
	          	this.props.inputData(this.state.inputData);
	          	console.log("inputData",this.state.inputData);
	          })

	        })
	        .catch((error) =>{
	          console.log("error = ", error);
	        });	
		})
	}

	getPropertyDetails(event,){
		event.preventDefault();
		var formValues = {
			startRange:0,
			limitRange:6,
		}
		this.setState({
			propertyType : $(event.target).attr('proprty-type'),
			transactionType : $(event.target).attr('transaction-ype'),
		},()=>{
			 axios
	        .post('http://qatgk3tapi.iassureit.com/api/properties/listofproperty/'+this.state.propertyType+'/'+this.state.transactionType,formValues)
	        .then( (res) =>{
	          this.setState({
	          	inputData : res.data,
	          },()=>{
	          	this.props.inputData(this.state.inputData);
	          	console.log("inputData",this.state.inputData);
	          })

	        })
	        .catch((error) =>{
	          console.log("error = ", error);
	        });
		})
	}

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30 ">
				<div className=" col-lg-12  ">
					<h2 className="hText">EVERY DREAM HAS A KEY</h2>
					<h4 className="hText1">India's Only Property Portal sharing Brokerage with both Owners and Tenants!</h4>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-10 noPad">
					<div className=" col-lg-12 noPad">
					  <ul className="nav nav-pills textC noPad" role="tablist">
					    <li className="nav-item col-lg-3 active">
					      <a className="nav-link active textB  btn btn-bg" proprty-type="Residential" transaction-type="Sell" data-toggle="pill" href="#Buy" onClick={this.getPropertyDetails.bind(this)}>Buy</a>
					    </li>
					    <li className="nav-item col-lg-3   ">
					      <a className="nav-link active textB btn btn-bg" proprty-type="Residential" transaction-type="Rent" data-toggle="pill" href="#Rent" onClick={this.getPropertyDetails.bind(this)}>Rent</a>
					    </li>
					    <li className="nav-item col-lg-3   ">
					      <a className="nav-link active textB btn btn-bg" proprty-type="Commercial" transaction-type="Rent" data-toggle="pill" href="#Commercial" onClick={this.getPropertyDetails.bind(this)}>Commercial</a>
					    </li>	    
					  </ul>
				 	</div>
				</div>
				<div className="col-lg-5 col-lg-offset-4 col-md-6 col-md-offset-3 noPad">
					<div className="col-lg-9 noPad">
						<input type="text" placeholder="Enter Society, Location or Address" className="col-lg-12 hSearch"  />
					</div>
					<div className="col-lg-2 S-img noPad">
						<img alt=""  src="/images/TGK-key.png" className="col-lg-10 tgkImg noPad" />
					</div>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-64">
					<div className="col-lg-5 br2">
						<span className="postDetails">Welcome Owners</span>
						<button className="btn bg-primary btnPost" data-toggle="modal" data-target="#postPropertyModal"> Post & Earn</button>
						<br/>
						<span><b> Earn upto 50% Brokerage for <br/>Listing With Us!</b>
						</span>
					</div>
					<div className="col-lg-5 prText">
						<span className="postDetails ">Tenants/Buyers</span><br/>
						<p className="postDetails1"><b>Upto 50% Discount</b>
						<br/><b>On Brokerage</b>
						<br/><b>for Renting/Buying with us!</b>
						</p>
						
					</div>
				</div>


				{/*=== Modal starts here ===*/}
				<div>
					<div id="postPropertyModal" className="modal fade" role="dialog">
					  <div className="modal-dialog modal-lg">

					    <div className="modal-content">
					      <div className="modal-header">
					        <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>&times;</button>
					        <h4 className="modal-title">
					        	<b> Owners earn upto 50% brokerage by selling/renting with us so let's get started </b>
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
	}
};
// const mapDispatchToProps = (dispatch)=>{
// 	return {
// 	}
// };

export default connect(mapStateToProps)(withRouter(BannerwithModal));