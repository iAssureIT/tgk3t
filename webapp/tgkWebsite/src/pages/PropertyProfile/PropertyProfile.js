import React, { Component }   from 'react';
import axios                  from 'axios';
import HomePageFooter         from '../../blocks/Profile/HomePageFooter.js';
// import RequestForm            from '../../blocks/RequestForm/RequestForm.js';
import { connect }            from 'react-redux';
import $                      from "jquery";
import {withRouter}         from 'react-router-dom';

import LoginMobNum            from '../../blocks/WebsiteSecurity/LoginMobNum/LoginMobNum.js';
import LoginOtp               from '../../blocks/WebsiteSecurity/LoginOtp/LoginOtp.js';
import WebSignupForm          from '../../blocks/WebsiteSecurity/WebSignup/WebSignupForm.js';

import BasicInfo              from '../../blocks/PostProperty/BasicInfo/BasicInfo.js';
import Location               from '../../blocks/PostProperty/Location/Location.js';
import PropertyDetails        from '../../blocks/PostProperty/PropertyDetails/PropertyDetails.js';
import Amenities              from '../../blocks/PostProperty/Amenities/Amenities.js';
import Financials             from '../../blocks/PostProperty/Financials/Financials.js';
import Availability           from '../../blocks/PostProperty/Availability/Availability.js';
import CongratsPage           from '../../blocks/PostProperty/CongratsPage/CongratsPage.js';
import ImageUpload            from '../../blocks/PostProperty/ImageUpload/ImageUpload.js';
import Loadable               from 'react-loadable';
import Header                 from "../../blocks/common/Header/Header.js";
import swal                     from 'sweetalert';

import "./PropertyProfile.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


var itemCount = 2; 

const OwlCarousel = Loadable({
   
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading"/></div>
  }
});

axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


class PropertyProfile extends Component{
  constructor(props){
    super(props);
     var profileId = this.props.match.params.id;

    this.state = {
      "checkValue"        : "",
      "profileId"         : profileId,
      "amenities"         : [],
      "propertyImages"    : [],
      "propertyVideo"     : "",
      "propertyFeatures"  : [],
      "features"          : [],
      "areaInSqFeet"      : [],
      "pricing"           : [],
      "propertyFea"       : [],
      "propertyDescription" : [],
      "propertyLocation"  : [],
      "transactionType"   : "",  
      "propertyType"      : "",  
      "prop_id"           : "",
      "floor"             : "",
      "totalFloor"        : "",
      "convertTotalPrice" : "",
      "ownerId"           : "",
      "countno"           : 2,
      "callfun"           : 0,
    }
  }

  login(){
    const originPage = "post" ;
    const uid = localStorage.getItem("uid");
    const prop_id  = this.state.prop_id;
    console.log("prop_id",prop_id);
    console.log("property id here",this.state.prop_id);
    if(uid && prop_id){
      this.props.already_loggedIn(originPage,uid,prop_id);
    }else{
      this.props.login_mobileNum(originPage);
    }
  }

  removeBackdrop(){
    $(".modal-backdrop").remove();    
  }

  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

  axios
    .get('/api/properties/'+this.state.profileId)
    .then(
      (res)=>{
        console.log("resposnse",res);
        const postsdata = res.data;
        this.setState({
          prop_id             : postsdata._id,
          propertyFeatures    : postsdata.propertyDetails,
          amenities           : postsdata.Amenities,
          propertyImages      : postsdata.gallery.Images,
          propertyVideo       : postsdata.gallery.video,
          pricing             : postsdata.financial,
          propertyLocation    : postsdata.propertyLocation,
          transactionType     : postsdata.transactionType,
          propertyType        : postsdata.propertyType,  
          floor               : postsdata.floor, 
          ownerId             : postsdata.owner_id,        
          totalFloor          : postsdata.totalFloor ,
          propertySubType     : postsdata.propertySubType         
        },()=>{

        });
        // console.log("postsdata.propertyDetails",res.data);
      }
    )
    .catch((error)=>{
                                console.log("error = ",error);
                                if(error.message === "Request failed with status code 401")
                                {
                                     swal("Your session is expired! Please login again.","", "error");
                                     this.props.history.push("/");
                                }
                            });

