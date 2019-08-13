import React , { Component }  from 'react';
import axios 				  from 'axios';
import $ 					  from "jquery";
import swal                   from 'sweetalert';
import { connect } 			  from 'react-redux';
import { withRouter}  		  from 'react-router-dom';

import './BasicInfo.css';

class BasicInfo extends Component{

		constructor(props){
			super(props);
			this.state = {
				transactionType  : "Sell",
				propertyHolder   : "",
				propertType 	 : "",
				propertySubType  : "",
				// user_id 		 : localStorage.getItem("user_id"),
				fullPropTtype    : "",
				prop_id          : "",
				updatestatus     : false,
			};
			this.radioChange = this.radioChange.bind(this);
		}

		componentDidMount(){			

        	var message	= localStorage.getItem("message");
        	
        	console.log("prop id ", this.props.prop_id);
        	var prop_id = this.props.prop_id ? this.props.prop_id : null;
		        if(prop_id !== null)
		        {
		        	this.setState({
		        		updatestatus : true,
		        	})
		        }
		        else{
		        	this.setState({
		        		updatestatus : false,
		        	})
		        }
        	// console.log("here var updatestatus",this.state.updatestatus);
        	axios
				.get('/api/properties/'+prop_id)
				.then( (res) =>{
					console.log("resposnse here===================>",res);

					this.setState({
								propertyHolder  : res.data.propertyHolder,
				        		transactionType : res.data.transactionType,
								propertyType 	: res.data.propertyType,
								propertySubType : res.data.propertySubType,
								// fullPropTtype   : 
							});

					this.refs.floor.value = res.data.floor;
					this.refs.totalfloor.value = res.data.totalFloor;
					
					var fullProp = this.state.propertyType+ '-' + this.state.propertySubType;
					console.log("here full type", fullProp);

					this.setState({

						fullPropTtype : fullProp,
					});
					// console.log("here propertyHolder",this.state.propertyHolder);	
					// console.log("here transactionType",this.state.transactionType);	
					console.log("here propertyType",this.state.propertyType);	
					console.log("here propertySubType",this.state.propertySubType);	
					// console.log("here this.refs.floor.value ",this.refs.floor.value );	
					// console.log("here this.refs.totalfloor.value ",this.refs.totalfloor.value );	

					if(this.state.propertyHolder === "owner")
					{
						  $('.sellerType1').addClass('highlight').siblings().removeClass('highlight'); 	
					}
					if(this.state.propertyHolder === "careTaker")
					{
						$('.sellerType2').addClass('highlight').siblings().removeClass('highlight'); 
					}
					if(this.state.propertyHolder === "broker")
					{
						$('.sellerType3').addClass('highlight').siblings().removeClass('highlight'); 	
					}

					
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});

			if(message === "NEW-USER-CREATED"){
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
		    
		     var $select = $(".Fl60");
		        $select.append($('<option></option>').val(-1).html("Basement"))
		        $select.append($('<option></option>').val(0).html("Ground"))

		    for (var i=1;i<=60;i++){
		        $select.append($('<option></option>').val(i).html(i))
		    }
		     var $select = $(".1-60");
		    for (var i=1;i<=60;i++){
		        $select.append($('<option></option>').val(i).html(i))
		    }
		}

		insertProperty(event){
			event.preventDefault();
			
			console.log("submit updatestatus",this.state.updatestatus);
			const formValues = {
				"propertyHolder" 	: this.state.propertyHolder,
        		"transactionType"	: this.state.transactionType,
				"propertyType"  	: this.state.propertyType,
				"propertySubType"	: this.state.propertySubType,
				"floor"         	: this.refs.floor.value,
				"totalFloor"    	: this.refs.totalfloor.value,
				"listing"       	: false,
				"status"			: "WIP",
				"uid" 				: localStorage.getItem("uid"),

			};
			console.log("BasicInfo===",formValues);
			if(this.state.propertyHolder!=="" && this.state.transactionType!=="" && this.state.propertyType!=="" && this.state.propertySubType!=="" && this.refs.floor.value!=="" && this.refs.totalfloor.value!=="" ){
				if(this.state.updatestatus=== true)
				{
					console.log("update axios");

					axios
					.patch('/api/properties',formValues)
					.then( (res) =>{
						console.log(res.data);
						if(res.status === 200){
							// swal("Good job!", "Property inserted successfully!", "success");
							localStorage.setItem('propertyId',res.data.property_id)
							console.log("BasicInfo res = ",res);
							this.props.redirectToLocation(res.data.propertyCode, res.data.property_id,this.props.uid);						
							this.props.propertyFlow(this.state.transactionType, this.state.propertyType);						
						}else{
							// alert(" Please Fill all fields")
						}
					})
					.catch((error) =>{
						console.log("error = ", error);
						// alert("Something Went wrong")
					});

				}else{

					axios
					.post('/api/properties',formValues)
					.then( (res) =>{
						console.log(res.data);
						if(res.status === 200){
							// swal("Good job!", "Property inserted successfully!", "success");
							localStorage.setItem('propertyId',res.data.property_id)
							console.log("BasicInfo res = ",res);
							this.props.redirectToLocation(res.data.propertyCode, res.data.property_id,this.props.uid);						
							this.props.propertyFlow(this.state.transactionType, this.state.propertyType);						
						}else{
							// alert(" Please Fill all fields")
						}
					})
					.catch((error) =>{
						console.log("error = ", error);
						// alert("Something Went wrong")
					});

				}
			}else{
				swal("Please enter mandatory fields", "", "warning");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
			}
			    
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


		const target = event.target.value;
        const name   = event.target.name;
        // console.log('target',name, target);
          this.setState({ 
	      [name]:target
	    },()=>{
	    	// console.log('this state', this.state);
	    })

	 	var selectedValue = event.currentTarget.value;
	 	var propertyTypeVal = selectedValue.split("-");
	 	var propertyType = propertyTypeVal[0];
	 	var propertySubType = propertyTypeVal[1];

 		this.setState({
 			propertyType : propertyType,
 			propertySubType : propertySubType,
 		});
	}
	totalFloor(){
		const floor      = parseInt(this.refs.floor.value);
		const totalfloor = parseInt(this.refs.totalfloor.value);

		// if(floor > totalfloor || floor != totalfloor){
		// 	swal("Floor should not be greater than Total Floors", "", "warning");
		// }

		if(floor > totalfloor){
			swal("Floor should not be greater than Total Floors", "", "warning");
		}
	}

	render() {
    return (
    	<div >
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  <div className="row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row mt30">	
				<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				  	 	<label>I am</label>
						<span className="astrick">*</span>
				  	 </div>
				  	<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 crc_mrg_btm"   >
				    	<div className="col-lg-1 sellerType1"  >
						    <label className="radio-inline ">
						      <input type="radio" 
						      		 value="Owner" 
						      		 className="FrRadio" 
						      		 id="radio-example1"
						      		 checked={this.state.propertyHolder === "owner"}
	               					 onChange={this.radioChange} />

					  			<i className=" logo1"><img src="/images/owner.png" alt="" /></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 sellerType2"  >
						    <label className="radio-inline ">
						      <input type="radio" 
						      		 value="Care Taker" 
						      		 className="FrRadio" 
						      		 id="radio-example2"
						      		 checked={this.state.propertyHolder === "careTaker"}
	               					 onChange={this.radioChange}/>

					  			<i className=" logo1"><img src="/images/careTaker.png" alt="" /></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 sellerType3"   >
						    <label className="radio-inline ">
						      <input type="radio"
						      		 value="Broker" 
						      		 className="FrRadio" 
						      		 id="radio-example3"
						      		 checked={this.state.propertyHolder === "broker"}
	               					 onChange={this.radioChange} 
						      		 />
					  			<i className=" logo1"><img src="/images/broker.png" alt="" /></i>
						    </label>
					    </div>
					</div>
					  	<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 mb-40">
					  			<span className="col-lg-4 ownerLeft "> Owner</span>
					  			<span className="col-lg-4 noPad"> Care Taker</span>
					  			<span className="col-lg-4 brokerLeft"> Broker</span>
					  	</div>
         		
					  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				   			<label>I would like to</label>
							<span className="astrick">*</span>

				   		</div>
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	    		
				  	 	<div className="form-group" id="">
							<div className="can-toggle genderbtn demo-rebrand-2 " value={this.state.transactionType} onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox" />
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle__switch" data-checked="Rent" data-unchecked="Sell" ></div>
				                <div className="can-toggle__label-text"></div>
				              </label>
			            	</div>
			            </div>
						</div>

						{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				   			<label>Property Details</label>
				   		</div>*/}
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5">
				   			 <b>Property Type</b>
							<span className="astrick">*</span>
				   		</div>

					   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						  <div className="form-group" id="">
						  	 <select className="custom-select form-control" ref="propertytype" name="fullPropTtype" value={this.state.fullPropTtype} onChange={this.selectProp.bind(this)}>
						    	<option	value="" hidden>Select Property Type </option>
						    	<option	disabled>ALL RESIDENTIAL </option>
						    	<option value="Residential-Studio Apartment">Studio Apartment</option>
						    	<option value="Residential-Residential House">Residential House</option>
						    	<option value="Residential-MultiStorey Apartment">MultiStorey Apartment</option>
						    	<option value="Residential-Villa">Villa</option>
						    	<option value="Residential-Penthouse">Penthouse</option>
						    	<option	disabled>ALL COMMERCIAL </option>
						    	<option value="Commercial-Commercial Office Space">Commercial Office Space</option>
						    	<option value="Commercial-Office in IT Park/SEZ">Office in IT Park/SEZ</option>
						    	<option value="Commercial-Commercial Shop">Commercial Shop</option>
						    	<option value="Commercial-Commercial Showroom">Commercial Showroom</option>
						    	<option value="Commercial-Warehouse/Godown">Warehouse/Godown </option>
						    	<option value="Commercial-Industrial Building">Industrial Building</option>
							</select>
							{/*<div className="errorMsg">{this.state.errors.bedroom}</div>*/}
						  </div>
					  	</div>

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5">
			  		<b>My Property is on</b>
					<span className="astrick">*</span>

			  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  row">
		  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
			  <div className="form-group" id="floor">
		  		<div className="input-group inputBox-main " id="">
			      	<div className="input-group-addon inputIcon">
                     	<i className=" iconClr"><img src="/images/floor.png" alt="" /></i>
                    </div>
			  		<select className="custom-select form-control Fl60"  ref="floor" placeholder="Floor" id='select'>
				    	<option value="" className="hidden">Floor</option>
				    	<option value="" className="hidden">Ground Floor</option>
					</select>
				</div>
			  </div>
			</div>

			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="totalfloor">
				  	{/*<input type="text" className="form-control" ref="totalfloor" id="exampleFormControlInput1" placeholder="Total floor"/>*/}
				  	<div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="iconClr"><img src="/images/floor.png" alt="" /></i>
	                    </div>
					  	<select className="custom-select form-control 1-60"  ref="totalfloor" onBlur={this.totalFloor.bind(this)} >
					    	<option value="" className="hidden">Total Floors</option>
						</select>
					</div>
				  </div>
			 </div>
		  </div>

			  	</div>
				  
				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 boxLayout">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<img alt=""  src="/images/2.png" className=""/>
					</div>
			  	</div>

			  </div>
				  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	
		  	<div className="form-group col-lg-3	col-md-2 col-sm-4 col-xs-4 pull-right mt40">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-2 col-sm-4 col-xs-4" onClick={this.insertProperty.bind(this)} >Save & Next &rArr;</button>
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
    prop_id         : state.prop_id,
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
		redirectToLocation  : (propertyCode, property_id,uid,prop_id)=> dispatch({type    : "REDIRECT_TO_LOCATION",
																		   propertyCode	: propertyCode,
																		   property_id	: property_id,
																		   uid          : uid,
																		   // prop_id 		: prop_id,
																	}),
		propertyFlow  : (transactionType, propertyType)=> dispatch({type    : "PROPERTY_FLOW",
																   transactionType	: transactionType,
																   propertyType	    : propertyType,
																   
																}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BasicInfo));