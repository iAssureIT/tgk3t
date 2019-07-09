import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import { Route , withRouter}    from 'react-router-dom';
import swal                     from 'sweetalert';


axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

 class WebSignupForm extends Component {
	constructor(props){
			super(props);
			this.state = {
			};
		}

	submit(event){
			event.preventDefault();
			// console.log("abc");
			const formValues = {
				"name" 		: this.refs.name.value,
				"email" 	: this.refs.email.value,
				"city"      : this.refs.city.value,
				"pwd"       : "",
		        "role"      : "",
		        "status"    : ""
			};
			//this.props.fun(formValues);
			axios
				.post('/api/users',formValues )
				.then( (res) =>{
					console.log(res);
					if(res.status == 201){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");
						
						this.refs.name.value = '';
						this.refs.email.value = '';
						this.refs.city.value = '';

						this.props.history.push("/WebSignupFlow");/*flow page*/
					}
						
				})
				.catch((error) =>{
					console.log("error = ", error);
					swal("Sorry!!", "Email is already exits.", "error");

				});
		}
	render() {
		return (
			<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 page_content margTop1">
				<form id="xyz" className=" ">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
							<label className="title_sz">Owners earn upto 505 brokerage by selling/renting with us so let's get started</label>
							<button type="button" className="close">&times;</button>
						</div>
					</div>
						  {/*<hr />*/}
					<div className="hr_border row"></div>
					    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
					  		<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-75">	
							    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								  <div className="form-group">
								  	<label>Let us know you to sell or rent your property faster</label>
								    <label htmlFor="">Name</label><span className="asterisk">*</span>
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
								    <label htmlFor="">Email address</label><span className="asterisk">*</span>
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
									    <label htmlFor="">City</label>
									    <div className="input-group inputBox-main " id="">
									      	<div className="input-group-addon inputIcon">
						                     	<i className="fa fa-map-marker iconClr"></i>
						                    </div>
									    	<input type="City" className="form-control" ref="city" id="" placeholder="City" />
									  	</div>
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
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margTop">
						  	<div className="form-group col-lg-12">
						       <button type="Submit" className="btn bg-primary pull-right nxt_btn" onClick={this.submit.bind(this)}>Post & Earn>></button>
					  		</div>
						</div>
				</form>
			</div>
		);
	}
}
export default withRouter(WebSignupForm);