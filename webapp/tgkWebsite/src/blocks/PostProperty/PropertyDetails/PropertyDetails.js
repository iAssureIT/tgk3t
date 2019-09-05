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
				originalValues    : '',
				furnishedStatus   : '',
				personal 		  : '',
				bedrooms 		  : '',
				balconies 		  : '',
				bathrooms 		  : '',
				pantry 			  : '',
				washrooms    	  : '',
				updateOperation   : false,
			};
			this.radioChange  = this.radioChange.bind(this);
			this.radioChange1 = this.radioChange1.bind(this);
			this.radioChange2 = this.radioChange2.bind(this);

			console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			if(this.props.updateStatus === true){

	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (response) =>{
						console.log("get property in property = ",response);

						this.setState({
								originalValues  : response.data.propertyDetails,
								bedrooms 		: response.data.propertyDetails.bedrooms,
						    	balconies 		: response.data.propertyDetails.balconies,
						    	washrooms 		: response.data.propertyDetails.washrooms,
						    	furnishedstatus : response.data.propertyDetails.furnishedStatus,
						    	personal 		: response.data.propertyDetails.personal,
						    	pantry 			: response.data.propertyDetails.pantry,
								bathrooms     	: response.data.propertyDetails.bathrooms,
								ageofproperty 	: response.data.propertyDetails.ageofProperty,
								facing 			: response.data.propertyDetails.facing,
								superArea 		: response.data.propertyDetails.superArea,
								builtupArea 	: response.data.propertyDetails.builtupArea,
								updateOperation : true,

							});
					})
					.catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
				                             this.props.history.push("/");
				                        }
				    });

        	}
		}

		componentDidMount(){
		      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
		  }

		updateUser(event){
			event.preventDefault();

			if(this.state.updateOperation === true){
				console.log("update fun");
				var ov = this.state.originalValues;
				if(this.state.bedrooms === ov.bedrooms && this.state.balconies === ov.balconies && this.state.washrooms === ov.washrooms &&
					this.state.furnishedstatus === ov.furnishedStatus && this.state.personal === ov.personal && this.state.pantry === ov.pantry &&
					 this.state.bathrooms === ov.bathrooms && this.state.ageofproperty === ov.ageofProperty && this.state.facing === ov.facing 
					 && this.state.superArea === ov.superArea && this.state.builtupArea === ov.builtupArea)
				{
						console.log("same data");
						this.props.redirectToAmenities(this.props.uid,this.props.property_id);
				}else{

					console.log("diff data");
					const formValues = {
					"bedrooms" 			: this.state.bedrooms,
					"balconies" 		: this.state.balconies,
					"washrooms" 		: this.state.washrooms,
					"furnishedStatus"   : this.state.furnishedstatus,
					"personal"		    : this.state.personal,
					"pantry"		    : this.state.pantry,
					"bathrooms" 		: this.state.bathrooms,
					"ageofProperty" 	: this.state.ageofproperty,
					"facing" 			: this.state.facing,
					"superArea" 		: this.state.superArea,
					"builtupArea" 		: this.state.builtupArea,
					"property_id" 		: localStorage.getItem("propertyId"),
					"uid" 				: localStorage.getItem("uid"),
				};
				console.log("PropertyDetails req = ",formValues);
				if( this.state.furnishedstatus!=="" && this.state.furnishedstatus!==undefined &&  this.refs.builtupArea.value!=="" ){
					axios
					.patch('/api/properties/patch/propertyDetails',formValues)
					.then( (res) =>{
						console.log(res);
						if(res.status === 200){
							console.log("PropertyDetails Res = ",res);
							this.props.redirectToAmenities(this.props.uid,this.props.property_id);
						}
					})
					.catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
				                             this.props.history.push("/");
				                        }
				     });
				}else{
					swal("Please enter mandatory fields", "", "warning");
	              	console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}


				}
			}else{
				console.log("submit fun");

					const formValues = {
					"bedrooms" 			: this.state.bedrooms,
					"balconies" 		: this.state.balconies,
					"washrooms" 		: this.state.washrooms,
					"furnishedStatus"   : this.state.furnishedstatus,
					"personal"		    : this.state.personal,
					"pantry"		    : this.state.pantry,
					"bathrooms" 		: this.state.bathrooms,
					"ageofProperty" 	: this.state.ageofproperty,
					"facing" 			: this.state.facing,
					"superArea" 		: this.state.superArea,
					"builtupArea" 		: this.state.builtupArea,
					"property_id" 		: localStorage.getItem("propertyId"),
					"uid" 				: localStorage.getItem("uid"),
				};
				console.log("PropertyDetails req = ",formValues);
				if( this.state.furnishedstatus!="" && this.state.furnishedstatus!==undefined &&  this.refs.builtupArea.value!="" ){
					axios
					.patch('/api/properties/patch/propertyDetails',formValues)
					.then( (res) =>{
						console.log(res);
						if(res.status === 200){
							console.log("PropertyDetails Res = ",res);
							this.props.redirectToAmenities(this.props.uid,this.props.property_id);
						}
					})
					.catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
				                             this.props.history.push("/");
				                        }
				       });
				}else{
					swal("Please enter mandatory fields", "", "warning");
	              	console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}


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
			// this.props.backToLocation();
			this.props.backToLocation(this.props.uid,localStorage.getItem("propertyId"));


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
		 isNumberKey(event)
		   {

		   var charCode = (event.which) ? event.which : event.keyCode

		   if (charCode > 31 && (charCode < 48 || charCode > 57)  && (charCode < 96 || charCode > 105))
		   {
		    event.preventDefault();
		      return false;
		    }
		    else{
		      return true;
		    }
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
						             value="Yes"
						      		 checked={this.state.personal === "Yes"}
				   					 onChange={this.radioChange1}    

						      		/>
						        <span className="mb5">Yes</span> 

						    </label>
						    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="No"
						             checked={this.state.personal === "No"}
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
						             value="Yes" 
						      		 checked={this.state.pantry === "Yes"}
				   					 onChange={this.radioChange2}
						      		/>
						        <span className="mb5">Yes</span> 

						    </label>
						    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="No" 
						      		 checked={this.state.pantry === "No"}
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
					<div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 pl29">	
							 
						<label className="radio-inline col-lg-3  col-md-3 col-sm-12 col-xs-12 ">
					        <input type="radio"
					             name="optradio"  
					             value="Fully furnished" 
					      		 id="radio-example1"
					      		 checked={this.state.furnishedstatus === "Fully furnished"}
			   					 onChange={this.radioChange} />   
					      <span className="mb5">Fully furnished</span> 

					    </label>
					    <label className="radio-inline col-lg-3  col-md-3 col-sm-12 col-xs-12">
					      	<input type="radio" 
					      		 name="optradio" 
					      		 value="Semi furnished" 
					      		 id="radio-example2"
					      		 checked={this.state.furnishedstatus === "Semi furnished"}
			   					 onChange={this.radioChange} />  
					  	 	<span className="mb5">Semi furnished</span>  

					    </label>
					    <label className="radio-inline col-lg-3  col-md-3 col-sm-12 col-xs-12">
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
										<select className="custom-select form-control " name="ageofproperty" ref="ageofproperty" placeholder="select" value={this.state.ageofproperty} onChange={this.handleChange.bind(this)} >
									    	<option value="" className="hidden">--Property Age--</option>
									    	<option value="Under Construction">Under Construction</option>
									    	<option value="New">Newly Built</option>
									    	<option value="<4">Less than 4 Years</option>
									    	<option value="4-8">4-8 Years</option>
									    	<option value="8-12">8-12 Years</option>
									    	<option value=">12"> Above 12 Years</option>
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
										<select className="custom-select form-control " name="facing" ref="facing" value={this.state.facing} placeholder="select" onChange={this.handleChange.bind(this)} >
									    	<option value="" className="hidden">--Select property facing--</option>
									    	<option value="East" >    East</option>
									    	<option value="West" >    West</option>
									    	<option value="North">    North</option>
									    	<option value="South">    South</option>
									    	<option value="Northeast">Northeast</option>
									    	<option value="Northwest">Northwest</option>
									    	<option value="Southeast">Southeast</option>
									    	<option value="Southwest">Southwest</option>
									    	<option value="Don't Know">Don't Know</option>
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
						    			<input type="text" className="form-control" name="superArea" value={this.state.superArea} ref="superArea" placeholder="Super Area" min="0" id="first" onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} />	
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
							    	<input type="text" className="form-control" ref="builtupArea" name="builtupArea" value={this.state.builtupArea}  onChange={this.handleChange.bind(this)} placeholder="Built Up Area" min="0" max="20000" id="second" onKeyDown={this.isNumberKey.bind(this)} onBlur={this.builtArea.bind(this)}/>
							  		<div className="input-group-addon inputIcon">
				                     Sq ft
				                    </div>
							  </div>
							</div>
						  </div>
				 	</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
					  	
					  	{
					  		<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-6 pull-left">
					       		<button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 " onClick={this.backToLocation.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
					  		</div>
					  	
					  	}
					  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-6 pull-right ">
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
		updateStatus    : state.updateStatus,		

	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToAmenities : (uid,property_id)=> dispatch({type: "REDIRECT_TO_AMENITIES",
											 uid:  uid,
											 property_id : property_id	
								}),
		backToLocation  	: (uid,property_id)=> dispatch({type: "BACK_TO_LOCATION",
											 uid:  uid,
											 property_id : property_id	
								}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PropertyDetails));