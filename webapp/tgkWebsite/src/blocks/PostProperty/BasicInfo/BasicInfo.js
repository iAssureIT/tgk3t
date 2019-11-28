import React , { Component }  from 'react';
import axios 				  from 'axios';
import $ 					  from "jquery";
import swal                   from 'sweetalert';
import { connect } 			  from 'react-redux';
import { withRouter}  		  from 'react-router-dom';
import Geocode                from "react-geocode";
import './BasicInfo.css';


const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
var count = 0;
const companypincodeRegex = RegExp(/^[1-9][0-9]{5}$/);

Geocode.setApiKey("");
Geocode.enableDebug();

var lattitude = "";
var longitude = "";


class BasicInfo extends Component{

		constructor(props){
			super(props);
			this.state = {
				originalValues   : '',
				transactionType  : "Sell",
				propertyHolder   : "",
				propertyType 	 : "",
				propertySubType  : "",
				// user_id 		 : localStorage.getItem("user_id"),
				fullPropTtype    : "",
				property_id      : "",
				updateOperation  : false,
				propertyCode     : "",
			
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
				"formerrors" :{
        			"pincode" : " ",
      			},

      			originalValuesLocation : "",
      			type 					:true,
      			fullAddress             : "",
      			country             : "India",
      			googleDataKey 		: ""

			};
			this.handleChange = this.handleChange.bind(this);
			this.radioChange = this.radioChange.bind(this);

        	// console.log("this.props.updateStatus inbasicinfo= ",this.props.updateStatus);
        	// console.log("this.props.property_id in basicinfo= ",this.props.property_id);

        	if(this.props.updateStatus === true){

	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (res) =>{
						console.log("get property = ",res);
						// console.log("get property transactionType = ",res.data.transactionType);
						this.setState({
									originalValues  : res.data,
									propertyHolder  : res.data.propertyHolder,
					        		transactionType : res.data.transactionType,
					        		type 			: res.data.transactionType==="Sell" ? true : false,
									propertyType 	: res.data.propertyType,
									propertySubType : res.data.propertySubType,

									// floor 			: res.data.floor,
									// totalfloor 		: res.data.totalFloor,
									fullPropTtype 	: res.data.propertyType+'-'+res.data.propertySubType,
									updateOperation : true,
									propertyCode	: res.data.propertyCode,

									// location
									originalValuesLocation  : res.data.propertyLocation,
									stateCode 		: res.data.propertyLocation.state,
							    	districtName 	: res.data.propertyLocation.district,
							    	blockName 		: res.data.propertyLocation.block,
							    	cityName 		: res.data.propertyLocation.city,
							    	areaName 		: res.data.propertyLocation.area,
							    	subAreaName 	: res.data.propertyLocation.subArea,
									societyName     : res.data.propertyLocation.society,
									address 	    : res.data.propertyLocation.address,
									landmark		: res.data.propertyLocation.landmark,
									pincode 	 	: res.data.propertyLocation.pincode,
									fullAddress 	: res.data.propertyLocation.fullAddress,

								},()=>{
										// location
										// console.log("cityName",this.state.cityName);
										// console.log("areaName",this.state.areaName);
										// console.log("subAreaName",this.state.subAreaName);
										// console.log("type2",this.state.type);
										// console.log("fullAddress",this.state.fullAddress);

										        //==================================================================
										        // 			Get Cities
										        //==================================================================

											    axios({
											      	method: 'get',
											      	url: 'http://locationapi.iassureit.com/api/cities/get/citiesByState/IN/'+res.data.propertyLocation.state,
											    }).then((response1)=> {
											        this.setState({
											         	listofCities : response1.data,
											        })

										        //==================================================================
										        // 			Get Areas
										        //==================================================================

												var url = 'http://locationapi.iassureit.com/api/areas/get/list/IN/'+res.data.propertyLocation.state+'/'+res.data.propertyLocation.district+'/'+res.data.propertyLocation.block+'/'+res.data.propertyLocation.city+'/' ;
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
												var url = 'http://locationapi.iassureit.com/api/subareas/get/list/IN/'+res.data.propertyLocation.state+'/'+res.data.propertyLocation.district+'/'+res.data.propertyLocation.block+'/'+res.data.propertyLocation.city+'/'+res.data.propertyLocation.area+'/' ;

												axios({
												  method: 'get',
												  url: url,
												}).then((response3)=> {
												    this.setState({
												      subAreaList : response3.data
												    })
												}).catch((error)=>{
							                        console.log("error = ",error);
							                        if(error.message === "Request failed with status code 401")
							                        {
							                             swal("Your session is expired! Please login again.","", "error");
														localStorage.removeItem("uid");
														localStorage.removeItem("token");
							                             this.props.history.push("/");
							                        }
							                    });


										    }).catch((error)=>{
						                        console.log("error = ",error);
						                        if(error.message === "Request failed with status code 401")
						                        {
						                             swal("Your session is expired! Please login again.","", "error");
													localStorage.removeItem("uid");
													localStorage.removeItem("token");
						                             this.props.history.push("/");
						                        }
						                    });



									    }).catch((error)=>{
					                        console.log("error = ",error);
					                        if(error.message === "Request failed with status code 401")
					                        {
					                             swal("Your session is expired! Please login again.","", "error");
												localStorage.removeItem("uid");
												localStorage.removeItem("token");
					                             this.props.history.push("/");
					                        }
					                    });	
					                    // close set state
								});
						// location
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


						if(res.data.propertyHolder === "Owner"){
							$('.sellerType1').addClass('highlight').siblings().removeClass('highlight'); 	
						}
						if(res.data.propertyHolder === "Care Taker"){
							$('.sellerType2').addClass('highlight').siblings().removeClass('highlight'); 
						}
						if(res.data.propertyHolder === "Broker"){
							$('.sellerType3').addClass('highlight').siblings().removeClass('highlight'); 	
						}
						if(res.data.propertyHolder === "Flatmate"){
							$('.sellerType4').addClass('highlight').siblings().removeClass('highlight'); 	
						}

						
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



		}

