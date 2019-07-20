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
               <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 footerContactUs" >
                <label>Contact Us</label>              
                </div>
                 <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 footerContactUs" >
                  <div className="row" >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20" >
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20" >
                          <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Name" value="" ref="direction" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                          <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Email" value="" ref="direction" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                          <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Phone" value="" ref="direction" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 boarderR " >
                          <div className="">
                            <textarea rows="5" cols="71"  placeholder="Message"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 " >
                    <div className="col-lg-9 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                       <button className="col-lg-3  col-md-12 col-sm-12 col-xs-12 sendButton pull-right">SEND</button>
                      </div>
                    </div>
                  </div>
                  </div>                       
                </div>
                <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 footerContactUs" >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ml20 " >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                      <div className="row">
                        <div className="col-lg-2 col-md-10 col-sm-10 col-xs-10 footerImgContainer" >
                          <img src="/images/Logo.png" />
                        </div>
                          <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails mt40" >
                            <i class="fa fa-mobile fontMobile" aria-hidden="true"></i>&nbsp;   Phone 1 : +91 9999778745

                          </div><div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails" >
                            <i class="fa fa-mobile fontMobile" aria-hidden="true"></i>&nbsp;   Phone 2 : +91 9999778745

                          </div><div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails" >
                            <i class="fa fa-envelope"></i>&nbsp; Email&nbsp; &nbsp;    :  info@tgk.com

                          </div><div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails" >
                            <i class="fa fa-globe" aria-hidden="true"></i>&nbsp;  Website   : www.tgk.com

                          </div>
                          <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 footerContactDetails mt50" >
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt5">

                                <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13 ">
                                  <div className="row">
                                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                                    <a href="https://www.facebook.com/">  <i className="fa fa-facebook-f"></i></a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13">
                                 <div className="row">
                                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                                      <a href="https://twitter.com/login?lang=en"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                    </div>
                                  </div>
                                </div> 
                                <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13">
                                  <div className="row">
                                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                                      <a href="https://www.linkedin.com/uas/login"><i className="fa fa-linkedin"></i></a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13 ">
                                  <div className="row">
                                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                                      <a href="https://www.instagram.com/?hl=en"><i className="fa fa-instagram"></i></a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 ">
                                  <div className="row">
                                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 footerScocial  ">
                                      <a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a>
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
          <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 bottomDivFooter" >
            <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 " >

              <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 " >
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