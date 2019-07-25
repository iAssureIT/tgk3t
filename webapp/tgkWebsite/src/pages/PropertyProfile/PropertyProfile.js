import React, { Component }   from 'react';
import axios                  from 'axios';
import HomePageFooter         from '../../blocks/Profile/HomePageFooter.js';
// import RequestForm            from '../../blocks/RequestForm/RequestForm.js';
import { connect }            from 'react-redux';
import $                      from "jquery";

import BasicInfo              from '../../blocks/PostProperty/BasicInfo/BasicInfo.js';
import Location               from '../../blocks/PostProperty/Location/Location.js';
import PropertyDetails        from '../../blocks/PostProperty/PropertyDetails/PropertyDetails.js';
import Amenities              from '../../blocks/PostProperty/Amenities/Amenities.js';
import Financials             from '../../blocks/PostProperty/Financials/Financials.js';
import Availability           from '../../blocks/PostProperty/Availability/Availability.js';
import CongratsPage           from '../../blocks/PostProperty/CongratsPage/CongratsPage.js';
import ImageUpload            from '../../blocks/PostProperty/ImageUpload/ImageUpload.js';

import "./PropertyProfile.css";



axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class PropertyProfile extends Component{
  
  constructor(props){
    super(props);
    
    this.props.showFirstForm();  //for dispatch

    this.state = {
      "nameOfProperty"    : "Park Avenue Apartment",
      "addressOfProperty" : "Magerpatta City, Hadapsar, Pune 411028",
      "checkValue"        : "Gas Pipeline",
      "reviewCount"       : "3375 ",
      "propertyID"        : "Pro100992",
      "bedSpecification"  : "",
      "bathSpecification" : "",
      "areaInSq"          : "7711",
      "priceOfProperty"   : "$11200",
      "typeOfProperty"    : "", 
      "nearBy"            : ["University","School"],
      "propertyList"      : ["ESCADA APARTMENTS","1105th Avenue","6210 Camino La Costa"],
      "monthlyPlan"       : "",
      "ownerNumber"       : "+91 99221 34567",
      "propertyAddress"   : "Magerpatta City,Hadapsar Pune, Maharastra 411028.",
      // "countryCode" : "+91 ", // Intilize Here By default
    
    }
  }

  removeBackdrop(){
    $(".modal-backdrop").remove();    
  }

  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {
    axios
    .get('http://qatgk3tapi.iassureit.com/api/properties/list')
    .then(
      (res)=>{
        console.log(res);
        const postsdata = res.data;
        /*this.setState({
          PropertyDetails : postsdata,
        });*/
    console.log("PropertyDetails",postsdata);   
      }
    )
    .catch();
    this.props.setFormTitle("Let's Provide Details of Your Property for sell");

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
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper ">   
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 header">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 logoImgContainer">
                        <img alt=""  src="/images/Logo.png" />
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right ">
                      <nav className="navbar  navText mt10 ">
                          <ul className="nav navbar-nav ">
                              <li className="active showActive"><a href="#Home">HOME</a></li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="/tempUrl">ABOUT US&nbsp;<i className="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                  <li><a href="/tempUrl">Page 1-1</a></li>
                                  <li><a href="/tempUrl">Page 1-2</a></li>
                                  <li><a href="/tempUrl">Page 1-3</a></li>
                                </ul>
                              </li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="/tempUrl">CONTACT US&nbsp;<i className="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                  <li><a href="/tempUrl">Page 1-1</a></li>
                                  <li><a href="/tempUrl">Page 1-2</a></li>
                                  <li><a href="/tempUrl">Page 1-3</a></li>
                                </ul>
                              </li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="/tempUrl">MY PROFILE&nbsp;<i className="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                  <li><a href="/tempUrl">Page 1-1</a></li>
                                  <li><a href="/tempUrl">Page 1-2</a></li>
                                  <li><a href="/tempUrl">Page 1-3</a></li>
                                </ul>
                              </li>
                          </ul>
                      </nav>
              </div>

                </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 labalDiv"> 
                    <label>Property Profile</label>
                </div>     

              </div>
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 propertyName">
                
                <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8 nameOfProperty" >
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 " >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backButton" >
                        <img alt=""  src="/images/back.png"/>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 row" >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressOfProperty" >
                        <label className="pull-left"> {this.state.nameOfProperty ? this.state.nameOfProperty : "Name of Property"}</label> 
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2  forSaleButton">
                          FOR SALE
                        </div> 
                       
                        <br/>
                       <div className="col-lg-12"> 
                        <div className="row">
                         <i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.addressOfProperty ? this.state.addressOfProperty : "Address of Property" }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-lg-3 addressOfProperty"> 
                  <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#postPropertyModal"> Post New Property </button> 
                </div>


              </div>
              
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imagesOfProperty" >
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imgDiv1" >
                      <div className="row">
                        <iframe width="428"  title="Property Video" height="300" src="https://www.youtube.com/embed/9IC4dyn5Wpk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe></div>                    
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imgDiv1" >
                      <div className="row">
                        <img alt=""  src="/images/profileImg2.jpg" />
                      </div>                    
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imgDiv1" >
                      <div className="row">
                        <img alt=""  src="/images/profileImg3.jpg" />
                      </div>                    
                    </div>
                  </div>
                </div>
              </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40  " >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mainDescriptionDiv ">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12   ">
                      <div className="row"> 
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  headingProp">
                          <label className="row">Property Description</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  color33 ">
                          <div className="row"> 
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12   ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "> 
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headingProp  ">
                          <label className="row">Property Features</label>
                        </div>
                      <div className="row"> 

                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 row  ">
                          <div className="row"> 
                            <ul  className="bolder">
                              <li>Residencial Property for Sale</li>
                              <li>Residencial Property for Sale</li>
                              <li>Residencial Property for Sale</li>
                              <li>Residencial Property for Sale</li>
                              <li>Residencial Property for Sale</li>
                              <li>Residencial Property for Sale</li>
                              <li>Residencial Property for Sale</li>
                            </ul> 
                          </div>
                        </div>
                         <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 row  ">
                          <div className="row"> 
                            <ul  className="bolder">
                              <li>Feature 1</li>
                              <li>Feature 2</li>
                              <li>Feature 3</li>
                              <li>Feature 4</li>
                              <li>Feature 5</li>
                              <li>Feature 6</li>
                             
                            </ul> 
                          </div>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  row">
                          <div className="row"> 
                            
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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12   " >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 fontR  ">
                      <div className="row"> 
                         <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8 " >
                          <div className="row">
                            <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10   " >
                                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headingProp">
                                    <div className="row">
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                          <label className="">Amenities Pricing</label>
                                        </div> 
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 "> 
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer  ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                           {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 "> 
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer  ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                           {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <div className="row">
                                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt10 ">
                                                <input type="checkbox" />
                                                <span className="centreDetailCheck"></span>
                                              </div>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 checkText  ">
                                              {this.state.checkValue}
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
                 <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  fontR mt20 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "> 
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headingProp  ">
                          <label className="row">Pricing</label>
                        </div>
                      <div className="row"> 

                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 row  ">
                          <div className="row"> 
                            <ul className="bolder">
                              <li>Super Area   : 3000 Sq.Ft.</li>
                              <li>Built &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : 2500 Sq.Ft.</li>
                              <li>Built &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : 2500 Sq.Ft.</li>
                              <li>Built &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : 2500 Sq.Ft.</li>
                              <li>Built &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : 2500 Sq.Ft.</li>
                              <li>Built &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : 2500 Sq.Ft.</li>
                              
                              
                            </ul> 
                          </div>
                        </div>
                         <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 row  ">
                          <div className="row"> 
                            <ul  className="bolder">
                              <li>Pricing 1</li>
                              <li>Pricing 2</li>
                              <li>Pricing 3</li>
                              <li>Pricing 4</li>
                              <li>Pricing 5</li>
                              <li>Pricing 6</li>
                             
                            </ul> 
                          </div>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  row">
                          <div className="row"> 
                            
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12   ht700" >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12   " >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 dottedBorder LocationDiv fontR headingProp " >
                <label>Location</label>
                <br/>
                Park Avenue Apartment,Magerpatta City,Hadapsar,Pune 411028
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                  <div className="row">
                 <div className="mapouter"><div className="gmap_canvas"><iframe width="1200" height="500" id="gmap_canvas"  title="Google Map" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>                           
                </div>
                </div>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12   " >
              <div className="row">
              <HomePageFooter />
              </div>
            </div>
            </div>
           </div>
          </div>              
        </div>




      {/*=== Modal starts here ===*/}
        <div id="postPropertyModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>&times;</button>
                <h4 className="modal-title">
                  {/**/}
                  {/*<b> {this.props.formTitle} </b>*/}
                  <b>  {header} </b>
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
                {/*<button type="button" className="btn btn-primary" data-dismiss="modal">Next</button>*/}
              </div>

            </div>

          </div>
        </div>
      </div>
    );
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
    formTitle        : state.formTitle

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

export default connect(mapStateToProps,mapDispatchToProps)(PropertyProfile);