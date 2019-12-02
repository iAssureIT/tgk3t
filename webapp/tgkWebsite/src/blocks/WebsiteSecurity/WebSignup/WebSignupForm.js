import React , { Component }	from 'react';
import axios 					from 'axios';
import {withRouter}    			from 'react-router-dom';
import swal                     from 'sweetalert';
import { connect } 				from 'react-redux';
import Loader 					from 'react-loader-spinner'

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

// const clientnameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$|^$/);
const clientnameRegex = RegExp(/^[a-zA-Z ]*$/);
const emailRegex = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const cityRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);

 class WebSignupForm extends Component {
	constructor(props){
			super(props);
			this.state = {
				 name : "",
				 email : "",
				 city : "",
				 isLoading:false,
				formerrors :{
					clientName : " ",
					clientEmail : " ",
					clientCity : " ",
				
				},
			};
		}

	componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
  	}
	submit(event){
		event.preventDefault();
		// console.log("abc");
		const formValues = {
			"userID" 		: localStorage.getItem("uid"),
			"fullName" 		: this.state.name,
			"emailId" 	 	: this.state.email,
			"city"       	: this.state.city,
			"mobileNumber"  : this.refs.mobile.value,
			"countryCode"	: this.refs.countryCode.value,
			"status"     	: 'Active',
			"roles"       	: 'Client',
		};
		this.setState({isLoading:true})
	
		console.log("WebSignupForm==",formValues);
		if(this.state.name!=="" && this.state.email!=="" && this.state.city!==""  ){
			if(formValid(this.state.formerrors)){
			axios
				.patch('/api/usersotp/signup',formValues)
				.then( (res) =>{
					console.log("res",res)
					if(res.data.message === "USER-UPDATED"){
						var sendDataToUser = {
						    "templateName"	: "User - New Registration",
						    "toUserId"		: formValues.userID,
						    "variables"		: {
						    	"userName"		: this.state.name,
						    	"userMobile"	: formValues.mobileNumber,
						    }
						}
						localStorage.setItem('userName',formValues.fullName)

						console.log("sendData",sendDataToUser);
						var sendDataToAdmin = {
						    "templateName"	: "Admin - New Registration",
						    "toUserId"		: "admin",
						    "variables"		: {
						    	"userName"		: this.state.name,
						    	"userMobile"	: formValues.mobileNumber,
						    	"userEmail" 	: this.state.email,
								"userCity"		: this.state.city,
						    }
						}
						console.log("sendData",sendDataToAdmin);
						axios
						.post('/api/masternotifications/post/sendNotification',sendDataToAdmin)
						.then((result) =>{
							console.log("SendEmailNotificationToAdmin",result);
							axios
							.post('/api/masternotifications/post/sendNotification',sendDataToUser)
							.then((res) =>{
								console.log("SendEmailNotificationToUser",res);	
								console.log("BasicInfo res = ",res);
									if(this.props.originPage === "header")
									{
										this.props.history.push("/");
										window.location.reload();
										this.setState({isLoading:false})
									}else{
										this.props.redirectToBasicInfo(res.data.user_id);
										this.setState({isLoading:false})
									}					
							})
							.catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				            });					
						})
						.catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				                    });
						
					}
				})
				.catch((error)=>{
	                        console.log("error = ",error);
	                        if(error.message === "Request failed with status code 401")
	                        {
	                             swal("Your session is expired! Please login again.","", "error");
								localStorage.removeItem("uid");
								localStorage.removeItem("token");
	                            this.props.history.push("/");
	                        }
	                    });
			}
		}else{
			swal("Please enter mandatory fields", "", "warning");
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


			case 'clientName' : 
		       formerrors.clientName = clientnameRegex.test(value)? '' : "Please enter valid name";
		       break;

		    case 'clientEmail' : 
		    	formerrors.clientEmail = emailRegex.test(value)? '' : "Please enter valid mail address";
		     	break;

		    case 'clientCity' : 
		    	formerrors.clientCity = cityRegex.test(value)? '' : "Please enter valid city";
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
				console.log("this.state.isLoading",this.state.isLoading);
		return (
			<div >
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
				<form id="xyz" className=" ">
					<div className="hr_border row"></div>
					    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">

					  		<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-75">
								  	<label className="mb5 mt20">Let us know you to sell or rent your property faster</label>

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
								    	<input type="text" className="form-control" ref="name" name="name"  value={this.state.name} onChange={this.handleChange.bind(this)} id="" placeholder="Name" data-text="clientName"/>
								  	</div>
								  	{this.state.formerrors.clientName &&(
				                          <span className="text-danger">{formerrors.clientName}</span> 
				                        )}
								  </div>
							    </div>
							    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								  <div className="form-group">
								    <div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-envelope iconClr"></i>
					                    </div>
								    	<input type="email" className="form-control" ref="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this)}  id="" placeholder="Email" data-text="clientEmail"/>
								  	</div>
								  	{this.state.formerrors.clientEmail &&(
				                          <span className="text-danger">{formerrors.clientEmail}</span> 
				                        )}
								  </div>
							    </div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12	">
									<div className="form-group">
									    <div className="input-group inputBox-main " id="">
									      	<div className="input-group-addon inputIcon">
						                     	<i className="fa fa-map-marker iconClr"></i>
						                    </div>
									    	<input type="text" className="form-control" ref="city" name="city" value={this.state.city} onChange={this.handleChange.bind(this)}  id="" placeholder="City" data-text="clientCity" />
									  	</div>
									  	{this.state.formerrors.clientCity &&(
				                          <span className="text-danger">{formerrors.clientCity}</span> 
				                        )}
									</div>
								</div>	
					    	</div>
						<div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 boxLayout1 hidden-xs hidden-sm">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
								<img alt=""  src="/images/1.png" className="build_img2"/>
							</div>
							<span className="col-lg-12 formImgB">
								We charge tenants/buyers brokerage & share upto 50% with the property owners.
							</span>
						</div>
				 		</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margTop hidden-xs hidden-sm">
						  	<div className="form-group col-lg-12">
						       {
						       	 this.state.isLoading === false ?
						       	 	this.props.originPage === "header" ?
						       		<button type="Submit" className="btn bg-primary pull-right nxt_btn mr30" onClick={this.submit.bind(this)}> Save &rArr;</button>
						       		:
						       		<button type="Submit" className="btn bg-primary pull-right nxt_btn mr30" onClick={this.submit.bind(this)}>Post & Earn &rArr;</button>
					  			:
				  				<button type="Submit" className="btn bg-primary pull-right nxt_btn mr30" title="Loading...">
									<div className="col-lg-12 text-center" style={{paddingTop:3}}>
										<Loader
									         type="Oval"
									         color="#ffffff"
									         height="15"
									         width="15"
									      />
									 </div>
				  				</button>
					  			}
					  		</div>
						</div>
						{/*resp*/}
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margTop hidden-lg hidden-md">
						  	<div className="form-group col-lg-12">
						       {
						       	 this.state.isLoading === false ?
						       	 	this.props.originPage === "header" ?
						       		<button type="Submit" className="btn bg-primary pull-right nxt_btn mr30" onClick={this.submit.bind(this)}> Save &rArr;</button>
						       		:
						       		<button type="Submit" className="btn bg-primary pull-right nxt_btn mr30" onClick={this.submit.bind(this)}>Post & Earn &rArr;</button>
					  			:
				  				<button type="Submit" className="btn bg-primary pull-right nxt_btn mr30" title="Loading...">
									<div className="col-lg-12 text-center" style={{paddingTop:3}}>
										<Loader
									         type="Oval"
									         color="#ffffff"
									         height="15"
									         width="15"
									      />
									 </div>
				  				</button>
					  			}
					  		</div>
						</div>
						{/*end*/}
				</form>
			</div>
			
		</div>	
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		mobile 		: state.mobile,
		originPage  : state.originPage,
	}
};

const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToBasicInfo  : (uid)=> dispatch({ uid : uid, type: "REDIRECT_TO_BASIC_INFO"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WebSignupForm));