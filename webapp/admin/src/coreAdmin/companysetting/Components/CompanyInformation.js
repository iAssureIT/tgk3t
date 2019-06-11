import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';
// import swal from 'sweetalert';

class CompanyInformation extends Component{
   constructor(props) {
    super(props);
    this.state = {
      companyId               : "",
      companyName             : "",
      companyContactNumber    : "",
      companyAltContactNumber : "",
      companyEmail            : "",
      companyAddressLine1     : "",
      companyDist             : "",
      companyPincode          : "",
      companyCity             : "",
      companyState            : "",
      companyCountry          : "",
      companyLogo             : "",
      logoFilename            : "",
      taluka                  : "",
      companywebsite          : "",
      data                    : [],
      submitVal               : true,
      subscription : {
        
      }

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    
  }
  componentDidMount() {
  
    
  
  }
  removeCompanyImage(event){
    event.preventDefault();
    // var link = $(event.target).attr('data-link');
   
    

  }

  CompanyImage(){
    // var TempIamge = this.props.tempLogoData;
    // if(TempIamge){
    //   // this.setState({
    //   //   commonLogo : TempIamge.logo
    //   // })
    //   return TempIamge.logo;
    // }else{
    //   var companyData = CompanySettings.findOne({});
    //   if(companyData){
    //     if(companyData.companyLogo){
    //       // this.setState({
    //       //   commonLogo : companyData.companyLogo
    //       // })
    //       return companyData.companyLogo;
    //     }else{
    //       return '/images/CSLogo.png';
    //     }
    //   } else{
    //     return '/images/CSLogo.png';
    //   }
    // }
  }
  imgBrowse(e){
   
    e.preventDefault();
    // let self=this;      
    //   if(e.currentTarget.files){
    //   var file=e.currentTarget.files[0];
    //   if(file){
    //     var fileExt=e.currentTarget.files[0].name.split('.').pop();
    //     if (fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'svg' || fileExt == 'png' ) {
    //        attachLogoToS3Function(file,self);
    //     }else{
    //     swal({
    //       title:"abc",
    //       text:'Please upload only .jpg/.jpeg/.svg/.png files'});
    //     }
    //   }
    // }           
  }
  submitCompanyInformation=(event)=>{
    event.preventDefault();
   
    var companyInfoFormValue = {
      companyName             : this.state.companyName,
      companyContactNumber    : this.state.companyContactNumber,
      companyAltContactNumber : this.state.companyAltContactNumber,
      companyEmail            : this.state.companyEmail,
      companywebsite          : this.state.companywebsite,
      companyAddressLine1     : this.state.companyAddressLine1,
      companyCountry          : this.state.companyCountry,
      companyState            : this.state.companyState,
      companyDist             : this.state.companyDist,
      companyCity             : this.state.companyCity,
      companyPincode          : this.state.companyPincode,
      taluka                  : this.state.taluka,
      logoFilename            : this.state.logoFilename,
      companyLogo             : this.state.companyLogo,
    }//close array

    // if($('#companyInformationForm').valid()){
      
    // }
    axios.post('/api/companysettings',{companyInfoFormValue})
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }
  handleChange(event){
    const target = event.target;
    const name   = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  render(){
    
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
         {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 Box-Bottom-Header compyHeader">
          <h4 className="lettersp MasterBudgetTitle">Company Information</h4>
          </div>*/}
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h4 className="">Company Information</h4>
              </div>
               <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="companyInformationForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                 

                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12 noPadding">
                    <h4 className="basicinfotxt"><i className="fa fa-info-circle fonticons" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Basic Info</h4>
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                   
                    <div className="col-lg-6 col-lg-offset-6 col-md-6 col-sm-12 col-xs-12 csImageWrapper">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerPhotoWrapper">
                          {this.CompanyImage() === '../images/CSLogo.png'? <i className="fa fa-camera fonticons" aria-hidden="true" title="First Add Photo."/>
                          :
                          <i className="fa fa-times fonticons removeprofPhoto" aria-hidden="true" title="Remove Photo." onClick={this.removeCompanyImage.bind(this)} data-link={this.state.companyLogo} id={this.state.companyLogo} data-id={this.state.companyId}></i>
                          }
                          <div className="col-lg-12 col-md-12 col-sm-12ClientImgWrap1 displayBlockOne">
                            {
                            this.CompanyImage() ==='../images/CSLogo.png' ?  <i className="fa fa-camera fonticons paddingNoImageUpload col-lg-2 col-md-2 col-sm-2   styleUpload" title="Add Photo.">
                            <input type="file" className="col-lg-1 col-md-1 col-sm-1 col-xs-12 browseDoc" accept="image/*" onChange={this.imgBrowse.bind(this)}/> </i>
                              :
                              <i className="fa fa-camera fonticons paddingNoImageUpload col-lg-2  styleUpload" title="Change Photo.">
                                <input type="file" className="col-lg-1 col-md-1 col-sm-1 col-xs-1 browseDoc" accept="image/*" onChange={this.imgBrowse.bind(this)}/>
                              </i>
                            }
                          </div>

                            {<img className="col-lg-12 col-md-12 col-sm-12 ClientImgWrap1 displayLogoOne" src={this.CompanyImage()?this.CompanyImage() :"/images/preloader.gif"}/>}
                            {/* {this.getUploadServicesPercentage()} */}
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Company Name</label><span className="astrick">*</span>
                        <input id="companyName" value={this.state.companyName} onChange={this.handleChange.bind(this)} type="text" name="companyName" className="form-control areaStaes" title="Please enter alphanumeric only" />
                    </div>  
                  </div>

                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Company ID</label><span className="astrick"></span>
                        <input id="companyId" value={this.state.companyId} onChange={this.handleChange.bind(this)} type="text" name="companyId" ref="companyId" className="form-control areaStaes" title="Company ID" autoComplete="off" disabled />
                    </div>  
                  </div>
               
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Contact Number</label><span className="astrick">*</span>
                        <input className="form-control areaStaes" title="Please enter valid mobile number only" id="companyContactNumber" type="text" name="companyContactNumber" ref="companyContactNumber" value={this.state.companyContactNumber} aria-required="true" onChange={this.handleChange.bind(this)} required />
                    </div> 
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Alternate Contact Number</label>
                        <input className="form-control areaStaes" title="Please enter valid mobile number only" id="companyAltContactNumber" type="text" name="companyAltContactNumber" ref="companyAltContactNumber" value={this.state.companyAltContactNumber} aria-required="true" onChange={this.handleChange.bind(this)} />
                    </div> 
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Company EmailID</label><span className="astrick">*</span>
                        <input className="form-control areaStaes" title="Please enter valid email address" id="companyEmail" type="text" name="companyEmail" ref="companyEmail" value={this.state.companyEmail} aria-required="true" onChange={this.handleChange.bind(this)} required/>
                    </div> 
                  </div>

                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Company Website</label><span className="astrick">*</span>
                        <input className="form-control areaStaes" title="Please enter valid webside address" id="companywebsite" type="text" name="companywebsite" ref="companywebsite" value={this.state.companywebsite} aria-required="true" onChange={this.handleChange.bind(this)} required/>
                    </div> 
                  </div>
                </div>
              </div>

              <div className="basicinfocmpset"> 
              <h4 className="basicinfotxt"><i className="fa fa-map-marker fonticons" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Address</h4>
                 
                <div className="col-lg-12 col-md-4 col-sm-12 col-xs-12 compForm">
                  <div className="form-group formht col-lg-12 col-md-4 col-sm-12 col-xs-12">
                      <label className="control-label statelabel locationlabel" >Company Address</label><span className="astrick">*</span>
                      <input className="form-control areaStaes" title="Please enter valid address" id="companyAddressLine1" type="text" name="companyAddressLine1" ref="companyAddressLine1" value={this.state.companyAddressLine1} aria-required="true" onChange={this.handleChange.bind(this)} required/>
                  </div> 
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                  <div className="form-group">
                      <label className="control-label statelabel locationlabel" >Country<span className="astrick">*</span></label>
                      <select className="stateselection countrySelect form-control" title="Please select country" id="companyCountry" value={this.state.companyCountry}  ref="companyCountry" name="companyCountry" onChange={this.handleChange} required>
                      <option value="">-Select-</option>
                  
                      </select>
                  </div>
                  </div>
                  <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <div className="form-group">
                      <label className="control-label statelabel locationlabel" >State<span className="astrick">*</span></label>
                      <select className="stateselection stateSelect form-control" title="Please select state" id="companyState" value={this.state.companyState}  ref="companyState" name="companyState" onChange={this.handleChange} required>
                        <option value="">-Select-</option>
                      
                        </select> 
                    </div> 
                  </div>
                  <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <div className="form-group">
                          <label className="control-label statelabel locationlabel" >District<span className="astrick">*</span></label>
                         <select className="stateselection districtSelect form-control" title="Please select district" id="companyDist" value={this.state.companyDist}  ref="companyDist" name="companyDist" onChange={this.handleChange} required>
                         <option value="">-Select-</option>
                      
                        </select> 
                    </div>
                  </div>
                  </div>
                  <div className="col-lg-12 col-md-4 col-sm-12 col-xs-12 compForm">
                    <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >Taluka<span className="astrick">*</span></label>
                           <select className="stateselection talukaSelect form-control" title="Please select taluka" id="taluka" value={this.state.taluka}  ref="taluka" name="taluka" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                      
                          </select>  
                      </div>
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >City<span className="astrick">*</span></label>
                           <select className="stateselection villageSelect form-control" title="Please select city" id="companyCity" value={this.state.companyCity}  ref="companyCity" name="companyCity" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                         
                          </select> 
                      </div>
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                          <label className="control-label statelabel locationlabel" >Pin Code<span className="astrick">*</span></label>
                          <select className="stateselection  form-control" title="Please select pincode" id="companyPincode" value={this.state.companyPincode} ref="companyPincode" name="companyPincode" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                        
                          </select>
                      </div>
                    </div>
                  </div>
                  
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn btnSubmit pull-right" id="btnCheck"  onClick={this.submitCompanyInformation.bind(this)}>
                  {this.state.submitVal
                    ?
                      "Submit"
                    : 
                      "Update"
                  }  
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>

      );
  }

 }

 export default CompanyInformation;