import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import Progressbar          from '../progressBar/Progressbar.js';
import {Router, withRouter} from 'react-router-dom';
import moment               from 'moment';
import swal                 from 'sweetalert';
import '../progressBar/Progressbar.css';
import './Properties.css';

 class Properties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertiesData :[],
			userData       :[],
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

	handleSetMeeting(event){
		event.preventDefault()
		console.log("this.state.userData",this.state.userData);
		for (var i = this.state.userData.length - 1; i >= 0; i--) {
		var formValues ={
			property_id 	  : this.state.userData[i],
			remark 			  : ""

		}
		console.log("formValues",formValues);

			axios
			    .patch('/api/fieldagent/patch/setUpMeeting/'+formValues.property_id)
			    .then(
			      (res)=>{
			        console.log(res);
			       if(res.status == 200)
		        {
		        // swal("Good job!", " Property Listed Successfully!", "success")
		   		window.location.reload();
		   		console.log("res=========",res)
		         }
			        this.props.getTotalTabCount();
			      }
			    )
			    .catch();
				}
	}
	handleUpdateMeeting(event){
		event.preventDefault()
		// var userId =localStorage.getItem('user_ID');

		for (var i = this.state.userData.length - 1; i >= 0; i--) {
			var formValues ={
			property_id 	  : this.state.userData[i],
			// status 			  : "Listed",
			user_id			  : "",
			// allocatedToUserId : "",
			remark 			  : "",


		}
		console.log("formValues",formValues);
		axios
	    .patch('/api/fieldagent/patch/updateMeeting',formValues)
	    .then(
	      (res)=>{
	        console.log(res);
	       if(res.status == 200)
        {
        // swal("Good job!", " Property Listed Successfully!", "success")
   		window.location.reload();

         }
	        this.props.getTotalTabCount();
	      }
	    )
	    .catch();
		}
	
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
	render() {
		return (
			<div className="">
				<h1>{this.props.status}</h1>
				{
					(this.props.status ==="New") || (this.props.status ==="Meetings")?
						<div>
							<button className="btn btn-primary propBtn1"  data-toggle="modal" data-target="#myModal" onClick={this.handleSetMeeting.bind(this)}>Set Meeting</button>
							<button className="btn btn-primary propBtn2" onClick={this.handleUpdateMeeting.bind(this)}>Update Meetings</button>
						</div>
					:
					null	
				}
				{
					this.state.propertiesData.length>0?
						this.state.propertiesData.map((property,index)=>{
							return(
								<div key={index} id={property._id} className="propertyBox" >
										{
											(this.props.status ==="New") || (this.props.status ==="Meetings") ?
												<div className="col-lg-1 check1 inline row" >
												    <input type="checkbox" id={property._id}  className="check individual  "  value={property._id} onClick={this.handleData.bind(this)}/>
												    <label htmlFor={property._id} className="check-box"></label> 
												</div>
											:
											null
										}
									<div className="col-lg-11 pBoxSize" key={index} id={property._id}  onClick={this.profileView.bind(this)}>
										<div className="col-lg-4">
											<span className="mt-8">
												Property ID: 
										        <Link to="/propertyDetails"> {property.propertyCode}</Link><br/>
												{property.propertyType ? property.propertyType : "Residential Property"}<br/>
												<div>{property.propertyDetails&& property.propertyDetails.length >0 ?
													property.propertyDetails.map((data,index)=>{
													return(
															<span key="index">{data.bedrooms}&nbsp; BHK Flat on Rent</span>
														);
													})
												:
												"2 BHK"
												}</div>
											</span>
										</div>
										<div className="col-lg-5">
											<span className="mt-8">
												{property.ownerDetails.userName? property.ownerDetails.userName: "Rushikesh " }<br/>
												{property.ownerDetails.emailId ? property.ownerDetails.emailId : "rushikesh.salunkhe101@gmail.com"}<br/>
												{property.ownerDetails.mobileNumber ? property.ownerDetails.mobileNumber : "*** **** *** "}
												
											</span>
										</div>
										<div className="col-lg-3 pull-right fSize13">
											{
												this.props.status ==="WIP" ?
												<div>
													{moment(property.createdAt).format('MMMM Do YYYY')} &nbsp;
													{moment(property.createdAt).format('LT')} &nbsp;
												</div>
												:
												<div>
													{moment(property.propertyCreatedAt).format('MMMM Do YYYY')} &nbsp;
													{moment(property.propertyCreatedAt).format('LT')} &nbsp;
												</div>
											}
											<div id="myProgress">
												<Progressbar data="80" />
											</div>
										</div>
										<img src="/images/cancel.png" className="cancelImg"  id={property._id} onClick={this.handleDelete.bind(this)}/>
									</div>
								</div>
							);
							})

					:
					
					<div>
						<h5>Under construction</h5>
					</div>
					
				}
			{/*modal=============*/}
				 <div className="modal fade" id="myModal" role="dialog">
				    <div className="modal-dialog">
				      <div className="modal-content">
				        <div className="modal-header">
				          <button type="button" className="close" data-dismiss="modal">&times;</button>
				          <h4 className="modal-title">Modal Header</h4>
				        </div>
				        <div className="modal-body">
				          <p>Some text in the modal.</p>
				        </div>
				        <div className="modal-footer">
				          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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