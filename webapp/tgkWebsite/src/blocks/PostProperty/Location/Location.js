import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from 'jquery';
import swal 					from 'sweetalert';		
import { connect } 				from 'react-redux';
import { withRouter}    		from 'react-router-dom';

import './Location.css';

class Location extends Component {

 	constructor(props){
			super(props);
			
			this.state = {
				"selected"  		: "",
				"listofStates"		: "",
				"listofBlocks"		: "",
				"listofCities"		: "",
		        "districtName" 		: "",
				"listofAreas"		: "",
				"village"			: "",
				"index" 			: "",
				"subAreaList"		: "",
				"societyList"		: "",
				"societyName"		: "",
				"pincode"			: "",
			};

			if(this.props.updateStatus === true){

	        	axios
					.get('/api/properties/'+this.props.prop_id)
					.then( (response) =>{
						console.log("get property = ",response);

						this.setState({
								stateCode 		: response.data.propertyLocation.stateCode,
						    	districtName 	: response.data.propertyLocationdistrictName,
						    	blockName 		: response.data.propertyLocation.blockName,
						    	cityName 		: response.data.propertyLocation.cityName,
						    	areaName 		: response.data.propertyLocation.areaName,
						});
						
					})
					.catch((error) =>{
						console.log("error = ", error);
					});

        	}

		}

	componentDidMount(){
	    axios({
	    	method: 'get',
	    	url: 'http://locationapi.iassureit.com/api/states/get/list/IN',
	    }).then((response)=> {
	        this.setState({
	        	listofStates : response.data
	        })
	    }).catch(function (error) {
	    	console.log('error', error);
	    });
	}
	insertLocation(event){
			event.preventDefault();	
			const formValues = {
				"countryCode" 		: "IN",
				"stateCode" 		: this.state.stateCode,
				"districtName" 		: this.state.districtName,
				"blockName" 		: this.state.blockName,
				"cityName" 			: this.state.cityName,
				"areaName" 			: this.state.areaName,
				"subAreaName"		: this.state.subareaName,
				"societyName"	    : this.state.societyName,
				"address" 	        : this.refs.housebuilding.value,
				"landmark" 			: this.refs.landmark.value,
				"pincode" 			: this.state.pincode,
				"property_id" 		: localStorage.getItem("propertyId"),
				"index"				: this.state.index,
				"uid" 				: localStorage.getItem("uid"),				
			};
			console.log("location formValues = ",formValues);

				localStorage.setItem("index",this.state.index);
				if(this.state.stateCode!="" && this.state.cityName!="" && this.state.areaName!="" && this.state.subareaName!="" && this.state.societyName!="" && this.refs.housebuilding.value!="" ){
					axios
					.patch('/api/properties/patch/propertyLocation',formValues)
					.then( (res) =>{
						if(res.status === 200){
							this.props.redirectToPropertyDetails(this.props.uid);
						}
					})
					.catch((error) =>{
						console.log("error = ", error);
					});
				}else{
					swal("Please enter mandatory fields", "", "warning");
	      			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}
			
		}

	backToBasicInfo(){
		this.props.backToBasicInfo();
	}


	selectState(event){
	    event.preventDefault();
	    var selectedState = event.currentTarget.value;
	    this.setState({
	    	stateCode : selectedState,
	    });

	    axios({
	      	method: 'get',
	      	url: 'http://locationapi.iassureit.com/api/cities/get/citiesByState/IN/'+selectedState,
	    }).then((response)=> {
	        this.setState({
	         	listofCities : response.data,
	        })
	    }).catch(function (error) {
	      	console.log('error', error);
	    });

	}

