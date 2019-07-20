import React, { Component }     from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import { Redirect, withRouter } from 'react-router';
import { Link }					from 'react-router-dom';

import { connect } 				from 'react-redux';


import './LoginMobNum.css';

class LoginMobNum extends Component {

	constructor(props,{match}){
			super(props);
			this.state = {
			};			
		}

		// componentWillMount(){
		// 	var param = this.props.match.params
		// 	console.log("param--->",param.id);
		// }

		handleNumber(event){
			event.preventDefault();
			var formValues = {
				mobile : this.refs.mobile.value,
				countryCode:this.refs.countryCode.value
			};
			console.log("LoginMobNum==",formValues);
			
			axios
				.post('/api/usersotp/verify_mobile',formValues)
				.then((response)=>{
					console.log("response = ",response.data);
					console.log("message = ",response.data.message);
					console.log("mobile = ",formValues.mobile);
					
					if(response.data.message == "MOBILE-NUMBER-EXISTS"){
						localStorage.removeItem("user_id");
		        		localStorage.removeItem("mobile");
		        		localStorage.removeItem("otp");	
		        		localStorage.removeItem("message");	

						localStorage.setItem("user_id",response.data.user_id);
						localStorage.setItem("mobile",response.data.mobile);
						localStorage.setItem("otp",response.data.otp);
						localStorage.setItem("message",response.data.message);
						
						console.log("response.data.message = ",response.data.message);

						this.props.mobileFound( response.data.user_id,
												response.data.mobile,
												response.data.otp,
												response.data.message
											  );

						// this.props.history.push('/LoginOtp/');

					}
					else{
						this.props.mobileNotFound(formValues.mobile);
						// this.props.mobileNumber(formValues.mobile);
						  //this.props.history.push('/WebSignupForm/'+formValues.mobile);
					}
				})
				.catch(function(error){
					console.log(error);
				})
		}

	render() {
				
		return (
				<div >
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="xyz">
					<form id="" className=" ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
						  	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-150">	
							  <div className="form-group">
							    <label htmlFor="">Please enter your Mobile No</label>
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
							      		<select ref="countryCode">
							      			<option value="+91">+91</option>
							      		</select>
				                    </div>
							    	<input type="Number" className="form-control" ref="mobile"  id="" placeholder="Mobile Number" data-text="user_mobile"/>
							  	</div>
							  </div>
						    </div>
						 <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 boxLayout1">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<img src="images/1.png" className="build_img2"/>
								</div>
								<span className="col-lg-12 formImgB">
									We charge tenants/buyers brokerage & share upto 50% with the property owners.
								</span>
						 </div>
						</div>
						  	<div className=" col-lg-2 pull-right btnNext">
							    <button type="Submit" className="btn bg-primary pull-right col-lg-11 " onClick={(this.handleNumber.bind(this))} >Next &nbsp;>> </button>
						  	</div>
					</form>
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
	}
};

const mapDispatchToProps = (dispatch)=>{
	return {
		mobileFound 	: (uid, mobile, OTP, mobFoundMsg)=> dispatch({
									type: "MOBILE_FOUND",
									uid: uid, 
									mobile: mobile, 
									OTP: OTP, 
									mobFoundMsg: mobFoundMsg
								}),
		mobileNotFound 	: (mobileNumber)=> dispatch({type: "MOBILE_NOT_FOUND",mobile: mobileNumber}),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginMobNum));