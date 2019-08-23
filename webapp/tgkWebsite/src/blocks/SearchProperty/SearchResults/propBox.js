import React 					from 'react';
import {withRouter, Link} 		from 'react-router-dom';
import $	                    from "jquery";
import axios	                from 'axios';
import { connect }        		from 'react-redux';

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
		            this.setState({
		              searchResult  : resultData.data,
		            },()=>{
		            })
		        })
		        .catch(error=>{
		          console.log("error = ", error);
		        });
		  })
		  .catch((error) =>{
		    console.log("error = ", error);
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
	                .catch(error=>{
	                  console.log("error = ", error);
	                });
	          }
	        )
	        .catch((error) =>{
	                console.log("error = ", error);
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
	      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
	    }else if(this.props.LoginOtp){
	      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
	    }else if(this.props.WebSignupForm){
	      header = "Owners earn upto 50% brokerage by selling/renting with us. So let’s get started." 
	    }

		return (
			<div className="col-lg-12 col-md-1 col-xs-12 col-sm-12 noPad">
			 {this.state.searchResult && this.state.searchResult.length >0 ?
			 	this.state.searchResult.map((result,index)=>{
			 	return(
					<div key={index} className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox">			
						<div className="row pull-right topRightTriangle" id="triangle-topright"> 
						</div>	
						<div className="row">
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">
							{
								result && result.gallery && result.gallery.Images && result.gallery.Images.length > 0 ?
								<img alt=""  className="propertyImgDiv" src={result.gallery.Images[0].imgPath} />
								:
								<img alt=""  className="propertyImgDiv" src="/images/loading_img.jpg" />
							}															
						</div>
						{
	                        localStorage.getItem("uid") 
	                        ?
	                          result.isInterested
	                          ? 
	                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 resInterestShown"  id={result._id} onClick={this.interestBtn.bind(this)}>
	                              <i className="fa fa-heart pr8"  aria-hidden="true" ></i>
	                              <span className="intText"> Interest Shown </span>
	                            </div>
	                          :
	                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 resInterestExpress" id={result._id} onClick={this.interestBtn.bind(this)}>
	                              <i className="fa fa-heart-o "  aria-hidden="true" ></i>
	                              <span className="intText"> Express Interest </span>
	                            </div>                                        
	                        :
	                          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 resInterestExpress" id={result._id} onClick={this.login.bind(this)} data-toggle="modal" data-target="#loginModal" >
	                            <i className="fa fa-heart-o "  aria-hidden="true" ></i>
	                            <span className="intText"> Express Interest </span>
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
									<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
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
									<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
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
									<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
										<img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
										<span className="propertySubText1">{result.floor? result.floor :"-"}  /  {result.floor? result.totalFloor :"-"}</span><br/>Floor / Total Floor
									</div>
									<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
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
	                              		<Link to={"/PropertyProfile/"+result._id} target="_blank">
											<button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
										</Link>
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