	selectCity(event){
	    event.preventDefault();
	    var dist_block_city = event.currentTarget.value;
	    // var districtName = $('option:selected', event.target).attr('data-districtname');
	    var districtName = dist_block_city.split('-')[0];
	    var blockName 	 = dist_block_city.split('-')[1];
	    var cityName 	 = dist_block_city.split('-')[2];

		var url = 'http://locationapi.iassureit.com/api/areas/get/list/IN/'+this.state.stateCode+'/'+districtName+'/'+blockName+'/'+cityName+'/' ;

	    this.setState({
	      districtName 	: districtName,
	      blockName 	: blockName,
	      cityName 		: cityName,
	    });

	    axios({
	      method: 'get',
	      url: url,
	    }).then((response)=> {
	        this.setState({
	          listofAreas : response.data
	        })
	    }).catch(function (error) {
	      console.log('error', error);
	    });

	}
	  
	selectArea(event){
		event.preventDefault();
		var areaName = event.currentTarget.value;

		if(this.state.listofAreas.length > 0){
			var index = this.state.listofAreas.findIndex( x => x.areaName === areaName);
		}
		this.setState({
		  areaName : areaName,
		  pincode : this.state.listofAreas[index].pincode,
		});



		var url = 'http://locationapi.iassureit.com/api/subareas/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/'+areaName+'/' ;

		axios({
		  method: 'get',
		  url: url,
		}).then((response)=> {
		    this.setState({
		      subAreaList : response.data
		    })
		}).catch(function (error) {
		  console.log('error', error);
		});

	}

	handleSubarea(event){
		var valSubAreaName = event.currentTarget.value;
		if(valSubAreaName == ""){
			return;
		}
		
		this.setState({subareaName : valSubAreaName});
		var index = -1;

		if(this.state.subAreaList.length > 0){
			index = this.state.subAreaList.findIndex( x => x.subareaName === valSubAreaName);
		}
		var url = "";
		console.log("index = ",index);

		if(index < 0){
			const formValues ={
				countryCode 	: "IN",
				stateCode 		: this.state.stateCode,
			    districtName 	: this.state.districtName,
			    blockName 		: this.state.blockName,
			    cityName 		: this.state.cityName,
			    areaName 		: this.state.areaName,
			    subareaName		: valSubAreaName,
			};

			url = 'http://locationapi.iassureit.com/api/subareas/post';

		    axios
			    .post(url, formValues)
			    .then((response)=> {
			    	console.log("subareas submitted = ",response);
			    }).catch(function (error) {
			      console.log('error', error);
			    });

		}else{
			url = 'http://locationapi.iassureit.com/api/societies/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/'+this.state.areaName+'/'+valSubAreaName+'/' ;
		    console.log("societies URL = ", url);
		    axios({
		      method: 'get',
		      url: url,
		    }).then((response)=> {
		    	console.log("societies = ", response.data);
		        this.setState({
		          societyList : response.data,
		        })
		    }).catch(function (error) {
		      console.log('error', error);
		    });			
		}


	}

	handleSociety(event){
		var valSocietyName = event.currentTarget.value;
		if(valSocietyName == ""){
			return;
		}

		this.setState({societyName : valSocietyName});
		var index = -1;		

		if(this.state.societyList.length > 0){
			index = this.state.societyList.findIndex( x => x.societyName === valSocietyName);
		}
		var url = "";

		console.log("index = ",index);
		if(index < 0){
			const formValues ={
				countryCode 	: "IN",
				stateCode 		: this.state.stateCode,
			    districtName 	: this.state.districtName,
			    blockName 		: this.state.blockName,
			    cityName 		: this.state.cityName,
			    areaName 		: this.state.areaName,
			    subareaName		: this.state.subareaName,
			    societyName		: this.state.societyName,
			};

			url = 'http://locationapi.iassureit.com/api/societies/post';

		    axios
			    .post(url, formValues)
			    .then((response)=> {
			    	console.log("societies submitted = ",response);
			    }).catch(function (error) {
			      console.log('error', error);
			    });
		}
	}
	pincodeChange(event){
		var pincode =event.currentTarget.value;
		this.setState({
			pincode : pincode,
		});
	}

