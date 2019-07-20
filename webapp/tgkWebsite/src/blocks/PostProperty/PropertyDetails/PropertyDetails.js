import React , { Component }	from 'react';
import { Link } 				from 'react-router-dom';
import axios 					from 'axios';
import $ 						from "jquery";
import Financials 					from '../Financials/Financials.js';
import swal                     from 'sweetalert';
import { connect } 				from 'react-redux';
import { Route , withRouter}    from 'react-router-dom';

import './PropertyDetails.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

 class PropertyDetails extends Component{

		constructor(props){
			super(props);
			this.state = {
				furnishedStatus   : ''
			};
			this.radioChange = this.radioChange.bind(this);
		}

		updateUser(event){
			event.preventDefault();
			const formValues = {
				"bedrooms" 			: this.refs.bedrooms.value,
				"balconies" 		: this.refs.balconies.value,
				"furnishedStatus"   : this.state.furnishedstatus,
				"bathroom" 			: this.refs.bathroom.value,
				"ageofProperty" 	: this.refs.ageofproperty.value,
				"facing" 			: this.refs.facing.value,
				"superArea" 		: this.refs.superArea.value,
				"builtupArea" 		: this.refs.builtupArea.value,
				"property_id" 		: this.props.property_id,
			};
			console.log("PropertyDetails req = ",formValues);
			
			axios
				.patch('/api/properties/patch/propertyDetails',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						console.log("PropertyDetails Res = ",res);
						this.props.redirectToAmenities();
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
				});
		}

		radioChange(event) {
	    	this.setState({
	      	"furnishedstatus": event.currentTarget.value,
			    });
		 }

	backToLocation(){
		this.props.backToLocation();
	}

	render() {
	   	return (
    		<div >
  		<div className=" col-lg-12 col-md-12  col-sm-12 col-xs-12">
			<form  id="form">
			  {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
					<label className="title_sz"> Please provide property details of your property to SELL</label>
					<Link to="/HomePage" className=" ">
						<button type="button" className="close">&times;</button>
					</Link>
				</div>
			  </div>*/}
			  {/*<hr />*/}
			  <div className="hr_border row"></div>
		 
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb10">
		  		<b>My Apartment has</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
			  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="bedrooms">
				    <span htmlFor="" className="mb7">Bedrooms</span>
				  	 <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					  	<select className="custom-select form-control "  ref="bedrooms" placeholder="select" >
					    	<option className="hidden">select</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>3</option>
					    	<option>4</option>
					    	<option>4</option>
					    	<option>5</option>
						</select>
					</div>
				  </div>
			  </div>
			  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="balconies">
				    <span htmlFor="" className="mb7">Balconies</span>
				    <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					    <select className="custom-select form-control " ref="balconies" placeholder="select" >
					    	<option className="hidden">select</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>3</option>
					    	<option>4</option>
						</select>
					</div>
				  </div>
			  </div>
			   <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="bathroom">
				    <span htmlFor="" className="mb7">Bathroom</span>
				    <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					    <select className="custom-select form-control " ref="bathroom" placeholder="select" >
					    	<option className="hidden">select</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>3</option>
					    	<option>4</option>
						</select>
					</div>
				  </div>
			  </div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 itIs">
		  		<b>It is</b>
		  	</div>
		  </div>
		  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pl29">	
				 
			 <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
		      <input type="radio"
		             name="optradio"  
		             value="fullfurnished" 
		      		 id="radio-example1"
		      		 checked={this.state.furnishedstatus === "fullfurnished"}
   					 onChange={this.radioChange} />   
		      <span className="mb5">Full furnished</span> 

		    </label>
		    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3">
		      <input type="radio" 
		      		 name="optradio" 
		      		 value="semifurnished" 
		      		 id="radio-example2"
		      		 checked={this.state.furnishedstatus === "semifurnished"}
   					 onChange={this.radioChange} />  
		  	 	<span className="mb5">Semi furnished</span>  

		    </label>
		    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3">
		      <input type="radio"
		      		 name="optradio" 
		      		 value="unfurnished" 
		      		 id="radio-example3"
		      		 checked={this.state.furnishedstatus === "unfurnished"}
   					 onChange={this.radioChange} /> 
		  	 	<span className="mb5">Unfurnished</span>  

		    </label>
		  </div>
		  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 itIs ">
		  		<b>It is</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="society">
					    <span htmlFor="" className="mb5">Year Old</span>{/*<span className="asterisk">*</span>*/}
						<div className="input-group inputBox-main " id="yearOld">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
							<select className="custom-select form-control "  ref="ageofproperty" placeholder="select" >
						    	<option className="hidden">--select year old--</option>
						    	<option>1</option>
						    	<option>2</option>
						    	<option>3</option>
						    	<option>4</option>
							</select>
						</div>				  
					</div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="facing">
					    <span htmlFor="" className="mb5">Facing</span>{/*<span className="asterisk">*</span>*/}
						<div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fa fa-building iconClr"></i>
		                    </div>
							<select className="custom-select form-control "  ref="facing" placeholder="select" >
						    	<option className="hidden">--select property facing--</option>
						    	<option>East</option>
						    	<option>West</option>
						    	<option>North</option>
						    	<option>South</option>
							</select>
						</div>				  
					</div>
				  </div>
		  </div>
		   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="">
					  <span htmlFor="" className="mb7">Super Area</span>
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
				    	<input type="number" className="form-control" ref="superArea" id="" placeholder="Super Area"/>	
				  			<div className="input-group-addon inputIcon">
		                     Sq ft
		                    </div>
				  		</div>

				  </div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
					  <span htmlFor="" className="mb7">Built Area</span>
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    	<input type="number" className="form-control" ref="builtupArea" name="" placeholder="Built Area"/>
					    {/*<div className="errorMsg">{this.state.errors.builtupArea}</div>*/}
					  		<div className="input-group-addon inputIcon">
		                     Sq ft
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
	</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id  	: state.property_id,
	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToAmenities : ()=> dispatch({type: "REDIRECT_TO_AMENITIES"}),
		backToLocation  	: ()=> dispatch({type: "BACK_TO_LOCATION"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PropertyDetails));