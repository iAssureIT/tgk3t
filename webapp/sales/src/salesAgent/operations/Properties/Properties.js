import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import Progressbar          from '../progressBar/Progressbar.js';
import {Router, withRouter} from 'react-router-dom';
import Loader 				from 'react-loader-spinner';
import moment               from 'moment';
import swal                 from 'sweetalert';

import '../progressBar/Progressbar.css';
import './Properties.css';
var nextProps1;
 class Properties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertiesData :[],
			userData       :[],
			nextProps 	   :""
		}
	}
	componentDidMount(){
      	axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
		// var salesAgentId =  localStorage.setItem("salesAgentId",(propertiesData.salesAgent[0].agentID))
		var userId =localStorage.getItem('user_ID');
		var role =localStorage.getItem('userRole');

		console.log("user_ID====",userId)

		$(".selectall").click(function(){
		$(".individual").prop("checked",$(this).prop("checked"));
		});
		
	    var formValues = {
			status	:"WIP" ,
		}
	    if(role=="admin"){
			var URL = '/api/salesagent/post/displaylist';
						
		}else if(role=="Sales Agent"){
			var URL = '/api/properties/list/salesagent/type/'+userId+'/'+(formValues.status);			
			
		}
	    axios
	    .post(URL,formValues)

	    .then(
	      (res)=>{
	        console.log(res);
	        // localStorage.setItem("salesAgentId",(res.data.salesAgent[0].agentID)
	        const postsdata = res.data;
	        
	        this.setState({
	          propertiesData : postsdata,
	        },()=>{
	        	
	        });
	    console.log("PropertyDetails Did mount++++++++++++++++++",postsdata); 

	      }
	    )
	    .catch();
	}

   componentWillReceiveProps(nextProps){
		var userId =localStorage.getItem('user_ID');
		var role =localStorage.getItem('userRole');
		var method;
   	
    if(nextProps && nextProps.status){
      	var formValues = {
			// user_id :"5d3ec084e7381f059964f5be",
			status	:nextProps.status ? nextProps.status : "WIP" ,
		}
		 nextProps1 = nextProps.status
		
		console.log("role====",role);
		if(role=="admin"){
			var URL = '/api/salesagent/post/displaylist';
						
		}else if(role=="Sales Agent"){
			var URL = '/api/properties/list/salesagent/type/'+userId+'/'+(formValues.status);			
			
		}
	    axios
	    .post(URL,formValues)

	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	       

	        this.setState({
	          propertiesData : postsdata,
	        },()=>{
	        	
	        });
	    console.log("PropertyDetails receive++++++++++++++++++",postsdata); 

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
	handleSelectAll(){

	}
	handleFieldAgent(event){
		event.preventDefault()
		var userId =localStorage.getItem('user_ID');
		console.log("this.state.userData",this.state.userData);

		if(this.state.userData.length > 0){
			for (var i = this.state.userData.length - 1; i >= 0; i--) {
				var formValues ={
					property_id 	  : this.state.userData[i],
					remark 			  : ""

				}
			console.log("formValues",formValues);
			axios
			    .post('/api/properties/post/allocateTofieldAgent/'+formValues.property_id)
			    .then(
			      (res)=>{
			        console.log(res);
			       if(res.status == 200)
		       		 {
		        		swal("Good job!", " Property Assigned to Field Agent Successfully!", "success")
		   				// window.location.reload();
		   		axios
			    .get('/api/properties/list/salesagent/type/'+userId+'/New')
			    .then(
			      (res)=>{
			        console.log(res);
			        const postsdata = res.data;
			        this.setState({
			          propertiesData : postsdata,
			        });
			    console.log("PropertyDetails++++++++field 1++++++++++",postsdata);   
			      }
			    )
			    .catch();

		         }
			        this.props.getTotalTabCount();
			      }
			    )
			    .catch();
				}
		}
		else{
			swal("Please select at least one property.")
		}
		
		
	}
	handleListed(event){
		event.preventDefault()
		var userId =localStorage.getItem('user_ID');
		// ===============================================================
		if(this.state.userData.length > 0){
			swal({
	           title: "Are you sure ?",
	           text: "You want to List this property?",
	           icon: "warning",
	          buttons: [
	            'No, cancel it!',
	            'Yes, I am sure!'
	        ],
	        }).then((option)=> {
	          if(option){
	          	for (var i = this.state.userData.length - 1; i >= 0; i--) {
						var formValues ={
						property_id 	  : this.state.userData[i],
						status 			  : "Listed",
						user_id			  : "",
						remark 			  : "",
			            listing           :true,

					}
					console.log("next props===0",nextProps1)
					console.log("formValues",formValues);
					axios
				    .patch('/api/salesagent/patch/approvedlist',formValues)
				    .then(
				      (res)=>{
				        console.log(res);
				       if(res.status == 200)
			        {
			        swal("Good job!", " Property Listed Successfully!", "success")
			   		// window.location.reload();
			   		axios
						    .get('/api/properties/list/salesagent/type/'+userId+'/'+nextProps1)
						    .then(
						      (res)=>{
						        console.log(res);
						        const postsdata = res.data;
						        this.setState({
						          propertiesData : postsdata,
						        });
						    console.log("PropertyDetails++++++++field 1++++++++++",postsdata);   
						      }
						    )
						    .catch();

			         }
				        this.props.getTotalTabCount();
				      }
				    )
				    .catch();
				}}
							else {
					              swal("Your Property is safe!");
					            }
							 });
		}
		else{
			swal("Please select at least one property.")
		}
		
// ==========================================================================

		// for (var i = this.state.userData.length - 1; i >= 0; i--) {
		// 		var formValues ={
		// 		property_id 	  : this.state.userData[i],
		// 		status 			  : "Listed",
		// 		user_id			  : "",
		// 		remark 			  : "",
	 //            listing           :true,

		// 	}
		// 	console.log("next props===0",nextProps1)
		// 	console.log("formValues",formValues);
		// 	axios
		//     .patch('/api/salesagent/patch/approvedlist',formValues)
		//     .then(
		//       (res)=>{
		//         console.log(res);
		//        if(res.status == 200)
	 //        {
	 //        swal("Good job!", " Property Listed Successfully!", "success")
	 //   		window.location.reload();
	 //   		axios
		// 		    .get('/api/properties/list/salesagent/type/'+userId+'/'+nextProps1)
		// 		    .then(
		// 		      (res)=>{
		// 		        console.log(res);
		// 		        const postsdata = res.data;
		// 		        this.setState({
		// 		          propertiesData : postsdata,
		// 		        });
		// 		    console.log("PropertyDetails++++++++field 1++++++++++",postsdata);   
		// 		      }
		// 		    )
		// 		    .catch();

	 //         }
		//         this.props.getTotalTabCount();
		//       }
		//     )
		//     .catch();
		// }
	
	}
		
	render() {

		return (
			<div className="">
				{/*<h1>{this.props.status}</h1>*/}

				{this.state.propertiesData.length>0 ?
					(this.props.status ==="New") || (this.props.status ==="Verified")?
						<div>
							<button className="btn btn-primary propBtn1" onClick={this.handleFieldAgent.bind(this)}>Assign To Field Agent</button>
							<button className="btn btn-primary propBtn2" onClick={this.handleListed.bind(this)}>Verify & List</button>
						</div>
					:
					null
				:
				null	
				}
				{
					this.state.propertiesData.length>0 ?
						this.state.propertiesData.map((property,index)=>{
							return(

								<div className="propertyBox" >
									{
										(this.props.status ==="New") || (this.props.status ==="Verified") ?
											<div className="col-lg-1 check1 inline row" >
											    <input type="checkbox" id={property._id}  className="check individual pointer "  value={property._id} onClick={this.handleData.bind(this)}/>
											    <label htmlFor={property._id} className="check-box"></label> 
											</div>
										:
										null
									}
									<div>
										<div className="col-lg-11 pBoxSize" onClick={this.profileView.bind(this)}  key={index} id={property._id}>
											<div className="col-lg-4 ">
												<label className="col-lg-12 row">Property Details </label>
												<span className="col-lg-12 row">
													Property ID: 
											        <Link to="/propertyDetails" > {property.propertyCode}</Link><br/>
													{property.propertyType ? property.propertyType : "Residential Property"} {property.transactionType}<br/>
													<div className="col-lg-10 noPad">{property.propertyDetails && property.propertyDetails.length >0 ?
														property.propertyDetails.map((data,index)=>{
														return(
																<span key="index">{data.bedrooms}&nbsp; BHK </span>
															);
														})
													:
													"2 BHK"
													}</div>
												</span>
												
											</div>
											<div className="col-lg-5">
												<label>Seller Details</label>
												<span className="col-lg-12 row">
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
										</div>
										<img src="/images/cancel.png" className="cancelImg" title="Delete"  id={property._id} onClick={this.handleDelete.bind(this)}/>
									</div>
								</div>
							);
						})

					:
					
						<div className="emptyProp">
							<h5 className="emptyText">No Properties here</h5>
						</div>
				}
			</div>
		)
	}
}
export default withRouter(Properties);