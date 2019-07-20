import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import {withRouter} from 'react-router-dom';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';
import LoginMobNum from '../LoginMobNum/LoginMobNum.js';
import LoginOtp from '../LoginOtp/LoginOtp.js';
import WebSignupForm from '../WebSignup/WebSignupForm.js';

import BasicInfo from '../BasicInfo/BasicInfo.js';

import PropertyDetails from '../PropertyDetails/PropertyDetails.js';

import Financials from '../Financials/Financials.js';

import Amenities from '../Amenities/Amenities.js';

import Availability from '../Availability/Availability.js';

import Location from '../Location/Location.js';




import './Banner.css';


class Banner extends Component {
	redirectToForm(event){
		 $('#LoginMobNum').show();
		// this.props.history.push('/LoginMobNum');
	}
	handleColor(){
		 $("#Buy").toggleClass("intro");
	}
	  componentDidMount() {

    
      

      // Get the modal
  var modal = document.getElementById('LoginMobNum');
  // var modal = document.getElementById('SignupModal');
  // var modal = document.getElementById('ForgotPasswordModal');
  // var modal = document.getElementById('ResetPasswordModal');
  // var modal = document.getElementById('OTPVerificationModal');

// Get the button that opens the modal
//var btn = document.getElementById("loginicon");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("loginmodalclose")[0];
// var span = document.getElementsByClassName("signupmodalclose")[0];
// var span = document.getElementsByClassName("forgetpassmodalclose")[0];
// var span = document.getElementsByClassName("resetpassmodalclose")[0];
// var span = document.getElementsByClassName("otpvermodalclose")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
//  }

 //When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none"; 
    }
    
// When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }
    
  }
  modalClose(event){
    event.preventDefault();
	this.props.history.push("/HomePage");
  }
	render() {
		return (
			<div>

					<div id="LoginMobNum" className="modal ssmodal">
                    <span className="loginmodalclose"  onClick={this.modalClose.bind(this)}>X</span>
                        <LoginMobNum />
                    </div>

                    <div id="LoginOtp" className="modal ssmodal">
                    <span className="signupmodalclose">X</span>
                        <LoginOtp />
                    </div>

                    <div id="WebSignupForm" className="modal ssmodal">
                    <span className="forgetpassmodalclose">X</span>
                        <WebSignupForm />
                    </div>

                    <div id="BasicInfo" className="modal ssmodal">
                    <span className="resetpassmodalclose">X</span>
                    	<BasicInfo />
                    </div>
					<div id="PropertyDetails" className="modal ssmodal">
                    <span className="resetpassmodalclose">X</span>
                    	<PropertyDetails />
                    </div>
					<div id="Financials" className="modal ssmodal">
                    <span className="resetpassmodalclose">X</span>
                    	<Financials />
                    </div>
					<div id="Amenities" className="modal ssmodal">
                    <span className="resetpassmodalclose">X</span>
                    	<Amenities />
                    </div>
					<div id="Availability" className="modal ssmodal">
                    <span className="resetpassmodalclose">X</span>
                    	<Availability />
                    </div>
					<div id="Location" className="modal ssmodal">
                    <span className="resetpassmodalclose">X</span>
                    	<Location />
                    </div>



			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb90">
				
				<div className=" col-lg-12  ">
					<h2 className="hText">EVERY DREAM HAS A KEY</h2>
					<h4 className="hText1">India's Only Property Portal sharing Brokerage with both Owners and Tenants!</h4>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-10">
					<button id="Buy" 		className="col-lg-3 btn btn-bg" onClick={this.handleColor.bind(this)}>Buy</button>
					<button id="Rent" 		className="col-lg-3 btn btn-bg ml-10">Rent</button>
					<button id="Commercial" className="col-lg-3 btn btn-bg ml-10">Commercial</button>
				</div>
				<div className="col-lg-5 col-lg-offset-3">
					<div className="col-lg-10">
						<input type="text" placeholder="  Enter Society, Location or Address" className="hSearch"  />
					</div>
					<div className="col-lg-1 S-img">
						<div className=" col-lg-12 S-img1 ">
							<img src="/images/TGK-key.png" />
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-64">
					<div className="col-lg-5 br2">
						<span className="postDetails">Welcome Owners</span>
						<button className="btn bg-primary btnPost" onClick={this.redirectToForm.bind(this)}> Post & Earn</button>
						<br/>
						<span><b> Earn upto 50% Brokerage for <br/>Listing With Us!</b>
						</span>
					</div>
					<div className="col-lg-5 prText">
						{/*<span className="postDetails ">Tenants/Buyers</span><br/>
						<span className="postDetails1"><b>Upto 50% Discount </b></span>
						<span className="postDetails2"><b>On Brokerage</b></span>
						<span className="postDetails3"><b>for Renting/Buying with us!</b></span>*/}
						<span className="postDetails ">Tenants/Buyers</span><br/>
						<p className="postDetails1"><b>Upto 50% Discount</b>
						<br/><b>On Brokerage</b>
						<br/><b>for Renting/Buying with us!</b>
						</p>
						
					</div>
				</div>
			</div>
			</div>
		);
	}
}
export default withRouter(Banner);