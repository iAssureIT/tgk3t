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
 class ImageUpload extends Component {

	constructor(props){
		super(props);
		this.state = {
			"config"			: '',
			"imageArray"  		: [],
			"imageTitleArray" 	: [],
			"S3url" 	        : [],
		}


	}
	
	uploadImage(event){
		var imageTitleArray = this.state.imageTitleArray;
		var uid 			= localStorage.getItem("uid");
		var propertyId 		= localStorage.getItem("propertyId");
	
		

		main().then(formValues => {
			console.log("3 formValues = ",formValues);

			axios
				.patch('/api/properties/patch/images',formValues)
				.then( (res) =>{
					console.log("response = ", res);
					if(res.status === 200){
						console.log("res = ", res);
						this.props.redirectToCongratsPage(uid,propertyId);
					}

				})
				.catch((error) =>{
					console.log("error = ", error);
				});				
			
		});



		async function main(){
			var config = await getConfig();
			
			var s3urlArray = [];
			for (var i = 0; i<imageTitleArray.length; i++) {
				var s3url = await s3upload(imageTitleArray[i].fileInfo, config, this);
				s3urlArray.push(s3url);
			}

			const formValues = {
				"property_id" 		: propertyId,
				"uid" 		  		: uid,
				"propertyImages"	: s3urlArray,
			};

			console.log("1 formValues = ",formValues);
			return Promise.resolve(formValues);
		}


		function s3upload(image,configuration){

			return new Promise(function(resolve,reject){
				S3FileUpload
				   .uploadFile(image,configuration)
				   .then((Data)=>{
				   		// console.log("Data = ",Data);
				   		resolve(Data.location);
				   })
				   .catch((error)=>{
				   		console.log(error);
				   })
			})
		}



		function getConfig(){
			return new Promise(function(resolve,reject){
				axios
			       .get('/api/projectSettings/get/one/S3')
			       .then((response)=>{
			       		// console.log("proj set res = ",response.data);
						const config = {
							bucketName 		: response.data.bucket,
							dirName  		: 'propertiesImages',
							region 			: response.data.region,
							accessKeyId 	: response.data.key,
							secretAccessKey : response.data.secret,
						}
						resolve(config);						   
					})
			       .catch(function(error){
			         	console.log(error);
			       })

			})
		}

	}

/*	redirectToCongratsPage()
	{
		if(this.state.status === true){
			this.props.redirectToCongratsPage(localStorage.getItem('uid'),localStorage.getItem('propertyId'))
		}
	}*/

	backToAvailability(){
		this.props.backToAvailability();
	}

	handleImgChange(event){
	   	if (event.currentTarget.files && event.currentTarget.files[0]) {
	   		for(var i=0; i<event.currentTarget.files.length; i++){
			   	var file = event.currentTarget.files[i];
		     	if (file) {
		     	  	var fileName  = file.name; 
		     	    var ext = fileName.split('.').pop();  
		            if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
		                if (file) {
	                       	var objTitle = { fileInfo :file }
							imgTitleArray.push(objTitle);
							// var reader = new FileReader();
							// reader.onloadend = () => {
						 	//    	var obj={
							// 	   	imgPath : reader.result,
							// 	}
							// 	imgArray.push(obj);
							//    	this.setState(prevState => ({
							//    		imageArray : [...this.prevState.imageArray, imgArray]
							//    	}))
							// }
					  //   	reader.readAsDataURL(file)
		    			}else{          
						    swal("File not uploaded","Something went wrong","error");  
				        }//file
		            }else{ 
		                swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
		            }//file types
		   		}//file

	   		}//for 

	   		if(i >= event.currentTarget.files.length){
				this.setState({
				   	imageTitleArray : imgTitleArray
				});	   			
	   		}

		}
	}

	deleteimage(e){
		// var arry = this.state.imageTitleArray
		var array = [...this.state.imageTitleArray]; // make a separate copy of the array
	  	var index = array.indexOf(e.target.value)
		if (index !== -1) {
		   array.splice(index, 1);
		   this.setState({imageTitleArray: array});
		}

	}

	render() {
		console.log("imageTitleArray",this.state.imageTitleArray);
		console.log("imageArray",this.state.imageArray);
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backGround">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentHolder">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImg">
							<label>Please Upload Images:</label>
							<input type="file" className="" accept=".jpg,.jpeg,.png" onChange={this.handleImgChange.bind(this)} multiple/>

						</div>
						<div className="col-lg-12">
							{this.state.imageArray?
								this.state.imageArray.map((data,index)=>{
									return(
										<div className="col-lg-4 imgcss" key={index}>
											<img style={{width:"150px"}} className="img-responsive" src={data.imgPath}/>
											<label className="imgLabel" id={index} onClick={this.deleteimage.bind(this)}>&times;</label>
										</div>)
								})
								:
								null
							}
						</div>
						
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadVideo">
							<label>Please Upload Video:</label>
							<input type="file" className="" accept=".mp3,.mp4"  />

						</div>
					</div>
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt78">
				  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
				       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAvailability.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
				  	</div>
				  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
				       <button className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.uploadImage.bind(this)} >Finish &nbsp; &nbsp; &rArr;</button>
				  	</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id  : state.property_id,
		uid			 : state.uid

	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		backToAvailability  	     : ()=> dispatch({type: "BACK_TO_AVAILABILITY"}),
		redirectToCongratsPage 		 : (uid,propertyId)=> dispatch({type: "REDIRECT_TO_CONGRATS_PAGE",
											 uid         :  uid,
											 property_id :  propertyId,	
								}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ImageUpload));
