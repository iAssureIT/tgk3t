import React, { Component } from 'react';
import axios                  from 'axios';
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
	}


   componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.status){
      	var formValues = {
			user_id :"5d3ec084e7381f059964f5be",
			status	:nextProps.status,
		}
		console.log("formValues",formValues);
	    axios
	    .post('/api/properties/post/sa/displaylist',formValues)
	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	        this.setState({
	          propertiesData : postsdata,
	        });
	    console.log("PropertyDetails++++++++++++++++++",postsdata);   
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
											{property.propertyHolder? property.propertyHolder: "Rushikesh Salunkhe" }<br/>
											{property.email ? property.email : "rushikesh.salunkhe101@gmail.com"}<br/>
											{property.phone ? property.phone : "+917721982986"}
										</span>
									</div>
									<div className="col-lg-3 pull-right">
										{property.time ? property.time :"29-7-2019"} &nbsp;
										{property.time ? property.time :"10:00 AM"} 
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