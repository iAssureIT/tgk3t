import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import Form5 					from '../Form5/Form5.js';
import Form3 					from '../Form3/Form3.js';
import swal                     from 'sweetalert';


import './Form4.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

export default class Form4 extends Component{

		constructor(props){
			super(props);
			this.state = {
				formshow :"form-4",
				Amenities     :[],

			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
		}

		handleBack(event) {
   			event.preventDefault();
   			 /*this.props.history.push('/Form1');*/
   			 this.props.updateForm("form-3");
  		}

  		handleNext(event){
        	event.preventDefault();
   			this.props.updateForm("form-5");
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

				"Amenities"			:this.state.Amenities

				/*"gasPipeline" 				: this.refs.gasPipeline.value,
				"clubHouse" 				: this.refs.clubHouse.value,
				"internetService" 			: this.refs.internetService.value,
				"shoppingCenter" 			: this.refs.shoppingCenter.value,
				"lift" 						: this.refs.lift.value,
				"sewageTreatmentPlan" 		: this.refs.sewageTreatmentPlan.value,
				"airConditioner" 			: this.refs.airConditioner.value,
				"swimmingPool" 				: this.refs.swimmingPool.value,
				"intercom" 					: this.refs.intercom.value,
				"childrenPlay" 				: this.refs.childrenPlay.value,
				"powerBackup" 				: this.refs.powerBackup.value,
				"internetGym" 				: this.refs.internetGym.value,
				*/
				
			};
			console.log("form4==",formValues);
			//this.props.fun(formValues);
			axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						// alert("Data iserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						/*this.refs.gasPipeline.value = '';
						this.refs.clubHouse.value = '';
						this.refs.internetService.value = '';
						this.refs.shoppingCenter.value = '';
						this.refs.lift.value = '';
						this.refs.sewageTreatmentPlan.value = '';
						this.refs.airConditioner.value = '';
						this.refs.swimmingPool.value = '';
						this.refs.swimmingPool.value = '';
						this.refs.childrenPlay.value = '';
						this.refs.powerBackup.value = '';
						this.refs.internetGym.value = '';*/
						this.setState(
			              {
				            "Amenities "    : ''

			              });
						this.props.history.push("/Form3");
						$("#klm").hide();
    					$("#klm").removeClass('in');
						$("#nop").show();
          				$("#nop").addClass('in');
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
				// this.props.updateForm("form-5");
		}

		closeModal(){
			$("#klm").removeClass('klm');
		}
		totalInclude(e){

		  var otherProp;

		  if(e.target.checked)
		  {
		  otherProp = e.target.getAttribute('value');

		  this.state.Amenities.push(e.target.getAttribute('value'));

		  console.log("Amenities",this.state.Amenities);
		  }
		  else{
		  this.state.Amenities.pop(e.target.getAttribute('value'));
		  console.log("Amenities1",this.state.Amenities);

		  }

		}

	render() {
    return (

    <div>
    	{/*<Form5 />	
	   <div className="modal fade" id="klm" role="dialog">
	  	 <div className="modal-dialog modal-lg">
	      <div class="modal-content">
		    <div class="modal-body ModalPd">*/}
		       <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
			<form id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
					<label className="title_sz">My Apartment has following Amenities</label>
					<button type="button" className="close" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
				</div>
			  </div>
			  {/*<hr />*/}
			  <div className="hr_border1 hr_border row"></div>
		  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 		Select the Amenities available	
		  	 	</div>
		  	 </div>
		  	 <div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-12 col-xs-12  ">
		  	 	<div className="col-lg-12 ">
		  	 		<div className="col-lg-6 FF4I"><b>Internal</b></div>
		  	 		<div className="col-lg-6 FF4I"><b>External</b></div>
		  	 	</div>
		  	 		<div className="col-lg-12  mb20">
		  	 			<div className="col-lg-6 FF4I1">
		  	 				<label className="checkbox-inline col-lg-12 pt8">
						      <input type="checkbox"
						      		 value="gasPipeline" 
						      		 id="1"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 />Gas Pipeline
						    </label>
						    <label className="checkbox-inline col-lg-12 pt8 pl21">
						      <input type="checkbox" 
						      		 value="internetService" 
						      		 id="3"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 />Internet Service 
						    </label>

						    <label className="checkbox-inline col-lg-9 pt8 pl24">
						      <input type="checkbox"
						      		 value="lift" 
						      		 id="5"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 />Lift 
						    </label>

						     <label className="checkbox-inline col-lg-12 pt8 pl15">
							      <input type="checkbox" 
							      		 value="airConditioner" 
							      		 id="7"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)}

							      		 />Air Conditioner
							    </label>

							    <label className="checkbox-inline col-lg-11 pt8 pl2">
							      <input type="checkbox"
							      		 value="intercom" 
							      		 id="9"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)}

							      		 />Intercom
							    </label>

							    <label className="checkbox-inline col-lg-12 pt8 pl11">
							      <input type="checkbox" 
							      		 value="powerBackup"
							      		 id="11"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} 

							      		 />Power Backup
							    </label>

							    <label className="checkbox-inline col-lg-12 pt8 pl3">
								      <input type="checkbox" 
								      		 value="waterSupply"
								      		 id="13"
								      		 name="userCheckbox"
								      		 onChange={this.totalInclude.bind(this)} 

								      		 />Water Supply
								</label>
		  	 			</div>
		  	 				{/*External*/}

		  	 			<div className="col-lg-6 FF4I1"> 
		  	 				<label className="checkbox-inline col-lg-12 pt8">
							      <input type="checkbox" 
							      		 value="clubHouse" 
							      		 id="2"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)}

							      		 />Club House
							    </label>

							    <label className="checkbox-inline col-lg-12 pt8 pl35">
							      <input type="checkbox" 
							      		 value="shoppingCenter"
							      		 id="4"
							      		 name="userCheckbox"
							      		 onChange={this.totalInclude.bind(this)} 

							      		 />Shopping Center 
							    </label>


				  	 		<label className="checkbox-inline col-lg-12 pt8 pl87">
						      <input type="checkbox" 
						      		 value="sewageTreatmentPlan" 
						      		 id="6"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 />Sewage Treatment Plan 
						    </label>

						    <label className="checkbox-inline col-lg-12 pt8 pl25">
						      <input type="checkbox" 
						      		 value="swimmingPool"
						      		 id="8"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} 

						      		 />Swimming Pool 
						    </label>

						    
						    
						    

				  	 		<label className="checkbox-inline col-lg-12 pt8 pl61">
						      <input type="checkbox" 
						      		 value="childrenPlay" 
						      		 id="10"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 />Children's Play Area
						    </label>

				   
				    

						     <label className="checkbox-inline col-lg-12 pt8 pl10">
						      <input type="checkbox" 
						      		 value="internetGym" 
						      		 id="12"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)}

						      		 />Internet Gym 
						    </label>
						    

						    <label className="checkbox-inline col-lg-10 pt8 pl14">
						      <input type="checkbox" 
						      		 value="park"
						      		 id="14"
						      		 name="userCheckbox"
						      		 onChange={this.totalInclude.bind(this)} 

						      		 />Park
						    </label>
	
		  	 			</div>
		  	 		</div>
			       
		  	</div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	{/*<div className="form-group mgbt col-lg-3 col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
		  	</div>*/}
		  	<div className="form-group mgbt col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right ">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 "  onClick={this.updateUser.bind(this)}>Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>
	

			   </div>
			 /* </div>
			 </div>
			</div>
		</div>*/

		);
	}
	


}

