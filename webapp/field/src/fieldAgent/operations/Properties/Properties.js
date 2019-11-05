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

		axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
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
		axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
	    axios
	   .get('/api/fieldagent/get/type/allocatedToFieldAgent/'+ userId + '/'+formValues.status)
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

// ======================2 try==============

		// var userId =localStorage.getItem('user_ID');
   	
  //   if(nextProps && nextProps.status){
  //     	var formValues = {
		// 	// user_id :"5d3ec084e7381f059964f5be",
		// 	status	:nextProps.status ? nextProps.status : "VerifyPending" ,
		// }
		// var role =localStorage.getItem('userRole');
		// var method;
		// console.log("role====",role);

		// if(role=="admin"){
		// 	var URL = '/api/salesagent/post/displaylist';
						
		// }else if(role=="field Agent"){
		// 	var URL = '/api/fieldagent/get/type/allocatedToFieldAgent/'+userId+'/'+(formValues.status);			
			
		// }
	 //    axios
	 //    .get(URL,formValues)

	 //    .then(
	 //      (res)=>{
	 //        console.log(res);
	 //        const postsdata = res.data;
	       

	 //        this.setState({
	 //          propertiesData : postsdata,
	 //        },()=>{
	        	
	 //        });
	 //    console.log("PropertyDetails receive++++++++++++++++++",postsdata); 

	 //      }
	 //    )
	 //    .catch();
  //   }
  
  }

	profileView(event){
		event.preventDefault()
		var id = event.currentTarget.id;
		console.log("_id",id);
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
	render() {
		return (
			<div className="">
				<h1>{this.props.status}</h1>
				{
					this.state.propertiesData.length>0?
						this.state.propertiesData.map((property,index)=>{
							return(
								<div key={index} id={property._id} className="propertyBox" onClick={this.profileView.bind(this)}>
									<div className="col-lg-1 check1">
									    <input type="checkbox" id="cbtest"  className="check individual"/>
									    <label htmlFor="cbtest" className="check-box"></label> 
									</div>
									<div className="col-lg-11 pBoxSize">
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
			</div>
		)
	}
}
export default withRouter(Properties);