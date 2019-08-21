import React, { Component } from 'react';
import moment               from 'moment'
import $                    from "jquery";
import { Link }             from 'react-router-dom';
import {withRouter}         from 'react-router-dom';
import axios                from 'axios';
import { connect }        from 'react-redux';

import LoginMobNum              from '../WebsiteSecurity/LoginMobNum/LoginMobNum.js';
import LoginOtp                 from '../WebsiteSecurity/LoginOtp/LoginOtp.js';
import WebSignupForm            from '../WebsiteSecurity/WebSignup/WebSignupForm.js';


import "./HomePageProperties.css";

class HomePageProperties extends Component {
	constructor(props){
		super(props);
		this.state = {
			propertiesData  : [],
      propertyType    : "",
      transactionType : "",
		}
	}

   componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.inputData){

      this.setState({
        propertiesData  : nextProps.inputData,
        propertyType    : nextProps.inputData && nextProps.inputData.length > 0 ?  nextProps.inputData[0].propertyType : "",
        transactionType : nextProps.inputData && nextProps.inputData.length > 0 ? nextProps.inputData[0].transactionType: "",
        isInterested    : nextProps.inputData && nextProps.inputData.length > 0 ? nextProps.inputData[0].isInterested: "",

      },()=>{
        console.log("propertiesData",this.state.propertiesData);
      })
    }
  }

  removeBackdrop(){
    $(".modal-backdrop").remove();    
  }

  
  interestBtn(event){
    event.preventDefault();
    var id = event.currentTarget.id;

    console.log("uid=>",localStorage.getItem('uid'),"propid=>",event.currentTarget.id)
    var formValues ={
      property_id : event.currentTarget.id,
      buyer_id    : localStorage.getItem('uid'),
    }
    console.log("formValues",formValues);

      if($("#"+id).hasClass("interestExpress")){
         axios
          .post('http://qatgk3tapi.iassureit.com/api/interestedProperties/',formValues)
          .then(res=>{
             console.log("interestBtn = ",res); 
             //After Express Interest, again get all properties
              var rangeValues = {
                propertyType    : this.state.propertyType,
                transactionType : this.state.transactionType,
                startRange      : 0,
                limitRange      : 6,
                listing         :true,
                uid : localStorage.getItem("uid")
              }

              console.log("rangeValues = ", rangeValues);
              axios
                .post('http://qatgk3tapi.iassureit.com/api/properties/post/list',rangeValues)
                .then(resultData =>{
                  console.log("resultData",resultData);
                    this.setState({
                      propertiesData  : resultData.data,
                    })
                })
                .catch(error=>{
                  console.log("error = ", error);
                });
          })
          .catch((error) =>{
            console.log("error = ", error);
          }); 

    }else{
      var deleteValues = {
          "property_id": event.currentTarget.id,
          "buyer_id": localStorage.getItem('uid')
        }
      console.log("deleteValues",deleteValues);
      axios
        .delete('http://qatgk3tapi.iassureit.com/api/interestedProperties/'+localStorage.getItem('uid')+"/"+event.currentTarget.id)
        .then(
          (res)=>{
              console.log("deleted ",res); 
              var rangeValues = {
                propertyType    : this.state.propertyType,
                transactionType : this.state.transactionType,
                startRange      : 0,
                limitRange      : 6,
                listing         :true,
                uid : localStorage.getItem("uid")
              }

              console.log("rangeValues = ", rangeValues);
              axios
                .post('http://qatgk3tapi.iassureit.com/api/properties/post/list',rangeValues)
                .then(resultData =>{
                  console.log("resultData",resultData);
                    this.setState({
                      propertiesData  : resultData.data,
                    })
                })
                .catch(error=>{
                  console.log("error = ", error);
                });
          }
        )
        .catch((error) =>{
                console.log("error = ", error);
        }); 
    }
  }



  convertNumberToRupees(totalPrice) 
    {
      return Math.abs(Number(totalPrice)) >= 1.0e+7

      ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

      : Math.abs(Number(totalPrice)) >= 1.0e+5

      ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

      : Math.abs(Number(totalPrice));
    }

  login(){
    const originPage = "header" ; //This is to stop after signup... otherwise it continues to next form Basic info.

    const uid = localStorage.getItem("uid");

    if(uid){
      this.props.already_loggedIn(originPage,uid);
    }else{
      this.props.login_mobileNum(originPage);
    }
  }



  render() {
		var count = this.state.propertiesData.length;
		var mod =count % 3;

    let header;
    if(this.props.LoginMobNum){
      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
    }else if(this.props.LoginOtp){
      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
    }else if(this.props.WebSignupForm){
      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
    }

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
                              <div  key={index}   className="mt10 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                      {property.propertySubType}
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                      FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                     <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">

                                      {
                                        property.transactionType === "Sell" ?
                                        <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{this.convertNumberToRupees(property.financial.totalPrice)}</i>
                                        :
                                        <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{property.financial.monthlyRent}</i>
                                      }
                                      </div>
                                      {
                                        localStorage.getItem("uid") 
                                        ?
                                          property.isInterested
                                          ? 
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestShown"  id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Interest Shown </span>
                                            </div>
                                          :
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Express Interest </span>
                                            </div>                                        
                                        :
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
                                            <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                            <span className="intText"> Express Interest </span>
                                          </div>
                                      }

                                  </div>
                                  <div className="row">
                                    <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                       {
                                        <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : "/images/loading_img.jpg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      }
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
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>
                                        {
                                          property.transactionType === "Sell" ?
                                          property.financial.expectedRate + " /Sq.ft." 
                                          :
                                          property.financial.depositAmount+" Deposit"
                                        }
                                    </div>    
                                    <div className="pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i> {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }else{
                          return(
                            <div key={index}  className="mt10 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                    {property.propertySubType}
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                    FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                     {
                                      property.transactionType === "Sell" ?
                                      <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{this.convertNumberToRupees(property.financial.totalPrice)}</i>
                                      :
                                      <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{property.financial.monthlyRent}</i>
                                    }
                                  </div>
                                      {
                                        localStorage.getItem("uid") 
                                        ?
                                          property.isInterested
                                          ? 
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestShown"  id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Interest Shown </span>
                                            </div>
                                          :
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Express Interest </span>
                                            </div>                                        
                                        :
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
                                            <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                            <span className="intText"> Express Interest </span>
                                          </div>
                                      }
                                  </div>
                                <div className="row">
                                  <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                     <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : "/images/loading_img.jpg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
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
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>
                                    {property.transactionType === "Sell" ?
                                      property.financial.expectedRate + " /Sq.ft." 
                                      :
                                      property.financial.depositAmount+" Deposit "
                                    }
                                  </div>
                                  <div className="pull-right noPad mt10">
                                    <i className="fa fa-shopping-bag  pr8 pull-right" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                  </div>
                                </div>
                              </div>
                            </div>
                            );
                          }
                        }else if(mod === 1){
                          if(count === index+1){
                            return(
                            <div key={index}  className="mt10 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                    {property.propertySubType}
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                    FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                     {
                                      property.transactionType === "Sell" ?
                                      <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{this.convertNumberToRupees(property.financial.totalPrice)}</i>
                                      :
                                      <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{property.financial.monthlyRent}</i>
                                    }
                                  </div>
                                      {
                                        localStorage.getItem("uid") 
                                        ?
                                          property.isInterested
                                          ? 
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestShown"  id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Interest Shown </span>
                                            </div>
                                          :
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Express Interest </span>
                                            </div>                                        
                                        :
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
                                            <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                            <span className="intText"> Express Interest </span>
                                          </div>
                                      }

                                </div>
                                <div className="row">
                                  <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                     <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : "/images/loading_img.jpg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
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
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>
                                    {property.transactionType === "Sell" ?
                                      property.financial.expectedRate+ " /Sq.ft."  
                                      :
                                      property.financial.depositAmount+" Deposit "
                                    }
                                  </div>
                                  <div className="pull-right noPad mt10">
                                    <i className="fa fa-shopping-bag  pr8 pull-right" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                  </div>
                                </div>
                              </div>
                            </div>
                            );
                          }else{
                          return(<div  key={index}  className="mt10 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        {property.propertySubType}
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                         {
                                          property.transactionType === "Sell" ?
                                          <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{this.convertNumberToRupees(property.financial.totalPrice)}</i>
                                          :
                                          <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{property.financial.monthlyRent}</i>
                                        }
                                      </div>
                                      {
                                        localStorage.getItem("uid") 
                                        ?
                                          property.isInterested
                                          ? 
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestShown"  id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Interest Shown </span>
                                            </div>
                                          :
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Express Interest </span>
                                            </div>                                        
                                        :
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
                                            <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                            <span className="intText"> Express Interest </span>
                                          </div>
                                      }

                                    </div>
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : "/images/loading_img.jpg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
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
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>
                                        {property.transactionType === "Sell" ?
                                          property.financial.expectedRate+ " /Sq.ft."  
                                          :
                                          property.financial.depositAmount+" Deposit "
                                        }
                                      </div>
                                      <div className="pull-right noPad mt10">
                                        <i className="fa fa-shopping-bag  pr8 pull-right" aria-hidden="true"></i>  {moment(property.propertyCreatedAt).format('MMMM Do YYYY')}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                        }
                        }else{
                        return(
                          <div key={index}  className="mt10 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                    {property.propertySubType}
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                    FOR {property.transactionType === "Sell" ? "SELL" : "RENT" }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                    {
                                      property.transactionType === "Sell" ?
                                      <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{this.convertNumberToRupees(property.financial.totalPrice)}</i>
                                      :
                                      <i className="fa fa-inr pr8" aria-hidden="true">&nbsp;{property.financial.monthlyRent}</i>
                                    }
                                  </div>
                                    {
                                        localStorage.getItem("uid") 
                                        ?
                                          property.isInterested
                                          ? 
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestShown"  id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Interest Shown </span>
                                            </div>
                                          :
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.interestBtn.bind(this)}>
                                              <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                              <span className="intText"> Express Interest </span>
                                            </div>                                        
                                        :
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad interestExpress" id={property._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
                                            <i className="fa fa-heart-o pr8"  aria-hidden="true" ></i>
                                            <span className="intText"> Express Interest </span>
                                          </div>
                                      }

                                </div>
                                <div className="row">
                                  <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                     <img alt=""  src={property.gallery.Images && property.gallery.Images.length > 0 ? property.gallery.Images[0] : "/images/loading_img.jpg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
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
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>
                                    {
                                      property.transactionType === "Sell" ?
                                      property.financial.expectedRate+ " /Sq.ft."  
                                      :
                                      property.financial.depositAmount+" Deposit "
                                    }
                                  </div> 
                                  <div className="pull-right noPad mt10">
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
	

        {/*=== Modal starts here ===*/}
        <div>
          <div id="loginModal" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">

              <div className="modal-content "style={{marginTop:"52px"}}>
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>X</button>
                  <h4 className="modal-title">
                    <b style={{paddingLeft:"28px"}}> {header} </b>
                  </h4>
                </div>

                <div className="modal-body col-lg-12">
                  { this.props.LoginMobNum  ? <LoginMobNum />     : null }
                  { this.props.LoginOtp     ? <LoginOtp />      : null }
                  { this.props.WebSignupForm  ? <WebSignupForm />   : null }
                </div>
                <div className="modal-footer">
                </div>

              </div>

            </div>
          </div>
        </div>


      </div>

    );//return

  }//render


}


const mapStateToProps = (state)=>{
  // console.log("state",state)
  return {
    LoginMobNum     : state.LoginMobNum,
    LoginOtp        : state.LoginOtp,
    WebSignupForm   : state.WebSignupForm,
  }
};


const mapDispatchToProps = (dispatch)=>{
  return {
      login_mobileNum  : (originPage)=>dispatch({type: "LOGIN_MOB_NUM", originPage: originPage}),
      already_loggedIn : (originPage,uid)=>dispatch({type: "ALREADY_LOGGEDIN", originPage: originPage, uid:uid}),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePageProperties));

