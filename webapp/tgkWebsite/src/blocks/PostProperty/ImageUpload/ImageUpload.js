import React , { Component }	from 'react';
import axios 					from 'axios';
import { Link }					from 'react-router-dom';
import { connect } 				from 'react-redux';
import { Route , withRouter}    from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './ImageUpload.css';

 class ImageUpload extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}
		uploadImage(){
			const formValues = {
				"uploadImage" : "",
				"uploadVideo" : "",
				"property_id" : this.props.property_id
			};
			console.log("imageUpload req = ",formValues);

			axios
				.patch('/api/properties/patch/photos',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						// this.props.redirectToImageUpload();
					}
				})
				.catch((error) =>{
						this.props.redirectToCongratsPage();
					// console.log("error = ", error);
				});
		}
		backToAvailability(){
			this.props.backToAvailability();
		}

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backGround">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentHolder">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImg">
							<label>Please Upload Images:</label>
							<input type="file" className="" accept=".jpg,.jpeg,.png" />
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadVideo">
							<label>Please Upload Video:</label>
							<input type="file" className="" accept=".mp3,.mp4" />
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
	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		backToAvailability  	        : ()=> dispatch({type: "BACK_TO_AVAILABILITY"}),
		redirectToCongratsPage       : ()=> dispatch({type: "REDIRECT_TO_CONGRATS_PAGE"}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ImageUpload));
