import React , { Component }	from 'react';
import { Link } 				from 'react-router-dom';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import Form3 					from '../Form3/Form3.js';
import swal                     from 'sweetalert';


import './Form2.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';
// import Form1 from '../Form1/Form1.js';

/*var formValues=[];*/
export default class Form2 extends Component{

		constructor(props){
			super(props);
			this.state = {
				/*fields: {},
        		errors: {}*/
        		formshow :"form-2",
				furnishedStatus   : ''

			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
			this.radioChange = this.radioChange.bind(this);

		}

		/*validateFormReq() {

	      let fields = this.state.fields;
	      let errors = {};
	      let formIsValid = true;

	      if (!fields["city"]) {
	        formIsValid = false;
	        errors["city"] = "This field required";
	      }

	      if (!fields["locality"]) {
	        formIsValid = false;
	        errors["locality"] = "This field required";
	      }

	      if (!fields["streetArea"]) {
	        formIsValid = false;
	        errors["streetArea"] = "This field required";
	      }


	      this.setState({
	        errors: errors
	      });
	      return formIsValid;
	    }
	    
		validateForm() {

	      let fields = this.state.fields;
	      let errors = {};
	      let formIsValid = true;

	      if (typeof fields["city"] !== "undefined") {
	        if (!fields["city"].match(/^[a-zA-Z ]*$/)) {
	          formIsValid = false;
	          errors["city"] = "*Please enter alphabet characters only.";
	        }
	      }
	      this.setState({
	        errors: errors
	      });
	      return formIsValid;
	    }*/

	    updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }
		handleBack(event) {
			event.preventDefault();
   			 /*this.props.history.push('/Form1');*/
   			 this.props.updateForm("form-1");
   			/*$("#abc").show();
			$("#abc").addClass('in');
   			$("#efg").hide();
			$("#efg").removeClass('in');
			console.log("abc");*/
			
  		}
        handleNext(event){
        	event.preventDefault();
   			this.props.updateForm("form-3");
        }
  		/*handleChange(event){
	  
	      let fields = this.state.fields;
	      fields[event.target.name] = event.target.value;
	      this.setState({
	        fields
	      });
	       if (this.validateForm()) {
	        let errors = {};
	        errors[event.target.name] = "";
	        this.setState({
	          errors: errors
	        });
	      }
  }*/

		updateUser(event){
			// console.log('updateUser');
			event.preventDefault();
			/*if (this.validateForm() && this.validateFormReq()) {*/
			// console.log("abc");
			const formValues = {
				"bedrooms" 			: this.refs.bedrooms.value,
				"balconies" 		: this.refs.balconies.value,
				"furnishedStatus"   :this.state.furnishedstatus,
				"bathroom" 			: this.refs.bathroom.value,
				"ageofProperty" 	: this.refs.ageofproperty.value,
				"facing" 			: this.refs.facing.value,
				"superArea" 		: this.refs.superArea.value,
				"builtupArea" 		: this.refs.builtupArea.value,


			};
				console.log("form2",formValues);

			//this.props.fun(formValues);
			/*let fields = {};
			    fields["city"] = "";
			    fields["society"] = "";
			    fields["address"] = "";
			    fields["floor"] = "";
			    fields["totalfloor"] = "";
			    fields["bedrooms"] = "";
			    fields["balconies"] = "";
			    fields["bathroom"] = "";
			    fields["fullfurnishedstatus"] = "";
			    fields["semifurnishedstatus"] = "";
			    fields["unfurnishedstatus"] = "";
			    fields["ageofproperty"] = "";
			    fields["facing"] = "";
			    this.setState({
			               "city"           : "",          
			                "society"       : "",         
			                "address"     : "",
			                "floor"     : "",
			                "totalfloor"     : "",
			                "bedrooms"     : "",
			                "balconies"     : "",
			                "bathroom"     : "",
			                "fullfurnishedstatus"     : "",
			                "semifurnishedstatus"     : "",
			                "unfurnishedstatus"     : "",
			                "ageofproperty"     : "",
			                "facing"     : "",
			                 fields:fields
			    });*/


			axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.bedrooms.value 	= '';
						this.refs.balconies.value 	= '';
						this.refs.bathroom.value 	= '';
						this.refs.facing.value 	  = '';
						this.refs.ageofproperty.value 	  = '';
						this.refs.superArea.value 			= '';
						this.refs.builtupArea.value 			= '';

						this.setState(
			              {
				            "furnishedStatus "    : ''

			              });

						this.props.history.push("/Form4");
						$("#efg").hide();
    					$("#efg").removeClass('in');
						$("#hij").show();
          				$("#hij").addClass('in');
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
			/*}*/
			// this.props.updateForm("form-3");
		}

