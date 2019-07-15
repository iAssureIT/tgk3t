import React, { Component }   from 'react';

import "./HomePageFooter.css";


class HomePageFooter extends Component{
  
  constructor(props){
    super(props);
   
    this.state = {
       "ownerNumber"        : "+91 99221 34567",
      "propertyAddress"     : "Magerpatta City,Hadapsar Pune, Maharastra 411028.",
    
    }
  }
  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {
   
  }

  render() {
     
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerDiv" >
              <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 footerContent" >
               <div className="col-lg-2 col-md-10 col-sm-10 col-xs-10 footerImgContainer" >
                  <img src="/images/Logo.png" />
                </div>
                <div className="col-lg-3 col-md-10 col-sm-10 col-xs-10 footerContactDetails" >
                  <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row "> Contact Details </label>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt5 row" >
                  <i className="fa fa-mobile" aria-hidden="true"></i> Phone : {this.state.ownerNumber}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt5 row" >
                    <i className="fa fa-map-marker" aria-hidden="true"></i> Address : {this.state.propertyAddress}
                  </div>
                </div>
                <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 footerContactDetails" >
                  <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12  "> Connect </label>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt5">

                      <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13 ">
                        <div className="row">
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                          <a href="https://www.facebook.com/">  <i className="fa fa-facebook-f"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13">
                       <div className="row">
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                            <a href="https://twitter.com/login?lang=en"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                          </div>
                        </div>
                      </div> 
                      <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13">
                        <div className="row">
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                            <a href="https://www.linkedin.com/uas/login"><i className="fa fa-linkedin"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13 ">
                        <div className="row">
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                            <a href="https://www.instagram.com/?hl=en"><i className="fa fa-instagram"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 ">
                        <div className="row">
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                            <a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

           </div>
          <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 bottomDivFooter" >
            <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 " >

              <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10" >
                <label>Copyright <i class="fa fa-copyright"></i> 2019 THE GOLDEN KEY. All rights reserved.</label>
              </div>
               <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 rightDiv" >
                <label className="pull-right">Site Map</label>
                <label className="pull-right">Terms of Use</label>
                <label className="pull-right">Privacy Policy</label>
              </div>
            </div>
          </div>
           </div>
      </div>
      
    );
  }
}
export default HomePageFooter