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
				formshow :"form-4"
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
				"gasPipeline" 				: this.refs.gasPipeline.value,
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
				
				
			};
			//this.props.fun(formValues);
			axios
				.post('/api/users',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 201){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.gasPipeline.value = '';
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
						this.refs.internetGym.value = '';
						this.props.history.push("/Form5");
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
		  	 		Select the ameneties avaispan	
		  	 	</div>
		  	 </div>
		  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 <table className=" table table-bordered table-hover table-responsive valign ">
		  	 	<thead>
		  	 	<tr>
		  	 		<th className="text-center">Internal</th>
		  	 		<th className="text-center">External</th>
		  	 	</tr>
		  	 	</thead>
		  	 	<tr>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-8 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="gasPipeline" id="gasPipeline" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Gas Pipeline</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-7 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="clubHouse" id="clubHouse" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Club House</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>

		  	 	<tr>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-9 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="internetService" id="internetService" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Internet Service</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-8 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="shoppingCenter" id="shoppingCenter" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Shopping Center</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>

		  	 	<tr>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-6 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="lift" id="lift" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Lift</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-10 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="sewageTreatmentPlan" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Sewage Treatment Plant</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>

		  	 	<tr>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-9 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="airConditioner" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Air Conditioner</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-8 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="swimmingPool" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Swimming Pool</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>

		  	 	<tr>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-8 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="intercom" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Intercom</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-9 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="childrenPlay" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Children Play Area</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>

		  	 	<tr>
		  	 	<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-9 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="powerBackup" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Power Backup</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-8 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="internetGym" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Internal Gym</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>


		  	 	<tr>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-7 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="lift" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Lift</span>
					  </div>
					</td>
		  	 		<td className="text-center">
		  	 		  
					  <div className="form-group mgbt col-lg-6 col-lg-offset-2 Amenities_mrg">
					  <div className="form-group mgbt col-lg-1">
					  	<input type="checkbox" className="chkbx" ref="lift" id="" placeholder="Type to search your locality"/>
					  </div>
					  <div className="form-group mgbt col-lg-1">
					    <i className="fa fa-users icon_Clr pull-left"></i>
					  </div>
					   	<span htmlFor="" >Lift</span>
					  </div>
					</td>
		  	 		
		  	 	</tr>

		  	 	
		  	 </table>

		  	</div>
		  	</div>
		  

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<div className="form-group mgbt col-lg-3 col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
		  	</div>
		  	<div className="form-group mgbt col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12"  onClick={this.updateUser.bind(this)}>Save & Next >></button>
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

