import React, { Component } from 'react';
import axios                from 'axios';
import { Link } 			from 'react-router-dom';
import {withRouter} 		from 'react-router-dom';
import { connect }          from 'react-redux';
import $                    from "jquery";

import BasicInfo            from '../../PostProperty/BasicInfo/BasicInfo.js';
import Location             from '../../PostProperty/Location/Location.js';
import PropertyDetails      from '../../PostProperty/PropertyDetails/PropertyDetails.js';
import Amenities            from '../../PostProperty/Amenities/Amenities.js';
import Financials           from '../../PostProperty/Financials/Financials.js';
import Availability         from '../../PostProperty/Availability/Availability.js';
import CongratsPage         from '../../PostProperty/CongratsPage/CongratsPage.js';
import ImageUpload          from '../../PostProperty/ImageUpload/ImageUpload.js';

import './MyPostedProperties.css';


 var timesClicked = 1;
 class MyPostedProperties extends Component {
	constructor(props){
		super(props);
     	var uid = localStorage.getItem("uid");
		this.state = {
			"uid"		   : uid,
			"myProperties" : [],
			"userData"     : [],
			"heartStatus"  : "Express Interest"
		}

	}
	componentDidMount(){
    	this.props.showFirstForm();  //for dispatch

		$(".modal-backdrop").remove();
	     axios
	    .get('http://qatgk3tapi.iassureit.com/api/properties/mypropertylist/'+this.state.uid)
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

	removeBackdrop(){
		$(".modal-backdrop").remove();    
	}

	render() {
		let header;
	  
	    if (this.props.BasicInfo) {
	    	header = "Let's Provide details of your property for sell";
	    }else if(this.props.Location){
	    	header = "Let's Provide Details of Your Property Location"; 
	    }else if(this.props.PropertyDetails){
	    	header = "Please provide property details of your property to SELL"; 
	    }else if(this.props.Amenities){
	    	header = "My Apartment has following Amenities"; 
	    }else if(this.props.Financials){
	    	header = "Financial Details For My Apartment"; 
	    }else if(this.props.Availability){
	    	header = "Please tell us your availability to plan visit"; 
	    }else if(this.props.ImageUpload){
	    	header = "Please Upload Images and a Video of your Property"; 
	    }

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPostProp noPad">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 newPost">
				 	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">
                      <button className="col-lg-6 pull-right btn btn-primary" data-toggle="modal" data-target="#postPropertyModal"> Post New Property </button> 
                	</div>
                </div>	
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<h3 className="text-center propertyHaedText">My Posted Properties</h3>
				</div>
				{this.state.myProperties && this.state.myProperties.length>0  ?
					this.state.myProperties.map((myProperty,index)=>{
					return(
						<div key={index} className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox ">			
							<div className="row pull-right" id="triangle-topright">				</div>	
								<div className="row">
									<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">				
										{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right ">
											<h5 className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pull-right intrestBtn">
												<i  className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;<span>{this.state.heartStatus}</span>
											</h5>
										</div>*/}
									
									<img alt=""  className="propertyImgDiv" src={myProperty.gallery.Images[0]} />
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
														<span className="pull-right text-right col-lg-8  noPad transactionLabel">Sale</span>
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
													Super Area : <b>{myProperty.propertyDetails ? myProperty.propertyDetails.superArea : "-"}&nbsp;Sqft</b>
												</div>
												<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
													Possession by : <span className="propertySubText2">{myProperty.propertyDetails ? myProperty.propertyDetails.availableFrom : "-"}</span>
												</div>
												<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
		                                      		<Link to={"/PropertyProfile/"+myProperty._id} target="_blank">
														<button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})
					:
					<div className="col-lg-12 text-center"><h5>Posted properties will be shown here. To post a new property, click on <b>Post New Property</b></h5></div>
				}



				{/*=== Modal starts here ===*/}
		        <div id="postPropertyModal" className="modal fade" role="dialog">
		          <div className="modal-dialog modal-lg">

		            <div className="modal-content">
		              <div className="modal-header">
		                <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>&times;</button>
		                <h4 className="modal-title">
		                  <b> {header} </b>
		                </h4>
		              </div>

		              <div className="modal-body postPropertyModalBody col-lg-12">

		            { this.props.BasicInfo       ? <BasicInfo />        : null }
		            { this.props.PropertyDetails ? <PropertyDetails />  : null }
		            { this.props.Financials      ? <Financials />       : null }
		            { this.props.Amenities       ? <Amenities />        : null }
		            { this.props.Availability    ? <Availability />     : null }
		            { this.props.Location        ? <Location />         : null }
		            { this.props.CongratsPage    ? <CongratsPage />     : null }
		            { this.props.ImageUpload     ? <ImageUpload />      : null }

		              </div>

		              <div className="modal-footer">
		              </div>

		            </div>

		          </div>
		        </div>

			</div>
		)
	}
}


const mapStateToProps = (state)=>{
  return {
    BasicInfo        : state.BasicInfo,
    PropertyDetails  : state.PropertyDetails,
    Financials       : state.Financials,
    Amenities        : state.Amenities,
    Availability     : state.Availability,
    Location         : state.Location,
    ImageUpload      : state.ImageUpload,
    CongratsPage     : state.CongratsPage,
    formTitle        : state.formTitle,
    uid 			 : state.uid,
    property_id		 : state.property_id,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
    showFirstForm  : ()         => dispatch({type: "SHOW_FIRST_FORM"}),

    setFormTitle   : (formTitle)=> dispatch({
                                              type      : "SET_FORM_TITLE",
                                              formTitle : formTitle,
                                            }),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(MyPostedProperties);