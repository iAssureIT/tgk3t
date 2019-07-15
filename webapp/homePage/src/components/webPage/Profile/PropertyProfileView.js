import React, { Component }   from 'react';
import axios                  from 'axios';
import HomePageFooter         from './HomePageFooter.js';
import RequestForm            from '../RequestForm/RequestForm.js';

import "./PropertyProfileView.css";

axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class PropertyProfileView extends Component{
  
  constructor(props){
    super(props);
   
    this.state = {
      "nameOfProperty"    : "Park Avenue Apartment",
      "addressOfProperty" : "Magerpatta City, Hadapsar, Pune.",
      "checkValue"        : "Country : India",
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
  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {
    axios
    .get('http://qatgk3tapi.iassureit.com/api/sellResident/list')
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
  }

  render() {
     
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper ">   
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 header">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 logoImgContainer">
                        <img src="/images/Logo.png" />
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right ">
                      <nav className="navbar  navText mt10 ">
                          <ul className="nav navbar-nav ">
                              <li className="active showActive"><a href="#">HOME</a></li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">ABOUT US&nbsp;<i class="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                  <li><a href="#">Page 1-1</a></li>
                                  <li><a href="#">Page 1-2</a></li>
                                  <li><a href="#">Page 1-3</a></li>
                                </ul>
                              </li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">CONTACT US&nbsp;<i class="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                  <li><a href="#">Page 1-1</a></li>
                                  <li><a href="#">Page 1-2</a></li>
                                  <li><a href="#">Page 1-3</a></li>
                                </ul>
                              </li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">MY PROFILE&nbsp;<i class="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                  <li><a href="#">Page 1-1</a></li>
                                  <li><a href="#">Page 1-2</a></li>
                                  <li><a href="#">Page 1-3</a></li>
                                </ul>
                              </li>
                          </ul>
                      </nav>
              </div>
                </div>
                </div>
              </div>
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 propertyName">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 " >
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 nameOfProperty" >
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 " >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backButton" >
                        <img src="/images/back.png"/>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressOfProperty" >
                        <label> {this.state.nameOfProperty ? this.state.nameOfProperty : "Name of Property"}</label> 
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2  forSaleButton pull-right">
                          FOR SALE
                        </div>
                        <br/>
                        <i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.addressOfProperty ? this.state.addressOfProperty : "Address of Property" }
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imagesOfProperty" >
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imgDiv1" >
                      <div className="row">
                        <iframe width="428" height="300" src="https://www.youtube.com/embed/9IC4dyn5Wpk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                      </div>                    
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imgDiv1" >
                      <div className="row">
                        <img src="/images/profileImg2.jpg" />
                      </div>                    
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imgDiv1" >
                      <div className="row">
                        <img src="/images/profileImg3.jpg" />
                      </div>                    
                    </div>
                  </div>
                </div>
              </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 height2000" >
              <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 " >
              </div>
              <div className="col-lg-10 col-md-8 col-sm-8 col-xs-8 propertyFeaturesContainer" >
                <div className="row">
                  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-10 col-xs-10 propertyFeatures height2983 " >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headingPropertyFeatures">
                            <label> Property Features </label>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headingPropertyFeatures fwNormal">
                            <label> Bed </label><div className="pull-right">{this.state.bedSpecification}</div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 subHeadingPropertyFeatures fwNormal">
                            <label> Bath </label><div className="pull-right">{this.state.bathSpecification}</div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 subHeadingPropertyFeatures fwNormal">
                            <label> Sq Ft </label><div className="pull-right">{this.state.areaInSq}Sq.Ft.</div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 subHeadingPropertyFeatures fwNormal">
                            <label> Price  </label><div className="pull-right">{this.state.priceOfProperty}</div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 subHeadingPropertyFeatures fwNormal">
                            <label> Type </label><div className="pull-right">{this.state.typeOfProperty}</div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 subHeadingPropertyFeatures noBorder fwNormal">
                            <label> Property ID </label><div className="pull-right">{this.state.propertyID}</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 menuContainer ">
                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 rightMargin"><i className="fa fa-th-large"></i> </div>
                              <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12  ">
                                  <ul className="menuList">
                                    <li>Features</li>
                                    <li>Video</li>
                                    <li>Nearby</li>
                                    <li>Location</li>
                                    <li>Contact</li>
                                  </ul>
                              </div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 descrpDiv ">
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
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mt20  "> 
                              <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                 <div className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt20 ">
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

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                 <div className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt20 ">
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
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mt20  "> 
                              <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                 <div className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt20 ">
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

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                 <div className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 centreDetailContainer mt20 ">
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
                     
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  vedioDiv ">
                            <div className="row">
                              <label> Location </label>

                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  videoContainer mt20">
                            <div className="row">
{/*                              <div className="mapouter"><div className="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>                           
*/}                              </div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  inputBoxContainer ">
                            <div className="row">
                              <div className="col-lg-9 col-sm-12 col-xs-12" >
                               <input type="text" className="form-control" ref="direction"  placeholder="Enter your starting address"/>
                              </div>
                              <div className="col-lg-3 col-sm-12 col-xs-12  " >
                                <button className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 getDirection">Get Directions</button>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  calYear">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                                <i className="fa fa-calendar" aria-hidden="true"></i><label className="pull-right">3 Years Ago</label>
                              </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                            <div className="row">
                           <RequestForm />
                           </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
           <div className="row">
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                <HomePageFooter />
             </div>
          </div>
       
          </div>              
        </div>
      </div>
    );
  }
}
export default PropertyProfileView