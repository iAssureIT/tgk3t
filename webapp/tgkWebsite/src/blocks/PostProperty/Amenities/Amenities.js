import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import Availability 			from '../Availability/Availability.js';
import Financials 				from '../Financials/Financials.js';
import { Link }					from 'react-router-dom';
import { Route , withRouter}    from 'react-router-dom';
import { connect } 				from 'react-redux';

import './Amenities.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

 class Amenities extends Component{

		constructor(props){
			super(props);
			this.state = {
				Amenities     :[],

			};
			
		}
		updateUser(event){
			event.preventDefault();
			const formValues = {

				"Amenities"			:this.state.Amenities,
				"property_id" 		: this.props.property_id,
				"uid" 				: this.props.uid,

				
			};
			console.log("Amenities req = ",formValues);
			axios
				.patch('/api/properties/patch/amenities',formValues)
				.then( (res) =>{
					console.log("Amenities res = ",res);
					if(res.status == 200){
						this.props.redirectToFinancialDetails(this.props.uid);
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
				});
		}

		totalInclude(e){

		  var otherProp;

		  if(e.target.checked)
		  {
		  otherProp = e.target.getAttribute('value');

		  this.state.Amenities.push(e.target.getAttribute('value'));

		  console.log("Amenities",this.state.Amenities);
		  }
		  else{
		  this.state.Amenities.pop(e.target.getAttribute('value'));
		  console.log("Amenities1",this.state.Amenities);

		  }

		}
		backToPropertyDetails(){
		this.props.backToPropertyDetails();
	}

	render() {
				
    return (
		    <div className="col-lg-12 col-md-12  col-sm-12 col-xs-12 ">
				<form id="form">
			  {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
					<label className="title_sz">My Apartment has following Amenities</label>
					<Link to="/HomePage" className=" ">
						<button type="button" className="close">&times;</button>
					</Link>
				</div>
			  </div>*/}
			  {/*<hr />*/}
			  <div className="hr_border1 hr_border row"></div>
		  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 		Select the Amenities available	
		  	 	</div>
		  	 </div>
		  	 <div className="col-lg-12  col-md-10 col-sm-12 col-xs-12  ">
		  	 	<div className="col-lg-12 ">
		  	 		<div className="col-lg-6 FF4I"><b>Internal</b></div>
		  	 		<div className="col-lg-6 FF4I"><b>External</b></div>
		  	 	</div>
		  	 		<div className="col-lg-12  mb20">
		  	 			<div className="col-lg-6 FF4I1">
		  	 				<label className="checkbox-inline col-lg-12 pt20 ">
						      <input type="checkbox"
						      		 value="gasPipeline" 
						      		 id="1"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /> <i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Gas Pipeline
						    </label>
						    <label className="checkbox-inline col-lg-12 pt20 pl31">
						      <input type="checkbox" 
						      		 value="internetServices" 
						      		 id="3"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Internet Services 
						    </label>

						    <label className="checkbox-inline col-lg-9 pt20 ">
						      <input type="checkbox"
						      		 value="lift" 
						      		 id="5"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Lift 
						    </label>

						     <label className="checkbox-inline col-lg-12 pt20 pl14">
							      <input type="checkbox" 
							      		 value="airConditioner" 
							      		 id="7"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)}

							      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Air Conditioner
							    </label>

							    <label className="checkbox-inline col-lg-10 pt20 pl31 ">
							      <input type="checkbox"
							      		 value="intercom" 
							      		 id="9"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)}

							      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Intercom
							    </label>

							    <label className="checkbox-inline col-lg-12 pt20 pl11">
							      <input type="checkbox" 
							      		 value="powerBackup"
							      		 id="11"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} 

							      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Power Backup
							    </label>

							    <label className="checkbox-inline col-lg-12 pt20 pl3">
								      <input type="checkbox" 
								      		 value="waterSupply"
								      		 id="13"
								      		 name="userCheckbox"
								      		 onChange={this.totalInclude.bind(this)} 

								      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Water Supply
								</label>
		  	 			</div>
		  	 				{/*External*/}

		  	 			<div className="col-lg-6 FF4I1"> 
		  	 				<label className="checkbox-inline col-lg-12 pt20">
							      <input type="checkbox" 
							      		 value="clubHouse" 
							      		 id="2"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)}

							      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Club House
							    </label>

							    <label className="checkbox-inline col-lg-12 pt20 pl35">
							      <input type="checkbox" 
							      		 value="shoppingCenter"
							      		 id="4"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} 

							      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Shopping Center 
							    </label>


				  	 		<label className="checkbox-inline col-lg-12 pt20 pl87">
						      <input type="checkbox" 
						      		 value="sewageTreatmentPlan" 
						      		 id="6"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Sewage Treatment Plan 
						    </label>

						    <label className="checkbox-inline col-lg-12 pt20 pl25">
						      <input type="checkbox" 
						      		 value="swimmingPool"
						      		 id="8"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} 

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Swimming Pool 
						    </label>

						    
						    
						    

				  	 		<label className="checkbox-inline col-lg-12 pt20 pl61">
						      <input type="checkbox" 
						      		 value="childrenPlay" 
						      		 id="10"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Children's Play Area
						    </label>

				   
				    

						     <label className="checkbox-inline col-lg-12 pt20 pl10">
						      <input type="checkbox" 
						      		 value="internalGym" 
						      		 id="12"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Internal Gym 
						    </label>
						    

						    <label className="checkbox-inline col-lg-10 pt20 pl11">
						      <input type="checkbox" 
						      		 value="park"
						      		 id="14"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} 

						      		 /><i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Park
						    </label>
	
		  	 			</div>
		  	 		</div>
			       
		  	</div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
		       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToPropertyDetails.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  	</div>
		  	<div className="form-group mgbt col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right ">
		       <button type="submit "  className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 mt23"  onClick={this.updateUser.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
		  	</div>
		  </div>
		  
		</form>
	</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id  : state.property_id,
		uid			    : state.uid

	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToFinancialDetails  : (uid)=> dispatch({type: "REDIRECT_TO_FINANCIAL",
														uid:  uid
	}),
		backToPropertyDetails  	    : ()=> dispatch({type: "BACK_TO_PROPERTY_DETAILS"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Amenities));
