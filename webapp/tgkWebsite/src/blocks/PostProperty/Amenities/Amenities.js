import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import swal                     from 'sweetalert';
import { Link }					from 'react-router-dom';
import { Route , withRouter}    from 'react-router-dom';
import { connect } 				from 'react-redux';

import Availability 			from '../Availability/Availability.js';
import Financials 				from '../Financials/Financials.js';

import './Amenities.css';
// import 'bootstrap/js/tab.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/js/modal.js';

 class Amenities extends Component{

		constructor(props){
			super(props);
			this.state = {
				Amenities     : [],
			};
			
		}
		updateUser(event){
			event.preventDefault();
			const formValues = {

				"Amenities"			: this.state.Amenities,
				"property_id" 		: localStorage.getItem("propertyId"),
				"uid" 				: this.props.uid,

				
			};
			console.log("Amenities req = ",formValues);
			if(this.state.Amenities!=""){
				 axios
				.patch('/api/properties/patch/amenities',formValues)
				.then( (res) =>{
					console.log("Amenities res = ",res);
					if(res.status === 200){
						this.props.redirectToFinancialDetails(this.props.uid);
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
				});
			}else{
				swal("Please select atleast one amenity", "", "warning");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
			}
			
		}

		totalInclude(e){
		  if(e.target.checked)
		  {
		  // var otherProp = e.target.getAttribute('value');

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
			  <div className=" row"></div>
		  	 {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 		Select the Amenities available	
		  	 	</div>
		  	 </div>*/}
		  	 <div className="col-lg-12  col-md-10 col-sm-12 col-xs-12 mt40 ">
		  	 	<div className="col-lg-12 ">
		  	 		<div className="col-lg-6 FF4I"><b>Internal</b></div>
		  	 		<div className="col-lg-6 FF4I"><b>External</b></div>
		  	 	</div>
		  	 		<div className="col-lg-12  mb20">
		  	 			<div className="col-lg-6 FF4I1">
		  	 				{/*<label className="checkbox-inline col-lg-12 pt20 ">
						      <input type="checkbox"
						      		 value="gasPipeline" 
						      		 id="1"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 /> <i className="fa fa-users icon_Clr"></i>&nbsp;&nbsp;Gas Pipeline
						    </label>*/}
						    <label className="container2"> <span>Gas Pipeline</span>
							  <input type="checkbox"
							  		 value="gasPipeline" 
						      		 id="1"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} />
							  <span className="checkmark"></span>

							</label>
						     <label className="container2"><span className="pl33">Internet Services</span>
							  <input type="checkbox"
							  		 value="internetServices" 
						      		 id="3"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} />
							  <span className="checkmark"></span>

							</label>
						    <label className="container2"><span className="pr65">Lift</span>
							  <input type="checkbox"
							  		 value="lift" 
						      		 id="5"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} />
							  <span className="checkmark"></span>

							</label>
							    <label className="container2"><span className="pl21">Air Conditioner</span>
								  <input type="checkbox"
								  		 value="airConditioner" 
							      		 id="7"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
							    <label className="container2"><span className="pr22">Intercom</span>
								  <input type="checkbox"
								  		 value="intercom" 
							      		 id="7"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
							    <label className="container2"><span className="pl20">Power Backup</span>
								  <input type="checkbox"
								  		 value="powerBackup" 
							      		 id="11"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
								<label className="container2"><span className="pl10">Water Supply</span>
								  <input type="checkbox"
								  		 value="waterSupply" 
							      		 id="11"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
		  	 			</div>
		  	 				{/*External*/}

		  	 			<div className="col-lg-6 FF4I1"> 
							    <label className="container2"><span>Club House</span>
								  <input type="checkbox"
								  		 value="clubHouse" 
							      		 id="2"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
							    <label className="container2"><span className="pl38">Shopping Center</span>
								  <input type="checkbox"
								  		 value="shoppingCenter" 
							      		 id="4"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
						    	<label className="container2"><span className="pl95">Sewage Treatment Plan</span>
								  <input type="checkbox"
								  		 value="sewageTreatmentPlan" 
							      		 id="6"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
							    <label className="container2"><span className="pl35">Swimming Pool</span>
									  <input type="checkbox"
									  		 value="swimmingPool" 
								      		 id="8"
								      		 name="userCheckbox"
								      		 onChange={this.totalInclude.bind(this)} />
									  <span className="checkmark"></span>

								</label>
						    	<label className="container2"><span className="pl64">Children's Play Area</span>
								  <input type="checkbox"
								  		 value="childrenPlay" 
							      		 id="10"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} />
								  <span className="checkmark"></span>

								</label>
							    <label className="container2"><span className="pl18">Internal Gym</span>
									  <input type="checkbox"
									  		 value="internalGym" 
								      		 id="12"
								      		 name="userCheckbox"
								      		 onChange={this.totalInclude.bind(this)} />
									  <span className="checkmark"></span>

								</label>
							    <label className="container2"><span className="pr44">Park</span>
									  <input type="checkbox"
									  		 value="park" 
								      		 id="14"
								      		 name="userCheckbox"
								      		 onChange={this.totalInclude.bind(this)} />
									  <span className="checkmark"></span>

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
