import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import swal 					from 'sweetalert';
import $ 						from "jquery";
import Form4 					from '../Form4/Form4.js';
import Form2 					from '../Form2/Form2.js';
import { Link }					from 'react-router-dom';


import './Form3.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
export default class Form3 extends Component{

		constructor(props){
			super(props);
			this.state = {
				formshow :"form-3",
				includecharges     :[],
			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
		}

		handleBack(event) {
   			event.preventDefault();
   			 this.props.updateForm("form-2");
  		}

  		handleNext(event){
        	event.preventDefault();
   			this.props.updateForm("form-4");
        }

        updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }

		updateUser(event){
			event.preventDefault();
			const formValues = {
				"expectedRate" 		: this.refs.expectedrate.value,
				"totalPrice" 			: this.refs.totalprice.value,
				"availableFrom" 				: this.refs.availableFrom.value,
				"description" 		: this.refs.description.value,
				"includeCharges"			:this.state.includecharges,
				"maintenanceCharges"			:this.state.maintenanceCharges,
				"maintenancePer"			:this.state.maintenancePer
				
			};
			console.log("form3====",formValues);
			axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.expectedrate.value 	  	= '';
						this.refs.totalprice.value 	  		= '';
						this.refs.availableFrom.value 	  			= '';
						this.refs.description.value 	  	= '';
						this.refs.maintenancePer.value 	  	= '';
						this.refs.maintenanceCharges.value 	  	= '';

						this.setState(
			              {
				            "includecharges "    : ''

			              });

						this.props.history.push("/Form5");
						$("#hij").hide();
    					$("#hij").removeClass('in');
						$("#klm").show();
          				$("#klm").addClass('in');
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
		}

		closeModal(){
			$("#hij").removeClass('hij');
		}

		totalInclude(e){

		  var otherProp;

		  if(e.target.checked)
		  {
		  otherProp = e.target.getAttribute('value');

		  this.state.includecharges.push(e.target.getAttribute('value'));

		  console.log("includecharges",this.state.includecharges);
		  }
		  else{
		  this.state.includecharges.pop(e.target.getAttribute('value'));
		  console.log("includecharges1",this.state.includecharges);

		  }

		}
		

