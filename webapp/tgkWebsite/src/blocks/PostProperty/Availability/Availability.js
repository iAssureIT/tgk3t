import React , { Component }	from 'react';
import axios 					from 'axios';
import swal 					from 'sweetalert';		
import $						from 'jquery';
import ReactTable 				from 'react-table'; //import react table
import { connect } 				from 'react-redux';
import {withRouter}    from 'react-router-dom';
import 'react-table/react-table.css' //import css
import './Availability.css';

import 'rc-time-picker/assets/index.css';

import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

const format = 'h:mm a';

// import 'bootstrap/js/tab.js';
// import 'bootstrap/js/modal.js';
// import "bootstrap/dist/css/bootstrap.min.css";

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
const clientmobileRegex = RegExp(/^[0-9][0-9]{9}$/);


 class Availability extends Component{

		constructor(props){
			super(props);
			this.state = {
				originalValues      : '',
				contactPersonMobile :"",
				contactPerson       : "Someone",
				available           :[],
				formerrors :{
				
					clientMobile : " ",
				
				},

				updateOperation   : false,
				prevAvailable     : "",
				userMobile 		  : "",
				fromTime          : "12:00 am",
				toTime            : "12:00 am",
				now               : moment().hour(0).minute(0),
				now1              : moment().hour(0).minute(0),

			};
   			
   			console.log("in contructor contactPerson",this.state.contactPerson);

   			console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			if(this.props.updateStatus === true){

	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (response) =>{
						console.log("response in availability= ",response);
						
						this.setState({

								originalValues 				: response.data.avalibilityPlanVisit,
								contactPersonMobile 		: response.data.avalibilityPlanVisit.contactPersonMobile ? response.data.avalibilityPlanVisit.contactPersonMobile : "",
								contactPerson 				: response.data.avalibilityPlanVisit.contactPerson ?  response.data.avalibilityPlanVisit.contactPerson : "Someone" ,
								available 					: response.data.avalibilityPlanVisit.available,
								updateOperation 			: true,
								prevAvailable 				: response.data.avalibilityPlanVisit.available,

						 
						},()=>{
							console.log("here available in comp did mount",this.state.contactPerson);
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

			console.log("user id in availability",this.props.uid);

					axios
					.get('/api/users/get/one/'+this.props.uid)
					.then( (response) =>{
						console.log("response of user in availability= ",response);
						this.setState({
							userMobile : response.data.mobileNumber,
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

		fromTime(value){
			console.log('value',value)
           if(value){
           		this.setState({
           			fromTime:value.format(format),
           			now:value
           		});
			}
		}


		toTime(value){
			if(value){
           		this.setState({
           			toTime:value.format(format),
           			now1:value
           		});
			}
		}

		insertAvailability(event){
			event.preventDefault();

			if(this.state.updateOperation === true){
				console.log("update fun");
				var ov = this.state.originalValues;

				console.log("this.state.contactPersonMobile",this.state.contactPersonMobile);
				console.log("this.state.userMobile",this.state.userMobile);
				console.log("this.state.contactPerson",this.state.contactPerson);

				var mobNo = "";
				if(this.state.contactPerson === "Myself"){
					mobNo = this.state.userMobile;
				}else{
					mobNo = this.state.contactPersonMobile;
				}
			
				console.log("mob no",mobNo);

					console.log("diff data");
					const formValues = {
					"contactPersonMobile" : mobNo,
	        		"contactPerson"       : this.state.contactPerson,
					"property_id" 		  : localStorage.getItem("propertyId"),
					"uid" 				  : localStorage.getItem("uid"),
					"available"			  : this.state.available
					};
					console.log("Availability req = ",formValues);
				    if(this.state.available.length!==0){
				    		
						axios
						.patch('/api/properties/patch/availabilityPlan',formValues)
						.then( (res) =>{
							console.log("availabilityPlan----------------",res);
							if(res.status === 200){
								/*swal("wow","great job done!","success");*/
								this.props.redirectToImageUpload(this.props.uid,this.props.property_id);

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
					

				


			}else{
				console.log("insert fun");
				console.log("this.state.contactPersonMobile",this.state.contactPersonMobile);
				console.log("this.state.userMobile",this.state.userMobile);
				console.log("this.state.contactPerson",this.state.contactPerson);

				var mobNo = "";
				if(this.state.contactPerson === "Myself"){
					mobNo = this.state.userMobile;
				}else{
					mobNo = this.state.contactPersonMobile;
				}
				console.log("mob no",mobNo);
				

				const formValues = {
				"contactPersonMobile" : mobNo,
        		"contactPerson"       : this.state.contactPerson,
				"property_id" 		  : localStorage.getItem("propertyId"),
				"uid" 				  : localStorage.getItem("uid"),
				"available"			  : this.state.available
				};
				console.log("Availability req = ",this.state.available);
			    if(this.state.available.length!==0){
			    		
					axios
					.patch('/api/properties/patch/availabilityPlan',formValues)
					.then( (res) =>{
						console.log("availabilityPlan",res);
						if(res.status === 200){
							/*swal("wow","great job done!","success");*/
							this.props.redirectToImageUpload(this.props.uid,this.props.property_id);
							console.log("response",res);
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
		selectType(event){
          if(this.state.contactPerson === "Someone" )
            {
              this.setState(
              {
                "contactPerson" : "Myself",
              });
            }else if(this.state.contactPerson === "Myself")
            {
               this.setState(
               {
                "contactPerson" : "Someone",
              }); 
            
          }
          console.log("contactPerson onchange",this.state.contactPerson);
      }

      backToFinancials(){
		// this.props.backToFinancials();
		this.props.backToFinancials(this.props.uid,localStorage.getItem("propertyId"));

	}
	handleAvailability(event){
		event.preventDefault();
		const availability = this.state.available;

		const day  = this.refs.availability.value ;
		const time = this.state.fromTime + ' - ' + this.state.toTime;

		if(day!=="" && this.state.fromTime!=="" && this.state.toTime!==""){
			console.log("day",day);
			console.log("time",time);
			availability.push({
			"day" : day,
			"time" : time,

			});
			this.setState({
				"available" : availability,
			},()=>{
				this.setState({
					fromTime : "12:00 am",
					toTime   : "12:00 am",
					now:moment().hour(0).minute(0),
					now1:moment().hour(0).minute(0),
				})
				$('select[name=availableDay').val('');
			});
		}else{
              swal("Please fill up all mandatory fields.", "", "warning");

		};	
	}

	deleteData(row)
	{
		console.log('availability',this.state.available)
		console.log("rowId",row);

		this.state.available.splice(row,1)
		this.setState({available:this.state.available})
	}

	handleChange(event){
		event.preventDefault();
		const datatype = event.target.getAttribute('data-text');
	    const {name,value} = event.target;
	    let formerrors = this.state.formerrors;
		console.log("datatype",datatype);
		switch (datatype){


		case 'clientMobile' : 
	       formerrors.clientMobile = clientmobileRegex.test(value)? '' : "Please Enter 10 digit Number only";
	       break;

		default :
		break;

		}
		this.setState({ formerrors,
			[name]:value
		} );
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
		console.log("this.state.contactPerson",this.state.contactPerson);
		console.log("allowEmpty",this.state.allowEmpty);
		console.log("mobile",this.state.contactPersonMobile);
		const availableMobile = localStorage.getItem("availableMobile")!= null ? localStorage.getItem("availableMobile") : "";
   			console.log("availableMobile",availableMobile);
   	    const {formerrors} = this.state;

   	 	const data = this.state.available;
   	 	// console.log('data',data)
		const columns = [{
			Header: 'Availability',
			accessor: 'day'
			}, {
			Header: 'Time',
			accessor: 'time',
			},
			{
			Header: 'Action',
			accessor: 'id',
			Cell: row => 
          (
          <div className="actionDiv col-lg-offset-3">
              <div className="col-lg-6" id={row.index} onClick={() => this.deleteData(row.index)}>
            <i className="fa fa-trash"> </i>
              </div>
             
            </div>
            )     
			}]
    return (
     <div >
           <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  <div className="row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  	<div className="form-group" id="">
			  	 		<label className="">Who will show?</label>
					 	<div className="can-toggle1 genderbtn demo-rebrand-2" onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox"/>
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle1__switch" data-checked="Myself"  data-unchecked="Someone Else" ></div>
				                <div className="can-toggle1__label-text"></div>
				              </label>
			            </div>
				  	</div>
				  </div>
				  {console.log("this.state.contactPerson in render",this.state.contactPerson)}
					{console.log("here mob no value for someone",this.state.contactPersonMobile)}
				  {this.state.contactPerson === "Someone" ? 
				  	 <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
			  	 		<label className="">Phone Number</label>
						  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-mobile iconClr"></i>
		                    </div>
					    		<input type="text" data-text="clientMobile" name="contactPersonMobile" value={this.state.contactPersonMobile} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} className="form-control" ref="contactPersonMobile" min="0" maxLength="10" placeholder="Phone Number" />
					  		</div>
					  		{this.state.formerrors.clientMobile &&(
		                          <span className="text-danger">{formerrors.clientMobile}</span> 
		                        )}
					  </div>
				  </div>
				  :
				   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
			  	 		<label className="">Phone Number</label>
						  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-mobile iconClr"></i>
		                    </div>
					    		<input type="number"  name="contactPersonMobile" value={this.state.userMobile} className="form-control" ref="" min="0" placeholder="Phone Number" disabled/>
					  		</div>
					  </div>
				  </div>
				  }
				 
		 	 </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>Visit Schedule (Add as many as You Like)</label>
			  	 </div>
			  </div>
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">	
		    	<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">	
		    		<label className=""> Availability <span className="astrick">*</span></label>
					  <select className="custom-select form-control " ref="availability" placeholder="select" name="availableDay" >
				    	<option value="">-- Select --</option>
				    	<option value="Everyday"> Everyday (Mon-Sun)</option>
				    	<option value="Weekdays"> Weekdays (Mon-Fri)</option>
				    	<option value="Weekends"> Weekends (Sat-Sun)</option>
				    	<option value="Monday">   Monday 	</option>
				    	<option value="Tuesday">  Tuesday 	</option>
				    	<option value="Wednesday">Wednesday </option>
				    	<option value="Thursday"> Thursday 	</option>
				    	<option value="Friday">   Friday 	</option>
				    	<option value="Saturday"> Saturday 	</option>
				    	<option value="Sunday">   Sunday 	</option>
				    </select>
				</div>


				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
	    			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> From Time<span className="astrick">*</span> </label>

					<div className="col-lg-7 col-md-8 col-sm-7 col-xs-7"  id="" >
					    <div className="input-group">
					      	{/*<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-clock-o " aria-hidden="true"></i>
		                    </div>*/}
						    {/*<input type="time" name="timeFrom" className="form-control col-lg-12" ref="timeFrom" onBlur={this.timeFromVal.bind(this)}/>*/}
							  <TimePicker
							    showSecond={false}
							    className="xxx"
							    value={this.state.now}
							    onChange={this.fromTime.bind(this)}
							    format={format}
							    use12Hours
							    inputReadOnly
							    className="timePicHeight"
							    // value={this.state.clearValue=== null ? this.state.clearValue : now}
							  />
							
					  	</div>
					</div>
				  	{/*<div className="col-lg-5 col-md-4 col-sm-5 col-xs-5"  id="" >
					    <div className="input-group" id="">
						    <select className="form-control col-lg-12" ref="timeFromAMPM" defaultValue="AM">
						    	<option > AM </option>
						    	<option> PM </option>
						    </select>
					  	</div>
			  		</div>*/}
				</div>

				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
	    			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> To Time <span className="astrick">*</span></label>

					<div className="col-lg-7 col-md-8 col-sm-7 col-xs-7"  id="" >
					    <div className="input-group inputBox-main ">
					      	{/*<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-clock-o " aria-hidden="true"></i>
		                    </div>
						    <input type="time" className="form-control col-lg-12" name="timeTo" ref="timeTo"  onBlur={this.timeToVal.bind(this)}/>*/}
					  		<TimePicker
							    showSecond={false}
							    value={this.state.now1}
							    className="xxx"
							    onChange={this.toTime.bind(this)}
							    format={format}
							    use12Hours
							    inputReadOnly
							    className="timePicHeight"
							  />
					  	</div>
					</div>
				  	{/*<div className="col-lg-5 col-md-4 col-sm-5 col-xs-5"  id="" >
					    <div className="input-group" id="">
						    <select className="form-control col-lg-12" ref="timeToAMPM" defaultValue="PM">
						    	<option > AM </option>
						    	<option > PM </option>
						    </select>
					  	</div>
			  		</div>*/}
			  	</div>
			  	<div className="col-lg-1 col-md-2 col-sm-12 col-xs-12 ">
			    	<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">.</label>				  
					<button className="btn btn-primary" onClick={this.handleAvailability.bind(this)}>Add Slot +</button>					  	
				</div> 
		  	</div>
		  	 {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 pull-right">
			    	<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></label>				  
					<button className="btn btn-primary" onClick={this.handleAvailability.bind(this)}>Add Slot +</button>					  	
				</div>
			</div>	*/}

		   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 	<ReactTable
				    data={data}
				    columns={columns}
				    className={"-striped -highlight"}
				    minRows={3}
				    showPagination={false}
				  />
			  	 	
				</div>
			</div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
		  	{<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-left">
		       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToFinancials.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  	</div>}
		  	<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-right">
		       <button type="submit" className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23"  onClick={this.insertAvailability.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
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
		property_id     : state.property_id,
		uid			    : state.uid,
		availableMobile : state.availableMobile,
		updateStatus    : state.updateStatus,		


	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		backToFinancials  	        : (uid,property_id)=> dispatch({type: "BACK_TO_FINANCIALS",
																	uid:  uid,
																	property_id:property_id
														
	}),
		redirectToImageUpload       : (uid,property_id)=> dispatch({type: "REDIRECT_TO_IMG_UPLOAD",
														uid:  uid,
														property_id:property_id
	}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Availability));