	handlePincode(event){
		event.preventDefault();
		var pincode =event.currentTarget.value;
		this.setState({
			pincode : pincode,
		});

		console.log("pincode",pincode);
		var url = 'http://locationapi.iassureit.com/api/areas/get/list/'+pincode;

		axios({
		  method: 'get',
		  url: url,
		}).then((response)=> {
			console.log("area from pincode",response.data);
			if(response.data){
			    this.setState({
			    	stateCode 		: response.data[0].stateCode,
			    	districtName 	: response.data[0].districtName,
			    	blockName 		: response.data[0].blockName,
			    	cityName 		: response.data[0].cityName,
			    	areaName 		: response.data[0].areaName,
			    },()=>{
			    	//========== Get City List  =====================
			    	url = 'http://locationapi.iassureit.com/api/cities/get/citiesByState/IN/'+this.state.stateCode;
				    axios({
				      	method: 'get',
				      	url: url,
				    }).then((response)=> {
				        this.setState({
				         	listofCities : response.data,
				        })
				    }).catch(function (error) {
				      	console.log('error', error);
				    });


			    	//========== Get Area List  =====================
					url = 'http://locationapi.iassureit.com/api/areas/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/' ;
				    axios({
				      method: 'get',
				      url: url,
				    }).then((response)=> {
				        this.setState({
				          listofAreas : response.data
				        })
				    }).catch(function (error) {
				      console.log('error', error);
				    });


			    	//========== Get SubArea List  =====================
					url = 'http://locationapi.iassureit.com/api/subareas/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/'+this.state.areaName+'/' ;
					axios({
						method: 'get',
						url: url,
					}).then((response)=> {
					    this.setState({
					    	subAreaList : response.data
					    })
					}).catch(function (error) {
					  console.log('error during subAreaList', error);
					});

			    });
			}
		}).catch(function (error) {
		  console.log('error during pincode', error);
		});
	}




