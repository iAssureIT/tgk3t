import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import swal                     from 'sweetalert';
import { Link }					from 'react-router-dom';
import { Route , withRouter}    from 'react-router-dom';
import { connect } 				from 'react-redux';
import Availability 			from '../Availability/Availability.js';
import Financials 				from '../Financials/Financials.js';

import './Amenities.css';


 class Amenities extends Component{

		constructor(props){
			super(props);
			this.state = {
				originalValues  : '',
				Amenities     : [],
				allAmenities  : "",
				prevAmenities : "",
				updateOperation   : false,

			};


		}

	componentDidMount(){
		axios
			.get('/api/masteramenities/list')
			.then(
				(res)=>{
					console.log('res postdata', res);
					const postsdata = res.data;
					console.log('postsdata',postsdata);
					this.setState({
						allAmenities : postsdata,
					});
				}
			)
			.catch((error)=>{

				console.log("error = ",error);
				alert("Something went wrong! Please check Get URL.");
				 });	

// //////////////////////////////////////////////////////

			console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			console.log("all amenities for admin",this.state.allAmenities);
			if(this.props.updateStatus === true){

				axios
				.get('/api/masteramenities/list')
				.then(
					(res)=>{
						console.log('res postdata', res);
						const postsdata = res.data;
						console.log('postsdata',postsdata);
						this.setState({
							allAmenities : postsdata,
						});
					}
				)
				.catch((error)=>{

					console.log("error = ",error);
					alert("Something went wrong! Please check Get URL.");
					 });	

			// -----------------------------------------------------------------------------------

	        	axios
					.get('/api/properties/'+this.props.property_id)
					.then( (response) =>{
						console.log("response.data.Amenities= ",response);

						this.setState({
								originalValues 		: response.data,
								prevAmenities 		: response.data.Amenities,
								updateOperation     : true,

						 
						},()=>{
							console.log("here prevAmenities", this.state.prevAmenities);
							});

						var allAmenitiesData = this.state.allAmenities;
							console.log("here allAmenitiesData", allAmenitiesData);
						var allAmenitiesDataList = allAmenitiesData.map((item,index)=>{
							console.log("item",item.amenity);
							var propPresent = this.state.prevAmenities.find((obj)=>{
							console.log("obj",obj);
								return item.amenity === obj;
							console.log("here propPresent ", propPresent);

							})
							var newObj = Object.assign({},item);
							if(propPresent){
								newObj.checked = true
							}else{
								newObj.checked = false
							}
							console.log("newObj",newObj);
							return newObj;

						})
						console.log("allAmenitiesDataList",allAmenitiesDataList);
						this.setState({
								allAmenities : allAmenitiesDataList,
							},()=>{
								console.log("here allAmenities in didmount after match result",this.state.allAmenities);

							});


					})
					.catch((error) =>{
						console.log("error = ", error);
					});

        	}
			

	}

		updateUser(event){
			event.preventDefault();

			if(this.state.updateOperation === true){
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
			
				if(eq === true)
				{
						console.log("same data");
						this.props.redirectToFinancialDetails(this.props.uid,this.props.property_id);
				}else{
							console.log("diff data");
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

								"Amenities"			: allAmenitiesDataList,
								"property_id" 		: localStorage.getItem("propertyId"),
								"uid" 				: localStorage.getItem("uid"),
								

								
							};
							console.log("Amenities req = ",formValues);
							if(allAmenitiesDataList!=""){
								 axios
								.patch('/api/properties/patch/amenities',formValues)
								.then( (res) =>{
									console.log("Amenities res = ",res);
									if(res.status === 200){
										this.props.redirectToFinancialDetails(this.props.uid,this.props.property_id);
									}
								})
								.catch((error) =>{
									console.log("error = ", error);
								});
							}else{
								swal("Please select atleast one amenity", "", "warning");
				                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
							}

				}

			}else{
				console.log("submit fun");
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

					"Amenities"			: allAmenitiesDataList,
					"property_id" 		: localStorage.getItem("propertyId"),
					"uid" 				: localStorage.getItem("uid"),
					

					
				};
				console.log("Amenities req = ",formValues);
				if(allAmenitiesDataList!=""){
					 axios
					.patch('/api/properties/patch/amenities',formValues)
					.then( (res) =>{
						console.log("Amenities res = ",res);
						if(res.status === 200){
							this.props.redirectToFinancialDetails(this.props.uid,this.props.property_id);
						}
					})
					.catch((error) =>{
						console.log("error = ", error);
					});
				}else{
					swal("Please select atleast one amenity", "", "warning");
	                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}

			}
			
			
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
		backToPropertyDetails(){
		// this.props.backToPropertyDetails();
		this.props.backToPropertyDetails(this.props.uid,localStorage.getItem("propertyId"));

	}

	render() {
				console.log("this.state.allAmenities",this.state.allAmenities);
    return (
		    <div className="col-lg-12 col-md-12  col-sm-12 col-xs-12 ">
				<form id="form">
			  <div className=" row"></div>
		  	 {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 		Select the Amenities available	
		  	 	</div>
		  	 </div>*/}
		  	 <div className="col-lg-12  col-md-10 col-sm-12 col-xs-12 mt40 borderClass padd0">
		  	 	<div className="col-lg-12  borderBtm padd0">
		  	 		<span className="col-lg-6 upperbox pull-left"><b>All Amenities</b></span>
		  	 		{/*<div className="col-lg-6 FF4I"><b>External</b></div>*/}
		  	 	</div>

		  	 	<div className = "container-fluid padd0 ">
		  	 		{console.log("here amenity",this.state.allAmenities)}
		  	 		{this.state.allAmenities && this.state.allAmenities.length > 0 ?
		  	 			this.state.allAmenities.map((data,index)=>{
		  	 				console.log("data",data);
		  	 				return(
		  	 						<div className="col-lg-6 FF4I1 sideBorder" key={index}>
		  	 							
										<label className="container2">
											  <input type="checkbox"
											  		 value={data.amenity} 
										      		 id={index}
										      		 name="userCheckbox"
										      		 onChange={this.totalInclude.bind(this)} 
										      		 checked={data.checked}
										      		 />
											 <span className="checkmark pull-left"></span>
											 <span className="Ameni1"><i className="fa fa-flag" aria-hidden="true"></i></span>
											 <span >  {data.amenity} </span>
									
										</label>
		  	 						</div>
		  	 					);
		  	 			})
		  	 			:
		  	 			null
		  	 		}
		  	 	</div>
		  	</div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	{
		  		<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
		      		 <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToPropertyDetails.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  		</div>
		  		
		  	}
		  	<div className="form-group mgbt col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right ">
		       <button type="submit "  className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 mt23"  onClick={this.updateUser.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
		  	</div>
		  </div>
		  
		</form>
	</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id     : state.property_id,
		uid			    : state.uid,
		updateStatus    : state.updateStatus,		


	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToFinancialDetails  : (uid,property_id)=> dispatch({type: "REDIRECT_TO_FINANCIAL",
														uid:  uid,
														property_id: property_id
										}),
		backToPropertyDetails  	    : (uid,property_id)=> dispatch({type: "BACK_TO_PROPERTY_DETAILS",
														uid:  uid,
														property_id: property_id
										}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Amenities));
