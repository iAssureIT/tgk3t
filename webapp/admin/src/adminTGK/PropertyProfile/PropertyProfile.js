import React, { Component }   from 'react';
import axios                  from 'axios';
import $                      from "jquery";
import swal                            from 'sweetalert';
import Loadable               from 'react-loadable';

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
      convertTotalPrice   : "",
    }
  }

  login(){
    const originPage = "post" ;
    const uid = localStorage.getItem("uid");
    const prop_id  = this.state.prop_id;
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
        console.log(res);
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
                             this.props.history.push("/login");
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


  render() {
      return (
        <div className="container-fluid ">
          <div className="row"> 
          </div>  
          <div className="">
            <div className="formWrapper row">   
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
                <div className="row">
                <div className="col-lg-12 labalDiv"> 
                    <label>Property Profile</label>
                  </div>     
                </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 propertyName"> 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nameOfProperty noPad" >
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 backButton">
                          <img src="/images/back.png"/>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 row" >
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressOfProperty" >
                           {/* <label className="pull-left"> 
                            {this.state.propertyLocation && this.state.propertyLocation.address ? this.state.propertyLocation.address:"-"}
                            </label> */}
                            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 text-center forSaleButton">
                              FOR {this.state.transactionType && this.state.transactionType==="Sell" ? "SALE" : "RENT"}
                            </div> 
                            <br/>
                            <div className="col-lg-12"> 
                              <div className="row">
                                <i className="fa fa-map-marker" aria-hidden="true"></i> &nbsp;
                                {this.state.propertyLocation ? this.state.propertyLocation.society+", "+this.state.propertyLocation.subArea+", "+this.state.propertyLocation.area+", "+this.state.propertyLocation.city+", "+this.state.propertyLocation.pincode : "-"}
                              </div>
                            </div>
                        </div>
                      </div>
                      {/*<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 addressOfProperty" >
                        <button className="col-lg-6 pull-right btn btn-primary" data-toggle="modal" data-target="#postPropertyModal" onClick={this.login.bind(this)}> Edit Property </button> 
                      </div>*/}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {
                    this.state.propertyImages && this.state.propertyImages.length < 2 ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad imagesOfProperty">
                      {console.log("this.state.propertyVideo",this.state.propertyVideo)}
                          {
                            this.state.propertyVideo ?
                            <video width="100%" height="100%" className="video" controls>
                                <source src={this.state.propertyVideo} type="video/mp4" className="col-lg-12 noPad"/>
                            </video>
                            :
                            <img src="/images/videoDummy.jpg" className="col-lg-12 noPad"/>
                          }
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad imagesOfProperty" >
                          {this.state.propertyImages[0] ?
                            <img className="noPad propertyImageDiv col-lg-12 noPad" src={this.state.propertyImages[0].imgPath} />
                            :
                            <img src="/images/loading_img.jpg" className="col-lg-12 noPad"/>
                          }
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPad imagesOfProperty">
                            {this.state.propertyImages[1] ?
                            <img className="noPad propertyImageDiv col-lg-12 noPad" src={this.state.propertyImages[1].imgPath} />
                            :
                            <img src="/images/loading_img.jpg" className="col-lg-12 noPad" />
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
                          >
                          {
                            this.state.propertyImages ? 
                            this.state.propertyImages.map((propertyImages,index)=>{
                            return(

                                  <div key={index}  >
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
                            <img src="/images/videoDummy.jpg" className="col-lg-12 noPad"/>
                          }
                      </OwlCarousel>  
                    </div>
                    :
                    null
                  } 
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
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 descriptionWrap">
                              <div className="row"> 
                                {this.state.pricing && this.state.pricing.description ? this.state.pricing.description : "-"}                             
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 noPad">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
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
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 noPad">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
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
                                          <li className="col-lg-4 noPad">Include Charges</li> 
                                          <span className="col-lg-8 noPad"> : 
                                          {this.state.pricing && this.state.pricing.includeCharges     ? 
                                            <b>{
                                            this.state.pricing.includeCharges.map((includeCharges,index)=>{
                                              console.log("index = ",index);
                                                var comma = ", ";
                                                var i = index;
                                                if(index >= (this.state.pricing.includeCharges.length-1) ){
                                                  comma = "";
                                                }

                                              console.log("comma = ",comma);
                                                return(
                                                    <b key={i++}>
                                                        {" "+includeCharges+comma}
                                                    </b>                  
                                                  )
                                                })
                                          }  </b> : "-"}
                                          </span>
                                          {this.state.pricing && this.state.pricing.expectedRate ?
                                            <b>
                                              <li className="col-lg-4 noPad">Expected Rate    </li> 
                                              <span className="col-lg-8 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.expectedRate}</b> /Sq. ft.</span>
                                            </b>
                                          : 
                                          <b>
                                              <li className="col-lg-4 noPad">Monthly Rent    </li> 
                                              <span className="col-lg-8 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.monthlyRent}</b></span>
                                            </b>
                                          }
                                          {this.state.pricing && this.state.pricing.totalPrice ?
                                            <b>
                                              <li className="col-lg-4 noPad">Total Price    </li> 
                                              <span className="col-lg-8 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.convertNumberToRupees(this.state.pricing.totalPrice)}</b></span>
                                            </b>
                                          : 
                                          <b>
                                              <li className="col-lg-4 noPad">Deposit Amount    </li>
                                              <span className="col-lg-8 noPad"> : <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.depositAmount}</b></span>
                                            </b>
                                          }
                                          <li className="col-lg-4 noPad">Maintainance Charges</li> <span className="col-lg-8 noPad"> : {this.state.pricing && this.state.pricing.maintenanceCharges ? <b><i className="fa fa-inr pr8" aria-hidden="true"></i>{this.state.pricing.maintenanceCharges} </b> : "-"}</span>
                                          <li className="col-lg-4 noPad">Maintainance Per    </li> <span className="col-lg-8 noPad"> : {this.state.pricing && this.state.pricing.maintenancePer     ? <b>{this.state.pricing.maintenancePer}     </b> : "-"}</span>
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
        </div>
      );
    }
  }


export default PropertyProfile;