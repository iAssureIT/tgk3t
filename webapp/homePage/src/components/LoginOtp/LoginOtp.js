import React, { Component }     from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";

import '../LoginMobNum/LoginMobNum.css';

axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default class LoginOtp extends Component {
	constructor(props){
			super(props);
			this.state = {
        		otp :'',
        		id:'',
			};			
		}

	componentDidMount(){
		const { match: { params } } = this.props;
		console.log("props = ",this.props);

	}
	componentWillMount(){
			var param = this.props.match.params;
			var id = param.id;
			var mobile = param.mobile;
			// var mobile = param.mobilenum;
			this.setState({
				id:id,
			})
			console.log("param--->",param.id);
		}
	handleNumber(event){
			event.preventDefault();

			if(this.state.id !='')
			{
				// id is here

				var formValues ={
				id: this.state.id,
				otp:this.refs.otp.value
				}

				axios
				.post('http://apitgk3t.iassureit.com/api/users/otp',formValues)
				.then((response)=>{
					
						this.props.history.push('/homepage');
				})
				.catch(function(error){
					console.log(error);
				})


			}else{
				// blank 

				var OTP = this.refs.otp.value;
				axios
				.post('http://apitgk3t.iassureit.com/api/users/otp',OTP)
				.then((response)=>{
					
					
						this.props.history.push('/WebSignupForm');
				})
				.catch(function(error){
					console.log(error);
				})
			}
			

		}

	render() {
		return (
			<div>
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
							    <label htmlFor="">Kindly Enter Your Verification Code </label>
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-building iconClr"></i>
				                    </div>
							    	<input type="number" className="form-control" ref="otp"  id="" placeholder="Verification Code" data-text="user_mobile"/>
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
							    <button type="Submit" className="btn bg-primary pull-right col-lg-11 " onClick={(this.handleNumber.bind(this))} >Next &nbsp; >> </button>
						  	</div>
					</form>
				</div>
			</div>
		);
	}
}
