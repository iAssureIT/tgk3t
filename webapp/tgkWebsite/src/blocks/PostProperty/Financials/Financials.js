import React , { Component }	from 'react';
import axios 					from 'axios';
import { withRouter}    		from 'react-router-dom';
import { connect } 				from 'react-redux';
import swal 					from 'sweetalert';
import $						from 'jquery';		

import './Financials.css';

 class Financials extends Component{

		constructor(props){
			super(props);
			this.state = {
				includecharges     : [],
				monthlyRent		   : '',
				depositAmount 	   : '',
				monthlyRent 	   : '',
				totalPrice 	  	   : ''
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

			$('#monthlyRent').keyup(function(event) {
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

			$('#depositAmount').keyup(function(event) {
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
				"expectedRate" 		: this.state.expectedRate,
				"totalPrice" 		: this.state.totalPrice,
				"monthlyRent" 		: this.state.monthlyRent,
				"depositAmount" 	: this.state.depositAmount,
				"availableFrom" 	: this.refs.availableFrom.value,
				"description" 		: this.refs.description.value,
				"includeCharges"	: this.state.includecharges,
				"maintenanceCharges": this.refs.maintenanceCharges.value,
				"maintenancePer"	: this.refs.maintenancePer.value,
				"property_id" 		: localStorage.getItem("propertyId"),
				"uid" 				: localStorage.getItem("uid"),
				
			};
			
			console.log("Financials req = ",formValues);
			if( this.state.totalPrice!="" || this.state.monthlyRent!="" ){
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

	    handleChange(event){
	    	// event.preventDefault();
	    	// var monthlyRent = this.refs.monthlyRent.value;
	    	// var depositAmount = this.refs.depositAmount.value;
	    	// var monthlyRent = this.refs.monthlyRent.value;
	    	// var totalAsk = this.refs.totalAsk.value;
	    	// this.setState({
	     //  	"monthlyRent"  : monthlyRent,
	     //  	"depositAmount": depositAmount,
	     //  	"monthlyRent": monthlyRent,
	     //  	"totalAsk": totalAsk
			   //  });
			const target = event.target.value;
			const name   = event.target.name;
			this.setState({
				[name]       : target
			});

	    	
	    }
		

	render() {
				
    return (
		 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<form id="form">
				  	<div className=" row"></div>
				  	{
				  		this.props.transactionType == "Rent" ?
				  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<span>Monthly Rent</span>
							<div className="form-group" id="">
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-rupee iconClr"></i>
				                    </div>
									<input type="" className="form-control" ref="monthlyRent" name="monthlyRent" value={this.state.monthlyRent} onChange={this.handleChange.bind(this)} id="monthlyRent" placeholder="Monthly Rent" min="0"/>
							     </div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<span>Deposit Amount</span>
							<div className="form-group" id="">
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-rupee iconClr"></i>
				                    </div>
									<input type="" className="form-control" ref="depositAmount" name="depositAmount" value={this.state.depositAmount} onChange={this.handleChange.bind(this)}   id="depositAmount" placeholder="Deposit Amount" min="0"/>
							     </div>
							</div>

						</div>
					</div>
					:
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<span>Expected Rate</span>
							<div className="form-group" id="expectedrate">
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-rupee iconClr"></i>
				                    </div>
						   	        <input type="" className="form-control" ref="expectedrate" name="expectedRate" value={this.state.expectedRate} onChange={this.handleChange.bind(this)} id="expRate" placeholder="Expected Rate" min="0"/>
							     	<div className="input-group-addon inputIcon">
				                     /Sq ft
				                    </div>
							    </div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<span>Total Ask</span>
							<span className="asterisk1">*</span>
							<div className="form-group" id="">
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-rupee iconClr"></i>
				                    </div>
							   	    <input type="" className="form-control" ref="totalprice" name="totalPrice" value={this.state.totalPrice} onChange={this.handleChange.bind(this)} id="totalAsk" placeholder="Total Ask" min="0" />
							     </div>
							</div>

						</div>
					</div>
				  	}
					
					
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	 	<label>My Total Ask includes</label>
					  	 </div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">	
					    <label className="container1 checkbox-inline col-lg-2"><span className="fs1">Car Park</span>
							  <input type="checkbox"
							  		 value="Car Park" 
						      		 id="1"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} />
							  <span className="checkmark1"></span>

						</label>
					    <label className="container1 checkbox-inline col-lg-4 row"><span className="fs2">One Time Maintenance</span>
							  <input type="checkbox"
							  		 value="One Time Maintenance" 
						      		 id="2"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} />
							  <span className="checkmark1"></span>

						</label>
					    <label className="container1 checkbox-inline col-lg-3 row"><span className="fs2">Stamp Duty</span>
							  <input type="checkbox"
							  		 value="Stamp Duty" 
						      		 id="3"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} />
							  <span className="checkmark1"></span>

						</label>
					    <label className="container1 checkbox-inline col-lg-3"><span className="fs2">Club House</span>
							  <input type="checkbox"
							  		 value="Club House" 
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
						    <span htmlFor="exampleFormControlInput1">Date</span>
						    <div className="input-group inputBox-main " id="">
						    	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
					            </div>
						    	<input type="date" className="form-control" ref="availableFrom"  id="" name="somedate" min="1900-01-01" max="2100-12-31"/>
						  	</div>
						  </div>
						</div>
					</div>
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  <div className="form-group" id="">
						    <label htmlFor="exampleFormControlInput1">Description</label>
						    <textarea className="form-control" rows="3" cols="5" ref="description"  id="" />
						  </div>
						</div>
					</div>
				  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
					       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAmenities.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
					  	</div>*/}
					  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
					       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)} >Save & Next  &nbsp; &nbsp; &rArr;</button>
					  	</div>
				  	</div>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id 	: state.property_id,
		uid				: state.uid,
		transactionType	: state.transactionType,

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
