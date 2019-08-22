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
				originalValues      : '',
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
				"updateOperation"   : false,
			};

			this.handleChange = this.handleChange.bind(this);

			console.log("property_id",this.props.property_id);
			if(this.props.updateStatus === true){

	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (response) =>{
						console.log("get property in location = ",response);

						this.setState({
								originalValues  : response.data.propertyLocation,
								stateCode 		: response.data.propertyLocation.state,
						    	districtName 	: response.data.propertyLocation.district,
						    	blockName 		: response.data.propertyLocation.block,
						    	cityName 		: response.data.propertyLocation.city,
						    	areaName 		: response.data.propertyLocation.area,
						    	subAreaName 	: response.data.propertyLocation.subArea,
								societyName     : response.data.propertyLocation.society,
								address 	    : response.data.propertyLocation.address,
								landmark		: response.data.propertyLocation.landmark,
								pincode 	 	: response.data.propertyLocation.pincode,
								updateOperation : true,

						},()=>{
							console.log("cityName",this.state.cityName);
							console.log("areaName",this.state.areaName);
							console.log("subAreaName",this.state.subAreaName);

							        //==================================================================
							        // 			Get Cities
							        //==================================================================

								    axios({
								      	method: 'get',
								      	url: 'http://locationapi.iassureit.com/api/cities/get/citiesByState/IN/'+response.data.propertyLocation.state,
								    }).then((response1)=> {
								        this.setState({
								         	listofCities : response1.data,
								        })

							        //==================================================================
							        // 			Get Areas
							        //==================================================================

									var url = 'http://locationapi.iassureit.com/api/areas/get/list/IN/'+response.data.propertyLocation.state+'/'+response.data.propertyLocation.district+'/'+response.data.propertyLocation.block+'/'+response.data.propertyLocation.city+'/' ;
								    axios({
								      method: 'get',
								      url: url,
								    }).then((response2)=> {
								        this.setState({
								          listofAreas : response2.data
							        	})

							        //==================================================================
							        // 			Get SubAreas
							        //==================================================================
									var url = 'http://locationapi.iassureit.com/api/subareas/get/list/IN/'+response.data.propertyLocation.state+'/'+response.data.propertyLocation.district+'/'+response.data.propertyLocation.block+'/'+response.data.propertyLocation.city+'/'+response.data.propertyLocation.area+'/' ;

									axios({
									  method: 'get',
									  url: url,
									}).then((response3)=> {
									    this.setState({
									      subAreaList : response3.data
									    })
									}).catch(function (error) {
									  console.log('error', error);
									});


							    }).catch(function (error) {
							      console.log('error', error);
							    });



						    }).catch(function (error) {
						      	console.log('error', error);
						    });							
						});

						if(this.state.cityName != null &&  this.state.areaName != null && this.state.subAreaName != null && this.state.societyName != null)
					    {
					       var first  = this.state.cityName.toUpperCase().slice(0,2);
					       var second = this.state.areaName.toUpperCase().slice(0,2);
					       var third  = this.state.subAreaName.toUpperCase().slice(0,2);
					       var forth  = this.state.societyName.toUpperCase().slice(0,2);

					       var indexData = first+second+third+forth;

					       this.setState({
					       	index : indexData,
					       });
					      
					    }

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

			if(this.state.updateOperation === true){
				console.log("update fun");
				var ov = this.state.originalValues;

				if(this.state.stateCode === ov.state && this.state.districtName === ov.district && this.state.blockName === ov.block &&
					this.state.cityName === ov.city && this.state.areaName === ov.area && this.state.subAreaName === ov.subArea &&
					this.state.societyName === ov.society && this.state.address === ov.address && this.state.landmark === ov.landmark &&
					this.state.pincode === ov.pincode)
				{
						console.log("same data");
						console.log("this.props.property_id",this.props.property_id);
						this.props.redirectToPropertyDetails(this.props.uid,this.props.property_id);
						
				}else{
						console.log("diff data");

						const formValues = {
						"countryCode" 		: "IN",
						"stateCode" 		: this.state.stateCode,
						"districtName" 		: this.state.districtName,
						"blockName" 		: this.state.blockName,
						"cityName" 			: this.state.cityName,
						"areaName" 			: this.state.areaName,
						"subAreaName"		: this.state.subAreaName,
						"societyName"	    : this.state.societyName,
						"address" 	        : this.state.address,
						"landmark" 			: this.state.landmark,
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
									this.props.redirectToPropertyDetails(this.props.uid,this.props.prop_id);
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

			}else{
						console.log("submit fun");

					const formValues = {
					"countryCode" 		: "IN",
					"stateCode" 		: this.state.stateCode,
					"districtName" 		: this.state.districtName,
					"blockName" 		: this.state.blockName,
					"cityName" 			: this.state.cityName,
					"areaName" 			: this.state.areaName,
					"subAreaName"		: this.state.subAreaName,
					"societyName"	    : this.state.societyName,
					"address" 	        : this.state.address,
					"landmark" 			: this.state.landmark,
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
								this.props.redirectToPropertyDetails(this.props.uid,this.props.prop_id);
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
			
			
		}

	backToBasicInfo(){
		this.props.backToBasicInfo();
		console.log("this.props.uid",this.props.uid);
		console.log("this.props.prop_id",this.props.prop_id);
		console.log("localStorage.getItem(propertyId)",localStorage.getItem("propertyId"));

		this.props.backToBasicInfo(this.props.uid,localStorage.getItem("propertyId"));
						
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

		 const target = event.target.value;
        const name   = event.target.name;
        // console.log('target',name, target);
          this.setState({ 
	      [name]:target
	    },()=>{
	    	console.log('this name in area', name);
	    	console.log('this target in area', target);

	    })

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


	handleChange(event){
        const target = event.target.value;
        const name   = event.target.name;
        // console.log('target',name, target);
          this.setState({ 
	      [name]:target
	    },()=>{
	    	// console.log('this name', name);
	    	// console.log('this target', target);

	    })
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
								    <select className="custom-select form-control" value={this.state.areaName} name="areaName" onChange={this.selectArea.bind(this)} name="area" ref="area" placeholder="select" id="selectArea">
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
								    <input type="text" list="subAreaList" className="form-control" value={this.state.subAreaName} ref="subArea" name="subAreaName" placeholder="Enter Subarea" onChange={this.handleChange.bind(this)} onBlur={this.handleSubarea.bind(this)}/>
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
								    <input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} name="societyName" placeholder="Enter Society" onChange={this.handleChange.bind(this)}  onBlur={this.handleSociety.bind(this)}/>
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
							    <input type="text" className="form-control" ref="housebuilding" name="address" value={this.state.address} onChange={this.handleChange.bind(this)} placeholder="Enter House Address"/>
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
							    <input type="text" className="form-control" name="landmark" ref="landmark" value={this.state.landmark}  onChange={this.handleChange.bind(this)} placeholder="Landmark "/>
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
				    </div>
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40 ">
				  	{
				  		<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
				          <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToBasicInfo.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
				  	    </div>
				  	   
				  	}
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
		// prop_id         : state.prop_id,
		updateStatus    : state.updateStatus,		
	}
};


const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToPropertyDetails   : (uid,property_id)=> dispatch({type: "REDIRECT_TO_PROPERTY",
														uid:uid,
														property_id : property_id
									}),
		backToBasicInfo  			: (uid,property_id)=> dispatch({type: "BACK_TO_BASIC_INFO",
														uid:uid,
														property_id : property_id
														
									}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Location));