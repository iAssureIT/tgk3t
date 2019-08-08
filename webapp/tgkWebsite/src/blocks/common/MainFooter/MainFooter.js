import React, { Component }   from 'react';
import axios          from 'axios';


import "./MainFooter.css";


export default class MainFooter extends Component{

  sendNotification(event){
    event.preventDefault();
    const formValues = {
        "name"          : this.refs.name.value,
        "email"         : this.refs.email.value,
        "mobileNumber"  : this.refs.mobileNumber.value,
        "message"       : this.refs.message.value,
      };
      console.log("notification",formValues); 
    //     const name = this.refs.name.value;
    //     const email = this.refs.email.value;
    //     const message = this.refs.message.value;
    // axios({
    //         method: "POST", 
    //         url:"http://localhost:3002/send", 
    //         data: {
    //             name: name,   
    //             email: email,  
    //             messsage: message
    //         }
    //     }).then((response)=>{
    //         if (response.data.msg === 'success'){
    //             alert("Message Sent."); 
    //             this.resetForm()
    //         }else if(response.data.msg === 'fail'){
    //             alert("Message failed to send.")
    //         }
    //     })

  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerDiv" >
            <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 noPad footerContent" >
              <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 footerContactUs" >
                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center header">Contact Us</label>              
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 footerContactUs" >
                  <div className="row" >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20" >
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20" >
                        <input type="text" className="form-control" placeholder="Name"  ref="name" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                        <input type="email" className="form-control" placeholder="Email"  ref="email" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                        <input type="number" className="form-control" placeholder="Phone"  ref="mobileNumber"  min="0"/>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textColor">
                        <textarea rows="5" cols="71"  placeholder="  Message" ref="message"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10 " >
                    <div className="col-lg-9 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                       <button className="col-lg-3  col-md-12 col-sm-12 col-xs-12 sendButton btn  pull-right" onClick={this.sendNotification.bind(this)}>SEND</button>
                      </div>
                    </div>
                  </div>
                  </div>                       
                </div>
                <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10 footerContactUs" >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ml20 " >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                      <div className="col-lg-2 col-md-10 col-sm-10 col-xs-10 footerImgContainer" >
                        <img alt=""  src="/images/Logo.png" />
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails mt40" >
                        <i className="fa fa-mobile fontMobile" aria-hidden="true"></i>&nbsp;   Phone 1 : +91 9999778745
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails" >
                        <i className="fa fa-mobile fontMobile" aria-hidden="true"></i>&nbsp;   Phone 2 : +91 9999778745
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails" >
                        <i className="fa fa-envelope"></i>&nbsp; Email&nbsp; &nbsp;    :  info@tgk.com
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails" >
                        <i className="fa fa-globe" aria-hidden="true"></i>&nbsp;  Website   : www.tgk.com
                      </div>
                        <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 footerContactDetails noPad" >
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
                  <label>Copyright <i className="fa fa-copyright"></i> 2019 THE GOLDEN KEY. All rights reserved.</label>
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
