import React , { Component }  from 'react';
import axios 				  from 'axios';
import $ 					  from "jquery";
import swal                   from 'sweetalert';
import { Link }				  from 'react-router-dom';
import { connect } 			  from 'react-redux';
import { Route , withRouter}  from 'react-router-dom';

import './BasicInfo.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

 class BasicInfo extends Component{

		constructor(props){
			super(props);
			this.state = {
				transactionType  : "Sell",
				propertyHolder   : "",
				propertType 	 : "",
				// user_id 		 : localStorage.getItem("user_id"),
			};
			this.radioChange = this.radioChange.bind(this);
		}

		componentDidMount(){			

        	var message	= localStorage.getItem("message");
        	

			if(message == "NEW-USER-CREATED"){
				swal("Welcome!","You are now logged in!","success");
			}			

			$('#radio-example1 ').click(function(){				    	
		        $('.sellerType1').addClass('highlight').siblings().removeClass('highlight');       
		    });
		    $('#radio-example2').click(function(){
		        $('.sellerType2').addClass('highlight').siblings().removeClass('highlight');       
		    });
		    $('#radio-example3').click(function(){
		        $('.sellerType3').addClass('highlight').siblings().removeClass('highlight');       
		    });

    		localStorage.removeItem("mobile");
    		localStorage.removeItem("otp");	
    		localStorage.removeItem("message");	

		}

		insertProperty(event){
			event.preventDefault();
			const formValues = {
				"propertyHolder" 	: this.state.propertyHolder,
        		"transactionType"	: this.state.transactionType,
				"propertyType"  	: this.state.propertyType,
				"propertySubType"	: this.state.propertySubType,
				"floor"         	: this.refs.floor.value,
				"totalFloor"    	: this.refs.totalfloor.value,
				"listing"       	: false,
				"uid"				:this.props.uid
			};
			console.log("BasicInfo===",formValues);

			    axios
				.post('/api/properties',formValues)
				.then( (res) =>{
					console.log(res.data);
					if(res.status == 200){
						// swal("Good job!", "Property inserted successfully!", "success");
						console.log("BasicInfo res = ",res);
						this.props.redirectToLocation( res.data.propertyCode, res.data.property_id,this.props.uid);						
					}else{
						// alert(" Please Fill all fields")
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
		}
		selectType(event){
			var selectedData = event.target.getAttribute('data-checked');
			console.log("selectedData",selectedData);

          if(this.state.transactionType === "Sell")
            {
              this.setState(
              {
                "transactionType" : "Rent",
              });
            }else if(this.state.transactionType === "Rent")
            {
               this.setState(
               {
                "transactionType" : "Sell",
              }); 
            
          }
      }
	   radioChange(event) {
	    	this.setState({
	      	"propertyHolder": event.currentTarget.value,
			    });
			
				    $('#radio-example1 ').click(function(){

				        $('.sellerType1').addClass('highlight').siblings().removeClass('highlight');       
				    });
				    $('#radio-example2').click(function(){
				        $('.sellerType2').addClass('highlight').siblings().removeClass('highlight');       
				    });
				    $('#radio-example3').click(function(){
				        $('.sellerType3').addClass('highlight').siblings().removeClass('highlight');       
				    });

		 }

	selectProp(event){
	 	var selectedValue = event.currentTarget.value;
	 	var propertyTypeVal = selectedValue.split("-");
	 	var propertyType = propertyTypeVal[0];
	 	var propertySubType = propertyTypeVal[1];

 		this.setState({
 			propertyType : propertyType,
 			propertySubType : propertySubType,
 		});
	}

	render() {
    return (
    	<div >
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
					<label className="title_sz">Let's Provide Details of Your Property for sell</label>
					<Link to="/HomePage" className=" ">
						<button type="button" className="close">&times;</button>
					 </Link>
				</div>
			  </div>*/}
			  {/*<hr />*/}
			  <div className="hr_border row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">	
				<div className="col-lg-7 col-md-8 col-sm-12 col-xs-12">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						{/*<h3> uid = {this.props.uid} </h3>*/}
				  	 	<label>I am</label> 
				  	 </div>
				  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 crc_mrg_btm"   >
				    	<div className="col-lg-1 sellerType1"  >
						    <label className="radio-inline ">
						      <input type="radio" 
						      		 value="owner" 
						      		 className="FrRadio" 
						      		 id="radio-example1"
						      		 checked={this.state.propertyHolder === "owner"}
	               					 onChange={this.radioChange} />

					  			<i className="fa fa-users fa-1x logo1"></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-3 sellerType2"  >
						    <label className="radio-inline ">
						      <input type="radio" 
						      		 value="careTaker" 
						      		 className="FrRadio" 
						      		 id="radio-example2"
						      		 checked={this.state.propertyHolder === "careTaker"}
	               					 onChange={this.radioChange}/>

					  			<i className="fa fa-users fa-1x logo1"></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-3 sellerType3"   >
						    <label className="radio-inline ">
						      <input type="radio"
						      		 value="builder" 
						      		 className="FrRadio" 
						      		id="radio-example3"
						      		 checked={this.state.propertyHolder === "builder"}
	               					 onChange={this.radioChange} 
						      		 />
					  			<i className="fa fa-users fa-1x logo1"></i>
						    </label>
					    </div>
					</div>
					  	<div className="col-lg-12 mb-40">
					  			<span className=""> Owner</span>
					  			<span className="ml-78"> Care Taker</span>
					  			<span className="ml-76"> Builder</span>
					  	</div>
         		
					  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				   			<label>I would like to</label>
				   		</div>
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	    		
				    		{/*<input type="text" className="" ref="" id="" placeholder="Seller or renter"/>*/}	
		{/*		  	 		<label className="labelMarg">One Time MAintenance</label>  */}
				  	 	<div className="form-group" id="">
							<div className="can-toggle genderbtn demo-rebrand-2 " onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox" />
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle__switch" data-checked="Rent" data-unchecked="Sell" ></div>
				                <div className="can-toggle__label-text"></div>
				              </label>
			            	</div>
			            </div>
						</div>

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				   			<label>Property Details</label>
				   		</div>
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5">
				   			 Property Type
				   		</div>

					   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						  <div className="form-group" id="">
	{/*					    <label for="exampleFormControlInput1">Bedroom</label><span className="asterisk">*</span>
	*/}					    {/*<input type="text" className="form-control" ref="bedroom" id="exampleFormControlInput1" placeholder=""/>*/}
						  	 <select className="custom-select form-control" ref="propertytype" onChange={this.selectProp.bind(this)}>
						    	<option	value="" hidden>Select Property Type </option>
						    	<option	disabled>ALL RESIDENTIAL </option>
						    	<option value="Residential-MultiStoreyApt">MultiStorey Apartment</option>
						    	<option value="Residential-ResidentialHouse">Residential House</option>
						    	<option value="Residential-Villa">Villa</option>
						    	<option value="Residential-Penthouse">Penthouse</option>
						    	<option value="Residential-StudioApt">Studio Apartment</option>
						    	<option	disabled>ALL COMMERCIAL </option>
						    	<option value="Commercial-CommercialOS">Commercial Office Space</option>
						    	<option value="Commercial-OfficeIT">Office in IT Park/SEZ</option>
						    	<option value="Commercial-CommercialS">Commercial Shop</option>
						    	<option value="Commercial-CommercialSR">Commercial Showroom</option>
						    	<option value="Commercial-Warehouse">Warehouse/Godown </option>
						    	<option value="Commercial-Industrial">Industrial Building</option>
							</select>
							{/*<div className="errorMsg">{this.state.errors.bedroom}</div>*/}
						  </div>
					  	</div>

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5">
			  		<b>My Apartment is on</b>
			  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  row">
		  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
			  <div className="form-group" id="floor">
		  		<div className="input-group inputBox-main " id="">
			      	<div className="input-group-addon inputIcon">
                     	<i className="fa fa-building iconClr"></i>
                    </div>
			  		<select className="custom-select form-control "  ref="floor" placeholder="Floor" >
				    	<option className="hidden">Floor</option>
				    	<option>Upper Base</option>
				    	<option>Lower Base</option>
				    	<option>Ground</option>
				    	<option>1</option>
				    	<option>2</option>
				    	<option>3</option>
				    	<option>4</option>
				    	<option>5</option>
					</select>
				</div>
			  </div>
			</div>

			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="totalfloor">
				  	{/*<input type="text" className="form-control" ref="totalfloor" id="exampleFormControlInput1" placeholder="Total floor"/>*/}
				  	<div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					  	<select className="custom-select form-control "  ref="totalfloor" placeholder="Floor" >
					    	<option className="hidden">Total Floor</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>3</option>
					    	<option>4</option>
					    	<option>5</option>
					    	<option>6</option>
						</select>
					</div>
				  </div>
			 </div>
		  </div>

			  	</div>
				  
				<div className="col-lg-5 col-md-8 col-sm-12 col-xs-12 boxLayout">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<img src="images/2.png" className=""/>
					</div>
			  	</div>

			  </div>
				  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	
		  	<div className="form-group col-lg-3	col-md-2 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-2 col-sm-4 col-xs-4" onClick={this.insertProperty.bind(this)} >Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>
    </div> 
		);
	}
	


}

const mapStateToProps = (state)=>{
	console.log("bState===",state);
  return {
    uid             : state.uid,
	BasicInfo		: state.BasicInfo,
	PropertyDetails	: state.PropertyDetails,
	Financials		: state.Financials,
	Amenities		: state.Amenities,
	Availability	: state.Availability,
	Location	 	: state.Location,
  }
};

const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToLocation  : (propertyCode, property_id,uid)=> dispatch({type    : "REDIRECT_TO_LOCATION",
													  
													   propertyCode	: propertyCode,
													   property_id	: property_id,
													   uid:uid
												}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BasicInfo));