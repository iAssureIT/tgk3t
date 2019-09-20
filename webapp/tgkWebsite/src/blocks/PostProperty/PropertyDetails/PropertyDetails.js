import React , { Component }	from 'react';
import axios 					from 'axios';
import swal 					from 'sweetalert';		
import $ 					  from "jquery";
import { connect } 				from 'react-redux';
import {  withRouter}    		from 'react-router-dom';

import './PropertyDetails.css';

 class PropertyDetails extends Component{

		constructor(props){
			super(props);
			this.state = {
				originalValues    : '',
				furnishedStatus   : '',
				personal 		  : '',
				bedrooms 		  : '',
				balconies 		  : '',
				bathrooms 		  : '',
				pantry 			  : '',
				washrooms    	  : '',
				updateOperation   : false,

				floor 			  : "",
				totalfloor 		  : "",
				Amenities     	  : [],
				allAmenities  	  : "",
				prevAmenities 	  : "",
				superAreaUnit 	  : "Sq Ft",
				builtupAreaUnit   : "Sq Ft",
				furnishedOptions    : [
                          {name:"Directors Cabin",checked: false},
                          {name:"Meeting Room",checked: false},
                          {name:"Reception",checked: false},
                        ],
      			prevCharges     : "",
      			workStation     : "",
      			furnishPantry	    : "",

			};
			this.radioChange  = this.radioChange.bind(this);
			this.radioChange1 = this.radioChange1.bind(this);
			this.radioChange2 = this.radioChange2.bind(this);
			this.radioChange3 = this.radioChange3.bind(this);
			this.radioChange4 = this.radioChange4.bind(this);

			console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			if(this.props.updateStatus === true){

				axios
				.get('/api/masteramenities/list')
				.then(
					(res)=>{
						// console.log('res postdata', res);
						const postsdata = res.data;
						// console.log('postsdata',postsdata);
						this.setState({
							allAmenities : postsdata,
						},()=>{

					        	axios
									.get('/api/properties/'+this.props.property_id)
									.then( (response) =>{
										console.log("get property in property = ",response);

										this.setState({
												originalValues  : response.data.propertyDetails,
												bedrooms 		: response.data.propertyDetails.bedrooms,
										    	balconies 		: response.data.propertyDetails.balconies,
										    	washrooms 		: response.data.propertyDetails.washrooms,
										    	furnishedstatus : response.data.propertyDetails.furnishedStatus,
										    	personal 		: response.data.propertyDetails.personal,
										    	pantry 			: response.data.propertyDetails.pantry,
												bathrooms     	: response.data.propertyDetails.bathrooms,
												ageofproperty 	: response.data.propertyDetails.ageofProperty,
												facing 			: response.data.propertyDetails.facing,
												superArea 		: response.data.propertyDetails.superArea,
												builtupArea 	: response.data.propertyDetails.builtupArea,
												updateOperation : true,
												// amenity
												floor 			: response.data.propertyDetails.floor,
												totalfloor 		: response.data.propertyDetails.totalFloor,
												prevAmenities 	: response.data.propertyDetails.Amenities,
												superAreaUnit 	: response.data.propertyDetails.superAreaUnit,
												builtupAreaUnit : response.data.propertyDetails.builtupAreaUnit,
												prevCharges 	: response.data.propertyDetails.furnishedOptions,
												workStation 	: response.data.propertyDetails.workStation,
												furnishPantry	: response.data.propertyDetails.furnishPantry,
											});

										// amenities
										var allAmenitiesData = this.state.allAmenities;
												// console.log("here allAmenitiesData", allAmenitiesData);
											var allAmenitiesDataList = allAmenitiesData.map((item,index)=>{
												// console.log("item",item.amenity);
												var propPresent = this.state.prevAmenities.find((obj)=>{
												// console.log("obj",obj);
													return item.amenity === obj;
												// console.log("here propPresent ", propPresent);

												})
												var newObj = Object.assign({},item);
												if(propPresent){
													newObj.checked = true
												}else{
													newObj.checked = false
												}
												// console.log("newObj",newObj);
												return newObj;

											})
											// console.log("allAmenitiesDataList after data match",allAmenitiesDataList);
											this.setState({
													allAmenities : allAmenitiesDataList,
												},()=>{
													// console.log("here allAmenities in didmount after match result",this.state.allAmenities);

												});
											// close here

											//furnishedOptions
											var furnishedOptions = this.state.furnishedOptions;
						                    // console.log("here furnishedOptions", furnishedOptions);
						                    var furnishedOptionsList = furnishedOptions.map((item,index)=>{
						                      var propPresent = this.state.prevCharges.find((obj)=>{
						                        return item.name === obj
						                      })
						                      // console.log("here propPresent ", propPresent);
						                      var newObj = Object.assign({},item);
						                      if(propPresent){
						                        newObj.checked = true
						                      }else{
						                        newObj.checked = false
						                      }
						                      return newObj;

						                   })

						                    this.setState({
						                      furnishedOptions : furnishedOptionsList,
						                    },()=>{
						                      // console.log("here furnishedOptions in didmount after match result",this.state.furnishedOptions);

						                    });
						                    //close
									})
									.catch((error)=>{
								                        console.log("error = ",error);
								                        if(error.message === "Request failed with status code 401")
								                        {
								                             swal("Your session is expired! Please login again.","", "error");
								                             this.props.history.push("/");
								                        }
								    });

								    // 2nd axios done
								   });

				})
				.catch((error)=>{
                        console.log("error = ",error);
                        // if(error.message === "Request failed with status code 401")
                        // {
                        //      swal("Your session is expired! Please login again.","", "error");
                        //      this.props.history.push("/");
                        // }
                    });	


        	}
		}

		componentDidMount(){
		      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
		 	 var $select = $(".Fl60");
		     	$select.append($('<option></option>').val("").html("Floor"))
		        $select.append($('<option></option>').val(-1).html("Basement"))
		        $select.append($('<option></option>').val(0).html("Ground"))

		    for (var i=1;i<=60;i++){
		        $select.append($('<option></option>').val(i).html(i))
		    }
		     var $select = $(".1-60");
		    for (var i=1;i<=60;i++){
		        $select.append($('<option></option>').val(i).html(i))
		    }


		    console.log("update status in did mount",this.props.updateStatus);
		// if(this.props.updateStatus === false){
			axios
			.get('/api/masteramenities/list')
			.then(
				(res)=>{
					console.log('res postdata', res);
					const postsdata = res.data;
					console.log('postsdata of amenities',postsdata);
					this.setState({
						allAmenities : postsdata,
					});
				}
			)
			.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
            });


			console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			console.log("all amenities for admin",this.state.allAmenities);
			
			// }


		  }


		// updateUser(event){
		// 	var allAmenitiesData = this.state.allAmenities;
		// 			var allAmenitiesDataList =[];			
		// 					allAmenitiesData.map((item,index)=>{
		// 						if(item.checked == true)
		// 						{
		// 							allAmenitiesDataList.push(item.amenity);
		// 						}
		// 					})

		// 					console.log("allAmenitiesDataList true",allAmenitiesDataList);

		// 	const formValues = {
		// 			"bedrooms" 			: this.state.bedrooms,
		// 			"balconies" 		: this.state.balconies,
		// 			"washrooms" 		: this.state.washrooms,
		// 			"furnishedStatus"   : this.state.furnishedstatus,
		// 			"personal"		    : this.state.personal,
		// 			"pantry"		    : this.state.pantry,
		// 			"bathrooms" 		: this.state.bathrooms,
		// 			"ageofProperty" 	: this.state.ageofproperty,
		// 			"facing" 			: this.state.facing,
		// 			"superArea" 		: this.state.superArea,
		// 			"builtupArea" 		: this.state.builtupArea,
		// 			"Amenities"			: allAmenitiesDataList,
		// 			// "property_id" 		: localStorage.getItem("propertyId"),
		// 			// "uid" 				: localStorage.getItem("uid"),
		// 		};

		// 	console.log("formValues",formValues);
		// 	this.props.redirectToFinancialDetails();
		// }

		updateUser(event){
			event.preventDefault();

			if(this.state.updateOperation === true){
				//var furnishedOptionsData = this.state.furnishedOptions;
			var furnishedOptionsData = this.state.furnishedOptions;
        	var furnishedOptionsDataList =[];     
            furnishedOptionsData.map((item,index)=>{
              if(item.checked == true)
              {
                furnishedOptionsDataList.push(item.name);
              }
            })
            //

				console.log("update fun");
				var ov = this.state.originalValues;

				console.log("update fun");
				var ov = this.state.originalValues;
				var allAmenitiesData = this.state.allAmenities;
				var allAmenitiesDataList =[];			
						allAmenitiesData.map((item,index)=>{
							if(item.checked == true)
							{
								allAmenitiesDataList.push(item.amenity);
							}
						})
						console.log("this.state.allAmenities",this.state.allAmenities);
						console.log("allAmenitiesDataList true",allAmenitiesDataList);
						console.log("here result amenity",ov.Amenities);
			
				var eq ="";
				if(allAmenitiesDataList.length != ov.Amenities.length )
				{
					eq = false;
					 console.log("equal not",eq);
				}else{
					
					for (var i = 0; i < allAmenitiesDataList.length; i++)
					{ 
			            if (allAmenitiesDataList[i] != ov.Amenities[i]){
							eq = false;
			            }else{
							eq = true;	
			            }
			       }
			        console.log("equal yes but same",eq);	
				}

				console.log("outside eq",eq);

				if(this.state.bedrooms === ov.bedrooms && this.state.balconies === ov.balconies && this.state.washrooms === ov.washrooms &&
					this.state.furnishedstatus === ov.furnishedStatus && this.state.personal === ov.personal && this.state.pantry === ov.pantry &&
					 this.state.bathrooms === ov.bathrooms && this.state.ageofproperty === ov.ageofProperty && this.state.facing === ov.facing 
					 && this.state.superArea === ov.superArea && this.state.builtupArea === ov.builtupArea &&
					 eq === true && this.state.floor === ov.floor && this.state.totalfloor === ov.totalFloor && this.state.superAreaUnit === ov.superAreaUnit && this.state.builtupAreaUnit === ov.builtupAreaUnit && this.state.workStation === ov.workStation && this.state.furnishPantry === ov.furnishPantry )
				{
						console.log("same data");
						this.props.redirectToFinancialDetails(this.props.uid,this.props.property_id);

						// this.props.redirectToAmenities(this.props.uid,this.props.property_id);
				}else{

					console.log("allAmenities in result",this.state.allAmenities);
							var allAmenitiesData = this.state.allAmenities;
								var allAmenitiesDataList =[];			
										allAmenitiesData.map((item,index)=>{
											if(item.checked == true)
											{
												allAmenitiesDataList.push(item.amenity);
											}
										})

										console.log("allAmenitiesDataList true",allAmenitiesDataList);


					// console.log("diff data");
					const formValues = {
					"bedrooms" 			: this.state.bedrooms,
					"balconies" 		: this.state.balconies,
					"washrooms" 		: this.state.washrooms,
					"furnishedStatus"   : this.state.furnishedstatus,
					"personal"		    : this.state.personal,
					"pantry"		    : this.state.pantry,
					"bathrooms" 		: this.state.bathrooms,
					"ageofProperty" 	: this.state.ageofproperty,
					"facing" 			: this.state.facing,
					"superArea" 		: this.state.superArea,
					"builtupArea" 		: this.state.builtupArea,
					"property_id" 		: localStorage.getItem("propertyId"),
					"uid" 				: localStorage.getItem("uid"),

					"Amenities"			: allAmenitiesDataList,
					"floor"         	: this.state.floor,
					"totalFloor"    	: this.state.totalfloor,
					"superAreaUnit"    	: this.state.superAreaUnit,
					"builtupAreaUnit"    	: this.state.builtupAreaUnit,
					"workStation"    	: this.state.workStation,
					"furnishPantry"	    	: this.state.furnishPantry,	
        			"furnishedOptions"    : furnishedOptionsDataList,


					// "property_id" 		: localStorage.getItem("propertyId"),
					// "uid" 				: localStorage.getItem("uid"),
				};
				console.log("PropertyDetails req = ",formValues);

					

				if( this.state.furnishedstatus!=="" && this.state.furnishedstatus!==undefined &&  this.refs.builtupArea.value!=="" && 
				this.state.floor!=="" &&  this.state.totalfloor!=="" ){
					if(allAmenitiesDataList!=""){

						axios
						.patch('/api/properties/patch/propertyDetails',formValues)
						.then( (res) =>{
							console.log(res);
							if(res.status === 200){
								console.log("PropertyDetails Res = ",res);
							this.props.redirectToFinancialDetails(this.props.uid,this.props.property_id);

								// this.props.redirectToAmenities(this.props.uid,this.props.property_id);
							}
						})
						.catch((error)=>{
					                        console.log("error = ",error);
					                        if(error.message === "Request failed with status code 401")
					                        {
					                             swal("Your session is expired! Please login again.","", "error");
					                             this.props.history.push("/");
					                        }
					     });

					}else{
								swal("Please select atleast one amenity", "", "warning");
				                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
						}
				}else{
					swal("Please enter mandatory fields", "", "warning");
	              	console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}


				}
			}else{
				// console.log("submit fun");
				//
       		    var ov = this.state.originalValues;
				var furnishedOptionsData = this.state.furnishedOptions;
        		var furnishedOptionsDataList =[];     
	            furnishedOptionsData.map((item,index)=>{
	              if(item.checked == true)
	              {
	                furnishedOptionsDataList.push(item.name);
	              }
	            })

	            // console.log("furnishedOptionsDataList true",furnishedOptionsDataList);
	            // console.log("this.state.furnishedOptions",this.state.furnishedOptions);

	            // compare chcekbox data
	            var eq =true;
	            // console.log("this.state.furnishedOptions.length",this.state.furnishedOptions.length);
	            if(furnishedOptionsDataList.length !== this.state.furnishedOptions.length )
	            {
	              eq = false;
	               console.log("equal not",eq);
	            }else{
	              
	              for (var i = 0; i < furnishedOptionsDataList.length; i++)
	              { 
	                      if (furnishedOptionsDataList[i] != ov.furnishedOptions[i]){
	                  eq = false;
	                      }else{
	                  eq = true;  
	                      }
	                 }
	                  console.log("equal yes but same",eq); 
	            }
            //

				console.log("allAmenities in result",this.state.allAmenities);
				var allAmenitiesData = this.state.allAmenities;
					var allAmenitiesDataList =[];			
							allAmenitiesData.map((item,index)=>{
								if(item.checked == true)
								{
									allAmenitiesDataList.push(item.amenity);
								}
							})

							console.log("allAmenitiesDataList true",allAmenitiesDataList);



					const formValues = {
					"bedrooms" 			: this.state.bedrooms,
					"balconies" 		: this.state.balconies,
					"washrooms" 		: this.state.washrooms,
					"furnishedStatus"   : this.state.furnishedstatus,
					"personal"		    : this.state.personal,
					"pantry"		    : this.state.pantry,
					"bathrooms" 		: this.state.bathrooms,
					"ageofProperty" 	: this.state.ageofproperty,
					"facing" 			: this.state.facing,
					"superArea" 		: this.state.superArea,
					"builtupArea" 		: this.state.builtupArea,
					"property_id" 		: localStorage.getItem("propertyId"),
					"uid" 				: localStorage.getItem("uid"),

					"Amenities"			: allAmenitiesDataList,
					"floor"         	: this.state.floor,
					"totalFloor"    	: this.state.totalfloor,
					"superAreaUnit"    	: this.state.superAreaUnit,
					"builtupAreaUnit"   : this.state.builtupAreaUnit,
					"workStation"    	: this.state.workStation,
					"furnishPantry"	    : this.state.furnishPantry,	
                	"furnishedOptions"  : furnishedOptionsDataList,

					// "property_id" 		: localStorage.getItem("propertyId"),
					// "uid" 				: localStorage.getItem("uid"),
				};
				// console.log("floor in submin",this.state.floor);
				// console.log("total in submit",this.state.totalfloor);
				console.log("PropertyDetails req = ",formValues);
				if( this.state.furnishedstatus!="" && this.state.furnishedstatus!==undefined &&  this.refs.builtupArea.value!="" &&
				this.state.floor!=="" &&  this.state.totalfloor!=="" ){
					if(allAmenitiesDataList!=""){

						axios
						.patch('/api/properties/patch/propertyDetails',formValues)
						.then( (res) =>{
							console.log(res);
							if(res.status === 200){
								console.log("PropertyDetails Res = ",res);
							this.props.redirectToFinancialDetails(this.props.uid,this.props.property_id);

								// this.props.redirectToAmenities(this.props.uid,this.props.property_id);
							}
						})
						.catch((error)=>{
					                        console.log("error = ",error);
					                        if(error.message === "Request failed with status code 401")
					                        {
					                             swal("Your session is expired! Please login again.","", "error");
					                             this.props.history.push("/");
					                        }
					       });

					}else{
								swal("Please select atleast one amenity", "", "warning");
				                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
						}

				}else{
					swal("Please enter mandatory fields", "", "warning");
	              	console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}
			}			
			
		}

		radioChange(event) {
	    	this.setState({
	      	"furnishedstatus": event.currentTarget.value,
			    });
		 }
		radioChange1(event) {
	    	this.setState({
	      	"personal": event.currentTarget.value,
			    });
		 }

		 radioChange2(event) {
	    	this.setState({
	      	"pantry": event.currentTarget.value,
			    });
		 }
		 radioChange3(event) {
	    	this.setState({
	      	"workStation": event.currentTarget.value,
			    });
		 }
		 radioChange4(event) {
	    	this.setState({
	      	"furnishPantry": event.currentTarget.value,
			    });
		 }

		// backToLocation(){
		// 	// this.props.backToLocation();
		// 	this.props.backToLocation(this.props.uid,localStorage.getItem("propertyId"));


		// }

		backToBasicInfo(){
		this.props.backToBasicInfo();
		console.log("this.props.uid",this.props.uid);
		console.log("localStorage.getItem(propertyId)",localStorage.getItem("propertyId"));

		this.props.backToBasicInfo(this.props.uid,localStorage.getItem("propertyId"));
						
	}
		builtArea(){
			const builtArea=parseInt(this.refs.builtupArea.value);
			const superArea=parseInt(this.refs.superArea.value);
			console.log("builtArea",builtArea);
			console.log("superArea",superArea);

			if(builtArea >= superArea){
				swal("Built Up Area should not be greater than Super Area", "", "warning");
				this.setState({builtupArea:""})
			}
		}
		handleChange(event){
			// event.preventDefault();
			// var washroom = this.refs.washrooms.value;
			// this.setState({
	  //     	"washrooms":washroom,
			//     });
			// console.log("washroom value",washroom);
			const target = event.target.value;
			const name   = event.target.name;
			this.setState({
				[name]       : target
			});
		 }
		 isNumberKey(event)
		   {

		   var charCode = (event.which) ? event.which : event.keyCode

		   if (charCode > 31 && (charCode < 48 || charCode > 57)  && (charCode < 96 || charCode > 105))
		   {
		    event.preventDefault();
		      return false;
		    }
		    else{
		      return true;
		    }
		  }

	totalFloor(){
			const floor      = parseInt(this.refs.floor.value);
			const totalfloor = parseInt(this.refs.totalfloor.value);
			if(floor > totalfloor){
				swal("Floor should not be greater than Total Floors", "", "warning");
			}

			this.setState({totalfloor : totalfloor});

	}

	floorChange(event){
		var floor = event.currentTarget.value;
		this.setState({floor : floor});
	}

	totalInclude(event){
			console.log("event.target.getAttribute('value')",event.target.getAttribute('value'));
		  var checkedPropAmenityType=[];
		  if(event.target.checked){
		  	checkedPropAmenityType = event.target.getAttribute('value');
			var allAmenities=this.state.allAmenities;
			for(let i=0; i <allAmenities.length; i++){
				for (let j=0; j < checkedPropAmenityType.length; j++) {
					if(allAmenities[i].amenity === checkedPropAmenityType){
						allAmenities[i].checked = true;
					}
				}
			}
			this.setState({
				allAmenities : allAmenities,
			},()=>{
				console.log("here allAmenities in function check ", this.state.allAmenities);
			});

			  // this.state.Amenities.push(e.target.getAttribute('value'));
			  // console.log("Amenities",this.state.Amenities);
		  }else{

			 	checkedPropAmenityType = event.target.getAttribute('value');
				var allAmenities=this.state.allAmenities;
				for(let i=0; i <allAmenities.length; i++){
					for (let j=0; j < checkedPropAmenityType.length; j++){
						if(allAmenities[i].amenity === checkedPropAmenityType){
							allAmenities[i].checked = false;
						}
					}
				}
				this.setState({
					allAmenities : allAmenities,
				},()=>{
					console.log("here allAmenities in function uncheck ", this.state.allAmenities);

				});

			  // this.state.Amenities.pop(e.target.getAttribute('value'));	
			  // console.log("Amenities1",this.state.Amenities);
		  }

		}
		totalInclude1(event){

		  console.log("event.target.getAttribute('value')",event.target.getAttribute('value'));
		      var checkedPropAskType=[];
		      if(event.target.checked){
		        checkedPropAskType = event.target.getAttribute('value');
		      var furnishedOptions=this.state.furnishedOptions;
		      for(let i=0; i <furnishedOptions.length; i++){
		        for (let j=0; j < checkedPropAskType.length; j++) {
		          if(furnishedOptions[i].name === checkedPropAskType){
		            furnishedOptions[i].checked = true;
		          }
		        }
		      }
		      this.setState({
		        furnishedOptions : furnishedOptions,
		      },()=>{
		        console.log("here furnishedOptions in function check ", this.state.furnishedOptions);
		      });

		        
		      }else{

		        checkedPropAskType = event.target.getAttribute('value');
		        var furnishedOptions=this.state.furnishedOptions;
		        for(let i=0; i <furnishedOptions.length; i++){
		          for (let j=0; j < checkedPropAskType.length; j++){
		            if(furnishedOptions[i].name === checkedPropAskType){
		              furnishedOptions[i].checked = false;
		            }
		          }
		        }
		        this.setState({
		          furnishedOptions : furnishedOptions,
		        },()=>{
		          console.log("here furnishedOptions in function uncheck ", this.state.furnishedOptions);

		        });

		       
		      }

}		

	render() {
	   	return (
	  		<div className=" col-lg-12 col-md-12  col-sm-12 col-xs-12 mt20">
				<form  id="form">
					<div className=" row"></div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb5">
			  		<b>My Property is on</b>
					<span className="astrick">*</span>

			  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
		  	<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 "> 
			  <div className="form-group" id="floor">
		  		<div className="input-group inputBox-main " id="">
			      	<div className="input-group-addon inputIcon">
                     	<i className=" iconClr"><img src="/images/floor.png" alt="" /></i>
                    </div>
			  		<select className="custom-select form-control Fl60"  ref="floor" id='select' value={this.state.floor} onChange={this.floorChange.bind(this)}>  </select> 
				</div>
			  </div>
			</div>
			<div className="col-lg-1 noPad ofText">OF</div>

			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="totalfloor">
				  	<div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="iconClr"><img src="/images/floor.png" alt="" /></i>
	                    </div>
					  	<select className="custom-select form-control 1-60"  ref="totalfloor" onChange={this.totalFloor.bind(this)} value={this.state.totalfloor} >
					    	<option value="" className="hidden">Total Floors</option>
						</select>
					</div>
				  </div>
			 </div>
		  </div>

		 			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb10">
					  		<b>My Property has</b>
							<span className="astrick">*</span>
					  	</div>
			  		</div>
			  		{
			  			this.props.propertyType == "Commercial" ? 
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				    	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="form-group" id="bathroom">
							    <span htmlFor="" className="mb7">Washrooms</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     <i className="fa fa-building iconClr"></i>
				                    </div>
								    <select className="custom-select form-control " ref="washrooms" name="washrooms" value= {this.state.washrooms} onChange={this.handleChange.bind(this)} placeholder="select" >
								    	<option value="" className="hidden">--Select--</option>
								    	<option value="0">0</option>
								    	<option value="1">1</option>
								    	<option value="2">2</option>
								    	<option value="3">3</option>
								    	<option value="4">4</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						    <span htmlFor="" className="mb7 col-lg-12 row">Personal Washroom</span>
							<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="Yes"
						      		 checked={this.state.personal === "Yes"}
				   					 onChange={this.radioChange1}    

						      		/>
						        <span className="mb5">Yes</span> 

						    </label>
						    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="No"
						             checked={this.state.personal === "No"}
				   					 onChange={this.radioChange1}  
						      		/>
						        <span className="mb5">No</span> 

						    </label>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						    <span htmlFor="" className="mb7 col-lg-12 row">Pantry</span>
							<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="Yes" 
						      		 checked={this.state.pantry === "Yes"}
				   					 onChange={this.radioChange2}
						      		/>
						        <span className="mb5">Yes</span> 

						    </label>
						    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
						        <input type="radio"
						             name=""  
						             value="No" 
						      		 checked={this.state.pantry === "No"}
				   					 onChange={this.radioChange2}
						      		/>
						        <span className="mb5">No</span> 

						    </label>
						</div>
				    </div>
				    :
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						    <div className="form-group" id="bedrooms">
							    <span htmlFor="" className="mb7">Bedrooms</span>
							  	 	<div className="input-group  " id="">
								      	<div className="input-group-addon inputIcon">
					                     <i className="fa fa-building iconClr"></i>
					                    </div>
									  	<select className="custom-select form-control "  ref="bedrooms" name="bedrooms" value= {this.state.bedrooms} onChange={this.handleChange.bind(this)}  placeholder="select" >
									    	<option value="" className="hidden">--Select--</option>
									    	<option value="1">1</option>
									    	<option value="2">2</option>
									    	<option value="3">3</option>
									    	<option value="4">4</option>
									    	<option value="5">5</option>
										</select>
									</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="form-group" id="balconies">
							    <span htmlFor="" className="mb7">Balconies</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     <i className="fa fa-building iconClr"></i>
				                    </div>
								    <select className="custom-select form-control " ref="balconies" name="balconies" value= {this.state.balconies} onChange={this.handleChange.bind(this)}  placeholder="select" >
								    	<option value="" className="hidden">--Select--</option>
								    	<option value="1">1</option>
								    	<option value="2">2</option>
								    	<option value="3">3</option>
								    	<option value="4">4</option>
									</select>
								</div>
						    </div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="form-group" id="bathroom">
							    <span htmlFor="" className="mb7">Bathrooms</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     <i className="fa fa-building iconClr"></i>
				                    </div>
								    <select className="custom-select form-control " ref="bathrooms" name="bathrooms" value= {this.state.bathrooms} onChange={this.handleChange.bind(this)}  placeholder="select" >
								    	<option value="" className="hidden">--Select--</option>
								    	<option value="1">1</option>
								    	<option value="2">2</option>
								    	<option value="3">3</option>
								    	<option value="4">4</option>
									</select>
								</div>
							</div>
						</div>
				    </div>
			  		}
					
				    
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 itIs">
					  		<b>It is</b>
					  		<span className="astrick">*</span>
					  	</div>
				    </div>
					<div className="col-lg-12 col-md-12 col-sm-10 col-xs-12 pl29">	
							 
						<label className="radio-inline col-lg-4  col-md-4 col-sm-12 col-xs-12 ">
					        <input type="radio"
					             name="optradio"  
					             value="Fully furnished" 
					      		 id="radio-example1"
					      		 checked={this.state.furnishedstatus === "Fully furnished"}
			   					 onChange={this.radioChange} />   
					      <span className="mb5">Fully furnished</span> 

					    </label>
					    <label className="radio-inline col-lg-4  col-md-4 col-sm-12 col-xs-12">
					      	<input type="radio" 
					      		 name="optradio" 
					      		 value="Semi furnished" 
					      		 id="radio-example2"
					      		 checked={this.state.furnishedstatus === "Semi furnished"}
			   					 onChange={this.radioChange} />  
					  	 	<span className="mb5">Semi furnished</span>  

					    </label>
					    <label className="radio-inline col-lg-3  col-md-3 col-sm-12 col-xs-12">
					      	<input type="radio"
					      		 name="optradio" 
					      		 value="Unfurnished" 
					      		 id="radio-example3"
					      		 checked={this.state.furnishedstatus === "Unfurnished"}
			   					 onChange={this.radioChange} /> 
					  	 	<span className="mb5">Unfurnished</span>  

					    </label>
					</div>
					{
			          (this.state.furnishedstatus === "Fully furnished" || this.state.furnishedstatus === "Semi furnished") && this.props.propertyType == "Commercial" ?
			         
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm mt-10">
			            
			          {this.state.furnishedOptions && this.state.furnishedOptions.length > 0 ?
			            this.state.furnishedOptions.map((data,index)=>{
			              return (
			                    <div className="col-lg-4 marTopBtm" key={index}>
			                      
			                      <label className="container1 checkbox-inline"><span className="fs1">{data.name}</span>
			                      <input type="checkbox"
			                          value={data.name}
			                          id={index}
			                          name="userCheckbox"
			                          onChange={this.totalInclude1.bind(this)} 
			                          checked={data.checked}
			                          />
			                      <span className="checkmark1"></span>
			                      </label>
			                    </div>

			                    
			                );
			            })
			            :
			            null
			          }
			          <div className="col-lg-12 col-md-4 col-sm-12 col-xs-12 mt-10">
								    <span htmlFor="" className="mb7 col-lg-12 row">Work Stations</span>
									<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
								        <input type="radio"
								             name=""  
								             value="0" 
								      		 checked={this.state.workStation === "0"}
						   					 onChange={this.radioChange3}
								      		/>
								        <span className="mb5">0</span> 

								    </label>
								    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
								        <input type="radio"
								             name=""  
								             value="1" 
								      		 checked={this.state.workStation === "1"}
						   					 onChange={this.radioChange3}
								      		/>
								        <span className="mb5">1</span> 

								    </label>

								    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
								        <input type="radio"
								             name=""  
								             value="2" 
								      		 checked={this.state.workStation === "2"}
						   					 onChange={this.radioChange3}
								      		/>
								        <span className="mb5">2</span> 

								    </label>
								</div>

								<div className="col-lg-12 col-md-4 col-sm-12 col-xs-12 mt-10">
								    <span htmlFor="" className="mb7 col-lg-12 row">Pantry</span>
									<label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
								        <input type="radio"
								             name=""  
								             value="Dry" 
								      		 checked={this.state.furnishPantry === "Dry"}
						   					 onChange={this.radioChange4}
								      		/>
								        <span className="mb5">Dry</span> 

								    </label>
								    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
								        <input type="radio"
								             name=""  
								             value="Wet" 
								      		 checked={this.state.furnishPantry === "Wet"}
						   					 onChange={this.radioChange4}
								      		/>
								        <span className="mb5">Wet</span> 

								    </label>

								    <label className="radio-inline col-lg-3  col-md-3 col-sm-3 col-xs-3 ">
								        <input type="radio"
								             name=""  
								             value="Not Available" 
								      		 checked={this.state.furnishPantry === "Not Available"}
						   					 onChange={this.radioChange4}
								      		/>
								        <span className="mb5">Not Available</span> 

								    </label>
								</div>
			        </div>
			        :
			        null
        
					}
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 itIs ">
					  		<b>It is</b>
					  	</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
							  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								  <div className="form-group" id="society">
								    <span htmlFor="" className="mb5">Year(s) Old</span>
									<div className="input-group  " id="yearOld">
								      	<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-building iconClr"></i>
					                    </div>
										<select className="custom-select form-control " name="ageofproperty" ref="ageofproperty" placeholder="select" value={this.state.ageofproperty} onChange={this.handleChange.bind(this)} >
									    	<option value="" className="hidden">--Property Age--</option>
									    	<option value="Under Construction">Under Construction</option>
									    	<option value="New">Newly Built</option>
									    	<option value="<4">Less than 4 Years</option>
									    	<option value="4-8">4-8 Years</option>
									    	<option value="8-12">8-12 Years</option>
									    	<option value=">12"> Above 12 Years</option>
										</select>
									</div>				  
								</div>
							  </div>
							  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								  <div className="form-group" id="facing">
								    <span htmlFor="" className="mb5">Facing</span>
									<div className="input-group  " id="">
								      	<div className="input-group-addon inputIcon">
					                     <i className="fa fa-building iconClr"></i>
					                    </div>
										<select className="custom-select form-control " name="facing" ref="facing" value={this.state.facing} placeholder="select" onChange={this.handleChange.bind(this)} >
									    	<option value="" className="hidden">--Select property facing--</option>
									    	<option value="East" >    East</option>
									    	<option value="West" >    West</option>
									    	<option value="North">    North</option>
									    	<option value="South">    South</option>
									    	<option value="Northeast">Northeast</option>
									    	<option value="Northwest">Northwest</option>
									    	<option value="Southeast">Southeast</option>
									    	<option value="Southwest">Southwest</option>
									    	<option value="Don't Know">Don't Know</option>
										</select>
									</div>				  
								</div>
							  </div>
				    </div>
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
						  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							<div className="form-group" id="">
							  <span htmlFor="" className="mb7">Super Area</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-building iconClr"></i>
				                    </div>
						    			<input type="text" className="form-control" name="superArea" value={this.state.superArea} ref="superArea" placeholder="Super Area" min="0" id="first" onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} onBlur={this.builtArea.bind(this)}/>	
						  			<div className="input-group-addon inputIcon">
					                     <select value={this.state.superAreaUnit} name="superAreaUnit" onChange={this.handleChange.bind(this)} >
					                     	<option value="Sq Ft">Sq Ft</option>
					                    	<option value="Sq Meter">Sq Meter</option>
					                    	<option value="Guntha">Guntha</option>
					                    	<option value="Acre">Acre</option>
					                    	<option value="Sq Yard">Sq Yard</option>
					                    	<option value="Bigha">Bigha</option>
					                    	<option value="Hectare">Hectare</option>
					                    	<option value="Marla">Marla</option>
					                    	<option value="Kanal">Kanal</option>
					                     </select>
				                    </div>
						  		</div>
						  	</div>
						  </div>
						  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							  <div className="form-group"  id="" >
							  <span htmlFor="" className="mb7">Built Up Area</span>
							  <span className="astrick">*</span>
							    <div className="input-group  " id="">
							      	<div className="input-group-addon inputIcon">
				                     	<i className="fa fa-building iconClr"></i>
				                    </div>
							    	<input type="text" className="form-control" ref="builtupArea" name="builtupArea" value={this.state.builtupArea}  onChange={this.handleChange.bind(this)} placeholder="Built Up Area" min="0" max="20000" id="second" onKeyDown={this.isNumberKey.bind(this)} onBlur={this.builtArea.bind(this)}/>
							  		<div className="input-group-addon inputIcon">
				                    	<select value={this.state.builtupAreaUnit} name="builtupAreaUnit" onChange={this.handleChange.bind(this)} >
					                     	<option value="Sq Ft">Sq Ft</option>
					                    	<option value="Sq Meter">Sq Meter</option>
					                    	<option value="Guntha">Guntha</option>
					                    	<option value="Acre">Acre</option>
					                    	<option value="Sq Yard">Sq Yard</option>
					                    	<option value="Bigha">Bigha</option>
					                    	<option value="Hectare">Hectare</option>
					                    	<option value="Marla">Marla</option>
					                    	<option value="Kanal">Kanal</option>
					                     </select>
				                    </div>
							  </div>
							</div>
						  </div>
				 	</div>
				 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 itIs ">
					  		<b>Select Amenities</b>
							<span className="astrick">*</span>
					  		
					</div>

				 	 <div className="col-lg-12  col-md-10 col-sm-12 col-xs-12  borderClass padd0">
		  	 	{/*<div className="col-lg-12  borderBtm padd0 AmeniCenter">
		  	 		<b>All Amenities</b>
		  	 	</div>*/}
		  	 	
		  	 	<div className = "container-fluid padd0 ">
		  	 		{console.log("here amenity in map",this.state.allAmenities)}
		  	 		{this.state.allAmenities && this.state.allAmenities.length > 0 ?
		  	 			this.state.allAmenities.map((data,index)=>{
		  	 				// console.log("data",data);
		  	 				return(
		  	 						<div className="col-lg-4 FF4I1 " key={index}>
		  	 							
										<label className="container2">
											  <input type="checkbox"
											  		 value={data.amenity} 
										      		 id={index}
										      		 name="userCheckbox"
										      		 onChange={this.totalInclude.bind(this)} 
										      		 data-index={data.checked}
										      		 checked={data.checked}
										      		 />
											 <span className="checkmark pull-left"></span>
											 {data.amenity==="AC" ? 
												<span> 
												 	<span className="Ameni1"><img src="/images/ac.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
												</span>
											    :
												data.amenity==="Swimming Pool" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/pool.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
												:
												data.amenity==="Gas Pipeline" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/gasPipe.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="24*7 Water" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/water.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Lift" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/lift.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Power Backup" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/powerBk.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Shopping Center" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/shopping.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Children's Play Area" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/playArea.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Internal Gym" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/gym.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Park" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/park.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Internet Services" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/internet.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
											 	data.amenity==="Intercom" ?
												<span> 
												 	<span className="Ameni1"><img src="/images/intercom.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											 	:
												<span> 
												 	<span className="Ameni1"><img src="/images/flag.png" /></span>
												 	<span className="AmeniName">  {data.amenity} </span>
											 	</span>
											}
										</label>
		  	 						</div>
		  	 					);
		  	 			})
		  	 			:
		  	 			null
		  	 		}
		  	 	</div>
		  	</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40">
					  	
					  	{
					  		<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-6 pull-left">
					       		<button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 " onClick={this.backToBasicInfo.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
					  		</div>
					  	
					  	}
					  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-6 pull-right ">
					       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
					  	</div>
					</div>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	console.log("pState===",state);

	return {
		property_id  	: state.property_id,
		uid			    : state.uid,
		propertyType	: state.propertyType,
		transactionType	: state.transactionType,
		updateStatus    : state.updateStatus,		

	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToFinancialDetails  : (uid,property_id)=> dispatch({type: "REDIRECT_TO_FINANCIAL",
														uid:  uid,
														property_id: property_id
										}),
		// redirectToAmenities : (uid,property_id)=> dispatch({type: "REDIRECT_TO_AMENITIES",
		// 									 uid:  uid,
		// 									 property_id : property_id	
		// 						}),
		backToBasicInfo  			: (uid,property_id)=> dispatch({type: "BACK_TO_BASIC_INFO",
														uid:uid,
														property_id : property_id
														
									}),
		// backToLocation  	: (uid,property_id)=> dispatch({type: "BACK_TO_LOCATION",
		// 									 uid:  uid,
		// 									 property_id : property_id	
		// 						}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PropertyDetails));