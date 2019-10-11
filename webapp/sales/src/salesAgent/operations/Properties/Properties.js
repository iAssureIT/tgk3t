import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import Progressbar          from '../progressBar/Progressbar.js';
import {Router, withRouter} from 'react-router-dom';

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
			// user_id :"5d9b017ac8be6c588004f09d",
			status	:"WIP" ,
		}
		console.log("formValues",formValues);
	    axios
	    .post('/api/salesagent/post/displaylist',formValues)
	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	        const postDataLength1 = res.data.length;

	        console.log("postDataLength1",postDataLength1);
	        this.setState({
	          propertiesData : postsdata,
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
		console.log("formValues receive",formValues);
	    axios
	    .post('/api/salesagent/post/displaylist',formValues)
	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	        const postDataLength2 = res.data.length;

	        console.log("postDataLength2",postDataLength2);

	        this.setState({
	          propertiesData : postsdata,
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
		console.log("_id",id);
		this.props.history.push('/profile/'+ id);
	}
	
	render() {
		return (
			<div className="">
				<h1>{this.props.status}</h1>
				{
					this.state.propertiesData.map((property,index)=>{
						return(
							<div className="propertyBox" >
								<div className="col-lg-1 check1" >
								    <input type="checkbox" id="cbtest"  className="check individual"/>
								    <label htmlFor="cbtest" className="check-box"></label> 
								</div>
								<div className="col-lg-11 pBoxSize" onClick={this.profileView.bind(this)}  key={index} id={property._id}>
									<div className="col-lg-4">
										<span className="mt-8">
											Property ID: 
									        <Link to="/propertyDetails" > {property.propertyCode}</Link><br/>
											{property.propertyType ? property.propertyType : "Residential Property"}<br/>
											<div>{property.propertyDetails && property.propertyDetails.length >0 ?
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
											{property.propertyHolder? property.propertyHolder: "Rushikesh Salunkhe" }<br/>
											{property.email ? property.email : "rushikesh.salunkhe101@gmail.com"}<br/>
											{property.ownerDetails.mobileNumber ? property.ownerDetails.mobileNumber : "*** **** *** "}
										</span>
									</div>
									<div className="col-lg-3 pull-right">
										{property.time ? property.time :"29-7-2019"} &nbsp;
										{property.time ? property.time :"12:00 AM"} 
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