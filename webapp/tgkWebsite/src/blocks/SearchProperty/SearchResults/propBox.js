import React 					from 'react';
import {withRouter, Link} 		from 'react-router-dom';
import $	                    from "jquery";
import axios	                from 'axios';
import { connect }        		from 'react-redux';
import swal                     from 'sweetalert';
import LoginMobNum              from '../../WebsiteSecurity/LoginMobNum/LoginMobNum.js';
import LoginOtp                 from '../../WebsiteSecurity/LoginOtp/LoginOtp.js';
import WebSignupForm            from '../../WebsiteSecurity/WebSignup/WebSignupForm.js';


class propBox extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		 isLoading: true,
		 convertTotalPrice :"", 
		}
	}

	componentDidMount() {

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

    	this.setState({isLoading: false})

	}

	convertNumberToRupees(totalPrice) 
	  {
	    return Math.abs(Number(totalPrice)) >= 1.0e+7

	    ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

	    : Math.abs(Number(totalPrice)) >= 1.0e+5

	    ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

	    : Math.abs(Number(totalPrice)) >= 1.0e+3

	    ? Math.abs(Number(totalPrice)) / 1.0e+3 + " K"

	    : Math.abs(Number(totalPrice));
	  }

	componentDidMount(){
		this.setState({searchResult:this.props.searchResult})
	}

	removeBackdrop(){
    	$(".modal-backdrop").remove();    
  	}

	interestBtn(event){
	    event.preventDefault();
	    var id = event.currentTarget.id;

	    var formValues ={
	      property_id : event.currentTarget.id,
	      buyer_id    : localStorage.getItem('uid'),
	    }

    	var searchData = JSON.parse(localStorage.getItem("searchData"));
    	searchData.uid = localStorage.getItem('uid');


		if($("#"+id).hasClass("resInterestExpress")){
		 axios
		  .post('/api/interestedProperties/',formValues)
		  .then(res=>{
		     //After Express Interest, again get all properties

		      axios
		        .post('/api/search/properties/',searchData)
		        .then(resultData =>{
		        	axios
                .get('/api/properties/'+id)
                .then((propertyData) =>{
                  console.log("propertiesData",propertyData.data);
                  axios
                    .get('/api/users/get/one/'+localStorage.getItem("uid"))
                    .then((userData) =>{
                          var sendDataToUser = {
                          "templateName"  : "User - Express Interest",
                          "toUserId"      : userData.data._id,
                          "variables"           : {
                              "userName"          : userData.data.profile.fullName,
                              "propertyType"      : propertyData.data.propertyType,
                              "transactionType"   : propertyData.data.transactionType,
                              "propertyID"        : propertyData.data.propertyCode,
                              "address"           : propertyData.data.propertyLocation.address,
                              "society"           : propertyData.data.propertyLocation.society,
                              "subArea"           : propertyData.data.propertyLocation.subArea,
                              "area"              : propertyData.data.propertyLocation.area,
                              "city"              : propertyData.data.propertyLocation.city,
                              "state"             : propertyData.data.propertyLocation.state,
                          }
                      }
                      console.log("sendData",sendDataToUser);
                      var sendDataToAdmin = {
                          "templateName"        : "Admin - User Express Interest",
                          "toUserId"            : "admin",
                          "variables"           : {
                              "userName"          : userData.data.profile.fullName,
                              "userMobile"        : userData.data.profile.mobileNumber,
                              "userEmail"         : userData.data.profile.emailId,
                              "userCity"          : userData.data.profile.city,
                              "propertyType"      : propertyData.data.propertyType,
                              "transactionType"   : propertyData.data.transactionType,
                              "propertyID"        : propertyData.data.propertyCode,
                              "address"           : propertyData.data.propertyLocation.address,
                              "society"           : propertyData.data.propertyLocation.society,
                              "subArea"           : propertyData.data.propertyLocation.subArea,
                              "area"              : propertyData.data.propertyLocation.area,
                              "city"              : propertyData.data.propertyLocation.city,
                              "state"             : propertyData.data.propertyLocation.state,
                          }
                      }
                      console.log("sendData",sendDataToAdmin);
                      axios
                      .post('/api/masternotifications/post/sendNotification',sendDataToAdmin)
                      .then((result) =>{
                        console.log("SendEmailNotificationToAdmin",result);
                        axios
                        .post('/api/masternotifications/post/sendNotification',sendDataToUser)
                        .then((res) =>{
                          console.log("SendEmailNotificationToUser",res);           
                        })
                       .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				         });        
                      })
                            
                })
               .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				    });
                               
              })
             .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				});
		            this.setState({
		              searchResult  : resultData.data,
		            },()=>{
		            })
		        })
		       .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				     });
		  })
		 .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				          });
	    }else{
	      var deleteValues = {
	        uid         : localStorage.getItem('uid'),
	        property_id : event.currentTarget.id
	      }
	      axios
	        .delete('/api/interestedProperties/'+localStorage.getItem('uid')+"/"+event.currentTarget.id)
	        .then(
	          (res)=>{	              
	              axios
	                .post('/api/search/properties/',searchData)
	                .then(resultData =>{
	                    this.setState({
	                      searchResult  : resultData.data,
	                    })
	                })
	              .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				        });
	          }
	        )
	       .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				});
	    }
  	}

  	login(){
	    const originPage = "header" ; //This is to stop after signup... otherwise it continues to next form Basic info.

	    const uid = localStorage.getItem("uid");

	    if(uid){
	      this.props.already_loggedIn(originPage,uid);
	    }else{
	      this.props.login_mobileNum(originPage);
	    }
	}

	render() {
		let header;
	    if(this.props.LoginMobNum){
	      header = "Enter Your Mobile Number to Login." 
	    }else if(this.props.LoginOtp){
	      header = "Please verify your mobile number." 
	    }else if(this.props.WebSignupForm){
	      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
	    }

		return (
			<div className="col-lg-12 col-md-1 col-xs-12 col-sm-12 noPad">
			 {this.state.searchResult && this.state.searchResult.length >0 ?
			 	this.state.searchResult.map((result,index)=>{
			 	return(
					<div key={index} className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox">			
						<div className="row pull-right topRightTriangle hidden-xs hidden-sm" id="triangle-topright"> 
						</div>	
						<div className="">
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">
							{
								result && result.gallery && result.gallery.Images && result.gallery.Images.length > 0 ?
								<img alt=""  className="propertyImgDiv " src={result.gallery.Images[0].imgPath} />
								:
								<img alt=""  className="propertyImgDiv " src="/images/loading_img.jpg" />
							}															
						</div>
						{
	                        localStorage.getItem("uid") 
	                        ?
	                          result.isInterested
	                          ? 
	                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 resInterestShown"  id={result._id} onClick={this.interestBtn.bind(this)}>
	                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
	                              <span className="intText hidden-xs hidden-sm"> Interest Shown </span>
	                              <span className="intText1 hidden-lg hidden-md"> Interest Shown </span>
	                            </div>
	                            
	                          :
	                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 resInterestExpress" id={result._id} onClick={this.interestBtn.bind(this)}>
	                              <i className="fa fa-heart-o "  aria-hidden="true" ></i>
	                              <span className="hidden-xs hidden-sm"> Express Interest </span>
	                              <span className="intText1 hidden-lg hidden-md"> Express Interest </span>
	                            </div>                                        
	                        :
	                          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 resInterestExpress" id={result._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
	                            <i className="fa fa-heart-o "  aria-hidden="true" ></i>
	                            <span className="hidden-xs hidden-sm"> Express Interest </span>
	                            <span className="intText1 hidden-lg hidden-md"> Express Interest </span>
	                          </div>
	                      }
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noPad">				
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
								<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 propertySubText1">				
									<i className="fa fa-inr"></i>&nbsp;
									<span>
										{result && result.financial && result.transactionType == "Sell" ?

											result.financial && result.financial.totalPrice? this.convertNumberToRupees(result.financial.totalPrice) : "-"

										:
											result.financial && result.financial.monthlyRent ? this.convertNumberToRupees(result.financial.monthlyRent) : "-"
										}
									</span>
								</div>

									<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 propertySubText1">				
										{
											result.propertyType === "Residential" ? 
												 <span>
												 {result.propertyDetails && result.propertyDetails.bedrooms ? result.propertyDetails.bedrooms : "-"} BHK  &nbsp;&nbsp;
												 </span>
											:
											null
										}
										<i className="fa fa-map-marker text-warning"/>
										&nbsp;
										{result.propertyLocation  &&  result.propertyLocation.city && result.propertyLocation.society
											? 

											result.propertyLocation.society +", "+result.propertyLocation.subArea +", "+result.propertyLocation.city 

											:
											 "-"
										}
									</div>
								
									<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noPad pull-right">		
										{result.transactionType && result.transactionType === "Sell" ?
											<span className="pull-right text-right col-lg-8  noPad transactionLabel">Sale</span>
											:
											result.transactionType ==="Rent" ?
											<span className="pull-right text-right col-lg-8 noPad transactionLabel">{result.transactionType}</span>
											:
											null
										
										}
									</div>	
									

								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
									<div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 ">				
									{
										result.propertyType ==="Residential" ?
										<span className="propertySubText1">
										<img alt=""  src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
											{result.propertyDetails && result.propertyDetails.bedrooms }
											<br/><p style={{fontWeight:"100"}}>Bedrooms</p>
										</span>
										:
										<span className="propertySubText1">
										<img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
										{result.propertyDetails && result.propertyDetails.washrooms}
										<br/><p style={{fontWeight:"100"}}>Washrooms</p>
										</span>
									}
									</div>
									<div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 ">				
										{
											result.propertyType ==="Residential" ?
											<span className="propertySubText1">
											<img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
												{result.propertyDetails && result.propertyDetails.bathrooms }
												<br/><p style={{fontWeight:"100"}}>Bathrooms</p>
											</span>
											:
											<span className="propertySubText1">
											<img alt=""  src="/images/Icons/coffee.png" className="imgIcon" style={{width:"27px"}}/>&nbsp;
											{result.propertyDetails && result.propertyDetails.pantry}
											<br/><p style={{fontWeight:"100"}}>Pantry</p>
											</span>
										}
									</div>
									<div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 ">				
										<img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
										<span className="propertySubText1">{result.propertyDetails.floor? result.propertyDetails.floor :"-"}  /  {result.propertyDetails.totalFloor? result.propertyDetails.totalFloor :"-"}</span><br/>Floor / Total Floor
									</div>
									<div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 ">				
										<img alt=""  src="/images/Icons/face.png" className="imgIcon"/>&nbsp;
										<span className="propertySubText1">{result.propertyDetails? result.propertyDetails.facing :"-"}</span><br/>Facing
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">				
									<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
										Super Area : <b>{result.propertyDetails ? result.propertyDetails.superArea : "-"}&nbsp;Sqft</b>
									</div>
									<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
										Possession by : <span className="propertySubText2">{result.financial ? result.financial.availableFrom : "-"}</span>
									</div>
									<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
	                              		{localStorage.getItem('uid') ?
	                              		<Link to={"/PropertyProfile/"+result._id} target="_blank">
											<button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/new/logo1.png"/></button>
										</Link>
										:
										<button className="btn pull-right btnDetails" onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
									}
									</div>

								</div>
							</div>
						</div>
					</div>
					)	
			   	})
				:
				null
			}


			    {/*=== Modal starts here ===*/}
			    <div>
			      <div id="loginModal" className="modal fade" role="dialog">
			        <div className="modal-dialog modal-lg">

			          <div className="modal-content "style={{marginTop:"52px"}}>
			            <div className="modal-header">
			              <button type="button" className="close" data-dismiss="modal" onClick={this.removeBackdrop.bind(this)}>X</button>
			              <h4 className="modal-title">
			                <b style={{paddingLeft:"28px"}}> {header} </b>
			              </h4>
			            </div>

			            <div className="modal-body col-lg-12">
			              { this.props.LoginMobNum  ? <LoginMobNum />     : null }
			              { this.props.LoginOtp     ? <LoginOtp />      : null }
			              { this.props.WebSignupForm  ? <WebSignupForm />   : null }
			            </div>
			            <div className="modal-footer">
			            </div>

			          </div>

			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
  // console.log("state",state)
  return {
    LoginMobNum     : state.LoginMobNum,
    LoginOtp        : state.LoginOtp,
    WebSignupForm   : state.WebSignupForm,
  }
};


const mapDispatchToProps = (dispatch)=>{
  return {
      login_mobileNum  : (originPage)=>dispatch({type: "LOGIN_MOB_NUM", originPage: originPage}),
      already_loggedIn : (originPage,uid)=>dispatch({type: "ALREADY_LOGGEDIN", originPage: originPage, uid:uid}),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(propBox));

