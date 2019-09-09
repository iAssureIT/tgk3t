import React , { Component }	from 'react';
import axios 					from 'axios';
import { connect } 				from 'react-redux';
import { withRouter}            from 'react-router-dom';
import swal 					from 'sweetalert';
import S3FileUpload 			from 'react-s3';
import Loader 					from 'react-loader-spinner'
import $ 						from 'jquery';
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
			isLoading			: true,
			originalValues      : '',
			tempLoader 			: false,


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
					.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    });

        	}

	}
	
	componentDidMount(){

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

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
                             this.props.history.push("/");
                        }
        });

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
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
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


  

	uploadData(event){
		if(this.state.updateOperation === true)
		{
			// console.log("update fun");
				var ov = this.state.originalValues;

					console.log("diff data");
					const formValues = {

						"property_id" 		: localStorage.getItem("propertyId"),
						"uid" 		  		: localStorage.getItem("uid"),
						"propertyImages"	: this.state.imgArrayWSaws,
						"video"				: this.state.singleVideo,
						"status"			: "New"

					}
				
					// console.log("formValues = ",formValues);
					
						axios
						.patch('/api/properties/patch/gallery',formValues)
						.then( (res) =>{
							console.log("response = ", res);
							if(res.status === 200){
								console.log("res = ", res);
								this.props.redirectToCongratsPage(localStorage.getItem("uid"),localStorage.getItem("propertyId"));
							}

						})
						.catch((error)=>{
	                        console.log("error = ",error);
	                        if(error.message === "Request failed with status code 401")
	                        {
	                             swal("Your session is expired! Please login again.","", "error");
	                             this.props.history.push("/");
	                        }
	                    })
				// }

		}else{
			// console.log("sub fun");

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
				.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    })

			}
		
		}				

	backToAvailability(){
		console.log("localStorage.getItem(propertyId)",localStorage.getItem("propertyId"));
		this.props.backToAvailability(localStorage.getItem("uid"),localStorage.getItem("propertyId"));

	}

	

	render() {
		console.log("singleVideo=>",this.state.singleVideo);
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backGround">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentHolder autoHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp noPad">
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
                                  <div className="" key={index}>
                                    <label id={index} className="pull-right custFaTimes" title="Delete Image" data-id={data.imgPath} onClick={this.deleteimageWS.bind(this)}>X</label>
                                    <img className="img-responsive imgHeight" src={data.imgPath}/>
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
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text noPad">
                           <b className="text_k11"></b>
                           <span className="text-center under_ln col-lg-12 noPad">Choose Image</span>
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
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text noPad">
                           <b className="text_k11"></b>
                           <span className="under_ln col-lg-12 noPad">Choose Video</span>
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
                        <label id="logoImage" className="pull-right custFaTimes1" title="Delete Video" onClick={this.deleteSingleVideoDirect.bind(this)}>X</label>
                       {	console.log("this.state.singleVideo -----------------",this.state.singleVideo) }

	                   {   
	                       	<video width="100%" height="100%" controls>
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
               

			{/*======================================================================*/}
					</div>
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt78">
				  	{<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-left">
				       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAvailability.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
				  	</div>}
				  	<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-right">
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
