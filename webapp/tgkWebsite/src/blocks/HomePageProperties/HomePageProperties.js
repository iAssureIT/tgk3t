import React, { Component } from 'react';
import moment               from 'moment'
import { Link }             from 'react-router-dom';
import {withRouter}         from 'react-router-dom';
import axios                from 'axios';

import "./HomePageProperties.css";

class HomePageProperties extends Component {
	constructor(props){
		super(props);
		this.state = {
			propertiesData:[],
		}
	}

   componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.inputData){
      this.setState({
        propertiesData : nextProps.inputData,
      },()=>{
        console.log("propertiesData",this.state.propertiesData);
      })
    }
  }
  
  interestBtn(event){
    console.log("uid=>",localStorage.getItem('uid'),"propid=>",event.currentTarget.id)
    var formValues ={
      property_id : event.currentTarget.id,
      buyer_id    : localStorage.getItem('uid'),
    }
    console.log("formValues",formValues);
     axios
      .post('http://qatgk3tapi.iassureit.com/api/interestedProperties/',formValues)
      .then(
        (res)=>{
          console.log(res);
         console.log("interestBtn",res); 

        }
      )
      .catch((error) =>{
              console.log("error = ", error);
      }); 
  }

  render() {
		var count = this.state.propertiesData.length;
		var mod =count % 3;
		return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      				  <h3 className="textC"> <b>
                {
                  this.state.propertiesData && this.state.propertiesData.length > 0 ?
                  "Properties For "+this.state.propertiesData[0].transactionType
                  :
                  null

                }
                </b></h3>	
      					{this.state.propertiesData && this.state.propertiesData.length?
      						this.state.propertiesData.map((property,index)=>{
                      if(mod === 2){
                        if(count === index+2){
                          return(
                              <div  key={index}   className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                      RESIDENTIAL TOWER
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                      FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                     <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestBtn" id={property._id} onClick={this.interestBtn.bind(this)}>
                                      <i className="fa fa-heart pr8"  aria-hidden="true" ></i>Express Interest
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                       <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : null} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                    </div>
                                  </div> 
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 row">
                                    <i className="fa fa-map-marker"></i> {property.propertyLocation && property.propertyLocation.area && property.propertyLocation.city ? property.propertyLocation.area+", "+property.propertyLocation.city:"-"}
                                  </div>
                                  <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                    <h4><b> {property.propertyLocation ?property.propertyLocation.society:"-"} </b></h4>
                                  </div>
                                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                    <div className=" col-lg-9 row">
                                      <h4 className="pull-left"><span> Bed {property.propertyDetails  ? property.propertyDetails.bedrooms: "-"}</span> <span>Baths {property.propertyDetails  ? property.propertyDetails.bathrooms: "-"}</span> </h4>
                                      <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> {property.propertySubType  ? property.propertySubType: "-"} </b></div>
                                      <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                      <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                        <Link to={"/PropertyProfile/"+property._id} target="_blank">
                                          <button type="button" className="btn-primary btn mt30"  >Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                        </Link>                                        
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i> {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }else{
                          return(
                            <div key={index}  className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                    RESIDENTIAL TOWER
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                    FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestBtn" id={property._id} onClick={this.interestBtn.bind(this)}>
                                    <i className="fa fa-heart pr8"  aria-hidden="true" ></i>Express Interest
                                  </div>
                                </div>
                                <div className="row">
                                  <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                     <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : null} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                  </div>
                                </div> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 row">
                                  <i className="fa fa-map-marker"></i> {property.propertyLocation && property.propertyLocation.area && property.propertyLocation.city ? property.propertyLocation.area+", "+property.propertyLocation.city:"-"}
                                </div>
                                <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <h4><b> {property.propertyLocation ?property.propertyLocation.society:"-"} </b></h4>
                                </div>
                                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <div className=" col-lg-9 row">
                                    <h4 className="pull-left"><span> Bed {property.propertyDetails  ? property.propertyDetails.bedrooms: "-"}</span> <span>Baths {property.propertyDetails  ? property.propertyDetails.bathrooms: "-"}</span> </h4>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> {property.propertySubType  ? property.propertySubType: "-"} </b></div>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                      <Link to={"/PropertyProfile/"+property._id} target="_blank">
                                        <button type="button" className="btn-primary btn mt30"  >Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                      </Link>                                    
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                    <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                  </div>
                                </div>
                              </div>
                            </div>
                            );
                          }
                        }else if(mod === 1){
                          if(count === index+1){
                            return(
                            <div key={index}  className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                    RESIDENTIAL TOWER
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                    FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestBtn" id={property._id} onClick={this.interestBtn.bind(this)}>
                                    <i className="fa fa-heart pr8"  aria-hidden="true" ></i>Express Interest
                                  </div>
                                </div>
                                <div className="row">
                                  <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                     <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : null} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                  </div>
                                </div> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 row">
                                  <i className="fa fa-map-marker"></i> {property.propertyLocation && property.propertyLocation.area && property.propertyLocation.city ? property.propertyLocation.area+", "+property.propertyLocation.city:"-"}
                                </div>
                                <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <h4><b> {property.propertyLocation ?property.propertyLocation.society:"-"} </b></h4>
                                </div>
                                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <div className=" col-lg-9 row">
                                    <h4 className="pull-left"><span> Bed {property.propertyDetails  ? property.propertyDetails.bedrooms: "-"}</span> <span>Baths {property.propertyDetails  ? property.propertyDetails.bathrooms: "-"}</span> </h4>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> {property.propertySubType  ? property.propertySubType: "-"} </b></div>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                      <Link to={"/PropertyProfile/"+property._id} target="_blank">
                                        <button type="button" className="btn-primary btn mt30"  >Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                      </Link>                                    
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                    <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                  </div>
                                </div>
                              </div>
                            </div>
                            );
                          }else{
                          return(<div  key={index}  className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        RESIDENTIAL TOWER
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestBtn" id={property._id} onClick={this.interestBtn.bind(this)}>
                                        <i className="fa fa-heart pr8"  aria-hidden="true" ></i>Express Interest
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : null} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 row">
                                      <i className="fa fa-map-marker"></i> {property.propertyLocation && property.propertyLocation.area && property.propertyLocation.city ? property.propertyLocation.area+", "+property.propertyLocation.city:"-"}
                                    </div>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <h4><b> {property.propertyLocation ?property.propertyLocation.society:"-"} </b></h4>
                                    </div>
                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className=" col-lg-9 row">
                                        <h4 className="pull-left"><span> Bed {property.propertyDetails  ? property.propertyDetails.bedrooms: "-"}</span> <span>Baths {property.propertyDetails  ? property.propertyDetails.bathrooms: "-"}</span> </h4>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> {property.propertySubType  ? property.propertySubType: "-"} </b></div>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                          <Link to={"/PropertyProfile/"+property._id} target="_blank">
                                            <button type="button" className="btn-primary btn mt30"  >Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                          </Link>                                        
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                        <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                        }
                        }else{
                        return(
                          <div key={index}  className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                    RESIDENTIAL TOWER
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                    FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestBtn" id={property._id} onClick={this.interestBtn.bind(this)}>
                                    <i className="fa fa-heart pr8"  aria-hidden="true" ></i>Express Interest
                                  </div>
                                </div>
                                <div className="row">
                                  <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                     <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : null} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                  </div>
                                </div> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 row">
                                  <i className="fa fa-map-marker"></i> {property.propertyLocation && property.propertyLocation.area && property.propertyLocation.city ? property.propertyLocation.area+", "+property.propertyLocation.city:"-"}
                                </div>
                                <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <h4><b> {property.propertyLocation ?property.propertyLocation.society:"-"} </b></h4>
                                </div>
                                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <div className=" col-lg-9 row">
                                    <h4 className="pull-left"><span> Bed {property.propertyDetails  ? property.propertyDetails.bedrooms: "-"}</span> <span>Baths {property.propertyDetails  ? property.propertyDetails.bathrooms: "-"}</span> </h4>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> {property.propertySubType  ? property.propertySubType: "-"} </b></div>
                                    <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                      <Link to={"/PropertyProfile/"+property._id} target="_blank">
                                        <button type="button" className="btn-primary btn mt30"  >Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                      </Link>                                    
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                   <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                  </div>
                                </div>
                              </div>
                          </div>
                        );
                      }
                    })
                  :
                  <div className="col-lg-offset-5"><h1>No Data Available</h1></div>
      					}
      				</div>
      			</div>
          </div>
        </div>
      </div>
		);
	}
}
export default withRouter(HomePageProperties);