import React , { Component }	from 'react';
import axios 					from 'axios';
import swal 					from 'sweetalert';		
import $						from 'jquery';
import ReactTable 				from 'react-table'; //import react table
import { connect } 				from 'react-redux';
import {withRouter}    			from 'react-router-dom';
import S3FileUpload 			from 'react-s3';
import Loader 					from 'react-loader-spinner'
import ReactDom 				from 'react-dom';
import moment 					from 'moment';
import TimePicker 				from 'rc-time-picker';

import 'react-table/react-table.css' //import css
import './Availability.css';
import 'rc-time-picker/assets/index.css';

var imgArray = [];
var imgTitleArray = [];
var imgTitleArrayWS = [];

const format = 'h:mm a';
const formValid = formerrors=>{
  // console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
const clientmobileRegex = RegExp(/^[0-9][0-9]{9}$/);

 class Availability extends Component{

		constructor(props){
			super(props);
			this.state = {
				originalValues      : '',
				contactPersonMobile :"",
				contactPerson       : "Someone",
				available           :[],
				formerrors :{
				
					clientMobile : " ",
				
				},

				updateOperation   : false,
				prevAvailable     : "",
				userMobile 		  : "",
				fromTime          : "12:00 am",
				toTime            : "12:00 am",
				now               : moment().hour(0).minute(0),
				now1              : moment().hour(0).minute(0),

				"config"			: '',
				"imageArray"  		: [],
				"imageTitleArray" 	: [],
				"videoArray" 		: [],
				"S3url" 	        : [],
				"imgArrayWSaws" 	: [],
				"singleVideo" 		: "",
				isLoading			: true,
				originalValues      : '',
				tempLoader 			: false,
				type 				: true

			};
   			
   			// console.log("in contructor contactPerson",this.state.contactPerson);

   			// console.log("this.props.updateStatus",this.props.updateStatus);
			// console.log("this.props.property_id",this.props.property_id);
			if(this.props.updateStatus === true){
	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (response) =>{
						// console.log("response in availability= ",response);
						
						this.setState({

								originalValues 				: response.data.avalibilityPlanVisit,
								contactPersonMobile 		: response.data.avalibilityPlanVisit.contactPersonMobile ? response.data.avalibilityPlanVisit.contactPersonMobile : "",
								contactPerson 				: response.data.avalibilityPlanVisit.contactPerson ?  response.data.avalibilityPlanVisit.contactPerson : "Someone" ,
								available 					: response.data.avalibilityPlanVisit.available,
								updateOperation 			: true,
								prevAvailable 				: response.data.avalibilityPlanVisit.available,
								originalValues      		: response.data.gallery,
								imgArrayWSaws 				: response.data.gallery.Images,
								singleVideo 	    		: response.data.gallery.video ? response.data.gallery.video : "" ,
								updateOperation     		: true,
								type 						: response.data.contactPerson==="Someone" ? true : false,

						 
						},()=>{
							// console.log("here available in comp did mount",this.state.contactPerson);
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
        	}
		}
		componentDidMount(){	
      		axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
			// console.log("user id in availability",this.props.uid);
					axios
					.get('/api/users/get/one/'+this.props.uid)
					.then( (response) =>{
						console.log("response of user in availability= ",response);
						this.setState({
							userMobile : response.data.mobileNumber,
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

				    axios
				      .get('/api/projectSettings/get/one/S3')
				      .then((response)=>{
				        console.log("s3_response.............",response);
				        const config = {
				                          bucketName      : response.data.bucket,
				                          dirName         : 'propertiesImages',
				                          region          : response.data.region,
				                          accessKeyId     : response.data.key,
				                          secretAccessKey : response.data.secret,
										  // ACL 			  : 'public-read',

				                       }
				        this.setState({
				          config : config
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

		fromTime(value){
			// console.log('value',value)
           if(value){
           		this.setState({
           			fromTime:value.format(format),
           			now:value
           		});
			}
		}


		toTime(value){
			if(value){
           		this.setState({
           			toTime:value.format(format),
           			now1:value
           		});
			}
		}

		insertAvailability(event){
			event.preventDefault();

			if(this.state.updateOperation === true){
				// console.log("update fun");
				var ov = this.state.originalValues;

				// console.log("this.state.contactPersonMobile",this.state.contactPersonMobile);
				// console.log("this.state.userMobile",this.state.userMobile);
				// console.log("this.state.contactPerson",this.state.contactPerson);

				var mobNo = "";
				if(this.state.contactPerson === "Myself"){
					mobNo = this.state.userMobile;
				}else{
					mobNo = this.state.contactPersonMobile;
				}
			
				// console.log("mob no",mobNo);

					// console.log("diff data");
					var formValues = {
					"contactPersonMobile" : mobNo,
	        		"contactPerson"       : this.state.contactPerson,
					"property_id" 		  : localStorage.getItem("propertyId"),
					"uid" 				  : localStorage.getItem("uid"),
					"available"			  : this.state.available,
					"propertyImages"	: this.state.imgArrayWSaws,
					"video"				: this.state.singleVideo,
					"status"			: "New"

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
                        formValues.Fcount4 = this.state.Tcount;                                                        
                 })
                  if (value === ""){
                  	console.log("key-====",key)
                       count = count+1;
                       this.setState({
                         setCount  : count
                       },()=>{
                        formValues.setCount4 = this.state.setCount;
                        var formFillPercentage = ((Tcount-this.state.setCount)/Tcount) * 100;
                        formValues.formFillPercentage4 = (formFillPercentage).toFixed(2);                             
                       })
                        return count;
                  }
                  return value;
            }


            // console.log("formValues",formValues);


        /*===========================================*/
					console.log("Availability req 1 = ",formValues);
				    if(this.state.available.length!==0){
				    		
						axios
						.patch('/api/properties/patch/availabilityPlan',formValues)
						.then( (res) =>{
							console.log("availabilityPlan----------------",res);
							if(res.status === 200){
								/*swal("wow","great job done!","success");*/
								this.props.redirectToCongratsPage(localStorage.getItem("uid"),localStorage.getItem("propertyId"));

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
					}else{
						swal("Please enter mandatory fields", "", "warning");
			        	console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
					}
					

				


			}else{
				// console.log("insert fun");
				// console.log("this.state.contactPersonMobile",this.state.contactPersonMobile);
				// console.log("this.state.userMobile",this.state.userMobile);
				// console.log("this.state.contactPerson",this.state.contactPerson);

				var mobNo = "";
				if(this.state.contactPerson === "Myself"){
					mobNo = this.state.userMobile;
				}else{
					mobNo = this.state.contactPersonMobile;
				}
				// console.log("mob no",mobNo);
				

				const formValues = {
				"contactPersonMobile" : mobNo,
        		"contactPerson"       : this.state.contactPerson,
				"property_id" 		  : localStorage.getItem("propertyId"),
				"uid" 				  : localStorage.getItem("uid"),
				"available"			  : this.state.available,
				"propertyImages"	  : this.state.imgArrayWSaws,
				"video"				  : this.state.singleVideo,
				"status"			  : "New"
				};
				console.log("Availability req 2 = ",formValues);
			    if(this.state.available.length!==0){
			    		
					axios
					.patch('/api/properties/patch/availabilityPlan',formValues)
					.then( (res) =>{
						console.log("availabilityPlan",res);
						if(res.status === 200){
							/*swal("wow","great job done!","success");*/
								this.props.redirectToCongratsPage(localStorage.getItem("uid"),localStorage.getItem("propertyId"));
							
							console.log("response",res);
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
				}else{
					swal("Please enter mandatory fields", "", "warning");
		        	console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}

			}
			
		    
			
		}
		/*selectType(event){
          if(this.state.contactPerson === "Someone" )
            {
              this.setState(
              {
                "contactPerson" : "Myself",
              });
            }else if(this.state.contactPerson === "Myself")
            {
               this.setState(
               {
                "contactPerson" : "Someone",
              }); 
            
          }
          // console.log("contactPerson onchange",this.state.contactPerson);
      }*/
      handleToggle(event){
      		event.preventDefault();
		    if (this.state.type===true){
		      this.setState({
		        type: false,
		        contactPerson:"Myself"
		      })
		    }
		    else{
		      this.setState({
		        type: true,
		        contactPerson:"Someone"

		      })
		    }   
		}

      backToFinancials(){
		// this.props.backToFinancials();
		this.props.backToFinancials(this.props.uid,localStorage.getItem("propertyId"));

	}
	handleAvailability(event){
		event.preventDefault();
		const availability = this.state.available;

		const day  = this.refs.availability.value ;
		const time = this.state.fromTime + ' - ' + this.state.toTime;

		if(day!=="" && this.state.fromTime!=="" && this.state.toTime!==""){
			// console.log("day",day);
			// console.log("time",time);
			availability.push({
			"day" : day,
			"time" : time,

			});
			this.setState({
				"available" : availability,
			},()=>{
				this.setState({
					fromTime : "12:00 am",
					toTime   : "12:00 am",
					now:moment().hour(0).minute(0),
					now1:moment().hour(0).minute(0),
				})
				$('select[name=availableDay').val('');
			});
		}else{
              swal("Please fill up all mandatory fields.", "", "warning");

		};	
	}

	deleteData(row)
	{
		// console.log('availability',this.state.available)
		// console.log("rowId",row);

		this.state.available.splice(row,1)
		this.setState({available:this.state.available})
	}

	handleChange(event){
		event.preventDefault();
		const datatype = event.target.getAttribute('data-text');
	    const {name,value} = event.target;
	    let formerrors = this.state.formerrors;
		// console.log("datatype",datatype);
		switch (datatype){


		case 'clientMobile' : 
	       formerrors.clientMobile = clientmobileRegex.test(value)? '' : "Please Enter 10 digit Number only";
	       break;

		default :
		break;

		}
		this.setState({ formerrors,
			[name]:value
		} );
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

	uploadPropertyImage(event){
   event.preventDefault();
   let self = this;
   if (event.currentTarget.files && event.currentTarget.files[0]) {
   var file = event.currentTarget.files[0];
   console.log("file",file);
      if (file) {
      var fileName = file.name; 
      console.log("fileName--------------->",fileName);
      console.log("config--------------->",this.state.config);
        var ext = fileName.split('.').pop(); 
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
          if (file) {
            S3FileUpload
              .uploadFile(file,this.state.config)
              .then((Data)=>{
                console.log("Data = ",Data);
                  var obj1={
                    imgPath : Data.location,
                  }
                  var imgArrayWSaws = this.state.imgArrayWSaws;
                  imgArrayWSaws.push(obj1);
                  this.setState({
                    // workspaceImages : imgArrayWSaws
                    imgArrayWSaws : imgArrayWSaws
                  })
              })
              .catch((error)=>{
                        console.log("error here--------------------- = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
							localStorage.removeItem("uid");
							localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
                });

            var objTitle={   
            	
              fileInfo :file
            }
            // var imgTitleArrayWS = [];
            imgTitleArrayWS.push(objTitle);
            this.setState({
              imageTitleArrayWS : imgTitleArrayWS
            })
             // console.log('imgArrayWS = ',imgTitleArrayWS);


          }else{          
            swal("File not uploaded","Something went wrong","error");  
          }
        }else{
          swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
        }
      }
    }
  }

  deleteimageWS(e){
    e.preventDefault();
    var index = e.target.getAttribute('id');
    var filePath = e.target.getAttribute('data-id');
    var data = filePath.split("/");
    var imageName = data[4];
    console.log("imageName==",imageName);

    if(index){
      swal({
            title: "Are you sure you want to delete this image?",
            text: "Once deleted, you will not be able to recover this.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              var array = this.state.imgArrayWSaws; // make a separate copy of the array
              array.splice(index, 1);
              swal("Image deleted successfully");
              this.setState({
                imgArrayWSaws: array
              });
            }else {
              swal("Your image is safe!");
            }
          });
    }
  }


  uploadSingleVideo(event){
   event.preventDefault();
    var index = event.target.getAttribute('id');
    console.log("index",index);
   
    	this.setState({
    		tempLoader : true,
    	});
   
    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      // console.log("file",file);
      if (file) {
      var fileName = file.name; 
      console.log("fileName--------------->",fileName);
      console.log("config--------------->",this.state.config);
        var ext = fileName.split('.').pop(); 
        if(ext=="mp4" || ext=="avi" || ext=="ogv"){  
          if (file) {
            if(this.state.singleVideo==""){
              S3FileUpload
                .uploadFile(file,this.state.config)
                .then((Data)=>{
                  console.log("Data = ",Data);
                  this.setState({
                    singleVideo : Data.location,
                    isLoading	: false,
                  },()=>{
                  	// $(".tempL").remove();
                  	this.setState({
                  		tempLoader : false
                  	})	
                  	// console.log("inside singleVideo",this.state.singleVideo);
                  })
                  	// console.log("outside singleVideo",this.state.singleVideo);

                 
                  this.deleteSingleLogo(index)
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
                    })
            }else{
              swal({
                    title: "Are you sure you want to delete this video?",
                    text: "Once replaced, you will not be able to recover this.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(file,this.state.config)
                          .then((Data)=>{
                            console.log("Data = ",Data);
                            this.setState({
                              singleVideo : Data.location
                            },()=>{console.log("singleVideo",this.state.singleVideo);})
                            this.deleteSingleLogo(index)
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
		                    })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }          
          }else{          
            swal("File not uploaded","Something went wrong","error");  
          }     
        }else{ 
          this.setState({tempLoader:false})
          swal("Format is incorrect","Only Upload video format (mp4,avi,ogv)","warning");   
        }
      }
    }
  }

  deleteSingleLogo(index){
    var data = index.split("/");
    var videoName = data[4];
    console.log("index1--------------->",videoName);
      if(index){
        S3FileUpload
          .deleteFile(videoName,this.state.config)
          .then((response) =>{ 
            console.log("Deletedddd...",response)
            swal("Image deleted successfully");
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
            })
      }
  }
  

   deleteSingleVideoDirect(event){
    event.preventDefault();
    swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this Video!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
              swal("Your video is deleted!");
              this.setState({
                singleVideo : ""
              })
            } else {
            swal("Your video is safe!");
          }
        });
  }

	backToAvailability(){
		console.log("localStorage.getItem(propertyId)",localStorage.getItem("propertyId"));
		this.props.backToAvailability(localStorage.getItem("uid"),localStorage.getItem("propertyId"));

	}


	render() {
		// console.log("this.state.contactPerson",this.state.contactPerson);
		// console.log("allowEmpty",this.state.allowEmpty);

		const availableMobile = localStorage.getItem("availableMobile")!= null ? localStorage.getItem("availableMobile") : "";
   			// console.log("availableMobile",availableMobile);
   	    const {formerrors} = this.state;

   	 	const data = this.state.available;
   	 	// console.log('data',data)
		const columns = [{
			Header: 'Availability',
			accessor: 'day'
			}, {
			Header: 'Time',
			accessor: 'time',
			},
			{
			Header: 'Action',
			accessor: 'id',
			Cell: row => 
          (
          <div className="actionDiv col-lg-offset-3">
              <div className="col-lg-6" title="Delete" id={row.index} onClick={() => this.deleteData(row.index)}>
            <i className="fa fa-trash"> </i>
              </div>
             
            </div>
            )     
			}]
    return (
     <div >
           <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  <div className="row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  	<div className="form-group" id="">
			  	 		<label htmlFor="" className="">Who will show?</label>
					 	{/*<div className="can-toggle1 genderbtn demo-rebrand-2" onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox"/>
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle1__switch" data-checked="Myself"  data-unchecked="Someone Else" ></div>
				                <div className="can-toggle1__label-text"></div>
				              </label>
			            </div>*/}

			            {/*<div className="container5 col-lg-6 col-md-12 col-sm-12 col-xs-12 noPad">*/}
						        {this.state.type===true ?

						         <div className="switch1" onClick={this.handleToggle.bind(this)} >
						            <input type="radio" className="switch1-input" name="view" value={this.state.contactPerson} id="week"  checked />
						            <label htmlFor="week" className="switch1-label switch1-label-off">Someone Else</label>
						            <input type="radio" className="switch1-input" name="view" value={this.state.contactPerson} id="month"  />
						            <label htmlFor="month" className="switch1-label switch1-label-on">Myself</label>
						            <span className="switch1-selection"></span>
						          </div>

						          :

						           <div className="switch1" onClick={this.handleToggle.bind(this)} >
						            <input type="radio" className="switch1-input" name="view" value={this.state.contactPerson} id="week"   />
						            <label htmlFor="week" className="switch1-label switch1-label-off">Someone Else</label>
						            <input type="radio" className="switch1-input" name="view" value={this.state.contactPerson} id="month" checked  />
						            <label htmlFor="month" className="switch1-label switch1-label-on">Myself</label>
						            <span className="switch1-selection" ></span>
						          </div>
						       
						      }
						    
						  {/*</div>*/}

				  	</div>
				  </div>
				  
				  {this.state.contactPerson === "Someone" ? 
				  	 <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
			  	 		<label htmlFor="contactPersonMobile" className="">Phone Number</label>
						  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-mobile iconClr"></i>
		                    </div>
					    		<input type="text" data-text="clientMobile" name="contactPersonMobile" value={this.state.contactPersonMobile} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} className="form-control" ref="contactPersonMobile" min="0" maxLength="10" placeholder="Phone Number" />
					  		</div>
					  		{this.state.formerrors.clientMobile &&(
		                          <span className="text-danger">{formerrors.clientMobile}</span> 
		                        )}
					  </div>
				  </div>
				  :
				   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="" >
			  	 		<label htmlFor="contactPersonMobile" className="">Phone Number</label>
						  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-mobile iconClr"></i>
		                    </div>
					    		<input type="number"  name="contactPersonMobile" value={this.state.userMobile} className="form-control" ref="" min="0" placeholder="Phone Number" disabled/>
					  		</div>
					  </div>
				  </div>
				  }
				 
		 	 </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label htmlFor="">Visit Schedule (Add as many as You Like)</label>
			  	 </div>
			  </div>
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">	
		    	<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">	
		    		<label className=""> Availability <span className="astrick">*</span></label>
					  <select className="custom-select form-control " ref="availability" placeholder="select" name="availableDay" >
				    	<option value="">-- Select --</option>
				    	<option value="Everyday (Mon-Sun)"> Everyday (Mon-Sun)</option>
				    	<option value="Weekdays (Mon-Fri)"> Weekdays (Mon-Fri)</option>
				    	<option value="Weekends (Sat-Sun)"> Weekends (Sat-Sun)</option>
				    	<option value="Monday">   Monday 	</option>
				    	<option value="Tuesday">  Tuesday 	</option>
				    	<option value="Wednesday">Wednesday </option>
				    	<option value="Thursday"> Thursday 	</option>
				    	<option value="Friday">   Friday 	</option>
				    	<option value="Saturday"> Saturday 	</option>
				    	<option value="Sunday">   Sunday 	</option>
				    </select>
				</div>


				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
	    			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> From Time<span className="astrick">*</span> </label>

					<div className="col-lg-7 col-md-8 col-sm-7 col-xs-7"  id="" >
					    <div className="input-group">
					      	
							  <TimePicker
							    showSecond={false}
							    className="xxx"
							    value={this.state.now}
							    onChange={this.fromTime.bind(this)}
							    format={format}
							    use12Hours
							    inputReadOnly
							    className="timePicHeight"
							    
							  />
							
					  	</div>
					</div>
				</div>

				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
	    			<label htmlFor="toTime" className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> To Time <span className="astrick">*</span></label>

					<div className="col-lg-7 col-md-8 col-sm-7 col-xs-7"  id="" >
					    <div className="input-group inputBox-main ">
					      	
					  		<TimePicker
							    showSecond={false}
							    value={this.state.now1}
							    className="xxx"
							    onChange={this.toTime.bind(this)}
							    format={format}
							    use12Hours
							    inputReadOnly
							    className="timePicHeight"
							    name="toTime"
							  />
					  	</div>
					</div>
			  	</div>
			  	<div className="col-lg-1 col-md-2 col-sm-12 col-xs-12 ">
			    	<label htmlFor="" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dotColor">.</label>				  
					<button className="btn btn-primary" onClick={this.handleAvailability.bind(this)}>Add Slot +</button>					  	
				</div> 
		  	</div>
		   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 	<ReactTable
				    data={data}
				    columns={columns}
				    className={"-striped -highlight"}
				    minRows={3}
				    showPagination={false}
				  />
			  	 	
				</div>
			</div>

			<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 backGround">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentHolder autoHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp ">
                  {this.state.imgArrayWSaws==null?
                    null
                  :
                    this.state.imgArrayWSaws.map((data,index)=>{
                      return(
                              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{paddingTop:"16px"}} key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row " >
                                  <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Property Image {index+1}</h5>
                                </div> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                  <div className=" imageContaner"  key={index}>
                                    <label htmlFor="img" id={index} className="pull-right custFaTimes" title="Delete Image" data-id={data.imgPath} onClick={this.deleteimageWS.bind(this)}>X</label>
                                    <img className="img-responsive imgHeight" name="img" src={data.imgPath}/>
                                  </div>
                                </div>
                              </div>
                            )
                    })
                  }
                  {this.state.imgArrayWSaws== null?
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 row ">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Please Upload Images:</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Property Images</span>
                           <span className="">Accepted formats are .jpg,.gif,.bmp,& .png</span>
                          </div>      
                          <input  type="file" title="Click to attach file"  name="userPic" onChange={this.uploadPropertyImage.bind(this)} ref="propertyImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 row ">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Please Upload Images:</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k" style={{height:"140px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon1">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12 below_text noPad">
                           <b className="text_k11"></b>
                           <span className="text-center under_ln col-lg-12 col-xs-12 noPad">Choose Image</span>
                           <div className="format1">Accepted formats: .jpg,.gif,.bmp,& .png <br/>Max size: 4 MB</div>
                          </div>      
                          <input  type="file" title="Click to attach file"  name="userPic" onChange={this.uploadPropertyImage.bind(this)} ref="propertyImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                    </div>
                }
                </div>

            {/*--------------------------------------------------------------*/}
						
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp marBtm">
                  {this.state.singleVideo===""?
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Please Upload Video:</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k "  style={{height:"140px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon2 move_hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-12 below_text noPad">
                           <b className="text_k11"></b>
                           <span className="under_ln col-lg-12 col-xs-12 noPad">Choose Video</span>
                           <div className="format2">Accepted formats: .mp4,.avi,.ogv <br/>Max size: 20 MB</div>

                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadSingleVideo.bind(this)} ref="propertyVideo"  className="form-control click_input" id={this.state.singleVideo} />
                        </div> 
                      </div>
                      {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: mp4, avi, ogv)</div>
                    */}</div>
                    :
                    null}

                    {this.state.tempLoader === true ?
                    	<div>
                    	<Loader
					         type="Oval"
					         color="#F5AD3E"
					         height="100"
					         width="100"
					         id="tempL"
					         className="tempL"
					         					      />

					     </div>
					      :
					      null
                    	
                    }

                  {this.state.singleVideo==="" ?
                    
                     null

                  :


                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Please Upload Video:</h5>
                      </div>
                      <div className="containerC">
                        <label htmlFor="" id="logoImage" className="pull-right custFaTimes1" title="Delete Video" onClick={this.deleteSingleVideoDirect.bind(this)}>X</label>
                       {	console.log("this.state.singleVideo -----------------",this.state.singleVideo) }

	                   {   
	                       	<video width="200" height="200" controls>
	                       			{console.log("here video link of map",this.state.singleVideo)}
	                                <source src={this.state.singleVideo} type="video/mp4" className="col-lg-12 noPad"/>
	                        </video>
                    	}
                        <div className="middleC">
                        </div>
                      </div>
                    </div>
                  }                  
                </div>
				</div>
			</div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
		  	{<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-left">
		       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToFinancials.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  	</div>}
		  	<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-right">
		       <button type="submit" className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23"  onClick={this.insertAvailability.bind(this)}>Finish &nbsp; &nbsp; &rArr;</button>
		  	</div>
		  </div>
		  
		</form>
		</div>
	{/*=================================IMAGE UPLOAD========================================================================*/}
		
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				
				{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt78">
				  	{<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-left">
				       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAvailability.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
				  	</div>}
				  	<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-right">
				       <button className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.uploadData.bind(this)} >Finish &nbsp; &nbsp; &rArr;</button>
				  	</div>
				</div>*/}
			</div>
		

	</div>
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		property_id     : state.property_id,
		uid			    : state.uid,
		availableMobile : state.availableMobile,
		updateStatus    : state.updateStatus,		


	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		backToFinancials  	        : (uid,property_id)=> dispatch({type: "BACK_TO_FINANCIALS",
																	uid:  uid,
																	property_id:property_id
														
	}),

	redirectToCongratsPage 		 : (uid,propertyId)=> dispatch({type: "REDIRECT_TO_CONGRATS_PAGE",
											 uid         :  uid,
											 property_id :  propertyId,	
								}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Availability));
