import React , { Component }	from 'react';
import axios 					from 'axios';
import { connect } 				from 'react-redux';
import { withRouter}            from 'react-router-dom';
import swal 					from 'sweetalert';
import S3FileUpload 			from 'react-s3';
/**/
// import "bootstrap/dist/css/bootstrap.min.css";
import './ImageUpload.css';

var imgArray = [];
var imgTitleArray = [];

 var imgTitleArrayWS = [];

 class ImageUpload extends Component {

	constructor(props){
		super(props);
		this.state = {
			"config"			: '',
			"imageArray"  		: [],
			"imageTitleArray" 	: [],
			"videoArray" 		: [],
			"S3url" 	        : [],
			"imgArrayWSaws" 	: [],
			"singleVideo" 		: "",
			"updateOperation"   : false,
			originalValues      : '',


		}

		console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			if(this.props.updateStatus === true){

	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (response) =>{
						console.log("response in img= ",response);
						
						this.setState({
								originalValues      : response.data.gallery,
								imgArrayWSaws 		: response.data.gallery.Images,
								singleVideo 	    : response.data.gallery.video ? response.data.gallery.video : "" ,
								updateOperation     : true,
								
						},()=>{
							});

					})
					.catch((error) =>{
						console.log("error = ", error);
					});

        	}

	}
	
	componentDidMount(){
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
      .catch(function(error){
        console.log(error);
      })

  }

  uploadPropertyImage(event){
   event.preventDefault();
   let self = this;
   if (event.currentTarget.files && event.currentTarget.files[0]) {
   var file = event.currentTarget.files[0];
   // console.log("file",file);
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
                console.log("formErrors");
                console.log(error);
              })

            var objTitle={   
              fileInfo :file
            }
            // var imgTitleArrayWS = [];
            imgTitleArrayWS.push(objTitle);
            this.setState({
              imageTitleArrayWS : imgTitleArrayWS
            })
             console.log('imgArrayWS = ',imgTitleArrayWS);


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
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this information!",
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
                    singleVideo : Data.location
                  })
                  this.deleteSingleLogo(index)
                })
                .catch((error)=>{
                  console.log("formErrors");
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure?",
                    text: "Once replaced, you will not be able to recover this video!",
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
                            console.log("formErrors");
                            console.log(error);
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
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
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


  

	uploadData(event){
		console.log("imgArrayWSaws",this.state.imgArrayWSaws);
		console.log("singleVideo",this.state.singleVideo);

		
		// var imageTitleArray = this.state.imageTitleArray;
		// // var video 			= this.state.videoArray;
		// var uid 			= localStorage.getItem("uid");
		// var propertyId 		= localStorage.getItem("propertyId");

		if(this.state.updateOperation === true)
		{
			console.log("update fun");
				var ov = this.state.originalValues;
				// if(this.state.imgArrayWSaws === ov.Images && this.state.singleVideo === ov.video )
				// {
				// 	console.log("same data");
				// 	this.props.redirectToCongratsPage(localStorage.getItem("uid"),localStorage.getItem("propertyId"));

				// }else{
					console.log("diff data");
					const formValues = {

						"property_id" 		: localStorage.getItem("propertyId"),
						"uid" 		  		: localStorage.getItem("uid"),
						"propertyImages"	: this.state.imgArrayWSaws,
						"video"				: this.state.singleVideo,
						"status"			: "New"

					}
				
					console.log("formValues = ",formValues);
					
						axios
						.patch('/api/properties/patch/gallery',formValues)
						.then( (res) =>{
							console.log("response = ", res);
							if(res.status === 200){
								console.log("res = ", res);
								this.props.redirectToCongratsPage(localStorage.getItem("uid"),localStorage.getItem("propertyId"));
							}

						})
						.catch((error) =>{
							console.log("error = ", error);
						});	
				// }

		}else{
			console.log("sub fun");

			const formValues = {

				"property_id" 		: localStorage.getItem("propertyId"),
				"uid" 		  		: localStorage.getItem("uid"),
				"propertyImages"	: this.state.imgArrayWSaws,
				"video"				: this.state.singleVideo,
				"status"			: "New"

			}
		
			console.log("formValues = ",formValues);
			
				axios
				.patch('/api/properties/patch/gallery',formValues)
				.then( (res) =>{
					console.log("response = ", res);
					if(res.status === 200){
						console.log("res = ", res);
						this.props.redirectToCongratsPage(localStorage.getItem("uid"),localStorage.getItem("propertyId"));
					}

				})
				.catch((error) =>{
					console.log("error = ", error);
				});	


			}
		
		}				
			
	



		// async function main(){
		// 	var config = await getConfig();
			
		// 	// var s3urlArray = this.state.imgArrayWSaws;
		// 	// for (var i = 0; i<imageTitleArray.length; i++) {
		// 	// 	var s3url = await s3upload(imageTitleArray[i].fileInfo, config, this);
		// 	// 	console.log("s3Url = ",s3url);
		// 	// 	s3urlArray.push(s3url);
		// 	// }

		// 	// var videoUrl = 'abc';
		// 	if(video[0]){
		// 		var videoUrl = await s3uploadVideo(video[0].fileInfo, config, this);
		// 		console.log("videoUrl",videoUrl);
		// 	}else{
		// 		var videoUrl = "";
		// 	}

		// 	console.log("this.state.imgArrayWSaws",this.state.imgArrayWSaws);
		// 	const formValues = {
		// 		"property_id" 		: propertyId,
		// 		"uid" 		  		: uid,
		// 		"propertyImages"	: this.state.imgArrayWSaws,
		// 		"video"				: videoUrl,
		// 		"status"			: "New"
		// 	};

		// 	console.log("1 formValues = ",formValues);
		// 	return Promise.resolve(formValues);
		// }


		// function s3upload(image,configuration){
		// 	console.log("s3upload v = ", image);
		// 	console.log("s3upload configuration = ", configuration);

		// 	return new Promise((resolve,reject)=>{
		// 		S3FileUpload
		// 		   .uploadFile(image,configuration)
		// 		   .then((Data)=>{
		// 		   		// console.log("Data = ",Data);
		// 		   		resolve(Data.location);
		// 		   })
		// 		   .catch((error)=>{
		// 		   		console.log(error);
		// 		   })
		// 	})
		// }

		// function s3uploadVideo(video,configuration){
		// 	console.log("s3uploadVideo v = ", video);
		// 	console.log("s3uploadVideo configuration = ", configuration);
		// 	return new Promise((resolve,reject)=>{
		// 		S3FileUpload
		// 		   .uploadFile(video,configuration)
		// 		   .then((Data)=>{
		// 		   		console.log("DataVideo = ",Data);
		// 		   		resolve(Data.location);
		// 		   })
		// 		   .catch((error)=>{
		// 		   		console.log(error);
		// 		   })
		// 	})
		// }



		// function getConfig(){
		// 	return new Promise((resolve,reject)=>{
		// 		axios
		// 	       .get('/api/projectSettings/get/one/S3')
		// 	       .then((response)=>{
		// 	       		// console.log("proj set res = ",response.data);
		// 				const config = {
		// 					bucketName 		: response.data.bucket,
		// 					dirName  		: 'propertiesImages',
		// 					region 			: response.data.region,
		// 					accessKeyId 	: response.data.key,
		// 					secretAccessKey : response.data.secret,
		// 					ACL 			: 'public-read',
		// 				}
		// 				resolve(config);						   
		// 			})
		// 	       .catch(function(error){
		// 	         	console.log(error);
		// 	       })

		// 	})
		// }

	// }

/*	redirectToCongratsPage()
	{
		if(this.state.status === true){
			this.props.redirectToCongratsPage(localStorage.getItem('uid'),localStorage.getItem('propertyId'))
		}
	}*/

	backToAvailability(){
		// this.props.backToAvailability();
		console.log("localStorage.getItem(propertyId)",localStorage.getItem("propertyId"));
		this.props.backToAvailability(localStorage.getItem("uid"),localStorage.getItem("propertyId"));

	}

	// handleImgChange(event){
	//    	if (event.currentTarget.files && event.currentTarget.files[0]) {
	//    		for(var i=0; i<event.currentTarget.files.length; i++){
	// 		   	var file = event.currentTarget.files[i];
	// 	     	if (file) {
	// 	     	  	var fileName  = file.name; 
	// 	     	    var ext = fileName.split('.').pop();  
	// 	            if( ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
	// 	                if (file) {
	//                        	var objTitle = { fileInfo :file }
	// 						imgTitleArray.push(objTitle);
	// 						// var reader = new FileReader();
	// 						// reader.onloadend = () => {
	// 					 	//    	var obj={
	// 						// 	   	imgPath : reader.result,
	// 						// 	}
	// 						// 	imgArray.push(obj);
	// 						//    	this.setState(prevState => ({
	// 						//    		imageArray : [...this.prevState.imageArray, imgArray]
	// 						//    	}))
	// 						// }
	// 				  //   	reader.readAsDataURL(file)
	// 	    			}else{          
	// 					    swal("Images not uploaded","Something went wrong","error");  
	// 			        }//file
	// 	            }else{ 
	// 	                swal("Please upload Image","Allowed images formats are (jpg,png,jpeg)","warning");   
	// 	            }//file types
	// 	   		}//file

	//    		}//for 

	//    		if(i >= event.currentTarget.files.length){
	// 			this.setState({
	// 			   	imageTitleArray : imgTitleArray
	// 			},()=>{
	// 				console.log("here imageTitleArray",this.state.imageTitleArray);
	// 			});	   			
	//    		}

	// 	}
	// }

	// handleVideoChange(event){
	// 	var videoArray = [];
	//    	if (event.currentTarget.files && event.currentTarget.files[0]) {
	//    		for(var i=0; i<event.currentTarget.files.length; i++){
	// 		   	var file = event.currentTarget.files[0];
	// 	     	if (file) {
	// 	     	  	var fileName  = file.name; 
	// 	     	    var ext = fileName.split('.').pop();  
	// 	            if(ext==="mp4" || ext==="avi" || ext==="ogv"){
	// 	                if (file) {
	//                        	var objTitle = { fileInfo :file };
	// 						videoArray.push(objTitle);
	// 	                	console.log("video = ", file);
	// 	    			}else{          
	// 					    swal("Video not uploaded","Something went wrong","error");  
	// 			        }//file
	// 	            }else{ 
	// 	                swal("Please upload Correct Video","Allowed Formats are .mp4, .avi, .ogv","warning");   
	// 	            }//file types
	// 	   		}//file
	// 	   	}//for

	//    		if(i >= event.currentTarget.files.length){
	// 			this.setState({
	// 			   	videoArray : videoArray
	// 			});	   			
	//    		}


	// 	}
	// }

	// deleteimage(e){
	// 	// var arry = this.state.imageTitleArray
	// 	var array = [...this.state.imageTitleArray]; // make a separate copy of the array
	//   	var index = array.indexOf(e.target.value)
	// 	if (index !== -1) {
	// 	   array.splice(index, 1);
	// 	   this.setState({imageTitleArray: array});
	// 	}

	// }

	render() {
		// console.log("imageTitleArray",this.state.imageTitleArray);
		// console.log("imageArray",this.state.imageArray);
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backGround">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentHolder autoHeight">
						{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImg">
							<label>Please Upload Images:</label>
							<input type="file" className="" accept=".jpg,.jpeg,.png" onChange={this.handleImgChange.bind(this)} multiple/>

						</div>
						<div className="col-lg-12">
							{this.state.imageArray?
								this.state.imageArray.map((data,index)=>{
									return(
										<div className="col-lg-4 imgcss" key={index}>
											<img style={{width:"150px"}} className="img-responsive" src={data.imgPath} alt="" />
											<label className="imgLabel" id={index} handleVideoChange  onClick={this.deleteimage.bind(this)}>&times;</label>
										</div>)
								})
								:
								null
							}
						</div>*/}



                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  {this.state.imgArrayWSaws==null?
                    null
                  :
                    this.state.imgArrayWSaws.map((data,index)=>{
                      return(
                              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Property Image {index+1}</h5>
                                </div> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                  <div className="" key={index}>
                                    <label id={index} className="pull-right custFaTimes" title="Delet image" data-id={data.imgPath} onClick={this.deleteimageWS.bind(this)}>X</label>
                                    <img className="img-responsive" src={data.imgPath}/>
                                  </div>
                                </div>
                              </div>
                            )
                    })
                  }
                  {this.state.imgArrayWSaws== null?
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Please Upload Images:</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Property Images</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadPropertyImage.bind(this)} ref="propertyImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Please Upload Images:</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k" style={{height:"120px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon1">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="text-center under_ln">Choose another image</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadPropertyImage.bind(this)} ref="propertyImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                    </div>
                }
                </div>

            {/*--------------------------------------------------------------*/}
						
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp marBtm">
                  {this.state.singleVideo==""?
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Please Upload Video:</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k "  style={{height:"120px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon2 move_hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Your Video</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadSingleVideo.bind(this)} ref="propertyVideo"  className="form-control click_input" id={this.state.singleVideo} />
                        </div> 
                      </div>
                      {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: mp4, avi, ogv)</div>
                    */}</div>
                    :null}
                  {this.state.singleVideo==""?
                    null
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Please Upload Video:</h5>
                      </div>
                      <div className="containerC">
                        <label id="logoImage" className="pull-right custFaTimes1" title="Delet video" onClick={this.deleteSingleVideoDirect.bind(this)}>X</label>
                       {/* <img src={this.state.singleVideo} alt="Avatar" className="imageC"/>*/}
                       <video width="100%" height="100%" controls>
                       			{console.log("here video link of map",this.state.singleVideo)}
                                <source src={this.state.singleVideo} type="video/mp4" className="col-lg-12 noPad"/>
                        </video>
                        <div className="middleC">
                          <div className="textCA">
                            <input type="file" title="Click to change the photo" multiple name="userPic" id={this.state.singleVideo} onChange={this.uploadSingleVideo.bind(this)} ref="propertyVideo" className="form-control click_input" />
                            <i className="fa fa-camera fa-2x"></i>
                          </div>
                        </div>
                      </div>
                     {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: mp4, avi, ogv)</div>
                   */} </div>
                  }                  
                </div>
               

			{/*======================================================================*/}
						{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadVideo">
							<label>Please Upload Video:</label>
							<input type="file" className="" accept=".mp4, .avi, .ogv" onChange={this.handleVideoChange.bind(this)} />
						</div>*/}
					</div>
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt78">
				  	{<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
				       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAvailability.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
				  	</div>}
				  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
				       <button className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.uploadData.bind(this)} >Finish &nbsp; &nbsp; &rArr;</button>
				  	</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id  : state.property_id,
		uid			 : state.uid,
		updateStatus    : state.updateStatus,		


	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		backToAvailability  	     : (uid,propertyId)=> dispatch({type: "BACK_TO_AVAILABILITY",
											 uid         :  uid,
											 property_id :  propertyId,
										}),
		redirectToCongratsPage 		 : (uid,propertyId)=> dispatch({type: "REDIRECT_TO_CONGRATS_PAGE",
											 uid         :  uid,
											 property_id :  propertyId,	
								}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ImageUpload));