     $(this).find('input[type="checkbox"]').is(':checked');
    

  }

  
  convertNumberToRupees(totalPrice) 
  {
    return Math.abs(Number(totalPrice)) >= 1.0e+7

    ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

    : Math.abs(Number(totalPrice)) >= 1.0e+5

    ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

    : Math.abs(Number(totalPrice));
  }

   counter(event) {
    event.preventDefault();
   var element   = event.target;         // DOM element, in this example .owl-carousel
    var items     = event.item.count;     // Number of items
    console.log("here index og pic",event.item.index);
    console.log("here count og pic",event.item.count);

    // console.log("previndex",previndex);    // Position of the current item
    // console.log("this.state.countno",this.state.countno);
    if(itemCount < items){
      var item1 = itemCount+1; 
      itemCount = item1;
    }else{
      var item1=1;
      itemCount = item1;
    }
    
    

      $('#counter').html("Media "+item1+" of "+items)

    // if(item<=items) 
    // {
    

    //   item = item + 1 ;
    //   this.setState({
    //     countno : item,
    //   })
    // }
  // it loop is true then reset counter from 1
  // if(item > items) {
  //   item = item - items;
  // }
  // console.log("item display",element);
  
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
      else if(this.props.LoginMobNum){
        header = "Owners earn upto 50% brokerage by selling/renting with us so let’s get started." 
      }else if(this.props.LoginOtp){
        header = "Owners earn upto 50% brokerage by selling/renting with us so let’s get started." 
      }else if(this.props.WebSignupForm){
        header = "Owners earn upto 50% brokerage by selling/renting with us so let’s get started." 
      }

      return (
        <div className="container-fluid ">
          <div className="row"> 
            <div className="headerDiv">
              <Header />
            </div>
          </div>  
          <div className="">
            <div className="formWrapper row">   
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"  >
                <div className="row">
                <div className="col-lg-12  col-md-12 col-xs-12 col-sm-12 labalDiv"> 
                    <label>Property Profile</label>
                  </div>     
                </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 propertyName"> 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nameOfProperty noPad" >
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 backButton">
                          <img src="/images/profilePic.png"/>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-10 col-xs-10 row" >
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressOfProperty" >
                           {/* <label className="pull-left"> 
                            {this.state.propertyLocation && this.state.propertyLocation.address ? this.state.propertyLocation.address:"-"}
                            </label> */}
                            <div className="col-lg-2 col-md-2 col-sm-5 col-xs-5 text-center forSaleButton">
                              FOR {this.state.transactionType && this.state.transactionType==="Sell" ? "SALE" : "RENT"}
                            </div> 
                            <br/>
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad"> 
                              <div className="row col-xs-12 ">
                                <i className="fa fa-map-marker" aria-hidden="true"></i> &nbsp;
                                {this.state.propertyLocation ? this.state.propertyLocation.society+", "+this.state.propertyLocation.subArea+", "+this.state.propertyLocation.area+", "+this.state.propertyLocation.city+", "+this.state.propertyLocation.pincode : "-"}
                              </div>
                            </div>
                        </div>
                      </div>

                     { localStorage.getItem("uid") === this.state.ownerId ?
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 addressOfProperty" >
                        <button className="col-lg-6 pull-right btn btn-primary" data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}> Edit Property </button> 
                      </div>
                      :
                      null
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  {
                    this.state.propertyImages && this.state.propertyImages.length < 2 ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad imagesOfProperty">
                          {
                            this.state.propertyVideo ?
                            <video width="100%" height="100%" controls>
                                <source src={this.state.propertyVideo} type="video/mp4" className="col-lg-12 noPad"/>
                            </video>
                            :
                            <img src="/images/videoDummy.jpg" className="col-lg-12 col-xs-3 noPad"/>
                          }
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad imagesOfProperty" >
                          {this.state.propertyImages[0] ?
                            <img className="noPad propertyImageDiv col-lg-12 col-xs-12 noPad" src={this.state.propertyImages[0].imgPath} />
                            :
                            <img src="/images/loading_img.jpg" className="col-lg-12 noPad"/>
                          }
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad imagesOfProperty">
                            {this.state.propertyImages[1] ?
                            <img className="noPad propertyImageDiv col-lg-12 noPad" src={this.state.propertyImages[1].imgPath} />
                            :
                            <img src="/images/loading_img.jpg" className="col-lg-12 col-xs-12 noPad" />
                          }
                      </div>
                    </div>
                    :
                    (this.state.propertyImages && this.state.propertyImages.length >=2) || (this.state.propertyVideo && this.state.propertyVideo.length === 0) ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imagesOfProperty noPad" >
                      <OwlCarousel
                          className=" owl-theme "
                          loop
                          nav
                          dots={false}
                          items={3}
                          margin={0}
                          // slideBy={2}
                          navText={["<div class='fa fa-angle-left blogleftarrow'></div>","<div class='fa fa-angle-right blogrightarrow'></div>"]}
                          // responsive={
                          // {'0':{items:this.props.items},'768':{items:this.props.items}, '992':{items:this.props.items}, '1200':{items:this.props.items}}
                          // }
                          autoplay={true}
                          autoplayHoverPause={true}
                          onInitialized  = {this.counter.bind(this)} 
                          onTranslated = {this.counter.bind(this)}
                          >
                          {
                            this.state.propertyImages ? 
                            this.state.propertyImages.map((propertyImages,index)=>{
                            return(

                                  <div key={index}  >
                                      <div className="waterMark">Lyvo</div>
                                      <img className="item" src={propertyImages.imgPath} />
                                  </div>                    
                              )
                            })
                            :
                          <div>
                              <img className="item" src="/images/loading_img.jpg" />
                          </div>  
                          }
                          {
                            this.state.propertyVideo ?
                            <video width="100%" height="270" controls>
                                <source src={this.state.propertyVideo} type="video/mp4" className="col-lg-12 noPad"/>
                            </video>
                            :
                            null
                          }
                      </OwlCarousel>
                          <div id="counter" className="counter"></div> 

                    </div>
                    :
                    null
                  } 
                </div>
             </div>
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl3">
                  <div className="">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                      <div className="row"> 
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label className="row">Property Description</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 descriptionWrap">
                          <div className="row"> 
                            {this.state.pricing && this.state.pricing.description ? this.state.pricing.description : "-"}                             
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row"> 
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label className="row">Key Features</label>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ul className="col-lg-7 col-md-7 col-sm-12 col-xs-12 bolder">   
                              <li className="col-lg-5 noPad">Property Type</li> <span className="col-lg-7 noPad"> : {this.state.propertySubType && this.state.propertySubType ? <b>{this.state.propertySubType} </b> : "-"}</span>
                              <li className="col-lg-5 noPad">Furnished Status</li> <span className="col-lg-7 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.furnishedStatus ? <b>{this.state.propertyFeatures.furnishedStatus} </b> : "-"}</span>
                              {this.state.propertyType === "Commercial" ?
                                  <b>
                                    <li className="col-lg-5 noPad">Washrooms    </li> 
                                    <span className="col-lg-7 noPad"> : <b>{this.state.propertyFeatures && this.state.propertyFeatures ? this.state.propertyFeatures.washrooms : "-"}</b></span>
                                    <li className="col-lg-5 noPad">Personal WC </li> 
                                    <span className="col-lg-7 noPad"> : <b>{ this.state.propertyFeatures && this.state.propertyFeatures ? this.state.propertyFeatures.personal : "-"}</b></span>
                                    <li className="col-lg-5 noPad">Pantry  </li> 
                                    <span className="col-lg-7 noPad"> : <b>{this.state.propertyFeatures && this.state.propertyFeatures.pantry ? this.state.propertyFeatures.pantry : "-"}</b></span>
                                  </b>
                                : 
                                <b>
                                    <li className="col-lg-5 noPad">Bedrooms    </li> 
                                    <span className="col-lg-7 noPad"> : <b>{this.state.propertyFeatures && this.state.propertyFeatures.bedrooms ? this.state.propertyFeatures.bedrooms : "-"}</b></span>
                                    <li className="col-lg-5 noPad">Bathrooms    </li> 
                                    <span className="col-lg-7 noPad"> : <b>{this.state.propertyFeatures && this.state.propertyFeatures.bathrooms ? this.state.propertyFeatures.bathrooms : "-"}</b></span>
                                    <li className="col-lg-5 noPad">Balconies    </li> 
                                    <span className="col-lg-7 noPad"> : <b>{this.state.propertyFeatures && this.state.propertyFeatures.balconies ? this.state.propertyFeatures.balconies : "-"}</b></span>
                                  </b>
                              }
                              <li className="col-lg-5 noPad">Available From  </li> <span className="col-lg-7 noPad"> : {this.state.pricing && this.state.pricing.availableFrom   ? <b>{this.state.pricing.availableFrom}   </b> : "-"}</span>
                            </ul>
                            <ul className="col-lg-5 col-md-5 col-sm-12 col-xs-12 bolder">   
                              <li className="col-lg-6 noPad">Facing          </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.facing          ? <b>{this.state.propertyFeatures.facing}          </b> : "-"}</span>
                              <li className="col-lg-6 noPad">Super Area      </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.superArea       ? <b>{this.state.propertyFeatures.superArea}       </b> : "-"}<b>Sqft</b></span>
                              <li className="col-lg-6 noPad">Built up Area   </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.builtupArea     ? <b>{this.state.propertyFeatures.builtupArea}     </b> : "-"}<b>Sqft</b></span>
                              <li className="col-lg-6 noPad">Floor           </li> <span className="col-lg-6 noPad"> : {this.state.floor ? <b>{this.state.floor}</b> : "-"}</span>
                              <li className="col-lg-6 noPad">Total Floors     </li> <span className="col-lg-6 noPad"> : {this.state.totalFloor ? <b>{this.state.totalFloor}</b> : "-"}</span>
                              <li className="col-lg-6 noPad">Age of Property </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.ageofProperty   ? <b>{this.state.propertyFeatures.ageofProperty === "New" ? "0-1" : this.state.propertyFeatures.ageofProperty} Years  </b> : "-"}</span>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dottedBorder">
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12   ">
                          <div className="row"> 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                              <label className="row">Amenities</label>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "> 
                                      <div className="row">
                                        {this.state.amenities?
                                          this.state.amenities.map((amenity,index)=>{
                                            return(
                                                 <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                   <div className="row">
                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputStyledbtn  ">
                                                        <input type="checkbox" defaultChecked={true} /><b>{amenity}</b>
                                                        <span className="checkBoxBlock"></span>
                                                      </div>
                                                    </div>
                                                </div>
                                              );
                                          })
                                        :
                                        null  
                                        }
                                      </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label className="row">Financials</label>
                              </div>
                              <div className="row"> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="row"> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                     <div className="row">
                                       <ul  className="bolder">
                                          {this.state.pricing && this.state.pricing.totalPrice ?
                                            <b>
                                              <li className="col-lg-5 noPad">Total Ask    </li> 
                                              <span className="col-lg-7 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.convertNumberToRupees(this.state.pricing.totalPrice)}</b></span>
                                            </b>
                                          : 
                                          <b>
                                              <li className="col-lg-5 noPad">Deposit Amount    </li>
                                              <span className="col-lg-7 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.depositAmount}</b></span>
                                            </b>
                                          }

                                          {this.state.pricing && this.state.pricing.expectedRate ?
                                            <b>
                                              <li className="col-lg-5 noPad">Expected Rate    </li> 
                                              <span className="col-lg-7 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.expectedRate}</b> /Sq. ft.</span>
                                            </b>
                                          : 
                                          <b>
                                              <li className="col-lg-5 noPad">Monthly Rent    </li> 
                                              <span className="col-lg-7 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.monthlyRent}</b></span>
                                            </b>
                                          }
                                          {this.state.transactionType == "Rent" && this.state.propertyType =="Commercial" ?
                                          null
                                          :
                                            <div>
                                          <li className="col-lg-5 noPad">Charges Included in Total Ask </li> 
                                          <span className="col-lg-7 noPad"> : 
                                          {this.state.pricing && this.state.pricing.includeCharges     ? 
                                            <b>{
                                            this.state.pricing.includeCharges.map((includeCharges,index)=>{
                                              console.log("index = ",index);
                                                var comma = ", ";
                                                var i = index;
                                                if(index >= (this.state.pricing.includeCharges.length-1) ){
                                                  comma = "";
                                                }
                                                return(
                                                    <b key={i++}>
                                                        {" "+includeCharges+comma}
                                                    </b>                  
                                                  )
                                                })
                                          }  </b> : "-"}
                                          </span>
                                          </div>
                                          }
                                          
                                          
                                          <li className="col-lg-5 noPad">Maintainance Charges</li> <span className="col-lg-7 noPad"> : {this.state.pricing && this.state.pricing.maintenanceCharges ? <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.maintenanceCharges} </b> : "-"}/{this.state.pricing && this.state.pricing.maintenancePer     ? <b>{this.state.pricing.maintenancePer}     </b> : "-"}</span>
                                          {/*<li className="col-lg-3 noPad">Maintainance Per    </li> <span className="col-lg-9 noPad"> : {this.state.pricing && this.state.pricing.maintenancePer     ? <b>{this.state.pricing.maintenancePer}     </b> : "-"}</span>*/}
                                        </ul>
                                    </div>
                                  </div>
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dottedBorder" > 
                          <label className="row">Location</label>
                        </div>
                    <br/>
                    { this.state.propertyLocation ? this.state.propertyLocation.society+", "+this.state.propertyLocation.subArea+", "+this.state.propertyLocation.area+", "+this.state.propertyLocation.city+", "+this.state.propertyLocation.state+", "+this.state.propertyLocation.country+", "+this.state.propertyLocation.pincode : "-"}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                      <div className="row">
                        <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Magarpatta&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>                           
                      </div>
                    </div>              
                    </div>
                  </div>
                </div>
               </div>
            </div>              
          </div>


          {/*=== Modal starts here ===*/}
          <div>
            <div id="postPropertyModal" className="modal fade" role="dialog">
              <div className="modal-dialog modal-lg">
                <div className="modal-content "style={{marginTop:"52px"}}>
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>X</button>
                    <h4 className="modal-title">
                      <b style={{paddingLeft:"28px"}}> {header} </b>
                    </h4>
                  </div>
                  <div className="modal-body col-lg-12">
                      { this.props.LoginMobNum    ? <LoginMobNum />     : null }
                      { this.props.LoginOtp       ? <LoginOtp />        : null }
                      { this.props.WebSignupForm  ? <WebSignupForm />   : null }
                      { this.props.BasicInfo      ? <BasicInfo />       : null }
                      { this.props.PropertyDetails? <PropertyDetails /> : null }
                      { this.props.Financials     ? <Financials />      : null }
                      { this.props.Amenities      ? <Amenities />       : null }
                      { this.props.Availability   ? <Availability />    : null }
                      { this.props.Location       ? <Location />        : null }
                      { this.props.CongratsPage   ? <CongratsPage />    : null }
                      { this.props.ImageUpload    ? <ImageUpload />     : null }
                  </div>
                  <div className="modal-footer">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state)=>{
  // console.log("state",state)
  return {
    LoginMobNum     : state.LoginMobNum,
    LoginOtp        : state.LoginOtp,
    WebSignupForm   : state.WebSignupForm,
    BasicInfo       : state.BasicInfo,
    PropertyDetails : state.PropertyDetails,
    Financials      : state.Financials,
    Amenities       : state.Amenities,
    Availability    : state.Availability,
    Location        : state.Location,
    ImageUpload     : state.ImageUpload,
    CongratsPage    : state.CongratsPage,
    formTitle       : state.formTitle
  }
};


const mapDispatchToProps = (dispatch)=>{
  return {
    setFormTitle  : (formTitle)=> dispatch({
                          type      : "SET_FORM_TITLE",
                          formTitle : formTitle,
                        }),
    login_mobileNum  : (originPage)=>dispatch({type: "LOGIN_MOB_NUM", originPage: originPage}),
    already_loggedIn : (originPage,uid,property_id)=>dispatch({type: "ALREADY_LOGGEDIN", originPage: originPage, uid:uid, property_id:property_id}),

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PropertyProfile));