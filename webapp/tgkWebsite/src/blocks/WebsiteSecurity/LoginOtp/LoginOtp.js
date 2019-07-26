import React, { Component }     from 'react';
import swal                     from 'sweetalert';
import {withRouter}    from 'react-router-dom';
import { connect } 				from 'react-redux';


import '../LoginOtp/LoginOtp.css';

class LoginOtp extends Component {
	constructor(props){
			super(props);
			this.state = {
			};			
		}

	handleNumber(event){
		event.preventDefault();

		var userOTP = this.refs.otp.value;
		if(userOTP!==""){
			if(parseInt(userOTP) === parseInt(this.props.OTP)){
				if(this.props.message === "NEW-USER-CREATED"){
					this.props.redirectToBasicInfo(this.props.uid);
				}else{
					this.props.history.push("/MyPostedProperties/"+this.props.uid);
				}
			}else{
				swal("","Sorry, Your OTP is not Matching! Please try again!!","error");
			}
		}else{
			swal("Please enter OTP", "", "warning");
	        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
		}
		
	}

	render() {
		
		return (
			<div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<form id="" className=" ">
						<div className="hr_border row"></div>
						
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
						  	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">	
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-50 headline">
								We have sent you an OTP for verification, please enter your OTP to continue
							</div>
							  <div className="form-group mt-150">
							    <label htmlFor="">Kindly Enter Your Verification Code </label>
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-building iconClr"></i>
				                    </div>
							    	<input type="number" className="form-control" ref="otp"  id="" placeholder="Verification Code" data-text="user_mobile"/>
							  	</div>
							  </div>
						    </div>
						 <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 boxLayout1">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<img alt=""  src="/images/1.png" className="build_img2"/>
								</div>
								<span className="col-lg-12 formImgB">
									We charge tenants/buyers brokerage & share upto 50% with the property owners.
								</span>
						 </div>
						</div>
						  	<div className=" col-lg-2 pull-right btnNext">
							    <button type="Submit" className="btn bg-primary pull-right col-lg-11 " onClick={(this.handleNumber.bind(this))} >Next &nbsp; >> </button>
						  	</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
	console.log('signUp',state);
	return {
		OTP 		: state.OTP,
		message 	: state.mobFoundMsg,
		uid  	 	: state.uid,
	}
};

const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToBasicInfo  : (uid)=> dispatch({type: "REDIRECT_TO_BASIC_INFO",
												 uid : uid,
		}),
	}
};

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginOtp));