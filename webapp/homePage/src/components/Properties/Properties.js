import React, { Component } from 'react';
import Moment from 'react-moment';

import "./properties.css";

export default class Properties extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertiesData:[],
		}
	}
	componentDidMount(){
		const propertiesDataArray = [
			{propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / Sq.Ft. Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo1.jpeg"},
			{propertyName:"Laburnum Park ",bed:2,bath:2,status:"Ready To Move",rate:"5700 / Sq.Ft. Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-02-19","image":"/images/photo2.jpeg"},
			{propertyName:"Kumar Paradise ",bed:2,bath:2,status:"Ready To Move",rate:"5700 / Sq.Ft. Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-03-19","image":"/images/photo3.jpeg"},
      {propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / Sq.Ft. Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo4.jpeg"},
      {propertyName:"Laburnum Park",bed:2,bath:2,status:"Ready To Move",rate:"5700 / Sq.Ft. Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo4.jpeg"},
      {propertyName:"Kumar Paradise",bed:2,bath:2,status:"Ready To Move",rate:"5700 / Sq.Ft. Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo4.jpeg"},
		];


		this.setState({
			propertiesData: propertiesDataArray,
		},()=>{});

	}
	render() {
		var count = this.state.propertiesData.length;
		var mod =count % 3;
		// console.log("mod ",mod);
		return (
			<div>
				<h3 className="textC"> Properties For {this.props.inputData.type} </h3>	
        <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8 ">
         <div className="col-lg-6 col-lg-offset-5 col-md-8 col-sm-8 col-xs-8 mlDot">
            <span className="dotDiv"> </span><span className="mainDiv"></span><span className="dotDivRight"> </span>
          </div>
        </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          					{
          						this.state.propertiesData.map((property,index)=>{
                                if(mod === 2){
                                  if(count === index+2){
                                    return(
                                        <div id="index" key={index} className=" mt10 col-lg-4 col-lg-offset-2">
                                          <div  className="col-lg-12 oneProp">
                                            <div className="row">
                                              <div id=" bgImg" className="imgZoom" >
                                                 <img alt="" src={property.image} className="col-lg-12 noPad imgSize zoom" />
                                              </div>
                                              <div id="info1" >
                                                RESIDENTIAL TOWER
                                              </div>
                                              <div id="info2" >
                                                FOR SALE
                                              </div>
                                              <div id="priceDisplay">
                                                <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
                                              </div>
                                               <div id="priceDisplay">
                                                <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
                                              </div>
                                            </div>
                                            <div className="col-lg-5 mt10  row ">
                                              <i className="fa fa-map-marker"></i> {property.location}
                                            </div>
                                            <div className="pull-left col-lg-12 row ">
                                              <h4><b> {property.propertyName} </b></h4>
                                            </div>
                                            <div className=" col-lg-12 row">
                                              <div className=" col-lg-9 row">
                                                <h4 className="pull-left"><span> Bed {property.bed}</span> <span>Baths {property.bath}</span> </h4>
                                                <div className="pull-left col-lg-12 row"> <b> Apartment </b></div>
                                                <div className="pull-left mt10"> {property.status} </div>
                                              </div>
                                              <div className=" col-lg-3 ">
                                                <div className="col-lg-10 col-lg-offset-1">
                                                  <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 bBottom mt10"></div>
                                            <div className=" col-lg-12 row ">
                                              <div className="col-lg-6 noPad mt10">
                                              <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.rate}
                                              </div>
                                              <div className="col-lg-6 pull-right row mt10">
                                              <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    );
                                  }else{
                                  return(
                                    <div id="index" key={index} className="mt10 col-lg-4">
                                      <div  className="col-lg-12 oneProp">
                                        <div className="row">
                                          <div id=" bgImg" className="imgZoom" >
                                             <img alt="" src={property.image} className="col-lg-12 noPad imgSize zoom" />
                                          </div>
                                          <div id="info1" >
                                            RESIDENTIAL TOWER
                                          </div>
                                          <div id="info2" >
                                            FOR SALE
                                          </div>
                                          <div id="priceDisplay">
                                            <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
                                          </div>
                                        </div>
                                        <div className="col-lg-5 mt10 row ">
                                          <i className="fa fa-map-marker"></i> {property.location}
                                        </div>
                                        <div className="pull-left col-lg-12 row  ">
                                          <h4><b> {property.propertyName} </b></h4>
                                        </div>
                                        <div className=" col-lg-12 row">
                                          <div className=" col-lg-9 row">
                                            <h4 className="pull-left"><span> Bed {property.bed}</span> <span>Baths {property.bath}</span> </h4>
                                            <div className="pull-left col-lg-12 row"> <b> Apartment </b></div>
                                            <div className="pull-left mt10"> {property.status} </div>
                                          </div>
                                          <div className=" col-lg-3 ">
                                            <div className="col-lg-10 col-lg-offset-1">
                                              <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 bBottom mt10"></div>
                                        <div className="col-lg-12 row">
                                          <div className="col-lg-6 noPad mt10">
                                          <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.rate}
                                          </div>
                                          <div className="col-lg-6 pull-right row mt10">
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
                                    	<div id="index" key={index} className="mt10 col-lg-4 col-lg-offset-4">
                                          <div className="col-lg-12 oneProp">
                                            <div className="row">
                                              <div id=" bgImg" className="imgZoom" >
                                                 <img alt="" src={property.image} className="col-lg-12 noPad imgSize zoom" />
                                              </div>
                                              <div id="info1" >
                                                RESIDENTIAL TOWER
                                              </div>
                                              <div id="info2" >
                                                FOR SALE11
                                              </div>
                                              <div id="priceDisplay">
                                                <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
                                              </div>
                                            </div>
                                            <div className="col-lg-5 mt10 row ">
                                              <i className="fa fa-map-marker"></i> {property.location}
                                            </div>
                                            <div className="pull-left col-lg-12 row  ">
                                              <h4><b> {property.propertyName} </b></h4>
                                            </div>
                                            <div className=" col-lg-12 row">
                                              <div className=" col-lg-9 row">
                                                <h4 className="pull-left"><span> Bed {property.bed}</span> <span>Baths {property.bath}</span> </h4>
                                                <div className="pull-left col-lg-12 row"> <b> Apartment </b></div>
                                                <div className="pull-left mt10"> {property.status} </div>
                                              </div>
                                              <div className=" col-lg-3 ">
                                                <div className="col-lg-10 col-lg-offset-1">
                                                  <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 bBottom mt10"></div>
                                            <div className="col-lg-12 row">
                                              <div className="col-lg-6 noPad mt10">
                                              <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.rate}
                                              </div>
                                              <div className="col-lg-6 pull-right row mt10">
                                              <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                  }else{
                                  return(<div key={index} id="index" className="mt10 col-lg-4">
                                          <div  className="col-lg-12 oneProp">
                                            <div className="row">
                                              <div id=" bgImg" className="imgZoom" >
                                                 <img alt="" src={property.image} className="col-lg-12 noPad imgSize zoom" />
                                              </div>
                                              <div id="info1" >
                                                RESIDENTIAL TOWER
                                              </div>
                                              <div id="info2" >
                                                FOR SALE
                                              </div>
                                              <div id="priceDisplay">
                                                <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
                                              </div>
                                            </div>
                                            <div className="col-lg-5 mt10 row ">
                                              <i className="fa fa-map-marker"></i> {property.location}
                                            </div>
                                            <div className="pull-left col-lg-12 row  ">
                                              <h4><b> {property.propertyName} </b></h4>
                                            </div>
                                            <div className=" col-lg-12 row">
                                              <div className=" col-lg-9 row">
                                                <h4 className="pull-left"><span> Bed {property.bed}</span> <span>Baths {property.bath}</span> </h4>
                                                <div className="pull-left col-lg-12 row"> <b> Apartment </b></div>
                                                <div className="pull-left mt10"> {property.status} </div>
                                              </div>
                                              <div className=" col-lg-3 ">
                                                <div className="col-lg-10 col-lg-offset-1">
                                                  <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 bBottom mt10"></div>
                                            <div className=" col-lg-12 row">
                                              <div className="col-lg-6 noPad mt10">
                                              <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.rate}
                                              </div>
                                              <div className="col-lg-6 pull-right row mt10">
                                              <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                }
                                }else{
                                return(<div id="index" key={index} className="mt40 col-lg-4">
                                          <div  className="col-lg-12 oneProp">
                                            <div className="row">
                                              <div id=" bgImg" className="imgZoom" >
                                                 <img alt="" src={property.image} className="col-lg-12 noPad imgSize zoom" />
                                              </div>
                                              <div id="info1" >
                                                RESIDENTIAL TOWER
                                              </div>
                                              <div id="info2" >
                                                FOR SALE
                                              </div>
                                              <div id="priceDisplay">
                                                <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
                                              </div>
                                              <div className="iconContainer">
                                                <div className="likeIcon col-lg-4">
                                                 <div className="row">
                                                  <i class="fa fa-heart"></i>
                                                  </div>
                                                </div>
                                                <div className="likeIcon col-lg-4">
                                                 <div className="row">
                                                    <i class="fa fa-exchange" aria-hidden="true"></i>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-5 mt10 iconColor row ">
                                              <i className="fa fa-map-marker mapIcon"></i>&nbsp; {property.location}
                                            </div>
                                            <div className="pull-left col-lg-12 row mt5 propertyNameHead">
                                              <h4><b> {property.propertyName} </b></h4>
                                            </div>
                                            <div className=" col-lg-12 row">
                                              <div className=" col-lg-9 row propertyDescription">
                                                <div className="pull-left col-lg-12 row mt12"> <b> Bed: {property.bed} Baths: {property.bath}</b></div>
                                                <div className="pull-left col-lg-12 row mt5"> <b> Apartment </b></div>
                                                <div className="pull-left mt10"> {property.status} </div>
                                              </div>
                                              <div className=" col-lg-3 ">
                                                <div className="col-lg-10 col-lg-offset-1">
                                                  <button className="customButtom btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 bBottom mt10"></div>
                                             <div className="row">
                                              <div className=" col-lg-12 row bottomDiv pull-right">
                                                <div className="col-lg-7 noPad mt12 row">
                                                 <i className="fa fa-map-marker mapIcon"></i>&nbsp;&nbsp;<i className="fa fa-inr pr8" aria-hidden="true"></i>{property.rate}
                                                </div>
                                                <div className="col-lg-5 pull-right  mt12">
                                                  <i class="fa fa-calendar pr8" aria-hidden="true"></i>
                                                       <Moment fromNow>{property.timestamp}</Moment>
                                                  </div>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                }
                            })
          					}
          				</div>
                </div>
              </div>
            </div>
          </div>
			</div>
		);
	}
}
