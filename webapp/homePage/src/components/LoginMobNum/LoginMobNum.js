import React, { Component }     from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";

import './LoginMobNum.css';

axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default class LoginMobNum extends Component {

	constructor(props,{match}){
			super(props);
			this.state = {
        		// mobileNumber :''
			};			
		}

		// componentWillMount(){
		// 	var param = this.props.match.params
		// 	console.log("param--->",param.id);
		// }

		handleNumber(event){
			event.preventDefault();
			var mobile = this.refs.mobile.value;

			axios
				.post('/api/users/verify-mobile/'+mobile)
				.then((response)=>{
					console.log("mobile = ",response.data);
					// var responseData = response.data;

					// // response.message = "MOBILE-NUMBER-EXISTS";  //temp - delete this later.
					// if(responseData){
					// 	if(!responseData==null){							
					// 		this.props.history.push('/LoginOtp/'+"101");
					// 	}else{
					// 		this.props.history.push('/LoginOtp');
					// 	}

					// }
					if(response.data.message=="MOBILE-NUMBER-EXISTS"){
					
						this.props.history.push('/LoginOtp/'+response.data.id);
					}
					else{
						// this.props.history.push('/WebSignupForm/'+mobile);
						this.props.history.push('/LoginOtp');
					}
				})
				.catch(function(error){
					console.log(error);
				})

		}

	render() {
		return (
				<div className="col-lg-8 col-lg-offset-2 page_content mt-50">
					<form id="" className=" ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
								<label className="title_sz">Owners earn upto 505 brokerage by selling/renting with us so let's get started</label>
								<button type="button" className="close">&times;</button>
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
				                     	<i className="fa fa-building iconClr"></i>
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