	render() {
		var cityName = this.state.city;
	    var areaName = this.state.area;
	    var subareaName = this.state.subArea;
	    var societyName = this.state.society;

	    if(cityName != null &&  areaName != null && subareaName != null && societyName != null)
	    {
	       var first  = cityName.toUpperCase().slice(0,2);
	       var second = areaName.toUpperCase().slice(0,2);
	       var third  = subareaName.toUpperCase().slice(0,2);
	       var forth  = societyName.toUpperCase().slice(0,2);

	       this.state.index = first+second+third+forth;
	       // console.log("index here", this.state.index);
	    }

			return (
				<div >
				<div  className="col-lg-12 col-md-12 col-sm-12 mt40">
				    <div className="row"></div>
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				    	<span className="locSpan col-lg-2 col-lg-offset-2  ">Pincode </span>
				    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group">
							    <div className="input-group inputBox-main " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    <input type="text" value={this.state.pincode} className="form-control" ref="pincode"  placeholder="Enter Pincode" onChange={this.pincodeChange.bind(this)} onBlur={this.handlePincode.bind(this)}/>
							  	</div>
						</div>
				    </div>
				    <div className="orSeparatorLine col-lg-8 col-lg-offset-2"> 
				    	<div className="wordContainer col-lg-1 col-lg-offset-5"> 
				    		OR 
						</div>    			    		
				    </div>    
				<div id="location">    
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
					    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						    <div className="form-group" id="">
						    	<span htmlFor="">State</span>
								<span className="astrick">*</span>
						  		<div className=" " id="">
								  	<select className="custom-select form-control"   ref="state" placeholder="select" id="selectState" value={this.state.stateCode}  onChange={this.selectState.bind(this)}>
								    	<option value="">-- State --</option>
								    	{
	                                    this.state.listofStates ?
	                                    this.state.listofStates.map((data, index)=>{
	                                      return(
	                                        <option key={index} value={data.stateCode}> {data.stateName} </option> 
	                                      );
	                                    })
	                                    :
	                                    null
	                                  }
									</select>
								</div>
						  </div>
					    </div>
					    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						    <div className="form-group" id="">
						    	<span htmlFor="">City</span>
								<span className="astrick">*</span>

						  		<div className=" " id="">
								  	<select className="custom-select form-control " value={this.state.districtName+'-'+this.state.blockName+'-'+this.state.cityName} name="city" ref="city" placeholder="select"  id="selectCity" onChange={this.selectCity.bind(this)} >
								    	<option value="">-- City --</option>
								    	{
	                                    this.state.listofCities.length > 0 ? 
	                                    this.state.listofCities.map((data, index)=>{
	                                      return(
	                                        <option key={index} value={data.districtName+'-'+data.blockName+'-'+data.cityName}> {data.cityName}</option>                                        
	                                      );
	                                    })
	                                    :
	                                    <option disabled>Select State first</option>
	                                  }     
									</select>
								</div>
						  </div>
					    </div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<div className="form-group" id="">
							    <span htmlFor="">Area/Suburb </span>
								<span className="astrick">*</span>

							    <div className=" " id="">
								    <select className="custom-select form-control" value={this.state.areaName} name="village" onChange={this.selectArea.bind(this)} name="area" ref="area" placeholder="select" id="selectArea">
								    	<option value="">-- Area --</option>
								    	{
	                                    this.state.listofAreas && this.state.listofAreas.length > 0 ? 
	                                    this.state.listofAreas.map((data, index)=>{
	                                      return(
	                                        <option key={index} value={data.areaName} >{data.areaName}</option>
	                                        
	                                      );
	                                    })
	                                    :
	                                    <option disabled>Select State first</option>
	                                  }   
									</select>
								</div>
							  </div>
						</div>
					    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<div className="form-group" id="">
							    <span htmlFor="">Sub-Area</span>
								<span className="astrick">*</span>

							    <div className=" " id="">
								    <input type="text" list="subAreaList" className="form-control" ref="subArea" name="subArea" placeholder="Enter Subarea" onBlur={this.handleSubarea.bind(this)}/>
								    <datalist id="subAreaList">
								    	{this.state.subAreaList.length>0 ? 
								    		this.state.subAreaList.map( (subArea,index)=>{
									    		return(<option value={subArea.subareaName} key={index} />)
								    		})
								    		: ""
								    	}
								    </datalist>
								</div>
							</div>
					    </div>
				    </div>
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm" >
				  		<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
						  	<div className="form-group"  id="" >
							    <span htmlFor="">Society</span>
								<span className="astrick">*</span>

							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                 <i className="fa fa-building iconClr"></i>
				                    </div>
								    <input type="text" list="societyList" className="form-control" ref="society"  name="society" placeholder="Enter Society" onBlur={this.handleSociety.bind(this)}/>
								    <datalist id="societyList">
								    	{this.state.societyList.length>0 ? 
								    		this.state.societyList.map( (society,index)=>{
									    		return(<option value={society.societyName} key={index} />)
								    		})
								    		: ""
								    	}
								    </datalist>
							  	</div>
					        </div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
							  <div className="form-group"  id="" >
								    <span htmlFor="">House/Building Number</span>
									<span className="astrick">*</span>

							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" ref="housebuilding"  placeholder="Enter House Address"/>
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
							  <div className="form-group"  id="" >
								    <span htmlFor="">Landmark</span>

							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" ref="landmark"  placeholder="Landmark "/>
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
				    </div>
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40 ">
				  	{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
				       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToBasicInfo.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
				  	</div>*/}
				  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
				       <button className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.insertLocation.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
				  	</div>
				</div>
			</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		uid				:state.uid,
		property_id     : state.property_id,
		BasicInfo		: state.BasicInfo,
		PropertyDetails	: state.PropertyDetails,
		Financials		: state.Financials,
		Amenities		: state.Amenities,
		Availability	: state.Availability,
		Location	 	: state.Location,
		prop_id         : state.prop_id,
		updateStatus    : state.updateStatus,		
	}
};


const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToPropertyDetails   : (uid)=> dispatch({type: "REDIRECT_TO_PROPERTY",
														uid:uid
									}),
		backToBasicInfo  			: ()=> dispatch({type: "BACK_TO_BASIC_INFO"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Location));