import React , { Component }	from 'react';
import axios 					from 'axios';
import swal 					from 'sweetalert';		

import { connect } 				from 'react-redux';
import {  withRouter}    		from 'react-router-dom';

import './PropertyDetails.css';

 class PropertyDetails extends Component{

		constructor(props){
			super(props);
			this.state = {
				furnishedStatus   : '',
				personal 		  : '',
				bedrooms 		  : '',
				balconies 		  : '',
				bathrooms 		  : '',
				pantry 			  : '',
				washrooms    	  : ''
			};
			this.radioChange  = this.radioChange.bind(this);
			this.radioChange1 = this.radioChange1.bind(this);
			this.radioChange2 = this.radioChange2.bind(this);
		}

		updateUser(event){
			event.preventDefault();
			const formValues = {
				"bedrooms" 			: this.state.bedrooms,
				"balconies" 		: this.state.balconies,
				"washrooms" 		: this.state.washrooms,
				"furnishedStatus"   : this.state.furnishedstatus,
				"personal"		    : this.state.personal,
				"pantry"		    : this.state.pantry,
				"bathrooms" 		: this.state.bathrooms,
				"ageofProperty" 	: this.refs.ageofproperty.value,
				"facing" 			: this.refs.facing.value,
				"superArea" 		: this.refs.superArea.value,
				"builtupArea" 		: this.refs.builtupArea.value,
				"property_id" 		: localStorage.getItem("propertyId"),
				"uid" 				: localStorage.getItem("uid"),

			};
			console.log("PropertyDetails req = ",formValues);
			if( this.state.furnishedstatus!="" &&  this.refs.builtupArea.value!="" )
			{
				axios
				.patch('/api/properties/patch/propertyDetails',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status === 200){
						console.log("PropertyDetails Res = ",res);
						this.props.redirectToAmenities(this.props.uid);
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

		radioChange(event) {
	    	this.setState({
	      	"furnishedstatus": event.currentTarget.value,
			    });
		 }
		radioChange1(event) {
	    	this.setState({
	      	"personal": event.currentTarget.value,
			    });
		 }

		 radioChange2(event) {
	    	this.setState({
	      	"pantry": event.currentTarget.value,
			    });
		 }

		backToLocation(){
			this.props.backToLocation();
		}

		builtArea(){
			const builtArea=parseInt(this.refs.builtupArea.value);
			const superArea=parseInt(this.refs.superArea.value);
			console.log("builtArea",builtArea);
			console.log("superArea",superArea);

			if(builtArea >= superArea){
				swal("Built Up Area should not be greater than Super Area", "", "warning");

			}
		}
		handleChange(event){
			// event.preventDefault();
			// var washroom = this.refs.washrooms.value;
			// this.setState({
	  //     	"washrooms":washroom,
			//     });
			// console.log("washroom value",washroom);
			const target = event.target.value;
			const name   = event.target.name;
			this.setState({
				[name]       : target
			});
		 }
		

	render() {
	   	return (
	  		<div className=" col-lg-12 col-md-12  col-sm-12 col-xs-12 mt20">
				<form  id="form">
					<div className=" row"></div>
		 			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb10">
					  		<b>My Property has</b>
					  	</div>
			  		</div>
			  		{
			  			this.props.propertyType == "Commercial" ? 
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
							<div className="form-group" id="bathroom">
							    <span htmlFor="" className="mb7">Washrooms</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     <i className="fa fa-building iconClr"></i>
				                    </div>
								    <select className="custom-select form-control " ref="washrooms" name="washrooms" value= {this.state.washrooms} onChange={this.handleChange.bind(this)} placeholder="select" >
								    	<option value="" className="hidden">--Select--</option>
								    	<option value="0">0</option>
								    	<option value="1">1</option>
								    	<option value="2">2</option>
								    	<option value="3">3</option>
								    	<option value="4">4</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
						    <span htmlFor="" className="mb7 col-lg-12 row">Personal Washroom</span>
							<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="yes"
						      		 checked={this.state.personal === "yes"}
				   					 onChange={this.radioChange1}    

						      		/>
						        <span className="mb5">Yes</span> 

						    </label>
						    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="no"
						             checked={this.state.personal === "no"}
				   					 onChange={this.radioChange1}  
						      		/>
						        <span className="mb5">No</span> 

						    </label>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
						    <span htmlFor="" className="mb7 col-lg-12 row">Pantry</span>
							<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="yes" 
						      		 checked={this.state.pantry === "yes"}
				   					 onChange={this.radioChange2}
						      		/>
						        <span className="mb5">Yes</span> 

						    </label>
						    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="no" 
						      		 checked={this.state.pantry === "no"}
				   					 onChange={this.radioChange2}
						      		/>
						        <span className="mb5">No</span> 

						    </label>
						</div>
				    </div>
				    :
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						    <div className="form-group" id="bedrooms">
							    <span htmlFor="" className="mb7">Bedrooms</span>
							  	 	<div className="input-group  " id="">
								      	<div className="input-group-addon inputIcon">
					                     <i className="fa fa-building iconClr"></i>
					                    </div>
									  	<select className="custom-select form-control "  ref="bedrooms" name="bedrooms" value= {this.state.bedrooms} onChange={this.handleChange.bind(this)}  placeholder="select" >
									    	<option value="" className="hidden">--Select--</option>
									    	<option value="1">1</option>
									    	<option value="2">2</option>
									    	<option value="3">3</option>
									    	<option value="4">4</option>
									    	<option value="5">5</option>
										</select>
									</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="form-group" id="balconies">
							    <span htmlFor="" className="mb7">Balconies</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     <i className="fa fa-building iconClr"></i>
				                    </div>
								    <select className="custom-select form-control " ref="balconies" name="balconies" value= {this.state.balconies} onChange={this.handleChange.bind(this)}  placeholder="select" >
								    	<option value="" className="hidden">--Select--</option>
								    	<option value="1">1</option>
								    	<option value="2">2</option>
								    	<option value="3">3</option>
								    	<option value="4">4</option>
									</select>
								</div>
						    </div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="form-group" id="bathroom">
							    <span htmlFor="" className="mb7">Bathrooms</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     <i className="fa fa-building iconClr"></i>
				                    </div>
								    <select className="custom-select form-control " ref="bathrooms" name="bathrooms" value= {this.state.bathrooms} onChange={this.handleChange.bind(this)}  placeholder="select" >
								    	<option value="" className="hidden">--Select--</option>
								    	<option value="1">1</option>
								    	<option value="2">2</option>
								    	<option value="3">3</option>
								    	<option value="4">4</option>
									</select>
								</div>
							</div>
						</div>
				    </div>
			  		}
					
				    
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 itIs">
					  		<b>It is</b>
					  		<span className="astrick">*</span>
					  	</div>
				    </div>
					<div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pl29">	
							 
						<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
					        <input type="radio"
					             name="optradio"  
					             value="Fully furnished" 
					      		 id="radio-example1"
					      		 checked={this.state.furnishedstatus === "Fully furnished"}
			   					 onChange={this.radioChange} />   
					      <span className="mb5">Fully furnished</span> 

					    </label>
					    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3">
					      	<input type="radio" 
					      		 name="optradio" 
					      		 value="Semi furnished" 
					      		 id="radio-example2"
					      		 checked={this.state.furnishedstatus === "Semi furnished"}
			   					 onChange={this.radioChange} />  
					  	 	<span className="mb5">Semi furnished</span>  

					    </label>
					    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3">
					      	<input type="radio"
					      		 name="optradio" 
					      		 value="Unfurnished" 
					      		 id="radio-example3"
					      		 checked={this.state.furnishedstatus === "Unfurnished"}
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
								    <span htmlFor="" className="mb5">Year(s) Old</span>
									<div className="input-group  " id="yearOld">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-building iconClr"></i>
					                    </div>
										<select className="custom-select form-control "  ref="ageofproperty" placeholder="select" >
									    	<option value="" className="hidden">--Property Age--</option>
									    	<option value="Under Construction">Under Construction</option>
									    	<option value="New">New(Less than a year)</option>
									    	<option value="1-2">1-2 Years</option>
									    	<option value="2-5">2-5 Years</option>
									    	<option value="5-8">5-8 Years</option>
									    	<option value=">8">>8 Years</option>
										</select>
									</div>				  
								</div>
							  </div>
							  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								  <div className="form-group" id="facing">
								    <span htmlFor="" className="mb5">Facing</span>
									<div className="input-group  " id="">
								      	<div className="input-group-addon inputIcon">
					                     <i className="fa fa-building iconClr"></i>
					                    </div>
										<select className="custom-select form-control "  ref="facing" placeholder="select" >
									    	<option value="" className="hidden">--Select property facing--</option>
									    	<option value="East" >    East</option>
									    	<option value="West" >    West</option>
									    	<option value="North">    North</option>
									    	<option value="South">    South</option>
									    	<option value="Northeast">Northeast</option>
									    	<option value="Northwest">Northwest</option>
									    	<option value="Southeast">Southeast</option>
									    	<option value="Southwest">Southwest</option>
										</select>
									</div>				  
								</div>
							  </div>
				    </div>
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
						  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							<div className="form-group" id="">
							  <span htmlFor="" className="mb7">Super Area</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-building iconClr"></i>
				                    </div>
						    			<input type="number" className="form-control" ref="superArea" placeholder="Super Area" min="0" max="20000" id="first" />	
						  			<div className="input-group-addon inputIcon">
				                     Sq ft
				                    </div>
						  		</div>
						  	</div>
						  </div>
						  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
							  <span htmlFor="" className="mb7">Built Up Area</span>
							  <span className="astrick">*</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-building iconClr"></i>
				                    </div>
							    	<input type="number" className="form-control" ref="builtupArea" name="" placeholder="Built Up Area" min="0" max="20000" id="second" onBlur={this.builtArea.bind(this)}/>
							  		<div className="input-group-addon inputIcon">
				                     Sq ft
				                    </div>
							  </div>
							</div>
						  </div>
				 	</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
					  	
					  	{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
					       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 " onClick={this.backToLocation.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
					  	</div>*/}
					  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right ">
					       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
					  	</div>
					</div>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	console.log("pState===",state);

	return {
		property_id  	: state.property_id,
		uid			    : state.uid,
		propertyType	: state.propertyType,
		transactionType	: state.transactionType,
	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToAmenities : (uid)=> dispatch({type: "REDIRECT_TO_AMENITIES",
											 uid:  uid	
								}),
		backToLocation  	: ()=> dispatch({type: "BACK_TO_LOCATION"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PropertyDetails));