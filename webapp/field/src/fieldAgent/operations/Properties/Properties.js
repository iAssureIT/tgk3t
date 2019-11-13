import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import Progressbar          from '../progressBar/Progressbar.js';
import {Router, withRouter} from 'react-router-dom';
import moment               from 'moment';
import swal                 from 'sweetalert';
import DatePicker           from "react-datepicker";
import TimePicker 			from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';
import '../progressBar/Progressbar.css';
import './Properties.css';
const format = 'h:mm a';
var setUpMeetingId = "";
var updateMeetingId = "";
 class Properties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertiesData : "",
			userData       : [],
			startDate      : "",
			now            : moment().hour(0).minute(0),
      		availableFrom  : "",
      		startDate      : "",
      		setUpMeetingId : "",
      		meetingStatus  : "",
      		updateMeetingId: "",
      		Properties_id  : "",
      		meeting_id 	   : ""
		}
	}
	componentDidMount(){

		axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

		$(".selectall").click(function(){
		$(".individual").prop("checked",$(this).prop("checked"));
		});
		var formValues = {
			/*user_id :"5d3ec084e7381f059964f5be",*/
			// status	:"assignedTo" ,
			status	:"VerifyPending" ,
		}

		var userId =localStorage.getItem('user_ID');
		var role =localStorage.getItem('userRole');

		// console.log("formValues",formValues);
	    axios
	    .get('/api/fieldagent/get/type/allocatedToFieldAgent/'+ userId + '/'+formValues.status)
	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	        this.setState({
	          propertiesData : postsdata,
	        });
	    console.log("PropertyDetails++++++++field++++++++++",postsdata);   
	      }
	    )
	    .catch();

	}

   componentWillReceiveProps(nextProps){	
    if(nextProps && nextProps.status){
    	var userId =localStorage.getItem('user_ID');
		var role =localStorage.getItem('userRole');
      	var formValues = {
			// user_id :"5d3ec084e7381f059964f5be",
			status	:nextProps.status ? nextProps.status : "VerifyPending" ,
		}
        localStorage.setItem("interested_Status",formValues.status);

		console.log("formValues......",formValues)

		if(formValues.status==="VerifyPending"){
			var URL = '/api/fieldagent/get/type/allocatedToFieldAgent/'+userId+'/'+(formValues.status);			
		}
		else{
			var URL = '/api/fieldagent/get/transactionDetails/'+userId+'/'+(formValues.status);			
			console.log("interestedProperties")
		}
		console.log("url",URL)
		axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
	    axios
	   .get(URL,formValues)
	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	        this.setState({
	          propertiesData : postsdata,
	        });
	    console.log("fields  Details++++++++++++++++++",postsdata);   
	      }
	    )
	    .catch();
      }
    }

	handleMeetingId(event){
		// event.preventDefault()
		var Properties_id = event.target.getAttribute('data-target');
		
		var interestedProperties_id = event.target.getAttribute('data-value');
		setUpMeetingId = event.currentTarget.id;
		this.setState({
			interestedProperties_id:interestedProperties_id,
			
		})
		this.setState({
			setUpMeetingId :setUpMeetingId
		})

		console.log("interestedProperties_id",interestedProperties_id)
	}
	handleUpdateMeetingId(event){
		event.preventDefault()

		var interestedProperties_id = event.target.getAttribute('data-value');
		var meeting_id = event.target.getAttribute('data-mid');
		var Properties_id = event.target.getAttribute('data-target');

		updateMeetingId = event.currentTarget.id;

		this.setState({
			interestedProperties_id:interestedProperties_id,
			meeting_id 			   : meeting_id
			
		})
		this.setState({
			updateMeetingId :updateMeetingId
		})
		
		// console.log("Properties_id update state",updateMeetingModal)
		// console.log("updateMeetingId update state",this.state.updateMeetingId)
		console.log("interestedProperties_id update",interestedProperties_id)
		// console.log("updateMeetingId update",updateMeetingId)

	}
	handleSetMeeting(event){
		// event.preventDefault();
    	var userId =localStorage.getItem('user_ID');
		var Properties_id = event.target.getAttribute('data-target');

		var formValues ={
			interestedProperties_id  :this.state.interestedProperties_id ,
			meetingDate :this.state.availableFrom,
			meetingStartTime: this.state.fromTime,
			// meetingStatus: "scheduled",

		}
		console.log("formValues========",formValues)
		if((this.state.availableFrom !=="") && (this.state.fromTime !=="")){
			 axios
			    .patch('/api/fieldagent/patch/setUpMeeting/',formValues)
			    .then(
			      (res)=>{
			        console.log(res);
			       if(res.status == 200)
		        {
		   		// window.location.reload();
		   		this.setState({
		   			interestedProperties_id  :"",
					meetingDate :"",
					meetingStartTime:"",
			   		})

		   		$("#modal").hide();
	       		$("#modal").removeClass('in');
				$(".modal-backdrop").remove();
	    	    $("body").removeClass("modal-open");

		   		console.log("res=========",res)
		         }
			        // this.props.getTotalTabCount();
			      }
			    )
			    .catch();
		}
		
			
		    	


	}
	handleUpdateMeeting(event){
		event.preventDefault();
    	var userId =localStorage.getItem('user_ID');
		 
		var formValues ={
			interestedProperties_id  :this.state.interestedProperties_id ,
			meetingStatus: this.state.meetingStatus,
			meeting_id : this.state.meeting_id

		}
		console.log("formValues========",formValues)
		if(this.state.meetingStatus !==""){
			axios
			    .patch('/api/fieldagent/patch/updateMeeting/',formValues)
			    .then(
			      (res)=>{
			        console.log(res);
			    if(res.status == 200)
		        {
		   		this.setState({
		   			interestedProperties_id  :"",
					meetingStatus : "",
					meeting_id    : ""
			   	})

		   		    $("#updateMeeting").hide();
	       			$("#updateMeeting").removeClass('in');
					$(".modal-backdrop").remove();
	        	    $("body").removeClass("modal-open");	


		         }
		         
			        // this.props.getTotalTabCount();
			      }
			    )
			    .catch();
		}else{
	        swal(" Please select meeting Status.","", "error");

		}
		
		    console.log("setUpMeetingId"+formValues.interestedProperties_id);
		  


		
	
	}

	profileView(event){
		event.preventDefault()
		var id = event.currentTarget.id;
		// console.log("_id",id);
		this.props.history.push('/profile/'+ id);
	}
	handleDelete(event){
		event.preventDefault()
		var userId =localStorage.getItem('user_ID');
		var cancelId = event.currentTarget.id
		
  		swal({
           title: "Are you sure?",
           text: "Once deleted, you will not be able to recover this Property!",
           icon: "warning",
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
        ],
        }).then((option)=> {
          if(option){
			var formValues ={
			property_id 	  : cancelId,
			status 			  : "Deleted",
			user_id			  : userId,
			// allocatedToUserId : "",
			remark 			  : ""

			}
			console.log("formValues",formValues);
			axios
			    .patch('/api/salesagent/patch/approvedlist',formValues)
			    .then(
			      (res)=>{
			        console.log(res);
			        if(res.status == 200)
			        {
			        swal( " Property Deleted Successfully!", "success")
			   		window.location.reload();
			        
			         }
			        this.props.getTotalTabCount();
			      }
			    )
			    .catch();
				}
				else {
		              swal("Your Property is safe!");
		            }
				 });
		
	}
	handleData(event){
		  if(event.target.checked){
			this.state.userData.push(event.currentTarget.id);
			// this.setState({userData:Data})
		  }else{
			  for (var i = this.state.userData.length - 1; i >= 0; i--) {
					if(this.state.userData[i] === event.currentTarget.id){
						this.state.userData.splice(i,1)
					}
				}
		  }
		console.log("userData=====",this.state.userData)
	}
	handleDate = date => {
      var newDate = new Date(date),
      mnth = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2);
      var availableFrom = [newDate.getFullYear(), mnth, day].join("-");
      this.setState({
        availableFrom: availableFrom,
        startDate    : date
      });
    };
    fromTime(value){
			// console.log('value',value)
           if(value){
           		this.setState({
           			fromTime:value.format(format),
           			now:value
           		});
			}
		}

	handleMeetingStatus(event){
		event.preventDefault()
		var meetingStatus = this.refs.meetingStatus.value;
		this.setState({
      	"meetingStatus":meetingStatus,
		    });
		console.log("meetingStatus value",meetingStatus);
		
	 }
	 handleShown(event){
	 	event.preventDefault()
		var interestedProperties_id = event.target.getAttribute('data-value');
		var shownStatus = event.target.getAttribute('get-value');

		console.log("interestedProperties_id",interestedProperties_id)
		console.log("shownStatus",shownStatus)
		if(shownStatus==="Shortlisted"){
			swal({
	           title: "Are you sure ?",
	           text: "You want to shortlist this property!",
	           icon: "warning",
	          buttons: [
	            'No, cancel it!',
	            'Yes, I am sure!'
	        ],
	        }).then((option)=> {
	          if(option){
				var formValues ={
				interestedProperties_id 	  : interestedProperties_id,
				status 			 			  :"Shortlisted" ,
				remark 			  			  : ""

				}
				console.log("formValues",formValues);
				axios
				    .patch('/api/fieldagent/patch/transactionUpdate',formValues)
				    .then(
				      (res)=>{
				        console.log(res);
				        if(res.status == 200)
				        {
				        swal( " Property Shortlisted Successfully!", "success")
				   		window.location.reload();
				        
				         }
				        this.props.getTotalTabCount();
				      }
				    )
				    .catch();
					}
					else {
			              swal("Your Property is safe!");
			            }
					 });
		}
		else{
			swal({
	           title: "Are you sure?",
	           text: "Once deleted, you will not be able to recover this Property!",
	           icon: "warning",
	          buttons: [
	            'No, cancel it!',
	            'Yes, I am sure!'
	        ],
	        }).then((option)=> {
	          if(option){
				var formValues ={
				interestedProperties_id 	  : interestedProperties_id,
				status 			  			  :"Discarded" ,
				remark 			  			  : ""

				}
				console.log("formValues",formValues);
				axios
				    .patch('/api/fieldagent/patch/transactionUpdate',formValues)
				    .then(
				      (res)=>{
				        console.log(res);
				        if(res.status == 200)
				        {
				        swal( " Property Shortlisted Successfully!", "success")
				   		window.location.reload();
				        
				         }
				        this.props.getTotalTabCount();
				      }
				    )
				    .catch();
					}
					else {
			              swal("Your Property is safe!");
			            }
					 });
		}


	 }
	render() {
		return (
			<div className="">
				<h1>{this.props.status}</h1>
				
				{
					this.state.propertiesData.length>0?
						this.state.propertiesData.map((property,index)=>{
							return(
								<div key={index} id={property.property._id} className="propertyBox" >
										{
											(this.props.status ==="New") || (this.props.status ==="Meetings") ?
												<div className="col-lg-1 check1 inline row" >
												    <input type="checkbox" id={property.property._id}  className="check individual  "  value={property.property._id} onClick={this.handleData.bind(this)}/>
												    <label htmlFor={property.property._id} className="check-box"></label> 
												</div>
											:
											null
										}
									<div className="col-lg-11 pBoxSize" >
										<div className="col-lg-4">
											<span className="mt-8">
												Property ID: 
										        <Link to="/propertyDetails"> {property.property.propertyCode}</Link><br/>
												{property.property.propertyType ? property.property.propertyType : "Residential Property"}<br/>
												<div>{property.property.propertyDetails&& property.property.propertyDetails.length >0 ?
													property.property.propertyDetails.map((data,index)=>{
													return(
															<span key="index">{data.bedrooms}&nbsp; BHK Flat on Rent</span>
														);
													})
												:
												"2 BHK"
												}</div>
											</span>
											{/*<span>{property.interestedProperties_id}</span>*/}
										</div>
										<div className="col-lg-5">
											<span className="mt-8">
												{property.property.ownerDetails.userName? property.property.ownerDetails.userName: "Rushikesh " }<br/>
												{property.property.ownerDetails.emailId ? property.property.ownerDetails.emailId : "rushikesh.salunkhe101@gmail.com"}<br/>
												{property.property.ownerDetails.mobileNumber ? property.property.ownerDetails.mobileNumber : "*** **** *** "}
												
											</span>
										</div>
										<div className="col-lg-3 pull-right fSize13">
											{
												this.props.status ==="WIP" ?
												<div>
													{moment(property.property.createdAt).format('MMMM Do YYYY')} &nbsp;
													{moment(property.property.createdAt).format('LT')} &nbsp;
												</div>
												:
												<div>
													{moment(property.property.propertyCreatedAt).format('MMMM Do YYYY')} &nbsp;
													{moment(property.property.propertyCreatedAt).format('LT')} &nbsp;
												</div>
											}
											<div id="myProgress">
												<Progressbar data="80" />
											</div>
										</div>
										<img src="/images/cancel.png" className="cancelImg"  id={property.property._id} onClick={this.handleDelete.bind(this)}/>
										<div className="col-lg-6">
										{
											this.props.status === "New" ?
												<div className="btn btn-primary propBtn1"  id={property.property._id} data-toggle="modal" data-target={"#modal"} data-value={property.interestedProperties_id} onClick={this.handleMeetingId.bind(this)} >Set Meeting</div>
											:
											this.props.status ==="meetingSet"	?
												<div className="btn btn-primary propBtn1"  id={property.property._id} data-toggle="modal" data-target={"#updateMeeting"}  data-value={property.interestedProperties_id} data-mid={property.meeting_id} onClick={this.handleUpdateMeetingId.bind(this)} >Update Meeting</div>
											:
											this.props.status === "Shown" ?
												<div className="col-lg-5 noPad">
													<div className=""  id={property.property._id}    >
														<img src="/images/shortlist.png" className="shortIcon" title="Shortlist the property" data-value={property.interestedProperties_id}  get-Value="Shortlisted" onClick={this.handleShown.bind(this)}/>
														<img src="/images/trash.png" className="shortIcon" title="Discard the property " data-value={property.interestedProperties_id} get-Value="Discarded" onClick={this.handleShown.bind(this)}/>
													</div>
												</div>
											:
											null
										}
										<button className="btn btn-primary " key={index} id={property.property._id}  onClick={this.profileView.bind(this)}  >View Profile</button>
										</div>
									</div>
								</div>
							);
							})

					:
					
					<div>
						<h5>Under construction</h5>
					</div>
					
				}
			{/*modal 1=============*/}
				 <div className="modal fade" id="modal" role="dialog">
				    <div className="modal-dialog">
				      <div className="modal-content">
				        <div className="modal-header">
				          <button type="button" className="close" data-dismiss="modal">&times;</button>
				          <h4 className="modal-title">Meeting </h4>
				        </div>
				        <div className="">
					       <div className="col-lg-12">
					       		<div className="col-lg-12 mb10 mt10  ">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
											 <b>Name of Meeting </b>
										</div>
								    	<div className="col-lg-12 noPad">
											    <div className="input-group inputBox-main " id="">
											      	<div className="input-group-addon inputIcon">
									                <i className="fa fa-building iconClr"></i>
								                    </div>
											    <input type="text" className="form-control" ref="meetingName"  placeholder=" " />
											   
											  	</div>
											  	
										</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
										 <b>Meeting Date </b>
									</div>
				                    <DatePicker
				                      selected={this.state.startDate}
				                      onChange={this.handleDate}
				                      dateFormat="yyyy-MM-dd"
				                      className="form-control col-lg-12 "
				                      minDate={(new Date())}
				                      name="availableFrom"
				                      ref="availableFrom"
				                      // value={this.state.availableFrom}
				                      max="2100-12-31"
				                      onKeyDown={e=>e.preventDefault()}

				                    />
					            </div>
					            <div className="col-lg-6">
						            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 ">
										 <b>Meeting Start Time </b>
									</div>
									<div className="col-lg-8 row">
							            <TimePicker
										    showSecond={false}
										    className="col-lg-5"
										    value={this.state.now}
										    onChange={this.fromTime.bind(this)}
										    format={format}
										    use12Hours
										    inputReadOnly
										    
										  />
									</div>
								</div>
					       	
					       </div> 
				        </div>
				        <div className="modal-footer">
				          <button type="button" className="btn btn-primary mt10" data-dismiss="modal">Close</button>
				          <button type="button" className="btn btn-primary mt10" onClick={this.handleSetMeeting.bind(this)}>Submit</button>
				        </div>
				      </div>
				    </div>
				  </div>
				{/*modal 1 end==============*/}

				{/*modal 2=============*/}
				 <div className="modal fade" id="updateMeeting" role="dialog">
				    <div className="modal-dialog">
				      <div className="modal-content">
				        <div className="modal-header">
				          <button type="button" className="close" data-dismiss="modal">&times;</button>
				          <h4 className="modal-title"> Update Meeting {this.state.updateMeetingId} </h4>
				        </div>
				        <div className="">
					       <div className="col-lg-12">
					       		<div className="col-lg-12 mb10 mt10  ">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
											 <b>Name of Meeting </b>
										</div>
								    	<div className="col-lg-12 noPad">
											    <div className="input-group inputBox-main " id="">
											      	<div className="input-group-addon inputIcon">
									                <i className="fa fa-building iconClr"></i>
								                    </div>
											    	<input type="text" className="form-control" ref="meetingName"  placeholder=" " />
											   
											  	</div>
										</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="form-group" id="">
									    <span htmlFor="" className="mb7"><b>Meeting Status</b></span>
									    <div className="input-group  " id="">
									      	<div className="input-group-addon inputIcon">
						                     <i className="fa fa-building iconClr"></i>
						                    </div>
										    <select className="custom-select form-control " ref="meetingStatus" name="meetingStatus" onClick={this.handleMeetingStatus.bind(this)}  placeholder="select" >
										    	<option value="" className="hidden">--Select--</option>
										    	<option value="WIP">Work In Progress</option>
										    	<option value="Completed">Completed</option>
										    	<option value="Cancelled">Cancelled</option>
											</select>
										</div>
									</div>
								</div>
					       </div> 
				        </div>
				        <div className="modal-footer">
				          <button type="button" className="btn btn-primary mt10" data-dismiss="modal">Close</button>
				          <button type="button" className="btn btn-primary mt10" onClick={this.handleUpdateMeeting.bind(this)}>Submit</button>
				        </div>
				      </div>
				    </div>
				  </div>
				{/*modal end==============*/}

			</div>
		)
	}
}
export default withRouter(Properties);