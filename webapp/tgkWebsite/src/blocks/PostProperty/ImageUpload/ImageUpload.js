import React , { Component }	from 'react';
import axios 					from 'axios';
import { connect } 				from 'react-redux';
import { withRouter}    from 'react-router-dom';
import swal 					from 'sweetalert';
/**/
// import "bootstrap/dist/css/bootstrap.min.css";
import './ImageUpload.css';
var imgArray = [];
var imgTitleArray = [];
 class ImageUpload extends Component {

	constructor(props){
		super(props);
		this.state = {
			"nameOfFile"		: '',
			"imageArray"  		: [],
			"imageTitleArray" 	: []
		}
	}
	uploadStudentImage(event){
   event.preventDefault();
   
 }

		uploadImage(){
			const formValues = {
				"property_id" : this.props.property_id,
				"uid" 		  : this.props.uid,
				"imageArray"  : this.state.imageArray,
				"imageTitleArray" : this.state.imageTitleArray,
				"imagePreviewUrl" : "/images/1.png",

			};
			console.log("imageUpload req = ",formValues);
			
			// S3FileUpload
			//    .uploadFile(file,this.state.config)
			//    .then((Data)=>{
			//    	console.log("Data = ",Data);
			// 		this.setState({
			// 		userProfile : Data.location
			// 		})
			//    })
			//    .catch((error)=>{
			//    	console.log(error);
			//    })

			axios
				.patch('/api/properties/patch/photos',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status === 200){
						// this.props.redirectToImageUpload();
					}
				})
				.catch((error) =>{
						this.props.redirectToCongratsPage(this.props.uid);
					// console.log("error = ", error);
				});
		}
		backToAvailability(){
			this.props.backToAvailability();
		}

		handleChange(event){
			   if (event.currentTarget.files && event.currentTarget.files[0]) {
			   var file = event.currentTarget.files[0];
			     	if (file) {
			     	  var fileName  = file.name; 
			     	console.log("fileName--------------->",fileName);
			     	    var ext       = fileName.split('.').pop();  
			                 	if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){    
			                       if (file) {
			                       	
			                       	var objTitle=
								    		{				   	
										   	fileInfo :file
										   }
								   imgTitleArray.push(objTitle);
								   this.setState({
								   		imageTitleArray : imgTitleArray
								   })
								   var reader = new FileReader();
								    reader.onloadend = () => {
								    	var obj={
										   	imgPath : reader.result,
										   }
										   imgArray.push(obj);
										   this.setState({
										   		imageArray : imgArray
										   })
								    }

						    reader.readAsDataURL(file)





			    					}else{          
							            swal("File not uploaded","Something went wrong","error");  
					               }     
			                  }else{ 
			                      swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
			                   }
			   		}

				}
					// var file = event.target.files[0];
					//   var reader = new FileReader();
					//   var url = reader.readAsDataURL(file);
					//   console.log("reader",reader.result)


			// var file = event.target.files[0];
			// var fileName = event.target.files[0].name;
			// console.log("file Name",fileName)
			// console.log("file --->",file)
		 //   var pathName = URL.createObjectURL(file);
		 //   var imgPathName = pathName.split('blob:');
		   // console.log("img===",imgPathName)


		    // var file = event.target.files[0];

		    

		   
		   // var obj={
		   // 	imgPath : reader.result
		   // }
		   // imgArray.push(obj);
		   // this.setState({
		   // 		imageArray : imgArray
		   // })



			// this.setState({
			// "nameOfFile" : fileName,
			// })
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
		console.log("imageArray",this.state.imageTitleArray);
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backGround">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentHolder">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImg">
							<label>Please Upload Images:</label>
							<input type="file" className="" accept=".jpg,.jpeg,.png" onChange={this.handleChange.bind(this)}/>

						</div>
						<div>
							{this.state.imageArray?
								this.state.imageArray.map((data,index)=>{
									return(
										<div className="col-lg-3 imgcss" key={index}>
											<img alt=""  className="img-responsive" src={data.imgPath}/>
											<label id={index} onClick={this.deleteimage.bind(this)}>Close</label>
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
				       <button className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.uploadImage.bind(this)} >Save & Next &nbsp; &nbsp; &rArr;</button>
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
		backToAvailability  	        : ()=> dispatch({type: "BACK_TO_AVAILABILITY"}),
		redirectToCongratsPage       : (uid)=> dispatch({type: "REDIRECT_TO_CONGRATS_PAGE",
														uid:  uid
	}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ImageUpload));
