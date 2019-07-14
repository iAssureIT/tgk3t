import React, { Component }     from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import { Redirect, withRouter } from 'react-router';
import { Link }					from 'react-router-dom';

import './LoginMobNum.css';

class LoginMobNum extends Component {

	constructor(props,{match}){
			super(props);
			this.state = {
        		// mobile :''
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
				.post('/api/users/verify_mobile/', formValues)
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

						this.props.history.push('/LoginOtp/');
					}
					else{
						this.props.history.push('/WebSignupForm/'+formValues.mobile);
					}
				})
				.catch(function(error){
					console.log(error);
				})
				// var responseData = response.data;

					// response.message = "MOBILE-NUMBER-EXISTS";  //temp - delete this later.
					// if(responseData){
					// 	if(!responseData==null){							
					// 		this.props.history.push('/LoginOtp/'+"101");
					// 	}else{
					// 		this.props.history.push('/LoginOtp');
					// 	}

					// }

		}

	render() {
		return (
				<div className="col-lg-8 col-lg-offset-2 page_content mt-50" id="xyz">
					<form id="" className=" ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
								<label className="title_sz col-lg-10 col-md-10 col-sm-10 col-xs-10">Owners earn upto 505 brokerage by selling/renting with us so let's get started</label>
								<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> 
									<Link to="/HomePage" className="pull-right closeIcon"> &times; </Link>
								</div>
							</div>
						</div>
						  {/*<hr />*/}
						<div className="hr_border row"></div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
						  	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-150">	
							  <div className="form-group">
							    <label htmlFor="">Please enter your Mobile No</label>
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
							      		<select ref="countryCode">
							      			<option value="+91">+91</option>
					    					<option value="+93">+93</option>
							      		</select>
				                    </div>
							    	<input type="phone" className="form-control" ref="mobile"  id="" placeholder="Mobile Number" data-text="user_mobile"/>
							  	</div>
							  </div>
						    </div>
						 <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 boxLayout">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<img src="images/1.png" className="build_img2"/>
								</div>
								<span className="col-lg-12 formImgB">
									We charge tenants/buyers brokerage & <br/>share upto 50% with the property owners.
								</span>
						 </div>
						</div>
						  	<div className=" col-lg-2 pull-right btnNext">
							    <button type="Submit" className="btn bg-primary pull-right col-lg-11 " onClick={(this.handleNumber.bind(this))} >Next &nbsp;>> </button>
						  	</div>
					</form>
				</div>
		);
	}
}

export default withRouter(LoginMobNum)