		componentDidMount(){	
		// console.log("here basic info");	
			axios
				    .get('/api/projectSettings/get/one/GOOGLE')
				    .then(
				      (res)=>{
				        const postCount = res.data;
				        
				        this.setState({
				          googleDataKey : postCount,
				        },()=>{
				        	
				        console.log("aaaaa.....",this.state.googleDataKey);
				        });
				      }
				    )
				    .catch();

      		axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

        	var message	= localStorage.getItem("message");
        	
			if(message === "NEW-USER-CREATED"){
				swal("Welcome!","You are now logged in!","success");
			}			

			// $('#radio-example1 ').click(function(){				    	
		 //        $('.sellerType1').addClass('highlight').siblings().removeClass('highlight');       
		 //    });
		 //    $('#radio-example2').click(function(){
		 //        $('.sellerType2').addClass('highlight').siblings().removeClass('highlight');       
		 //    });
		 //    $('#radio-example3').click(function(){
		 //        $('.sellerType3').addClass('highlight').siblings().removeClass('highlight');       
		 //    });
		 //    $('#radio-example4').click(function(){
		 //        $('.sellerType4').addClass('highlight').siblings().removeClass('highlight');       
		 //    });
		    
		    axios({
	    	method: 'get',
	    	url: 'http://locationapi.iassureit.com/api/states/get/list/IN',
		    }).then((response)=> {
		        this.setState({
		        	listofStates : response.data
		        })
		    }).catch((error)=>{
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

	 handleChange(event){
	    // const target = event.target;
	    // const {name , value}   = event.target;
	    const datatype = event.target.getAttribute('data-text');
	    const {name,value} = event.target;
	    let formerrors = this.state.formerrors;
	    
	    // console.log("datatype",datatype);
	    switch (datatype){

	     case 'pincode' : 
	        formerrors.pincode = companypincodeRegex.test(value)  && value.length>0 ? '' : "Invalid Pincode";
	      break;

	      default :
	      break;

	    }
	    // this.setState({formerrors,})
	    this.setState({ formerrors,
	      [name]:value
	    } );
	    
	   
	  }

		insertProperty(event){
			event.preventDefault();	

			var lattitude = "";
    		var longitude = "";	

    		// var fullAddress = this.state.landmark + '+' + this.state.areaName + '+' + this.state.cityName + '+' + this.state.stateCode + '+' + this.state.country + '+' + this.state.pincode ;
      // 	console.log("fullAddress=====",fullAddress)
      // 	Geocode.fromAddress(fullAddress).then(
      //   response => {
      //     console.log("google map API keay result--->",response.data);             
      //     const { lat, lng } = response.results[0].geometry.location;
          // lattitude = lat;
          // longitude = lng;

			var formValues = {
				"propertyHolder" 	: this.state.propertyHolder,
        		"transactionType"	: this.state.transactionType,
				"propertyType"  	: this.state.propertyType,
				"propertySubType"	: this.state.propertySubType,
				// "floor"         	: this.state.floor,
				// "totalFloor"    	: this.state.totalfloor,
				"listing"       	: false,
				"status"			: "WIP",
				"uid" 				: localStorage.getItem("uid"),
				"property_id"		: this.props.property_id,

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
				"index"				: this.state.index,
				"type" 				: this.state.transactionType==="Sell" ? true : false,
				"fullAddress" 		: this.state.fullAddress,
            	"location"          : {latitude: lattitude,longitude:longitude},


				// "uid" 				: localStorage.getItem("uid"),		

			};


			 /*=================Count==========================*/
        	var count = 0;
            var Tcount = 0;
            // var newData = formValues;
            formValues = JSON.stringify(formValues, replaceUndefinedOrNull.bind(this));
        	formValues = JSON.parse(formValues);
            function replaceUndefinedOrNull(key, value) {    
                Tcount = Tcount + 1;
                 this.setState({
                         Tcount  : Tcount
                       },()=>{
                        formValues.Fcount1 = this.state.Tcount;                                                        
                 })
                  if (value === ""){
                  	console.log("key-====",key)
                       count = count+1;
                       this.setState({
                         setCount  : count
                       },()=>{
                        formValues.setCount1 = this.state.setCount;
                        var formFillPercentage = ((Tcount-this.state.setCount)/Tcount) * 100;
                        formValues.formFillPercentage1 = (formFillPercentage).toFixed(2);                             
                       })
                        return count;
                  }
                  return value;
            }


            // console.log("formValues",formValues);


        /*===========================================*/

				
			console.log("BasicInfo===",formValues);
			if(this.state.propertyHolder!=="" && this.state.transactionType!=="" && this.state.propertyType!=="" && this.state.propertySubType!=="" && 
				this.state.pincode!=="" && this.state.stateCode!=="" && this.state.cityName!=="" && this.state.areaName!=="" && this.state.subAreaName!=="" && this.state.societyName!==""  ){
				if(this.state.updateOperation === true){
					// console.log("update fun");
					var ovLoc = this.state.originalValuesLocation;
					var ov = this.state.originalValues;
					if(this.state.propertyHolder === ov.propertyHolder && this.state.transactionType === ov.transactionType
						&& this.state.propertyType === ov.propertyType && this.state.propertySubType === ov.propertySubType && 
						this.state.pincode === ovLoc.pincode && this.state.stateCode === ovLoc.state && this.state.cityName === ovLoc.city && 
						this.state.areaName === ovLoc.area && this.state.subAreaName === ovLoc.subArea && this.state.societyName === ovLoc.society &&
						this.state.address === ovLoc.address &&  this.state.landmark === ovLoc.landmark &&  this.state.fullAddress === ovLoc.fullAddress
						)
					{
						// console.log("same data");
						// console.log("same data22",this.state.type);
						
					localStorage.setItem('propertyId',this.props.property_id);
					localStorage.setItem("index",this.state.index);

					this.props.redirectToPropertyDetails(this.props.uid,this.props.property_id);
					
					// this.props.redirectToLocation(this.state.propertyCode, this.props.property_id,this.props.uid);						
					this.props.propertyFlow(this.state.transactionType, this.state.propertyType);						
						

					}else{

						console.log("diff data");
						axios
						.patch('/api/properties/patch/properties',formValues)
						.then( (res) =>{
							console.log("here updated data",res);
							if(res.status === 200){
								localStorage.setItem('propertyId',this.props.property_id);
								localStorage.setItem("index",this.state.index);

								this.props.redirectToPropertyDetails(this.props.uid,this.props.property_id);
								// this.props.redirectToLocation(this.state.propertyCode, this.props.property_id,this.props.uid);						
								this.props.propertyFlow(this.state.transactionType, this.state.propertyType);						
							}else{
							}
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
					

				}else{
					console.log("submit data");



					axios
					.post('/api/properties',formValues)
					.then( (res) =>{
						console.log(res.data);
						if(res.status === 200){
							// swal("Good job!", "Property inserted successfully!", "success");
							console.log("here prop id",res.data.property_id);
							localStorage.setItem('propertyId',res.data.property_id);
							localStorage.setItem("index",this.state.index);

							// console.log("BasicInfo res = ",res);
							// console.log("propertyCode",res.data.propertyCode);
							// this.props.prop_id = res.data.property_id;
							this.props.redirectToPropertyDetails(this.props.uid,this.props.property_id);
							// this.props.redirectToLocation(res.data.propertyCode, res.data.property_id,this.props.uid);						
							this.props.propertyFlow(this.state.transactionType, this.state.propertyType);						
						}else{
							// alert(" Please Fill all fields")
						}
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
			}else{
				swal("Please enter mandatory fields", "", "warning");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
			}
		// },
		// 	error => {
  //           swal("Oops...!", "google map key has problem. Please contact to admin", "warning");
  //           console.error("map key error = ",error);
  //         }
  //       );  
       
			    
		}
		
      	handleToggle(event){
      			event.preventDefault();
      		console.log("this.state.type",this.state.type)
		    if (this.state.type===true){
		      this.setState({
		        type: false,
		        transactionType:"Rent"
		      },()=>{
      				console.log("this.state.type",this.state.type)

		      })
		    }
		    else{
		      this.setState({
		        type: true,
		        transactionType:"Sell"

		      },()=>{
      				console.log("this.state.type",this.state.type)
		      })
		    }   
		}
	   radioChange(event) {
	   	event.preventDefault()
	    	this.setState({
	      	"propertyHolder": event.currentTarget.value,
		    },()=>{
		    	// console.log('propertyHolder s++++++',this.state.propertyHolder)			    
			    // $('#radio-example1 ').click(function(){
			    //     $('.sellerType1').addClass('highlight').siblings().removeClass('highlight');       
			    // });
			    // $('#radio-example2').click(function(){
			    //     $('.sellerType2').addClass('highlight').siblings().removeClass('highlight');       
			    // });
			    // $('#radio-example3').click(function(){
			    //     $('.sellerType3').addClass('highlight').siblings().removeClass('highlight');       
			    // });
			    // $('#radio-example4').click(function(){
			    //     $('.sellerType4').addClass('highlight').siblings().removeClass('highlight');       
			    // });
		    });
			$(event.currentTarget).parent().parent().addClass('highlight');       
			$(event.currentTarget).parent().parent().siblings().removeClass('highlight');       
			console.log("propertyHolder====",event.currentTarget.value)
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
	/*totalFloor(){
		const floor      = parseInt(this.refs.floor.value);
		const totalfloor = parseInt(this.refs.totalfloor.value);
		if(floor > totalfloor){
			swal("Floor should not be greater than Total Floors", "", "warning");
		}

		this.setState({totalfloor : totalfloor});

	}*/

	/*floorChange(event){
		var floor = event.currentTarget.value;
		this.setState({floor : floor});
	}*/


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

		// console.log("index = ",index);
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
			    }).catch((error)=>{
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
	    }).catch((error)=>{
                        // console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
							localStorage.removeItem("uid");
							localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
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
	    }).catch((error)=>{
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
	selectArea(event){
		event.preventDefault();
		var areaName = event.currentTarget.value;

		 const target = event.target.value;
        const name   = event.target.name;
        // console.log('target',name, target);
          this.setState({ 
	      [name]:target
	    },()=>{
	    	// console.log('this name in area', name);
	    	// console.log('this target in area', target);

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
		}).catch((error)=>{
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
			    }).catch((error)=>{
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
		    }).catch((error)=>{
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

	handlePincode(event){
		event.preventDefault();
		var pincode =event.currentTarget.value;
		this.setState({
			pincode : pincode,
		});

		// console.log("pincode",pincode);
		var url = 'http://locationapi.iassureit.com/api/areas/get/list/'+pincode;

		axios({
		  method: 'get',
		  url: url,
		}).then((response)=> {
			// console.log("area from pincode",response.data);
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
				    }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
							localStorage.removeItem("uid");
							localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
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
				    }).catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
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
					}).catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				        });

			    });
			}
		}).catch((error)=>{
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


	render() {
		// console.log("transactionType=>",this.state.transactionType);
		// console.log("type=>",this.state.type);
		console.log("fullAddress",this.state.fullAddress);
		console.log("subAreaList",this.state.subAreaList)
		var cityName = this.state.cityName;
	    var areaName = this.state.areaName;
	    var subareaName = this.state.subAreaName;
	    var societyName = this.state.societyName;

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
          <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  <div className="row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt30">	
				<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 noPad">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				  	 	<label htmlFor="iAm">I am</label>
						<span className="astrick">*</span>
				  	 </div>
				  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 crc_mrg_btm noPad"   >
				    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 sellerType1"  >
						    <label htmlFor="" className="radio-inline ">
						      <input type="radio" 
						      		 value="Owner"
						      		 name="owner" 
						      		 className="FrRadio" 
						      		 id="radio-example1"
						      		 checked={this.state.propertyHolder === "Owner"}
	               					 onChange={this.radioChange} />
					  			<i className=" logo1"><img src="/images/owner.png" alt="" /></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 col-sm-1 col-xs-1 col-xs-offset-1 sellerType2"  >
						    <label htmlFor="" className="radio-inline ">
						      <input type="radio" 
						      		 value="Care Taker"
						      		 name="caretaker" 
						      		 className="FrRadio" 
						      		 id="radio-example2"
						      		 checked={this.state.propertyHolder === "Care Taker"}
	               					 onChange={this.radioChange}/>

					  			<i className=" logo1"><img src="/images/careTaker.png" alt="" /></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 col-sm-1 col-xs-1 col-xs-offset-1 sellerType3"   >
						    <label htmlFor="" className="radio-inline ">
						      <input type="radio"
						      		 value="Broker"
						      		 name="broker" 
						      		 className="FrRadio" 
						      		 id="radio-example3"
						      		 checked={this.state.propertyHolder === "Broker"}
	               					 onChange={this.radioChange} 
						      		 />
					  			<i className=" logo1"><img src="/images/broker.png" alt="" /></i>
						    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 col-sm-1 col-xs-1 col-xs-offset-1 sellerType4"   >
						    <label htmlFor="" className="radio-inline ">
						      <input type="radio"
						      		 value="Flatmate" 
						      		 className="FrRadio" 
						      		 id="radio-example4"
						      		 checked={this.state.propertyHolder === "Flatmate"}
	               					 onChange={this.radioChange} 
						      		 />
					  			<i className=" logo1"><img src="/images/broker.png" alt="" /></i>
						    </label>
					    </div>


					</div>
					  	<div className="col-lg-12 col-md-12 col-sm-9 col-xs-12 mb-30 noPad" name="iAm">
					  			<span className="col-lg-3 col-xs-3 ownerLeft "> Owner</span>
					  			<span className="col-lg-3 col-xs-3 noPad"> Caretaker</span>
					  			<span className="col-lg-3 col-xs-3 noPad">&nbsp; Broker</span>
					  			<span className="col-lg-3 col-xs-3 noPad"> Flatmate</span>
					  	</div>
         		
         			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad">
         				<div className="mb-30 hidden-sm hidden-xs"></div>
         					<div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 noPad">
					   			<label htmlFor="iLike">I would like to</label>
								<span className="astrick">*</span>
						        {this.state.type===true ?

						         <div className="switch" onClick={this.handleToggle.bind(this)} >
						            <input type="radio" className="switch-input" name="view" value={this.state.transactionType} id="week"  checked />
						            <label htmlFor="week" className="switch-label switch-label-off">SELL</label>
						            <input type="radio" className="switch-input" name="view" value={this.state.transactionType} id="month"  />
						            <label htmlFor="month" className="switch-label switch-label-on">RENT</label>
						            <span className="switch-selection"></span>
						          </div>

						          :

						           <div className="switch" onClick={this.handleToggle.bind(this)} >
						            <input type="radio" className="switch-input" name="view" value={this.state.transactionType} id="week"   />
						            <label htmlFor="week" className="switch-label switch-label-off">SELL</label>
						            <input type="radio" className="switch-input" name="view" value={this.state.transactionType} id="month" checked  />
						            <label htmlFor="month" className="switch-label switch-label-on">RENT</label>
						            <span className="switch-selection" ></span>
						          </div>
						       
						      	}
							</div>
							

						<div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 noPad">

						
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

						</div>

					</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad ">
						<div className="mb-30 hidden-xs hidden-sm"></div>

						<div className="col-lg-4 noPad  hidden-xs hidden-sm">
							<div className="pt28 hidden-xs hidden-sm"></div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
									 <b>Pincode </b>
									<span className="astrick">*</span>
								</div>
						    	<div className="col-lg-12 noPad">
									    <div className="input-group inputBox-main " id="">
									      	<div className="input-group-addon inputIcon">
							                <i className="fa fa-building iconClr"></i>
						                    </div>
									    <input type="text" data-text="pincode" value={this.state.pincode} onBlur={this.handlePincode.bind(this)} onChange={this.handleChange.bind(this)} name="pincode"  className="form-control" ref="pincode"  placeholder="Enter Pincode" />
									   
									  	</div>
									  	{this.state.formerrors.pincode &&(
				                            <span className="text-danger">{this.state.formerrors.pincode}</span> 
				                        )}
								</div>
						</div>
					{/*resp*/}
					<div className="col-lg-4 noPad  hidden-lg hidden-md ">
							<div className="pt28 hidden-xs hidden-sm"></div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 ">
									 <b>Pincode </b>
									<span className="astrick">*</span>
								</div>
						    	<div className="col-lg-12 ">
									    <div className="input-group inputBox-main " id="">
									      	<div className="input-group-addon inputIcon">
							                <i className="fa fa-building iconClr"></i>
						                    </div>
									    <input type="text" data-text="pincode" value={this.state.pincode} onBlur={this.handlePincode.bind(this)} onChange={this.handleChange.bind(this)} name="pincode"  className="form-control" ref="pincode"  placeholder="Enter Pincode" />
									   
									  	</div>
									  	{this.state.formerrors.pincode &&(
				                            <span className="text-danger">{this.state.formerrors.pincode}</span> 
				                        )}
								</div>
						</div>
					{/*end*/}
							<div className=" col-lg-1 col-md-1 col-sm-1  col-xs-1 hidden-sm hidden-xs ">
								<div className="vl "></div>
									<span className="">OR</span>
								<div className="vl"></div>
							</div>
							{/*resp*/}
							<div className=" col-lg-1 col-md-1 col-sm-12  col-xs-12 textC hidden-lg hidden-md mt10 ">
								<div className=" "></div>
									<span className="">OR</span>
								<div className=" "></div>
							</div>
							{/*end*/}

							<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 noPad">
								<div className="col-lg-12 noPad">
									<div className="col-lg-6">
									    <div className="form-group" id="">
									    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
												 <b>State </b>
												<span className="astrick">*</span>
											</div>
									  		<div className=" " id="">
											  	<select className="custom-select form-control" value={this.state.stateCode} onChange={this.selectState.bind(this)} ref="state" placeholder="select" id="selectState" >
											  
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
								  	<div className="col-lg-6">
										<div className="form-group" id="">
									    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
												 <b>City </b>
												<span className="astrick">*</span>
											</div>
									  		<div className=" " id="">
											  	<select className="custom-select form-control " onChange={this.selectCity.bind(this)} value={this.state.districtName+'-'+this.state.blockName+'-'+this.state.cityName} name="city" ref="city" placeholder="select"  id="selectCity"  >
											  
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
								
								</div>
								<div className="col-lg-12 noPad">

									<div className="col-lg-6">
										<div className="form-group" id="">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
												 <b>Area/Suburb </b>
												<span className="astrick">*</span>
											</div>
										    <div className=" " id="">
											    <select className="custom-select form-control" value={this.state.areaName} onChange={this.selectArea.bind(this)} name="areaName" name="area" ref="area" placeholder="select" id="selectArea">
											    	
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

									<div className="col-lg-6">
										<div className="form-group" id="">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 noPad">
												 <b>Sub-Area </b>
												<span className="astrick">*</span>
											</div>
										    <div className=" " id="">
											    <input type="text" list="subAreaList" value={this.state.subAreaName} onChange={this.handleChange.bind(this)} onBlur={this.handleSubarea.bind(this)} className="form-control"  ref="subArea" name="subAreaName" placeholder="Enter Subarea" />
											   
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

									{/*12 close*/}	
								</div>
							</div>
					</div>
			  	</div>
				  
				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 boxLayout hidden-xs hidden-sm">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<img alt=""  src="/images/2.png" className=""/>
					</div>
			  	</div>

			  </div>
				  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad hidden-xs hidden-sm">
					 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad" >
				  		<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  	<div className="form-group"  id="" >
							   
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 row">
						   			 <b>Society</b>
									<span className="astrick">*</span>
						   		</div>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                 <i className="fa fa-building iconClr"></i>
				                    </div>
								    <input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />
								 
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
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
								  
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 row">
							   			 <b>House/Building Number</b>
										
							   		</div>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" ref="housebuilding" name="address" value={this.state.address}  onChange={this.handleChange.bind(this)} placeholder="Enter House Address"/>
							  
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
								 
								    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 row">
							   			 <b>Landmark</b>
										
							   		</div>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" name="landmark" value={this.state.landmark}  onChange={this.handleChange.bind(this)}ref="landmark"  placeholder="Landmark "/>
							
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
					</div>

		  {/**/}
		  	
		  	<div className="form-group col-lg-3	col-md-2 col-sm-12 col-xs-12` pull-right mt20">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-2 col-sm-12 col-xs-12" onClick={this.insertProperty.bind(this)} >Save & Next &rArr;</button>
		  	</div>
		  </div>
		  {/*========================resp 3 div=============================*/}
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hidden-lg hidden-md ">
					 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPad" >
				  		<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  	<div className="form-group"  id="" >
							   
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 row">
						   			 <b>Society</b>
									<span className="astrick">*</span>
						   		</div>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                 <i className="fa fa-building iconClr"></i>
				                    </div>
								    <input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />
								 
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
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
								  
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 row">
							   			 <b>House/Building Number</b>
										
							   		</div>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" ref="housebuilding" name="address" value={this.state.address}  onChange={this.handleChange.bind(this)} placeholder="Enter House Address"/>
							  
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
								 
								    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5 row">
							   			 <b>Landmark</b>
										
							   		</div>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
					                <i className="fa fa-building iconClr"></i>
				                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" name="landmark" value={this.state.landmark}  onChange={this.handleChange.bind(this)}ref="landmark"  placeholder="Landmark "/>
							
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
							  	</div>
							  </div>
						</div>
					</div>

		  {/**/}
		  	
		  	<div className="form-group col-lg-3	col-md-2 col-sm-12 col-xs-12` pull-right mt20">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-2 col-sm-12 col-xs-12" onClick={this.insertProperty.bind(this)} >Save & Next &rArr;</button>
		  	</div>
		  </div>
		  {/*========================end 3 div==============================*/}
		  
		</form>
		);
	}
	


}

const mapStateToProps = (state)=>{
	// console.log("bState===",state);
  return {
    uid             : state.uid,
    property_id     : state.property_id,
	BasicInfo		: state.BasicInfo,
	PropertyDetails	: state.PropertyDetails,
	Financials		: state.Financials,
	Amenities		: state.Amenities,
	Availability	: state.Availability,
	Location	 	: state.Location,
	updateStatus    : state.updateStatus,
	congratsPage	: state.CongratsPage,
  }
  
};

const mapDispatchToProps = (dispatch)=>{
	return {
		// redirectToLocation  : (propertyCode, property_id,uid)=> dispatch({type    : "REDIRECT_TO_LOCATION",
		// 																   propertyCode	: propertyCode,
		// 																   property_id	: property_id,
		// 																   uid          : uid,
		// 																   // prop_id 		: prop_id,
		// 															}),
		redirectToPropertyDetails   : (uid,property_id)=> dispatch({type: "REDIRECT_TO_PROPERTY",
														uid:uid,
														property_id : property_id
									}),
		propertyFlow  : (transactionType, propertyType)=> dispatch({type    : "PROPERTY_FLOW",
																   transactionType	: transactionType,
																   propertyType	    : propertyType,
																   
																}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BasicInfo));