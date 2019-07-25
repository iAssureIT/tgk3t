import React , { Component }	from 'react';
import axios 					from 'axios';
import {withRouter}    from 'react-router-dom';
import swal                     from 'sweetalert';
import { connect } 				from 'react-redux';


 class WebSignupForm extends Component {
	constructor(props){
			super(props);
			this.state = {
				 //"mobile" : this.props.match.params.mobile,
				// "mobile" : "8308832342",
			};
		}

	submit(event){
			event.preventDefault();
			// console.log("abc");
			const formValues = {
				"name" 		 : this.refs.name.value,
				"email" 	 : this.refs.email.value,
				"city"       : this.refs.city.value,
				"mobile"     : this.refs.mobile.value,
				"countryCode": this.refs.countryCode.value,
				"status"     : 'Active',
				"role"       : 'Client',


				
			};
			console.log("WebSignupForm==",formValues);

			//this.props.fun(formValues);
			axios
				.post('/api/usersotp',formValues )
				.then( (res) =>{
					if(res.data.message === "NEW-USER-CREATED"){
						console.log("BasicInfo res = ",res);
						swal("Congrats!", "Your account created successfully! \n Please Verify Your Mobile Number!", "success");
						this.props.signUp(res.data.user_id, res.data.mobile,res.data.otp, res.data.message);
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					swal("Sorry!!", "Mobile Number is already exits.", "error");
				});
		}
	render() {
				
		return (
			<div >
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
				<form id="xyz" className=" ">
					{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
							<label className="title_sz">Owners earn upto 50% brokerage by Selling/Renting with us. So let's get started.</label>
							<Link to="/HomePage" className=" ">
								<button type="button" className="close">&times;</button>
							</Link>
						</div>
					</div>*/}
						  {/*<hr />*/}
					<div className="hr_border row"></div>
					    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">

					  		<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-75">
								  	<label className="mb5">Let us know you to sell or rent your property faster</label>

					  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12	">
										<div className="form-group">
										    <div className="input-group inputBox-main " id="">
										      	<div className="input-group-addon inputIcon">
										      		<select ref="countryCode">
										      			<option value="+91">+91</option>
								    					<option value="+93">+93</option>
										      		</select>
							                    </div>
										    	<input type="tel" className="form-control" ref="mobile" id="" placeholder="Mobile" value={this.props.mobile} disabled />
										  	</div>
										</div>
								</div>	
							    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								  <div className="form-group">
								    <div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-user iconClr" aria-hidden="true"></i>
					                    </div>
								    	<input type="text" className="form-control" ref="name" id="" placeholder="Name" data-text="user_name"/>
								  	</div>
								  </div>
							    </div>
							    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								  <div className="form-group">
								    <div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-envelope iconClr"></i>
					                    </div>
								    	<input type="email" className="form-control" ref="email" id="" placeholder="Email" data-text="user_email"/>
								  	</div>
								  </div>
							    </div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12	">
									<div className="form-group">
									    <div className="input-group inputBox-main " id="">
									      	<div className="input-group-addon inputIcon">
						                     	<i className="fa fa-map-marker iconClr"></i>
						                    </div>
									    	<input type="text" className="form-control" ref="city" id="" placeholder="City" />
									  	</div>
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
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margTop">
						  	<div className="form-group col-lg-12">
						       <button type="Submit" className="btn bg-primary pull-right nxt_btn" onClick={this.submit.bind(this)}>Post & Earn>></button>
					  		</div>
						</div>
				</form>
			</div>
		</div>	
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		mobile 	: state.mobile
	}
};

const mapDispatchToProps = (dispatch)=>{
	return {
		signUp 	: (user_id, mobile, otp, newUsermessage)=> dispatch({
										type 			: "SIGN_UP",
										uid 			: user_id, 
										mobile 			: mobile, 
										OTP 			: otp, 
										newUsermessage 	: newUsermessage,
									}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WebSignupForm));