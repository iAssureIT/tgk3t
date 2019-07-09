import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import swal 					from 'sweetalert';
import $ 						from "jquery";
import Form4 					from '../Form4/Form4.js';
import Form2 					from '../Form2/Form2.js';


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
				formshow :"form-3"
			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
		}

		handleBack(event) {
   			event.preventDefault();
   			 /*this.props.history.push('/Form1');*/
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
			console.log("abc");
			const formValues = {
				"superArea" 		: this.refs.superArea.value,
				"builtArea" 		: this.refs.builtArea.value,
				"expectedRate" 		: this.refs.expectedRate.value,
				"totalAsk" 			: this.refs.totalAsk.value,
				"carkPark" 			: this.refs.carkPark.value,
				"oneTimeMaintenace" : this.refs.monthly.value,
				"monthly" 			: this.refs.oneTimeMaintenace.value,
				"stampDuty" 		: this.refs.stampDuty.value,
				"clubHouse" 		: this.refs.clubHouse.value,
				"date" 				: this.refs.date.value,
				"description" 		: this.refs.description.value,
				
			};
			//this.props.fun(formValues);
			axios
				.post('/api/users',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 201){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.superArea.value 			= '';
						this.refs.builtArea.value 			= '';
						this.refs.expectedRate.value 	  	= '';
						this.refs.totalAsk.value 	  		= '';
						this.refs.carkPark.value 	  		= '';
						this.refs.oneTimeMaintenace.value 	= '';
						this.refs.monthly.value 	  		= '';
						this.refs.stampDuty.value 	  		= '';
						this.refs.clubHouse.value 	  		= '';
						this.refs.date.value 	  			= '';
						this.refs.description.value 	  	= '';
						this.props.history.push("/Form4");
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
				// this.props.updateForm("form-4");
		}

		closeModal(){
			$("#hij").removeClass('hij');
		}

	render() {
    return (
    	
	 <div>
		{/*<Form4 />*/}
		{/*<div className="modal fade" id="hij" role="dialog">
	  	 <div className="modal-dialog modal-lg">
	      <div class="modal-content">
	   {/* <div class="modal-header">
		  </div>*/}
		    {/*<div class="modal-body ModalPd">*/}
		 	  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
			<form id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d">	
					<label className="title_sz">My Apartment Size and Financial Details</label>
					<button type="button" className="close" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
				</div>
			  </div>
			  {/*<hr />*/}
			  <div className="hr_border row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="">
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    {/*<label htmlFor="exampleFormControlInput1">Apartment Type</label><span className="asterisk">*</span>*/}
				    	<input type="text" className="form-control" ref="superArea" id="" placeholder="Super Area"/>	
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
					    	<input type="text" className="form-control" ref="builtArea" name="" placeholder="Built Area"/>
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  		<div className="input-group-addon inputIcon">
		                     Sq ft
		                    </div>
					  </div>
					</div>
				  </div>
		 	 </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<span>Expected Rate</span>
			  	 </div>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
			  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="expectedRate">
				    {/*<span className="asterisk">*</span>*/}
				     <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
				    <input type="text" className="form-control" ref="expectedRate"  id="" placeholder="Expected Rate"/>
				  			<div className="input-group-addon inputIcon">
		                     Sq ft
		                    </div>
		                 </div>
				  </div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group" id="totalAsk">
  					    {/*<label htmlFor="exampleFormControlInput1">Apartment Name</label><span className="asterisk">*</span>*/}
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    <input type="text" className="form-control" ref="totalAsk" id="" placeholder="Total Ask"/>
					  </div>
					  </div>
				 </div>
			  </div>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>My Total Ask includes</label>
			  	 </div>
			  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
		  
		    		{/*<input type="radio" className="radio-inline" ref="carkPark" id="" placeholder=""/>	
		    		<span className="dataLabels">Car Park</span> 
		    		<input type="radio" className="radio-inline" ref="oneTimeMaintenace" id="" placeholder=""/>	
		  	 		<span className="dataLabels">One Time Maintenance</span>  
		  	 	
		  
		 
		    		<input type="radio" className="radio-inline" ref="stampDuty" id="" placeholder=""/>	
		  	 		<span className="dataLabels">Stamp Duty&Registration</span>  
		  	 	
		    		<input type="radio" className="radio-inline" ref="clubHouse" id="" placeholder=""/>	
		  	 		<span className="dataLabels">ClubHouse</span> */} 
		  	 		 <label className="radio-inline ">
				      <input type="radio" name="optradio"  ref="carkPark"  /> 
				      <span className="dataLabels">Car Park</span> 

				    </label>
				    <label className="radio-inline ">
				      <input type="radio" name="optradio" ref="oneTimeMaintenace" />
				  	 	<span className="dataLabels">One Time Maintenance</span>  

				    </label>
				    <label className="radio-inline ">
				      <input type="radio" name="optradio" ref="stampDuty"/>
				  	 	<span className="dataLabels">Stamp Duty&Registration</span>  

				    </label>
				    <label className="radio-inline ">
				      <input type="radio" name="optradio" ref="clubHouse"/>
				  	 	<span className="dataLabels">ClubHouse</span>  

				    </label>
		  	 	
	  	 	
		  </div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
		  			
		  		</div>
		  		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
		  			<span>per</span>
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
				    	<input type="text" className="form-control" ref="maintenanceCharge" id="" placeholder="Maintenance Charge"/>	
				  		</div>
				  </div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    {/*<span htmlFor="">Per</span><span className="asterisk">*</span>*/}
					    <input type="text" className="form-control" ref="monthly" name="" placeholder="Monthly"/>
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
			    <input type="date" className="form-control" ref="date"  id="" />
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
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
		  	</div>
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
