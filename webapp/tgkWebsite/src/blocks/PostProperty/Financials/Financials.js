import React , { Component }	from 'react';
import axios 					from 'axios';
import { withRouter}    		from 'react-router-dom';
import { connect } 				from 'react-redux';
import swal 					from 'sweetalert';
import $						from 'jquery';		

import './Financials.css';

// import 'bootstrap/js/tab.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/js/modal.js';

 class Financials extends Component{

		constructor(props){
			super(props);
			this.state = {
				includecharges     :[],
			};
			
		}
		componentDidMount(){
			$('#totalAsk').keyup(function(event) {
			  // skip for arrow keys
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g,",")
			    ;
			  });
			});
			$('#expRate').keyup(function(event) {
			  // skip for arrow keys
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g,",")
			    ;
			  });
			});

			 var today = new Date().toISOString().split('T')[0];
    		document.getElementsByName("somedate")[0].setAttribute('min', today);
		}

		updateUser(event){
			event.preventDefault();
			const formValues = {
				"expectedRate" 		: this.refs.expectedrate.value,
				"totalPrice" 		: this.refs.totalprice.value,
				"availableFrom" 	: this.refs.availableFrom.value,
				"description" 		: this.refs.description.value,
				"includeCharges"	: this.state.includecharges,
				"maintenanceCharges": this.refs.maintenanceCharges.value,
				"maintenancePer"	: this.refs.maintenancePer.value,
				"property_id" 		: localStorage.getItem("propertyId"),
				"uid" 				: this.props.uid,
			};
			
			console.log("Financials req = ",formValues);
			if( this.refs.totalprice.value!="" ){
				axios
				.patch('/api/properties/patch/financials',formValues)
				.then( (res) =>{
					console.log("Financials res = ",res);
					if(res.status === 200){
						this.props.redirectToAvailability(this.props.uid);
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
				});
			}else{
              swal("Please enter mandatory fields", "", "warning");
              console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
			}
			
		}

		totalInclude(e){


		  if(e.target.checked)
		  {

		  this.state.includecharges.push(e.target.getAttribute('value'));

		  console.log("includecharges",this.state.includecharges);
		  }
		  else{
		  this.state.includecharges.pop(e.target.getAttribute('value'));
		  console.log("includecharges1",this.state.includecharges);

		  }

		}
		backToAmenities(){
		this.props.backToAmenities();
	    }
		

	render() {
				
    return (
    	
	 <div >
		 	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  <div className=" row"></div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<span className="col-lg-6 row">Expected Rate </span>
			  	 	<span className="col-lg-4 pl44">Total Ask<span className="asterisk1">*</span></span>
			  	 </div>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
			  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="expectedrate">
				    {/*<span className="asterisk">*</span>*/}
				     <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-rupee iconClr"></i>
		                    </div>
				    <input type="" className="form-control" ref="expectedrate"  id="expRate" placeholder="Expected Rate" min="0"/>
				  			<div className="input-group-addon inputIcon">
		                     /Sq ft
		                    </div>
		                 </div>
				  </div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="totalprice">
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-rupee iconClr"></i>
		                    </div>
			  	 	
					    <input type="" className="form-control" ref="totalprice" id="totalAsk" placeholder="Total Ask" min="0" />
					  </div>
					  </div>
				 </div>
			  </div>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>My Total Ask includes</label>
			  	 </div>
			  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">	
				    <label className="container1 checkbox-inline col-lg-2"><span className="fs1">Car Park</span>
						  <input type="checkbox"
						  		 value="carPark" 
					      		 id="1"
					      		 name="userCheckbox"
					      		 onChange={this.totalInclude.bind(this)} />
						  <span className="checkmark1"></span>

					</label>
				    <label className="container1 checkbox-inline col-lg-4 row"><span className="fs2">One Time Maintenace</span>
						  <input type="checkbox"
						  		 value="oneTimeMaintenace" 
					      		 id="2"
					      		 name="userCheckbox"
					      		 onChange={this.totalInclude.bind(this)} />
						  <span className="checkmark1"></span>

					</label>
				    <label className="container1 checkbox-inline col-lg-3 row"><span className="fs2">Stamp Duty</span>
						  <input type="checkbox"
						  		 value="stampDuty" 
					      		 id="3"
					      		 name="userCheckbox"
					      		 onChange={this.totalInclude.bind(this)} />
						  <span className="checkmark1"></span>

					</label>
				    <label className="container1 checkbox-inline col-lg-3"><span className="fs2">Club House</span>
						  <input type="checkbox"
						  		 value="clubHouse" 
					      		 id="4"
					      		 name="userCheckbox"
					      		 onChange={this.totalInclude.bind(this)} />
						  <span className="checkmark1"></span>

					</label>
		  </div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
		  			<span>Maintenance</span>
		  			
		  		</div>
		  		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
		  			<span>Per</span>
		  		</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="">
					  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-rupee iconClr"></i>
		                    </div>
					    {/*<span className="asterisk">*</span>*/}
				    	<input type="number" className="form-control" ref="maintenanceCharges" id="" placeholder="Maintenance Charge" min="0" defaultValue="0"/>	
				  		</div>
				  </div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
		                    <select className="custom-select form-control " ref="maintenancePer" placeholder="select" >
						    	<option className="hidden" disabled>--Select--</option>
						    	<option value="month">Month</option>
						    	<option value="year">Year</option>
							</select>
					  	</div>
					  </div>
				  </div>
		 	 </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  		<b>My Apartment is Available From</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_30">
		  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
			  <div className="form-group margBtm_5" id="date">
			    <span htmlFor="exampleFormControlInput1">Date</span>{/*<span className="asterisk">*</span>*/}
			    <div className="input-group inputBox-main " id="">
			    	<div className="input-group-addon inputIcon">
		                <i className="fa fa-building iconClr"></i>
		            </div>
			    	<input type="date" className="form-control" ref="availableFrom"  id="" name="somedate"/>
			  	</div>
			  </div>
			</div>
		  </div>
		   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  <div className="form-group" id="">
			    <label htmlFor="exampleFormControlInput1">Description</label>{/*<span className="asterisk">*</span>*/}
			    <textarea className="form-control" rows="3" cols="5" ref="description"  id="" />
			  </div>
			</div>
		  </div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
		       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAmenities.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  	</div>
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)} >Save & Next  &nbsp; &nbsp; &rArr;</button>
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
		property_id : state.property_id,
		uid			: state.uid

	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToAvailability  : (uid)=> dispatch({type: "REDIRECT_TO_AVAILABILITY",
													uid:  uid
	}),
		backToAmenities  	    : ()=> dispatch({type: "BACK_TO_AMENITIES"}),

	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Financials));
