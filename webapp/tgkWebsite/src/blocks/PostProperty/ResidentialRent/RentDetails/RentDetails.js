// Name        - Rushikesh Salunkhe
// Date        - 24 july 2019
// Module Name - Post & Earn
// FileName    - Property Details 
//--------------------------------------------------------------

import React , { Component }	from 'react';
import {  withRouter}    from 'react-router-dom';

import './RentDetails.css';

 class RentDetails extends Component{

		constructor(props){
			super(props);
			this.state = {
			};
		}

	updateUser(event){
			event.preventDefault();
			const formValues = {
				"monthlyRent" 		 : this.refs.monthlyRent.value,
				"electricityWater" 	 : this.refs.electricityWater.value,
				"securityAmount"     : this.refs.securityAmount.value,
				"otherCharges" 		 : this.refs.otherCharges.value,
				"maintainanceCharges": this.refs.maintainanceCharges.value,
				"maintainancePer" 	 : this.refs.maintainancePer.value,
			};
			console.log("PropertyDetails req = ",formValues);
			
		}
	

	backToLocation(){
		this.props.backToLocation();
	}

	render() {
	   	return (
    		<div className="container-fluid">
    			<form  id="form">
	    			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
	    				<h1 className="text-center">Rent Details</h1>
	    			</div>
	    			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 rentDetails">
		    			<div className="row">	
		    				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  	<div className="form-group"  id="" >
							  		<span htmlFor="" className="">Monthly Rent</span>
								    <div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-inr"></i>
					                    </div>
								    	<input type="number" className="form-control" ref="monthlyRent" name="" placeholder="Monthly Rent"/>
								  	</div>
								</div>
						  	</div>
		    				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 checkbox">
					  			<div className="checkbox">
							      <label>
							        <input type="checkbox" ref="electricityWater"/><span className="checkbox-material"><span className="check"></span></span> Electricity & water excluded
							      </label>
							    </div>
							</div>
					  	</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
		    			<div className="row">	
							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  	<div className="form-group"  id="" >
							  		<span htmlFor="" className="">Security Amount</span>
								    <div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-inr"></i>
					                    </div>
								    	<input type="number" className="form-control" ref="securityAmount" name="" placeholder="Monthly Rent"/>
								  	</div>
								</div>
						  	</div>
							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
							  	<span htmlFor="" className="">Other Charges</span>
							    	<div className="input-group inputBox-main " id="">
							      		<div className="input-group-addon inputIcon">
				                     		<i className="fa fa-inr"></i>
				                    	</div>
							    		<input type="number" className="form-control" ref="otherCharges" name="" placeholder="Other Charges"/>
							  		</div>
								</div>
						  	</div>
					  	</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								  <div className="form-group"  id="" >
								  	<span htmlFor="" className="">Maintainance Charges</span>
								    	<div className="input-group inputBox-main " id="">
								      		<div className="input-group-addon inputIcon">
					                     		<i className="fa fa-inr"></i>
					                    	</div>
								    		<input type="number" className="form-control" ref="maintainanceCharges" name="" placeholder="Maintainance Charges"/>
								  		</div>
									</div>
							 </div>
							 <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
								<div className="form-group" id="maintainancePer">
								  	<span htmlFor="" className="">Maintainance Per</span>
							  		<div className="input-group inputBox-main " id="">
								      	<div className="input-group-addon ">
					                     	<i className="fa fa-calendar "></i>
					                    </div>
								  		<select className="custom-select form-control "  ref="maintainancePer" placeholder="Maintainance Per" >
									    	<option className="hidden">Maintainance Per</option>
									    	<option>Month</option>
									    	<option>Quarter</option>
									    	<option>Year</option>
										</select>
									</div>
								 </div>
							</div>
						</div>	  	
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	  	
					  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
					       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToLocation.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
					  	</div>
					  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right mt23">
					       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
					  	</div>
					</div>
				</form>	 
			</div>
		);
	}
}
export default (withRouter(RentDetails));