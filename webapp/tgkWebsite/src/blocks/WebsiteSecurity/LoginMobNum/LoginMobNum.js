import React, { Component }     from 'react';
import axios 					from 'axios';
import { withRouter } from 'react-router';
import { connect } 				from 'react-redux';
import swal						from 'sweetalert';
import './LoginMobNum.css';

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const clientmobileRegex = RegExp(/^[0-9][0-9]{9}$/);

class LoginMobNum extends Component {

	constructor(props){
			super(props);
			this.state = {
				mobile : "",
				formerrors :{				
					clientMobile : " ",
				},
			};
    		this.handleChange = this.handleChange.bind(this);
		}

		handleNumber(event){
			
			event.preventDefault();
			var formValues = {
				mobile : this.state.mobile,
				countryCode:this.refs.countryCode.value
			};
			console.log("LoginMobNum==",formValues);

			if(this.state.mobile!=""){

				if(formValid(this.state.formerrors)){
				axios
					.post('/api/usersotp/verify_mobile',formValues)
					.then((response)=>{
						console.log("response = ",response.data);
						console.log("message = ",response.data.message);
						console.log("mobile = ",formValues.mobile);
						
						if(response.data.message == "MOBILE-NUMBER-EXISTS"){
							console.log("response.data.message = ",response.data.message);

							this.props.mobileFound( response.data.user_id,
													response.data.mobile,
													response.data.otp,
													response.data.message
												  );
						}
						else{
							this.props.mobileNotFound(formValues.mobile);
						}
					})
					.catch(function(error){
						console.log(error);
					})
				}
				}else{
					swal("Please enter Mobile Number", "", "warning");
	              console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}

			
	}

		handleChange(event){
			event.preventDefault();
			const datatype = event.target.getAttribute('data-text');
		    const {name,value} = event.target;
		    let formerrors = this.state.formerrors;
			console.log("datatype",datatype);
			switch (datatype){


			case 'clientMobile' : 
		       formerrors.clientMobile = clientmobileRegex.test(value)? '' : "Please Enter Numbers only";
		       break;

			default :
			break;

			}
			this.setState({ formerrors,
				[name]:value
			} );
		}


	render() {

   	 const {formerrors} = this.state;
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
							    	{/*<input  data-text="clientMobile" type="number" name="mobile" className="form-control" ref="mobile"  id="" placeholder="Mobile Number" onChange={this.handleChange}  />
							  		{this.state.formerrors.clientMobile &&(
										<span className="text-danger">{this.state.formerrors.clientMobile}</span>
									)}*/}
									  <input type="number" data-text="clientMobile" name="mobile" id="mobile" value={this.state.mobile}  ref="mobile" onChange={this.handleChange}  className="form-control " required />
				                        
							  	</div>
							  	{this.state.formerrors.clientMobile &&(
				                          <span className="text-danger">{formerrors.clientMobile}</span> 
				                        )}
							  </div>
						    </div>
						 <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 boxLayout1">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<img alt=""  src="images/1.png" className="build_img2"/>
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
