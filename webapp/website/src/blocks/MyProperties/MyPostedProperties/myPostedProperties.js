import React, { Component } from 'react';
import axios                from 'axios';
import {withRouter} from 'react-router-dom';
import Header 			    from "../../common/Header/Header.js";

import './myPostedProperties.css';


 var timesClicked = 1;
 class myPostedProperties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			myProperties :[],
			userData     :[],
			heartStatus  :"Express Interest"
		}
	}
	componentDidMount(){
	     axios
	    .get('http://qatgk3tapi.iassureit.com/api/properties/mypropertylist/5d36dfd6a751bba0e9ec4dad')
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

	heartClick(event){
		event.preventDefault();
		timesClicked++;
		var mod=timesClicked % 2;
		var status="";
		var elem="";
		console.log("timesClicked",mod);
		  if (mod === 0) {
		    elem = document.querySelector('i');
		    elem.classList.remove('fa-heart-o');
		    elem.classList.add('fa-heart');
		     status = "Interested"
		  }
		  else if(mod === 1) {
		    elem = document.querySelector('i');
		    elem.classList.add('fa-heart-o');
		    elem.classList.remove('fa-heart');
		     status = "Express Interest"
		  }
		  this.setState({
		  	heartStatus : status,
		  },()=>{
		  	console.log("heartStatus",this.state.heartStatus);
		  })
		  return true;
	}
	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
					<div className="row">	
						<div className="headerDiv">
							<Header />
						</div>
					</div>	
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h3 className="text-center propertyHaedText">My Posted Properties</h3>
					</div>
					{
						this.state.myProperties.map((myProperty,index)=>{
							return(
							<div key="index" className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox ">			
							<div className="row pull-right" id="triangle-topright">				</div>	
								
								<div className="row">
									<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">				
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right ">
											<h5 className="col-lg-6 col-md-5 col-sm-12 col-xs-12 pull-right intrestBtn">
												<i  className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;<span>{this.state.heartStatus}</span>
											</h5>
										</div>
										<img alt=""  className="propertyImgDiv" src="/images/profileImg1.jpg" />
									</div>
									<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noPad">				
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 propertySubText1">				
												<i className="fa fa-inr"></i>&nbsp;
												<span>
													{myProperty.financial && myProperty.financial.totalPrice ? myProperty.financial.totalPrice : "-"}
												</span>
											</div>

											<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 propertySubText1">				
												{
													myProperty.propertyDetails && myProperty.propertyDetails.bedrooms ? myProperty.propertyDetails.bedrooms 
													: 
													"-"
												}
												&nbsp;BHK
												&nbsp;
												<i className="fa fa-map-marker text-warning"/>
												&nbsp;
												{myProperty.propertyLocation  &&  myProperty.propertyLocation.city && myProperty.propertyLocation.society
													? 
													myProperty.propertyLocation.society +", "+myProperty.propertyLocation.city 
													:
													 "-"
												}
											</div>
										
											<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noPad pull-right">				
												{myProperty.transactionType ?
													myProperty.transactionType ==="Sell" ?
													<span className="pull-right text-right col-lg-8  noPad transactionLabel">{myProperty.transactionType}</span>
													:
													myProperty.transactionType ==="Rent" ?
													<span className="pull-right text-right col-lg-8 noPad transactionLabel">{myProperty.transactionType}</span>
													:
													null
												:
												"-"
												}
											</div>	
											

										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
											<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
												<img alt=""  src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">
													{myProperty.propertyDetails && myProperty.propertyDetails.bedrooms ? myProperty.propertyDetails.bedrooms : "-"}
												</span>
												<br/> Beds
											</div>
											<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
												<img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">
												{myProperty.propertyDetails && myProperty.propertyDetails.bathrooms ? myProperty.propertyDetails.bathrooms : "-"}
												</span>
												<br/>Baths
											</div>
											<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
												<img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">{myProperty.floor? myProperty.floor :"-"}  /  {myProperty.floor? myProperty.totalFloor :"-"}</span><br/>Floor / Total Floor
											</div>
											<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
												<img alt=""  src="/images/Icons/face.png" className="imgIcon"/>&nbsp;
												<span className="propertySubText1">{myProperty.propertyDetails? myProperty.propertyDetails.facing :"-"}</span><br/>Facing
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">				
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												Super Area : <b>3&nbsp;Sqft</b>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
												Possession by : <span className="propertySubText2">Jul' 2019</span>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
												<button className="btn pull-right btnDetails">Details&nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
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
export default withRouter(myPostedProperties);