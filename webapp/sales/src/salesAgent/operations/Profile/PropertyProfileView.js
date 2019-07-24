import React, { Component }   from 'react';
import axios                  from 'axios';
import $                      from 'jquery';
import Loadable               from 'react-loadable';
import AllocateToAgent       from './allocateFieldAgent/allocateFieldAgent.js'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import HomePageFooter         from './HomePageFooter.js';
// import RequestForm            from '../RequestForm/RequestForm.js';

import "./PropertyProfileView.css";


const OwlCarousel = Loadable({
   
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading"/></div>
  }
});


axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class PropertyProfileView extends Component{
  
  constructor(props){
    super(props);
   var profileId = this.props.match.params.id;
     console.log("contactId contactId",profileId);
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
    }
  }
  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {
    axios
    .get('http://qatgk3tapi.iassureit.com/api/properties/'+this.state.profileId)
    .then(
      (res)=>{
        console.log(res);
        const postsdata = res.data;
        this.setState({
          propertyFeatures    : postsdata.propertyDetails,
          amenities           : postsdata.Amenities,
          propertyImages      : ['/images/profileImg2.jpg','/images/profileImg2.jpg'],
          propertyVideos      : ['https://youtu.be/vO0FgrPFnjM'],
          pricing             : postsdata.financial,
          propertyLocation    : postsdata.propertyLocation,
        });
        console.log("postsdata.propertyDetails",res.data);
      }
    )
    .catch();

     $(this).find('input[type="checkbox"]').is(':checked')
  }


  render() {
    return (
      <div className="container-fluid row">
        <div className="row">
          <div className="formWrapper row">   
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"  >
              <div className="row">
              <div className="col-lg-12 labalDiv"> 
                  <label>Property Profile</label>
                </div>     
              </div>
             <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 propertyName"> 
                <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8 nameOfProperty" >
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2" >
                      <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 backButton" >
                        <img src="/images/back.png"/>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 row" >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressOfProperty" >
                            <label className="pull-left"> 
                            {this.state.propertyLocation && this.state.propertyLocation.address ? this.state.propertyLocation.address:"-"}
                            </label> 
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center forSaleButton pull-right">
                          FOR SALE
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
                  </div>
                </div>
              </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 " >
                  <div className="row">
                    <AllocateToAgent />
                  </div>
                </div>
              <div className="">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imagesOfProperty pull-right" >
                  <div className=" ">
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
                          this.state.propertyImages.map((propertyImages,index)=>{
                          return(
                              <div className="row" >
                                <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgDiv1" >
                                    <img src={propertyImages} />
                                </div>                    
                              </div>
                            )
                          })
                        }
                        {
                          this.state.propertyVideos.map((propertyVideos,index)=>{
                          return(
                            <div className="row">
                              <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgDiv1" >
                                <video width="470" height="275" controls>
                                  <source src={propertyVideos} type="video/ogg"/>
                                </video>
                              </div>                    
                          </div>
                            )
                          })
                        }
                    </OwlCarousel> 
                  </div>
                </div>
              </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12   ">
                        <div className="row"> 
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label className="row">Property Description</label>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="row"> 
                              {this.state.propertyFeatures && this.state.propertyFeatures.description?  this.state.propertyFeatures.description : "-"}                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <label className="row">Key Features</label>
                            </div>
                            <div className="row"> 
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="row"> 
                                  <table className="col-lg-12">
                                    <ul  className="bolder">
                                      <tr><td><li>Furnished Status</li></td> : <td>{this.state.propertyFeatures.furnishedStatus ? <b>{this.state.propertyFeatures.furnishedStatus} </b> :"-" }</td></tr>
                                      <tr><td><li>Bedrooms        </li></td> : <td>{this.state.propertyFeatures.bedrooms        ? <b>{this.state.propertyFeatures.bedrooms}        </b> : "-"}</td></tr>
                                      <tr><td><li>Balconies       </li></td> : <td>{this.state.propertyFeatures.balconies       ? <b>{this.state.propertyFeatures.balconies}       </b> : "-"}</td></tr>
                                      <tr><td><li>Bathrooms       </li></td> : <td>{this.state.propertyFeatures.bathrooms       ? <b>{this.state.propertyFeatures.bathrooms}       </b> : "-"}</td></tr>
                                      <tr><td><li>Age of Property </li></td> : <td>{this.state.propertyFeatures.ageofProperty   ? <b>{this.state.propertyFeatures.ageofProperty}   </b> : "-"}</td></tr>
                                      <tr><td><li>Facing          </li></td> : <td>{this.state.propertyFeatures.facing          ? <b>{this.state.propertyFeatures.facing}          </b> : "-"}</td></tr>
                                      <tr><td><li>Super Area      </li></td> : <td>{this.state.propertyFeatures.superArea       ? <b>{this.state.propertyFeatures.superArea}       </b> : "-"}<b>Sqft</b></td></tr>
                                      <tr><td><li>Built up Area  </li></td>  : <td>{this.state.propertyFeatures.builtupArea     ? <b>{this.state.propertyFeatures.builtupArea}     </b> : "-"}<b>Sqft</b></td></tr>
                                      <tr><td><li>Available From  </li></td> : <td>{this.state.propertyFeatures.availableFrom   ? <b>{this.state.propertyFeatures.availableFrom}   </b> : "-"}</td></tr>
                                    </ul> 
                                  </table>
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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dottedBorder">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12   ">
                        <div className="row"> 
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <label className="row">Amenities</label>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                              <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "> 
                                    <div className="row">
                                      {
                                        this.state.amenities.map((amenity,index)=>{
                                          return(
                                               <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                 <div className="row">
                                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer  ">
                                                      <input type="checkbox" checked="true" />
                                                      <span className="centreDetailCheck"></span>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">    
                                                      {amenity}        
                                                  </div>
                                            </div>
                                            );
                                        })
                                      }
                                    </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                                    {
                                    <table>
                                      <tbody>
                                        <tr><td><li>Include Charges      </li></td> : <td>{this.state.pricing.includeCharges       ? <b>{this.state.pricing.includeCharges[0]}       </b> :"-" }</td></tr>
                                        <tr><td><li>Expected Rate        </li></td> : <td>{this.state.pricing.expectedRate       ? <b>{this.state.pricing.expectedRate}       </b> :"-" }</td></tr>
                                        <tr><td><li>Total Price          </li></td> : <td>{this.state.pricing.totalPrice         ? <b>{this.state.pricing.totalPrice}         </b> : "-"}</td></tr>
                                        <tr><td><li>Maintainance Charges </li></td> : <td>{this.state.pricing.maintenanceCharges ? <b>{this.state.pricing.maintenanceCharges} </b> : "-"}</td></tr>
                                        <tr><td><li>Maintainance Per     </li></td> : <td>{this.state.pricing.maintenancePer ? <b>{this.state.pricing.maintenancePer}     </b> : "-"}</td></tr>
                                      </tbody>
                                     </table> 
                                    }
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
      {/*<------------Add To Field Agent Modal ----------> */}
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
              </div>
              <div class="modal-body">
                <p>Some text in the modal.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default PropertyProfileView