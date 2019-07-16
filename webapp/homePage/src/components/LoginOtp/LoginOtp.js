import React, { Component }     from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import swal                     from 'sweetalert';
import { Link }					from 'react-router-dom';


import '../LoginOtp/LoginOtp.css';

export default class LoginOtp extends Component {
	constructor(props){
			super(props);
			this.state = {
        		// user_id : "",
        		// mobile 	: "",
        		otp 	: "",
        		message : "",
			};			
		}

	componentDidMount(){
		// console.log("Redirect Props user_id : ",this.props.location.state.user_id);
		// const { match: { params } } = this.props;
			console.log("otp = ",localStorage.getItem("otp"));
			// var user_id = localStorage.getItem("user_id");
   //      	var mobile 	= localStorage.getItem("mobile");
        	var otp 	= localStorage.getItem("otp");
        	var message	= localStorage.getItem("message");

			this.setState({
        		// user_id : user_id,
        		// mobile 	: mobile,
        		otp 	: otp,
        		message	: message,
			});		
	}
	componentWillMount(){
			// var param = this.props.match.params;
			// var id = param.id;
			// var mobile = param.mobile;
			// var mobile = param.mobilenum;
			// this.setState({
			// 	id:id,
			// })
			// console.log("param--->",param.id);
		}
	handleNumber(event){
		event.preventDefault();
		var userOTP = this.refs.otp.value;
		if(userOTP == this.state.otp){
			if(this.state.message == "NEW-USER-CREATED"){
				this.props.history.push("/form1");
			}else{
				this.props.history.push("/WebPage");
			}
			
		}else{
			swal("","Sorry, Your OTP is not Matching! Please try again!!","error");
		}

	}

	render() {
				var windowWidth = $(window).width();
		        var backImage = "backImageModal hidden-xs hidden-sm"
		        var winHeight = window.innerHeight;
		return (
			<div className={backImage} style={{"height": winHeight}}>
				<div className="col-lg-8 col-lg-offset-2 page_content mt-76">
					<form id="" className=" ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">	
								<label className="title_sz">Owners earn upto 505 brokerage by selling/renting with us so let's get started</label>
								<Link to="/HomePage" className=" ">
									<button type="button" className="close">&times;</button>
								 </Link>

							</div>
						</div>
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
