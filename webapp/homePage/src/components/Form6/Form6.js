import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import swal                     from 'sweetalert';


import "bootstrap/dist/css/bootstrap.min.css";
import './Form6.css';
import 'bootstrap/js/tab.js';

export default class Form6 extends Component{

		constructor(props){
			super(props);
			this.state = {

			};
			this.handleBack = this.handleBack.bind(this);
		}

		handleBack() {
   			 this.props.history.push('/Form5');
  		}

		updateUser(event){
			event.preventDefault();
			console.log("abc");
			const formValues = {
				"availability" 			: this.refs.availability.value,
				"start_time" 			: this.refs.start_time.value,
				"end_time" 				: this.refs.end_time.value,
				"availability_day"		: this.refs.availability_day.value
				
			};
			//this.props.fun(formValues);
			axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						//alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");
						
						this.refs.availability.value = '';
						this.refs.start_time.value = '';
						this.refs.end_time.value 	  = '';
						this.refs.availability_day.value = '';
						this.props.history.push("/CongratsPage");
						
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
		}

		closeModal(){
			
		}

	render() {
    return (
			      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
					<form onSubmit={this.updateUser.bind(this)} id="form">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title">
						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
							<label className="title_sz">Make house visits hassle-free by providing us your availability</label>
						  </div>
						</div>
						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
						  	  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								  <div className="form-group">
									    <label htmlFor="exampleFormControlInput1">Availability</label><span className="asterisk">*</span>
									     <div className="input-group inputBox-main " id="">
									      <div className="input-group-addon inputIcon">
						                     <i className="far fa-calender-alt iconSize12"></i>
						                   </div>
							  			
										<select className="custom-select form-control " name="Select" ref="availability" required>
									    	<option className="hideen">select</option>
									    	<option>Everyday(Monday-Sunday)</option>
									    	<option>Weekdays(Monday-Friday)</option>
									    	<option>Weekends(Saturday-Sunday)</option>
									    </select>
									    </div>				  
								   </div>
							  </div>
						  </div>
						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  <div className="form-group">
							    <label htmlFor="exampleFormControlInput1">Start Time</label><span className="asterisk">*</span>
							    <input type="time" className="form-control" ref="start_time" id="exampleFormControlInput1" placeholder="No of Bathroom" required/>
				  
							  </div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  <div className="form-group">
							    <label htmlFor="exampleFormControlInput1">End Time</label><span className="asterisk">*</span>
							    <input type="time" className="form-control" ref="end_time" id="exampleFormControlInput1" placeholder="No of Bathroom" required/>
							  </div>
							</div>
						  </div>

						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							  	<input type="checkbox" className="chkbx" ref="availability_day" id="exampleFormControlInput1" placeholder="Type to search your locality"/>
						  		<label>Availabel all day(07:00 AM - 10:00 PM)</label>
						  	</div>
						  </div>

						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  	<hr/>
						  </div>

						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							  <div className="form-group col-lg-8">
							  <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2">
							       <button type="button" onClick={this.handleBack} className="btn">back</button>
							 </div>
							  <div className="col-lg-6">
								  <div className="col-lg-8">
								       <button type="submit" className="btn">Save & Add Slot</button>
								  </div>
								  <div className="col-lg-4">
								       <button type="submit" className="btn">Save</button>
								  </div>
							  </div>
							  </div>
						  </div>
					</form>
				</div>

		);
	}
	
}