	render() {
				var windowWidth = $(window).width();
		        var backImage = "backImageModal hidden-xs hidden-sm"
		        var winHeight = window.innerHeight;
    return (
    	
	 <div className={backImage} style={{"height": winHeight}}>
		{/*<Form4 />*/}
		{/*<div className="modal fade" id="hij" role="dialog">
	  	 <div className="modal-dialog modal-lg">
	      <div class="modal-content">
	   {/* <div class="modal-header">
		  </div>*/}
		    {/*<div class="modal-body ModalPd">*/}
		 	  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 page_content margTop">
			<form id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d">	
					<label className="title_sz"> Financial Details For My Apartment </label>
					<Link to="/HomePage" className=" ">
						<button type="button" className="close">&times;</button>
					</Link>
				</div>
			  </div>
			  {/*<hr />*/}
			  <div className="hr_border row"></div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<span>Expected Rate</span>
			  	 </div>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
			  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="expectedrate">
				    {/*<span className="asterisk">*</span>*/}
				     <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
				    <input type="number" className="form-control" ref="expectedrate"  id="" placeholder="Expected Rate"/>
				  			<div className="input-group-addon inputIcon">
		                     Sq ft
		                    </div>
		                 </div>
				  </div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

					  <div className="form-group" id="totalprice">

  					    {/*<label htmlFor="exampleFormControlInput1">Apartment Name</label><span className="asterisk">*</span>*/}
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
			  	 	

					    <input type="number" className="form-control" ref="totalprice" id="" placeholder="Total Ask"/>
					  </div>
					  </div>
				 </div>
			  </div>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>My Total Ask includes</label>
			  	 </div>
			  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl30">	
		  
		    		{/*<input type="radio" className="radio-inline" ref="carkPark" id="" placeholder=""/>	
		    		<span className="dataLabels">Car Park</span> 
		    		<input type="radio" className="radio-inline" ref="oneTimeMaintenace" id="" placeholder=""/>	
		  	 		<span className="dataLabels">One Time Maintenance</span>  
		  	 	
		  
		 
		    		<input type="radio" className="radio-inline" ref="stampDuty" id="" placeholder=""/>	
		  	 		<span className="dataLabels">Stamp Duty&Registration</span>  
		  	 	
		    		<input type="radio" className="radio-inline" ref="clubHouse" id="" placeholder=""/>	
		  	 		<span className="dataLabels">ClubHouse</span> */} 
		  	 		{/* <label className="radio-inline ">
				      <input type="radio" name="optradio"  ref="FF3" value="carkPark"  /> 
				      <span className="dataLabels">Car Park</span> 

				    </label>
				    <label className="radio-inline ">
				      <input type="radio" name="optradio" ref="FF3" value="oneTimeMaintenace" />
				  	 	<span className="dataLabels">One Time Maintenance</span>  

				    </label>
				    <label className="radio-inline ">
				      <input type="radio" name="optradio"  ref="FF3"value="stampDuty"/>
				  	 	<span className="dataLabels">Stamp Duty&Registration</span>  

				    </label>
				    <label className="radio-inline ">
				      <input type="radio" name="optradio" ref="FF3" value="clubHouse"/>
				  	 	<span className="dataLabels">ClubHouse</span>  

				    </label>
		  	 	*/}

			  	 	<label className="checkbox-inline">
				      <input type="checkbox"
				      		 value="carPark" 
				      		 id="1"
				      		 name="userCheckbox"
				      		 onChange={this.totalInclude.bind(this)}

				      		 />Car Park 
				    </label>
				    <label className="checkbox-inline pl44">
				      <input type="checkbox" 
				      		 value="oneTimeMaintenace" 
				      		 id="2"
				      		 name="userCheckbox"
				      		 onChange={this.totalInclude.bind(this)}

				      		 />One Time Maintenance 
				    </label>
				    <label className="checkbox-inline pl35">
				      <input type="checkbox"  
				      		 value="stampDuty" 
				      		 id="3"
				      		 name="userCheckbox"
				      		 onChange={this.totalInclude.bind(this)}

				      		 />Stamp Duty 
				    </label>
				    <label className="checkbox-inline pl35">
				      <input type="checkbox" 
				      		 value="clubHouse"
				      		 id="4"
				      		 name="userCheckbox"
				      		 onChange={this.totalInclude.bind(this)} 

				      		 />Club House 
				    </label>



	  	 	
		  </div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
		  			
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
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    {/*<span className="asterisk">*</span>*/}
				    	<input type="number" className="form-control" ref="maintenanceCharges" id="" placeholder="Maintenance Charge"/>	
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
						    	<option className="hidden">Select</option>
						    	<option value="month">Month</option>
						    	<option value="year">Year</option>
							</select>
					    {/*<span htmlFor="">Per</span><span className="asterisk">*</span>
					    <input type="number" className="form-control" ref="monthly" name="" placeholder="Monthly"/>
					    */}
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  	</div>
					  </div>
				  </div>
		 	 </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  		<b>My Apartment is Availabe From</b>
		  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_30">
		  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
			  <div className="form-group margBtm_5" id="date">
			    <span htmlFor="exampleFormControlInput1">Date</span>{/*<span className="asterisk">*</span>*/}
			    <div className="input-group inputBox-main " id="">
			    <input type="date" className="form-control" ref="availableFrom"  id="" />
				  	<div className="input-group-addon inputIcon">
		                <i className="fa fa-building iconClr"></i>
		            </div>
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
		  	{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
		  	</div>*/}
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)} >Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>

			</div>
		  /*</div>
		 </div>
		</div>
   </div>*/

		);
	}
}
