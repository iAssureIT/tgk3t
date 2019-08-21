import React, { Component }   from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';

import "./MainFooter.css";

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
const clientmobileRegex = RegExp(/^[0-9][0-9]{9}$/);
const clientnameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const emailRegex = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


export default class MainFooter extends Component{

  constructor(props){
      super(props);
      this.state = {
         name : "",
         email : "",
         mobile : "",
        formerrors :{
          clientName  : " ",
          clientEmail : " ",
          clientMobile : "",
        
        },
      };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
      event.preventDefault();
      const datatype = event.target.getAttribute('data-text');
        const {name,value} = event.target;
        const formerrors = this.state.formerrors;
      console.log("datatype",datatype);
      switch (datatype){


      case 'clientName' : 
           formerrors.clientName = clientnameRegex.test(value)? '' : "Please enter valid name";
           break;

        case 'clientEmail' : 
          formerrors.clientEmail = emailRegex.test(value)? '' : "Please enter valid mail address";
          break;

        case 'clientMobile' : 
             formerrors.clientMobile = clientmobileRegex.test(value)? '' : "Please enter a valid phone number";
            break;
            
      default :
      break;

      }
      this.setState({ formerrors,
        [name]:value
      } );
    }

  sendNotification(event){
    event.preventDefault();
    // var adminEmail = this.getAdminEmail();  //Get email id from company settings. Write API for that.
    var adminEmail = "ashish.a.naik@gmail.com";

    const formValues1 = {
        "email"         : this.refs.email.value ,
        "subject"       : "Your Query/Feedback is sent successfully to www.TheGoldenKey.com!",
        "Text"          : "", 
        "mail"          : 'Dear' + this.refs.name.value + ', <br/><br/>'+
                          "<b>Your Mobile: </b>" + this.refs.mobileNumber.value + '<br/>'+
                          "<b>Your Email: </b>"  + this.refs.email.value + '<br/><br/>'+
                          "Your following message has been successfully delivered to the admin of www.TheGoldenKey.com! We will get back to you shortly. <br/> <br/> " + 
                          "===============================  <br/> <br/> " + 
                          "<pre> " + this.refs.message.value + "</pre>" + 
                          " <br/> <br/> =============================== " + 
                          "<br/><br/> Thank You, <br/> Support Team, <br/> www.TheGoldenKey.com " ,

      };
      console.log("notification",formValues1); 
      if(formValid(this.state.formerrors)){
        axios
        .post('/send-email',formValues1)
        .then((res)=>{
                   if(res.status === 200){
                    swal("Thank you for contacting us. We will get back to you shortly.")
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  // alert("Something Went wrong")
                });
              }else{
                swal("Please enter mandatory fields", "", "warning");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
              }
//==================================================================================
//    For Admin Email Message
//==================================================================================

    const formValues2 = {
        "email"         : adminEmail ,
        "subject"       : "New query/feedback arrived from Website!",
        "text"          : "",
        "mail"          : 'Dear Admin, <br/>'+
                          "Following new query/feedback came from website! <br/> <br/> " + 
                          "============================  <br/> <br/> " + 
                          "<b>Client Name: </b>"   + this.refs.name.value  + '<br/>'+
                          "<b>Client Mobile: </b>" + this.refs.mobileNumber.value + '<br/>'+
                          "<b>Client Email: </b>"  + this.refs.email.value + '<br/><br/>'+

                          "<pre> " + this.refs.message.value + "</pre>" + 
                          "<br/><br/> ============================ " + 
                          "<br/><br/> This is a system generated email! " ,

      };
      console.log("notification",formValues2); 
      if(formValid(this.state.formerrors)){
        axios
        .post('/send-email',formValues2)
        .then((res)=>{
                  if(res.status === 200){
                    console.log("Mail Sent TO ADMIN successfully!")
                  }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  // alert("Something Went wrong")
                });
              }else{
                swal("Please enter mandatory fields", "", "warning");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
              }


                this.refs.name.value  = "";
                this.refs.email.value = "";
                this.refs.mobileNumber.value = "";
                this.refs.message.value = "";
  }
  render() {
    const {formerrors} = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerDiv" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad footerContent" >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerContactUs" >
                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center header">Contact Us</label>              
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 footerContactUs" >
                  <div className="row" >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20" >
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20" >
                          <input type="text" className="form-control" placeholder="Name" name="name"  ref="name" data-text="clientName" onChange={this.handleChange} />
                          {this.state.formerrors.clientName &&(
                            <span className="text-danger">{formerrors.clientName}</span> 
                          )}
                        </div>
                        
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                          <input type="email" className="form-control" placeholder="Email" name="email"  ref="email" onChange={this.handleChange} data-text="clientEmail" />
                          {this.state.formerrors.clientEmail &&(
                              <span className="text-danger">{formerrors.clientEmail}</span> 
                          )}
                        </div>
                        
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 " >
                          <input type="number" className="form-control" data-text="clientMobile" name="mobile"  onChange={this.handleChange} placeholder="Phone"  ref="mobileNumber"  min="0"/>
                          {this.state.formerrors.clientMobile &&(
                            <span className="text-danger">{formerrors.clientMobile}</span> 
                          )}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textColor">
                          <div className="form-group">
                            <textarea className="form-control" id="exampleTextarea" rows="5" placeholder="Message" ref="message"></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
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
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails mt40">
                        <span className="col-lg-3 noPad"><i className="fa fa-mobile fa-2x col-lg-1" aria-hidden="true"></i>&nbsp; Phone 1 </span><span className="col-lg-9 noPad">: +91 9952 040 040</span>
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails">
                        <span className="col-lg-3 noPad"><i className="fa fa-mobile fa-2x col-lg-1" aria-hidden="true"></i>&nbsp; Phone 2 </span><span className="col-lg-9 noPad">: +91 7776 040 040</span>
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails">
                         <span className="col-lg-3 noPad"><i className="fa fa-envelope col-lg-1"></i>&nbsp; Email</span><span className="col-lg-9 noPad">: customercare@thegoldenkey.co.jp</span><br/>
                         <span className="col-lg-6 col-lg-offset-3 noPad">&nbsp; /sales@thegoldenkey.co.jp</span>
                      </div>
                      <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 contactDetails1 mt10">
                        <span className="col-lg-3 noPad"><i className="fa fa-globe globe col-lg-1" aria-hidden="true"></i>&nbsp;  Website</span><span className="col-lg-9 noPad">  : www.tgk.com</span>
                      </div>
                        <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 footerContactDetails" >
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
                            <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12 mr13">
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
