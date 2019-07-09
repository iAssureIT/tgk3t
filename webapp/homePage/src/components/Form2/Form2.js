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
        		formshow :"form-2"
			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
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
				"city" 				: this.refs.city.value,
				"society" 			: this.refs.society.value,
				"address" 			: this.refs.address.value,
				"floor" 			: this.refs.floor.value,
				"totalfloor" 		: this.refs.totalfloor.value,
				"bedroom" 			: this.refs.bedroom.value,
				"balconies" 		: this.refs.balconies.value,
				"bathroom" 			: this.refs.bathroom.value,
				"fullFurnished" 	: this.refs.fullFurnished.value,
				"semiFurnished" 	: this.refs.semiFurnished.value,
				"unFurnished" 		: this.refs.unFurnished.value,
				"yearOld" 			: this.refs.yearOld.value,
				"facing" 			: this.refs.facing.value,
			};
				console.log("as",formValues);

			//this.props.fun(formValues);
			/*let fields = {};
			    fields["city"] = "";
			    fields["society"] = "";
			    fields["address"] = "";
			    fields["floor"] = "";
			    fields["totalfloor"] = "";
			    fields["bedroom"] = "";
			    fields["balconies"] = "";
			    fields["bathroom"] = "";
			    fields["fullFurnished"] = "";
			    fields["semiFurnished"] = "";
			    fields["unFurnished"] = "";
			    fields["yearOld"] = "";
			    fields["facing"] = "";
			    this.setState({
			               "city"           : "",          
			                "society"       : "",         
			                "address"     : "",
			                "floor"     : "",
			                "totalfloor"     : "",
			                "bedroom"     : "",
			                "balconies"     : "",
			                "bathroom"     : "",
			                "fullFurnished"     : "",
			                "semiFurnished"     : "",
			                "unFurnished"     : "",
			                "yearOld"     : "",
			                "facing"     : "",
			                 fields:fields
			    });*/


			axios
				.post('/api/users',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 201){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.city.value = '';
						this.refs.society.value = '';
						this.refs.address.value = '';
						this.refs.floor.value 	= '';
						this.refs.totalfloor.value 	= '';
						this.refs.bedroom.value 	= '';
						this.refs.balconies.value 	= '';
						this.refs.bathroom.value 	= '';
						this.refs.fullFurnished.value = '';
						this.refs.semiFurnished.value = '';
						this.refs.unFurnished.value = '';
						this.refs.facing.value 	  = '';
						this.refs.yearOld.value 	  = '';

						this.props.history.push("/Form3");
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

	render() {
    return (
    <div>
    
      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content ">
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
				  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
					  <div className="form-group" id="">
					    {/*<label for="">Apartment Type</label><span className="asterisk">*</span>*/}
				    	 <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fa fa-building iconClr"></i>
		                    </div>
			    		    <input type="text" className="form-control" ref="city" id="city" placeholder="Magarptta City"/>	
				  		</div>
				  	</div>
				  </div>
				  <div className="col-lg-3 col-md-2 col-sm-6">
				  	<div className="form-group" id="society">
					    {/*<label for="">Apartment Type</label><span className="asterisk">*</span>*/}
				    	 <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fa fa-building iconClr"></i>
		                    </div>
				    		<input type="text" className="form-control" ref="society" id="society" placeholder="Add society"/>	
				  		</div>
				  	</div>
				  </div>
			  <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group"  id="address" >
				    {/*<label for="">Apartment Name</label><span className="asterisk">*</span>*/}
				    <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
				    	<input type="text" className="form-control" ref="address" name="address" placeholder="Address"/>
				    	{/*<div className="errorMsg">{this.state.errors.address}</div>*/}
				  	</div>
				  </div>
			  </div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
		  		<b>My Apartment is on</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
		  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
			  <div className="form-group" id="floor">
			    {/*<div className="errorMsg">{this.state.errors.floor}</div>*/}
			    {/*<input type="text" className="form-control" ref="floor"  id="" placeholder="Floor"/>*/}
		  		<div className="input-group inputBox-main " id="">
			      	<div className="input-group-addon inputIcon">
                     	<i className="fa fa-building iconClr"></i>
                    </div>
			  		<select className="custom-select form-control " name="floor" ref="floor" placeholder="Floor" >
				    	<option className="hidden">Floor</option>
				    	<option>Upper Base</option>
				    	<option>Lower Base</option>
				    	<option>Ground</option>
				    	<option>1</option>
				    	<option>2</option>
				    	<option>upto 200 </option>
					</select>
				</div>
			  </div>
			</div>

			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="totalfloor">
				  	{/*<input type="text" className="form-control" ref="totalfloor" id="exampleFormControlInput1" placeholder="Total floor"/>*/}
				  	<div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					  	<select className="custom-select form-control " name="totalfloor" ref="totalfloor" placeholder="Floor" >
					    	<option className="hidden">Total Floor</option>
					    	<option>Upper Base</option>
					    	<option>Lower Base</option>
					    	<option>Ground</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>upto 200 </option>
						</select>
					</div>
				  </div>
			 </div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
		  		<b>My Apartment has</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
			  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="bedroom">
				    <span htmlFor="">Bedroom</span>{/*<span className="asterisk">*</span>*/}
				    {/*<input type="text" className="form-control" ref="bedroom" id="exampleFormControlInput1" placeholder=""/>*/}
				  	 <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fas fa-rupee-sign iconSize12"></i>
	                    </div>
					  	<select className="custom-select form-control " name="bedroom" ref="bedroom" placeholder="select" >
					    	<option className="hidden">select</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>3</option>
					    	<option>4</option>
					    	<option>4</option>
					    	<option>5</option>
						</select>
					{/*<div className="errorMsg">{this.state.errors.bedroom}</div>*/}
					</div>
				  </div>
			  </div>
			  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				  <div className="form-group" id="balconies">
				    <span htmlFor="">Balconies</span>{/*<span className="asterisk">*</span>*/}
				    {/*<input type="email" className="form-control" ref="balconies" id="exampleFormControlInput1" placeholder=""/>*/}
				    <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					    <select className="custom-select form-control " name="balconies" ref="balconies" placeholder="select" >
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
				    <span htmlFor="">Bathroom</span>{/*<span className="asterisk">*</span>*/}
				    <div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
				    {/*<input type="email" className="form-control" ref="balconies" id="exampleFormControlInput1" placeholder=""/>*/}
					    <select className="custom-select form-control " name="bathroom" ref="bathroom" placeholder="select" >
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
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
				 {/*<div className="col-lg-4  col-md-4 col-sm-4 col-xs-4  row">
		    		<input type="radio" className="radio_style" ref="fullFurnished"  placeholder=""/>	
		    		<span className="labelMarg">Full furnished</span> 
		    	</div> 
		    	<div className="col-lg-4  col-md-4 col-sm-4 col-xs-4 ">	    		
		    		<input type="radio" className="radio_style" ref="semiFurnished"  placeholder=""/>	
		  	 		<span className="labelMarg">Semifurnished</span>  
		  	 	</div>
		  	 	<div className="col-lg-4  col-md-4 col-sm-4 col-xs-4 ">	    		
		    		<input type="radio" className="radio_style" ref="unFurnished"  placeholder=""/>	
		  	 		<span className="labelMarg">Unfurnished</span>  
		  	 	</div>*/}
			 <label className="radio-inline col-lg-4  col-md-4 col-sm-4 col-xs-4 row">
		      <input type="radio" name="optradio"  ref="fullFurnished"  /> 
		      <span className="labelMarg">Full furnished</span> 

		    </label>
		    <label className="radio-inline col-lg-4  col-md-4 col-sm-4 col-xs-4">
		      <input type="radio" name="optradio" ref="semiFurnished" />
		  	 	<span className="labelMarg">Semifurnished</span>  

		    </label>
		    <label className="radio-inline col-lg-4  col-md-4 col-sm-4 col-xs-4">
		      <input type="radio" name="optradio" ref="unFurnished"/>
		  	 	<span className="labelMarg">Unfurnished</span>  

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
					    <span htmlFor="">Year Old</span>{/*<span className="asterisk">*</span>*/}
						<div className="input-group inputBox-main " id="yearOld">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
							<select className="custom-select form-control " name="yearOld" ref="yearOld" placeholder="select" >
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
					    <span htmlFor="">Facing</span>{/*<span className="asterisk">*</span>*/}
						<div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fa fa-building iconClr"></i>
		                    </div>
							<select className="custom-select form-control " name="facing" ref="facing" placeholder="select" >
						    	<option className="hidden">--select property facing--</option>
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
		  	
	  		<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
		  	</div>
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

