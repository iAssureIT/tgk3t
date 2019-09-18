import React, { Component }     from 'react';
import swal                     from 'sweetalert';
import $ 						from "jquery";
import {withRouter}    			from 'react-router-dom';
import { connect } 				from 'react-redux';
import axios 					from 'axios';


import '../LoginOtp/LoginOtp.css';

class LoginOtp extends Component {
	constructor(props){
			super(props);
			this.state = {
			};			
		}

	componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

      console.log("here otp");
  	}



	removeBackdrop(){
 		$(".modal-backdrop").remove();		
	}
	

	handleNumber(event){
		event.preventDefault();
		// console.log("this.props.tempuid = ",this.props.tempuid);
		// console.log("this.props.originPage = ",this.props.originPage);

		var userOTP = this.refs.otp.value;
		if(userOTP!==""){
			if(parseInt(userOTP) === parseInt(this.props.OTP)){
				localStorage.setItem("uid",this.props.tempuid);
				console.log("here msg",this.props.message);
				if(this.props.message === "NEW-USER-CREATED"){
					this.props.redirectToSignUp(this.props.tempuid);

				}else{
					if(this.props.originPage === "header"){
						this.props.loginMe(this.props.tempuid);
						this.props.history.push("/");
						window.location.reload();
					}
					else{
						this.props.redirectToBasicInfo(this.props.tempuid);
					}
				}
			}else{
				swal("","Sorry, Your OTP is not Matching! Please try again!!","error");
			}
		}else{
			swal("Please enter OTP", "", "warning");
	        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
		}
		
	}
	isNumberKey(event)
	   {

	   var charCode = (event.which) ? event.which : event.keyCode

	   if (charCode > 31 && (charCode < 48 || charCode > 57)  && (charCode < 96 || charCode > 105))
	   {
	    event.preventDefault();
	      return false;
	    }
	    else{
	      return true;
	    }
	  }

	render() {
		 // console.log("originPage",this.props)
		return (
			<div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<form id="" className=" ">
						<div className="hr_border row"></div>
						
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
						  	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
						  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 headlineBlack">
						  		{this.props.fullName && this.props.fullName!==null &&this.props.fullName!=="" ?
						  			<span>Welcome Back {this.props.fullName}</span>
						  		:
						  		   "Welcome"
						  		}
						  		</div>	
							  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-10 headline">
									We have sent you an OTP for verification, please enter your OTP to continue
								</div>
								<div className="form-group mt-150">
								    <label htmlFor="">Kindly Enter Your Verification Code </label>
								    <div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-building iconClr"></i>
					                    </div>
								    	<input type="text" className="form-control" ref="otp"  id="" onKeyDown={this.isNumberKey.bind(this)} min="0" maxLength="4" placeholder="Verification Code" data-text="user_mobile"/>
								  	</div>
								</div>
						    </div>
						 <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 boxLayout1">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
									<img alt=""  src="/images/1.png" className="build_img3"/>
								</div>
								<span className="col-lg-12 formImgB">
									We charge tenants/buyers brokerage & share upto 50% with the property owners.
								</span>
						 </div>
						</div>
						  	<div className=" col-lg-2 pull-right btnNext">
							    <button type="Submit" className="btn bg-primary pull-right col-lg-11 " onClick={(this.handleNumber.bind(this))} >Next &nbsp; &rArr; </button>
						  	</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
	// console.log('signUp',state);
	return {
		OTP 		: state.OTP,
		message 	: state.mobFoundMsg,
		tempuid  	: state.tempuid,
		originPage  : state.originPage,
		fullName  	: state.fullName,
	}
};

const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToSignUp  	 : (tempuid)=> dispatch({type: "REDIRECT_TO_SIGN_UP", uid : tempuid}),
		redirectToBasicInfo  : (tempuid)=> dispatch({type: "REDIRECT_TO_BASIC_INFO", uid : tempuid}),
  		loginMe  			 : (tempuid)=>dispatch({type: "LOGIN_ME", uid :tempuid}),
	}
};

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginOtp));