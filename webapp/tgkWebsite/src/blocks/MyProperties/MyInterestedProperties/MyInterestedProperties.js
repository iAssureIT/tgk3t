import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import {Router, withRouter} from 'react-router-dom';
import Header 			    from "../../common/Header/Header.js";

import './MyInterestedProperties.css';



 class MyInterestedProperties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			myProperties :[],
			userData       :[],
		}
	}
	componentDidMount(){
	     axios
	    .get('http://qatgk3tapi.iassureit.com/api/properties/list')
	    .then(
	      (res)=>{
	        console.log(res);
	        const postsdata = res.data;
	        this.setState({
	          myProperties : postsdata,
	        });
	   		 console.log("PropertyDetails",postsdata); 

	      }
	    )
	    .catch();
	}

	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="row">	
						<div className="headerDiv">
							<Header />
						</div>
					</div>	
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h3 className="text-center propertyHaedText">My Interested Properties</h3>
					</div>
					{
						this.state.myProperties.map((myProperty,index)=>{
							return(
							<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox">				
								<div className="row">
									<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">				
										<img className="propertyImgDiv" src="/images/profileImg1.jpg" />
									</div>
									<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 ">				
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 propertySubText1">				
												{myProperty.financial && myProperty.financial.length > 0 ?
													myProperty.financial.map((financial,index)=>{
													return(
														<span key={index}>{financial.totalPrice}&nbsp;Lakh</span>
														);
													})
													:
													"28 Lakh"
												}
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												<a href="#">See other charges</a>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 propertySubText2">				
												{myProperty.propertyDetails && myProperty.propertyDetails.length>0 ?
													myProperty.propertyDetails.map((propertyDetails,index)=>{
													return(
														<span key={index}>{propertyDetails.bedrooms}&nbsp;BHK</span>
														);
													})
													:
													"2 BHK"
												}
												&nbsp;
												<i className="fa fa-map-marker text-warning"/>&nbsp;
												{myProperty.propertyLocation && myProperty.propertyLocation.length > 0 ?
													myProperty.propertyLocation.map((propertyLocation,index)=>{
													return(
														<span key={index}>{propertyLocation.city}&nbsp;{propertyLocation.area}</span>
														);
													})
													:
													"Hadapsar, Pune"
												}
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												<img src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">
												{myProperty.propertyDetails && myProperty.propertyDetails.length>0 ?
													myProperty.propertyDetails.map((propertyDetails,index)=>{
													return(
														<span key={index}>{propertyDetails.bedrooms}</span>
														);
													})
													:
													"2"
												}</span>
												<br/> Beds
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												<img src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">
												{myProperty.propertyDetails && myProperty.propertyDetails.length>0 ?
													myProperty.propertyDetails.map((propertyDetails,index)=>{
													return(
														<span key={index}>{propertyDetails.bathrooms}</span>
														);
													})
													:
													"2"
												}</span>
												<br/>Baths
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												<img src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">{myProperty.floor? myProperty.floor :"2"}</span><br/>Floor
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">				
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												Carpet Area : {3}&nbsp;Sqft
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												Possession by : <span className="propertySubText2">Jul' 2019</span>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
												<button className="btn pull-right btnDetails">Details&nbsp;<img className="btnImg" src="/images/TGK-key.png"/></button>
											</div>
										</div>
									</div>
								</div>
							</div>
							)
						})
					}
				</div>
		)
	}
}
export default withRouter(MyInterestedProperties);