		closeModal(){
			$("#efg").removeClass('in');
		}
		radioChange(event) {
	       	event.preventDefault();
	    	this.setState({
	      	"furnishedstatus": event.currentTarget.value,
			    });
		 }

	render() {
    return (
    <div>
    
      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
			<form  id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
					<label className="title_sz">Provide property details of your property to SELL.</label>
					<button type="button" className="close" onClick={this.closeModal.bind(this)} data-dismiss="modal">&times;</button>
				</div>
			  </div>
			  {/*<hr />*/}
			  <div className="hr_border row"></div>
		 
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
		  		<b>My Apartment has</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
			  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="bedrooms">
				    <span htmlFor="" className="mb5">Bedrooms</span>{/*<span className="asterisk">*</span>*/}
				    {/*<input type="text" className="form-control" ref="bedrooms" id="exampleFormControlInput1" placeholder=""/>*/}
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
					{/*<div className="errorMsg">{this.state.errors.bedrooms}</div>*/}
					</div>
				  </div>
			  </div>
			  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="balconies">
				    <span htmlFor="" className="mb5">Balconies</span>{/*<span className="asterisk">*</span>*/}
				    {/*<input type="email" className="form-control" ref="balconies" id="exampleFormControlInput1" placeholder=""/>*/}
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
					{/*<div className="errorMsg">{this.state.errors.balconies}</div>*/}
					</div>
				  </div>
			  </div>
			   <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="bathroom">
				    <span htmlFor="" className="mb5">Bathroom</span>{/*<span className="asterisk">*</span>*/}
				    <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
				    {/*<input type="email" className="form-control" ref="balconies" id="exampleFormControlInput1" placeholder=""/>*/}
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
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
		  		<b>It is</b>
		  	</div>
		  </div>
		  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pl25">	
				 
			 <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
		      <input type="radio"
		             name="optradio"  
		             value="fullfurnished" 
		      		 id="radio-example1"
		      		 checked={this.state.furnishedstatus === "fullfurnished"}
   					 onChange={this.radioChange} />   
		      <span className="">Full furnished</span> 

		    </label>
		    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3">
		      <input type="radio" 
		      		 name="optradio" 
		      		 value="semifurnished" 
		      		 id="radio-example2"
		      		 checked={this.state.furnishedstatus === "semifurnished"}
   					 onChange={this.radioChange} />  
		  	 	<span className="">Semi furnished</span>  

		    </label>
		    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3">
		      <input type="radio"
		      		 name="optradio" 
		      		 value="unfurnished" 
		      		 id="radio-example3"
		      		 checked={this.state.furnishedstatus === "unfurnished"}
   					 onChange={this.radioChange} /> 
		  	 	<span className="">Unfurnished</span>  

		    </label>
		  </div>
		  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
		  		<b>It is</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrg_bt_35">	
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
		   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="">
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    {/*<label htmlFor="exampleFormControlInput1">Apartment Type</label><span className="asterisk">*</span>*/}
				    	<input type="number" className="form-control" ref="superArea" id="" placeholder="Super Area"/>	
				  			<div className="input-group-addon inputIcon">
		                     Sq ft
		                    </div>
				  		</div>

				  </div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
					    {/*<label htmlFor="exampleFormControlInput1">Apartment Name</label><span className="asterisk">*</span>*/}
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
		  	
	  		{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
		  	</div>*/}
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)}>Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>
	</div>
		);
	}
}

