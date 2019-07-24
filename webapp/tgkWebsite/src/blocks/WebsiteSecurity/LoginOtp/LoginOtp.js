import React, { Component }     from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import swal                     from 'sweetalert';
import { Link }					from 'react-router-dom';
import { Route , withRouter}    from 'react-router-dom';
import { connect } 				from 'react-redux';


import '../LoginOtp/LoginOtp.css';

class LoginOtp extends Component {
	constructor(props){
			super(props);
			this.state = {
			};			
		}

	componentDidMount(){
		console.log(this.props);
   //      	var otp 	= localStorage.getItem("otp");
   //      	var message	= localStorage.getItem("message");

			// var otp 	= localStorage.removeItem("otp");
   //      	var message	= localStorage.removeItem("message");

	}
	handleNumber(event){
		event.preventDefault();
		var userOTP = this.refs.otp.value;
		if(userOTP == this.props.OTP){
			if(this.props.message == "NEW-USER-CREATED"){
				this.props.redirectToBasicInfo(this.props.uid);
			}else{
				this.props.history.push("/PropertyProfile");
			}
			
		}else{
			swal("","Sorry, Your OTP is not Matching! Please try again!!","error");
		}

	}

	render() {
		
		return (
			<div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<form id="" className=" ">
						{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">	
								<label className="title_sz">Owners earn upto 505 brokerage by selling/renting with us so let's get started</label>
								<Link to="/HomePage" className=" ">
									<button type="button" className="close">&times;</button>
								 </Link>

							</div>
						</div>*/}
						  {/*<hr />*/}
						<div className="hr_border row"></div>
						
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
						  	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">	
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-50 headline">
								Verification code sent on your Registered Mobile Number
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
									<img src="/images/1.png" className="build_img2"/>
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
													 uid	: uid,

		}),
	}
};

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginOtp));