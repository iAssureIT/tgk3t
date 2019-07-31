import React, { Component }   from 'react';
import axios                  from 'axios';
import HomePageFooter         from '../../blocks/Profile/HomePageFooter.js';
// import RequestForm            from '../../blocks/RequestForm/RequestForm.js';
import { connect }            from 'react-redux';
import $                      from "jquery";


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

import "./PropertyProfile.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

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
      "propertyVideos"    : [],
      "propertyFeatures"  : [],
      "features"          : [],
      "areaInSqFeet"      : [],
      "pricing"           : [],
      "propertyFea"       : [],
      "propertyDescription" : [],
      "propertyLocation"  : [],
      "transactionType"   : "",  
    }
  }

  login(){
    const originPage = "post" ;
    const uid = localStorage.getItem("uid");
    if(uid){
      this.props.already_loggedIn(originPage,uid);
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
    // let i=0;
    // window.location.reload();
    // $(".modal-backdrop").remove();     

    axios
    .get('http://qatgk3tapi.iassureit.com/api/properties/'+this.state.profileId)
    .then(
      (res)=>{
        // console.log(res);
        const postsdata = res.data;
        this.setState({
          propertyFeatures    : postsdata.propertyDetails,
          amenities           : postsdata.Amenities,
          propertyImages      : postsdata.Images,
          propertyVideos      : ['https://youtu.be/vO0FgrPFnjM'],
          pricing             : postsdata.financial,
          propertyLocation    : postsdata.propertyLocation,
          transactionType     : postsdata.transactionType,
        });
        // console.log("postsdata.propertyDetails",res.data);
      }
    )
    .catch();

     $(this).find('input[type="checkbox"]').is(':checked')
  }

  displayImages(){
    return this.state.propertyImages;
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
                <div className="col-lg-12 labalDiv"> 
                    <label>Property Profile</label>
                  </div>     
                </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 propertyName"> 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nameOfProperty noPad" >
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" >
                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 backButton" >
                          <img src="/images/back.png"/>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 row" >
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressOfProperty" >
                            <label className="pull-left"> 
                            {this.state.propertyLocation && this.state.propertyLocation.address ? this.state.propertyLocation.address:"-"}
                            </label> 
                            <div className="col-lg-1 col-md-1 col-sm-3 col-xs-3 text-center forSaleButton">
                              FOR {this.state.transactionType && this.state.transactionType==="Sell" ? "SELL" : "RENT"}
                            </div> 
                            <br/>
                            <div className="col-lg-12"> 
                              <div className="row">
                                <i className="fa fa-map-marker" aria-hidden="true"></i> &nbsp;
                                {this.state.propertyLocation ? this.state.propertyLocation.society+", "+this.state.propertyLocation.area+", "+this.state.propertyLocation.city+", "+this.state.propertyLocation.pincode : "-"}
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 addressOfProperty" >
                        <button className="col-lg-6 pull-right btn btn-primary" data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}> Post New Property </button> 
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imagesOfProperty noPad" >
                    {/*<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad" >
                    {this.state.propertyImages?
                        this.state.propertyVideos.map((video,index)=>{
                        return(
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                              <div className="row">
                                  <video width="385" height="300" controls>
                                        <source src={video} type="video/mp4" />
                                  </video>
                              </div>                    
                            </div>   
                          );
                        })
                         :
                        null
                    }
                    </div>*/}
                    {this.displayImages() && this.displayImages().length >0 ?
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
                          >
                          {
                            this.displayImages().map((propertyImages,index)=>{
                            return(
                                  <div key={index}  >
                                      <img className="item" src={propertyImages} />
                                  </div>                    
                              )
                            })
                          }
                      </OwlCarousel> 
                      :
                      null
                      }   
                  </div>
                </div>
             </div>
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                          <div className="row"> 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <label className="row">Property Description</label>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="row"> 
                                {this.state.pricing && this.state.pricing.description ? this.state.pricing.description : "-"}                             
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label className="row">Key Features</label>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <ul className="col-lg-6 col-md-6 col-sm-12 col-xs-12 bolder">   
                                  <li className="col-lg-6 noPad">Furnished Status</li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.furnishedStatus ? <b>{this.state.propertyFeatures.furnishedStatus} </b> : "-"}</span>
                                  <li className="col-lg-6 noPad">Bedrooms        </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.bedrooms        ? <b>{this.state.propertyFeatures.bedrooms}        </b> : "-"}</span>
                                  <li className="col-lg-6 noPad">Balconies       </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.balconies       ? <b>{this.state.propertyFeatures.balconies}       </b> : "-"}</span>
                                  <li className="col-lg-6 noPad">Bathrooms       </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.bathrooms       ? <b>{this.state.propertyFeatures.bathrooms}       </b> : "-"}</span>
                                  <li className="col-lg-6 noPad">Age of Property </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.ageofProperty   ? <b>{this.state.propertyFeatures.ageofProperty}   </b> : "-"}</span>
                                </ul>
                                <ul className="col-lg-6 col-md-6 col-sm-12 col-xs-12 bolder">   
                                  <li className="col-lg-6 noPad">Facing          </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.facing          ? <b>{this.state.propertyFeatures.facing}          </b> : "-"}</span>
                                  <li className="col-lg-6 noPad">Super Area      </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.superArea       ? <b>{this.state.propertyFeatures.superArea}       </b> : "-"}<b>Sqft</b></span>
                                  <li className="col-lg-6 noPad">Built up Area   </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.builtupArea     ? <b>{this.state.propertyFeatures.builtupArea}     </b> : "-"}<b>Sqft</b></span>
                                  <li className="col-lg-6 noPad">Available From  </li> <span className="col-lg-6 noPad"> : {this.state.propertyFeatures && this.state.propertyFeatures.availableFrom   ? <b>{this.state.propertyFeatures.availableFrom}   </b> : "-"}</span>
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
                                                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer  ">
                                                        <input type="checkbox" defaultChecked={true} />
                                                        <span className="centreDetailCheck"></span>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">    
                                                        {amenity}        
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
                                          <li className="col-lg-6 noPad">Include Charges     </li> <span className="col-lg-6 noPad"> : {this.state.pricing && this.state.pricing.includeCharges     ? <b>{this.state.pricing.includeCharges[0]}  </b> : "-"}</span>
                                          <li className="col-lg-6 noPad">Expected Rate       </li> <span className="col-lg-6 noPad"> : {this.state.pricing && this.state.pricing.expectedRate       ? <b>{this.state.pricing.expectedRate}       </b> : "-"}</span>
                                          <li className="col-lg-6 noPad">Total Price         </li> <span className="col-lg-6 noPad"> : {this.state.pricing && this.state.pricing.totalPrice         ? <b>{this.state.pricing.totalPrice}         </b> : "-"}</span>
                                          <li className="col-lg-6 noPad">Maintainance Charges</li> <span className="col-lg-6 noPad"> : {this.state.pricing && this.state.pricing.maintenanceCharges ? <b>{this.state.pricing.maintenanceCharges} </b> : "-"}</span>
                                          <li className="col-lg-6 noPad">Maintainance Per    </li> <span className="col-lg-6 noPad"> : {this.state.pricing && this.state.pricing.maintenancePer     ? <b>{this.state.pricing.maintenancePer}     </b> : "-"}</span>
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
                        { this.state.propertyLocation ? this.state.propertyLocation.society+", "+this.state.propertyLocation.area+", "+this.state.propertyLocation.city+", "+this.state.propertyLocation.state+", "+this.state.propertyLocation.country+", "+this.state.propertyLocation.pincode : "-"}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                      <div className="row">
                        <div className="mapouter"><div className="gmap_canvas"><iframe width="1200" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>                           
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
    already_loggedIn : (originPage,uid)=>dispatch({type: "ALREADY_LOGGEDIN", originPage: originPage, uid:uid}),

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PropertyProfile);