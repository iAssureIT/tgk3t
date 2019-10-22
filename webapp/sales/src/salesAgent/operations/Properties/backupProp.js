import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import Progressbar          from '../progressBar/Progressbar.js';
import {Router, withRouter} from 'react-router-dom';
import Loader 				from 'react-loader-spinner'
import moment               from 'moment'


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

		// this.test=this.test.bind(this);
	}
	componentDidMount(){
		
      	axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

		$(".selectall").click(function(){
		$(".individual").prop("checked",$(this).prop("checked"));
		});
		var formValues = {
			// user_id :"5d9b017ac8be6c588004f09d",
			status	:"WIP" ,
		}
		// console.log("formValues",formValues);
	    axios
	    .post('/api/salesagent/post/displaylist',formValues)
	    // .get('/api/properties/list/salesagent/type/5d56b692b0c7a9b7c727ac13/WIP')

	    .then(
	      (res)=>{
	        console.log(res);
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
    if(nextProps && nextProps.status){
      	var formValues = {
			// user_id :"5d3ec084e7381f059964f5be",
			status	:nextProps.status ? nextProps.status : "WIP" ,
		}

		var role =localStorage.getItem('userRole');
		var method;
		console.log("role====",role);
		// var URL;
		if(role=="admin"){
			var URL = '/api/salesagent/post/displaylist';
			method ='post'			
		}else if(role=="Sales Agent"){
			var URL = "/api/properties/list/salesagent/type/5d56b692b0c7a9b7c727ac13/New";			
			method ='get'
		}
	    axios
	    .get(URL,formValues)
	    // .get('/api/properties/list/salesagent/type/5d56b692b0c7a9b7c727ac13/WIP')

	  //   axios({ 
			//  "method"	: 'post',
			//  "url"     : 'https://zr9owqxgk2.execute-api.us-east-1.amazonaws.com/test/hospitalization-page/get-hospitalization-incident-types',
			// })






	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	       

	        this.setState({
	          propertiesData : postsdata,
	        },()=>{
	        	
	        });
	    // console.log("PropertyDetails receive++++++++++++++++++",postsdata); 

	      }
	    )
	    .catch();
    }
  }

	profileView(event){
		event.preventDefault()
		var id = event.currentTarget.id;
		console.log("_id",id);
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
	handleVerify(event){
		event.preventDefault()
		for (var i = this.state.userData.length - 1; i >= 0; i--) {
			var formValues ={
			property_id 	  : this.state.userData[i],
			status 			  : "Listed",
			user_id			  : "",
			// allocatedToUserId : "",
			remark 			  : ""

		}
		console.log("formValues",formValues);
		axios
	    .patch('/api/salesagent/patch/approvedlist',formValues)
	    .then(
	      (res)=>{
	        console.log(res);
	        this.props.getTotalTabCount();
	      }
	    )
	    .catch();
		}
   		// window.location.reload();
	}
	render() {
		return (
			<div className="">
				<h1>{this.props.status}</h1>
				{
					this.props.status ==="New" ?
						<div>
							<button className="btn btn-primary propBtn1">Assign To Field Agent</button>
							<button className="btn btn-primary propBtn2" onClick={this.handleVerify.bind(this)}>Verify & List</button>
						</div>
					:
					null	
				}
				{
					this.state.propertiesData.map((property,index)=>{
						return(

							<div className="propertyBox" >
								<div className="col-lg-1 check1" >
								    <input type="checkbox" id={property._id}  className="check individual" value={property._id} onClick={this.handleData.bind(this)}/>
								    <label htmlFor={property._id} className="check-box"></label> 
								</div>
								<div className="col-lg-11 pBoxSize" onClick={this.profileView.bind(this)}  key={index} id={property._id}>
									<div className="col-lg-4">
										<span className="">
											Property ID: 
									        <Link to="/propertyDetails" > {property.propertyCode}</Link><br/>
											{property.propertyType ? property.propertyType : "Residential Property"}<br/>
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
										<span>{property.transactionType}</span>
									</div>
									<div className="col-lg-5">
										<span className="">
											{property.ownerDetails.userName? property.ownerDetails.userName: "Rushikesh " }<br/>
											{property.ownerDetails.emailId ? property.ownerDetails.emailId : "rushikesh.salunkhe101@gmail.com"}<br/>
											{property.ownerDetails.mobileNumber ? property.ownerDetails.mobileNumber : "*** **** *** "}
										</span>
									</div>
									<div className="col-lg-3 pull-right fSize13">
										{moment(property.propertyCreatedAt).format('MMMM Do YYYY')} &nbsp;
										{moment(property.propertyCreatedAt).format('LT')} &nbsp;
										
										<div id="myProgress">
											<Progressbar data="80" />
										</div>
									</div>
								</div>
							</div>
						);
					})
				}
			</div>
		)
	}
}
export default withRouter(Properties);