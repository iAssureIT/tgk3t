import React, { Component }   			from 'react';
import { Route , Redirect, withRouter}  from 'react-router-dom';
import { connect } 						from 'react-redux';
import axios 							from 'axios';
import styled, { keyframes, css} from 'styled-components';
// import { keyFrameExampleOne } from './KeyFrames';
import swal                     from 'sweetalert';

import './CongratsPage.css';

 class CongratsPage extends Component {

 	constructor(props){
			super(props);
			this.state = {
				percentage : "",
				per        : "",

			};
		}
 	componentDidMount(){
		 
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

		var prop_index = localStorage.getItem("index");
		console.log("here prop_index", prop_index);
		var formvalues = {
			
			 "index" 			: prop_index

		}

		console.log("index",formvalues)
			axios
				.post('/api/properties/post/findindexper',formvalues)
				.then( (res) =>{
					console.log("resposnse here===================>",res);
					var cash_per = res.data.data.earnings;
					console.log("here earnings",cash_per);
					axios
                .get('/api/properties/'+this.props.property_id)
                .then((propertyData) =>{
                  console.log("propertiesData",propertyData.data);
                  axios
                    .get('/api/users/get/one/'+localStorage.getItem("uid"))
                    .then((userData) =>{
                          var sendDataToUser = {
                          "templateName"  : "User - New Property Posted",
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
                          "templateName"        : "Admin - New Property Posted",
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
                             this.props.history.push("/");
                        }
                    });  
                               
              })
             .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    });

					this.setState({
						percentage : cash_per
					},()=>{
						var data =  this.state.percentage;
						var per = 0;
						if(data <=10 && data >= 0)
						{
							per = 18;
						}
						if(data <=20 && data >= 10)
						{
							per = 18+18;
						}
						if(data <=30 && data >= 20)
						{
							per = 18+18+18;
						}
						if(data <=40 && data >=30)
						{
							per = 18+18+18+18;
						}
						if(data <=50 && data >=40)
						{
							per = 18+18+18+18+18;
						}

						console.log("data",data);
						console.log("per",per);

						// console.log("here prop of showMeter",this.props.showMeter);
						if(this.props.congratsPage === true){
							this.setState({per:per})
						}

						console.log("this.props.congratsPage",this.props.congratsPage);
					});
					
				})
				.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                });




	}

 	redirectToProfile(){
 			this.props.history.push("/PropertyProfile/"+this.props.property_id);
   			window.location.reload();
 	}

	render() {
			console.log("this.state.percentage",this.state.percentage)

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<img src="/images/fireworks.png" className="col-lg-3 col-xs-12" style={{height:"154px"}} />
					<p className="col-lg-6  CP1">Congratulations</p>
					<img src="/images/fireworks.png" className="col-lg-3 col-xs-12" style={{height:"154px"}} />
				</div>
				<p className="col-lg-12 CP2">Your Property is <b className="fontColor">FAST SELLING HOT POTATO</b></p>
				<p className="col-lg-12 CP3">and qualifies for a <b className="fontColor">{this.state.percentage!="" ? this.state.percentage+"%" : null}</b> brokerage to be paid by us on successful deal through us </p>
				<div className="col-lg-6 col-lg-offset-3 CP4 col-xs-12">
					<img src="/images/meter.png" className="col-lg-12 col-xs-12" />
					{this.props.congratsPage === true?
						<img src="/images/needle1.png" className="needle col-lg-5 col-xs-5 " style={{transform: "rotate("+this.state.per+"deg)",transformOrigin: "90% 55%",transition : "transform 3s",transitionDelay: "1s"}} />
						:
						null
						
					}

					<b className="col-lg-12 col-xs-12 CP5">Sell-O-Meter</b>
				</div>
				<p className="col-lg-12 col-xs-12 CP6">Your Property <b className="congColor">Successfully</b> submitted & will be published soon!!!</p>
				<div>
					 <button className="btn btn-primary CP7 pull-right" onClick={this.redirectToProfile.bind(this)}>Profile Preview</button>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id  : state.property_id,
		uid			 : state.uid,
		showMeter    : state.showMeter,
		congratsPage : state.CongratsPage

	}
};
export default connect(mapStateToProps) (withRouter(CongratsPage));
