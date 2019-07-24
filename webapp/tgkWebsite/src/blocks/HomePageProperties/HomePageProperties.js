import React, { Component } from 'react';
import Moment from 'react-moment';
import {withRouter} from 'react-router-dom';

import "./HomePageProperties.css";

var timesClicked=0;
class HomePageProperties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertiesData:[],
      heartStatus  :"Express Interest"
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

	componentDidMount(){
    // axios
    //     .get('http://qatgk3tapi.iassureit.com/api/properties/listofproperty/'+this.props.inputData.propertyType+'/'+this.props.inputData.transactionType)
    //     .then( (res) =>{
    //       console.log("PropertyList",res.data);

    //     })
    //     .catch((error) =>{
    //       console.log("error = ", error);
    //     });

     /*[
			{propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo1.jpeg"},
			{propertyName:"Laburnum Park ",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-02-19","image":"/images/photo2.jpeg"},
			{propertyName:"Kumar Paradise ",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-03-19","image":"/images/photo3.jpeg"},
      {propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo4.jpeg"},
      {propertyName:"Laburnum Park",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo4.jpeg"},
      {propertyName:"Kumar Paradise",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo4.jpeg"},
		];
*/
  }
  heartClick(event){
    event.preventDefault();
    timesClicked++;
    var mod=timesClicked % 2;
    var status= "";
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
		var count = this.state.propertiesData.length;
		var mod =count % 3;
    console.log("mod",mod)
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
                                <div id="index" key={index} className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={"/images/photo5.jpeg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        RESIDENTIAL TOWER
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR {property.transactionType}
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intrestBtn1 pull-right ">
                                          <h5><i className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;{this.state.heartStatus}</h5>
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
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> Apartment </b></div>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                          <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            );
                          }else{
                          return(
                            <div id="index" key={index} className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={"/images/photo5.jpeg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        RESIDENTIAL TOWER
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR SALE
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intrestBtn1 pull-right ">
                                          <h5><i className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;{this.state.heartStatus}</h5>
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
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> Apartment </b></div>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                          <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                        );
                        }
                        }else if(mod === 1){
                          if(count === index+1){
                          	// console.log(index+1);
                            return(
                            <div id="index" key={index} className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={"/images/photo5.jpeg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        RESIDENTIAL TOWER
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR SALE
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intrestBtn1 pull-right ">
                                          <h5><i className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;{this.state.heartStatus}</h5>
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
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> Apartment </b></div>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                          <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                          }else{
                          return(<div id="index" key={index} className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={"/images/photo5.jpeg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        RESIDENTIAL TOWER
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR SALE
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intrestBtn1 pull-right ">
                                          <h5><i className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;{this.state.heartStatus}</h5>
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
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> Apartment </b></div>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                          <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                        }
                        }else{
                        return(<div id="index" key={index} className="mt10 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 oneProp">
                                    <div className="row">
                                      <div id=" bgImg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad imgZoom" >
                                         <img alt=""  src={"/images/photo5.jpeg"} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad imgSize zoom" />
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info1" >
                                        RESIDENTIAL TOWER
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad" id="info2" >
                                        FOR SALE
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad info"> 
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad" id="priceDisplay">
                                        <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intrestBtn1 pull-right ">
                                          <h5><i className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;{this.state.heartStatus}</h5>
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
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad"> <b> Apartment </b></div>
                                        <div className="pull-left col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt10"> Ready To Move{/*property.status*/} </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1">
                                          <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bBottom mt10"></div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad mt10">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.financial.totalPrice}
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right noPad mt10">
                                      <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
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