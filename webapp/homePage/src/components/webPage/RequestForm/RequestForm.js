import React, { Component }   from 'react';

import "./RequestForm.css";


class RequestForm extends Component{
  
  constructor(props){
    super(props);
   
    this.state = {
    
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
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColor " >
            <div className="row" >
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 textCenter mt20" >
                <div className="row">
                  John doe  
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer">
                     <div className="col-lg-10 col-lg-offset-1 col col-md-12 col-sm-12 col-xs-12 profileImage">
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                     <div className="  ">
                        <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12  mt20">
                            <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12 bottomBorder ">
                              <div className="row">
                                <div className="col-lg-2  col col-md-12 col-sm-12 col-xs-12 row">
                                  <i className="fa fa-phone" aria-hidden="true"></i>
                                  </div>

                                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 pull-right row">
                                  <label className="pull-right">(619)555-9785</label>
                                  </div>
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                     <div className="  ">
                        <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12  mt20">
                            <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12 bottomBorder ">
                              <div className="row">
                                <div className="col-lg-2  col col-md-12 col-sm-12 col-xs-12 row">
                                  <i className="fa fa-mobile" aria-hidden="true"></i>
                                  </div>

                                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 pull-right row">
                                  <label className="pull-right">(619)555-9785</label>
                                  </div>
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                     <div className="  ">
                        <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12  mt20">
                            <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12 bottomBorder ">
                              <div className="row">
                                <div className="col-lg-2  col col-md-12 col-sm-12 col-xs-12 row">
                                  <i className="fa fa-print" aria-hidden="true"></i>
                                  </div>

                                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 pull-right row">
                                  <label className="pull-right">(619)555-9785</label>
                                  </div>
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                     <div className=" ">
                        <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12  mt20">
                            <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12 bottomBorder ">
                              <div className="row">
                                <div className="col-lg-2  col col-md-12 col-sm-12 col-xs-12 row">
                                  <i className="fa fa-envelope" aria-hidden="true"></i>
                                  </div>

                                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 pull-right row">
                                  <label className="pull-right">Email</label>
                                  </div>
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                     <div className=" ">
                        <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12  mt20">
                            <div className="col-lg-12  col col-md-12 col-sm-12 col-xs-12 bottomBorder ">
                              <div className="row">
                                <div className="col-lg-2  col col-md-12 col-sm-12 col-xs-12 row">
                                  <i className="fa fa-globe" aria-hidden="true"></i>
                                  </div>

                                <div className="col-lg-11  col col-md-12 col-sm-12 col-xs-12 pull-right row">
                                  <label className="pull-right">Contengmail.com</label>
                                  </div>
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ml20 mt20 ">

                      <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mr13">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialIconRequest  ">
                            <i className="fa fa-facebook-f"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mr13">
                       <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialIconRequest  ">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div> 
                      <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mr13">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialIconRequest  ">
                            <i className="fa fa-linkedin"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mr13 ">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialIconRequest  ">
                            <i className="fa fa-instagram"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 ">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialIconRequest  ">
                            <i className="fa fa-youtube"></i>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>   
              <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mt20 " >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                  <div className="row">
                   Request More Information
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20" >
                        <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Tell me more about this property" value="" ref="direction" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                        <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Your Name" value="" ref="direction" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                        <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Email" value="" ref="direction" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                        <input type="text" className="form-control inputBoxRequest noHoverRequest" placeholder="Phone" value="" ref="direction" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 boarderR " >
                          <textarea rows="10" cols="59"  placeholder="Message"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                  <div className="row">
                    <button className="col-lg-2  col-md-12 col-sm-12 col-xs-12 sendButton">SEND</button>
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
export default RequestForm