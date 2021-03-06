import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import swal                     from 'sweetalert';
import { Link }					from 'react-router-dom';
import { Route , withRouter}    from 'react-router-dom';
import { connect } 				from 'react-redux';
import Availability 			from '../Availability/Availability.js';
import Financials 					from '../Financials/Financials.js';

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
						},()=>{
							console.log("here allAmenities by admin in update status true",this.state.allAmenities);
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
							// console.log("allAmenitiesDataList after data match",allAmenitiesDataList);
							this.setState({
									allAmenities : allAmenitiesDataList,
								},()=>{
									console.log("here allAmenities in didmount after match result",this.state.allAmenities);

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
	                    })



							// ------------------------------
						});
					}
				)
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

			// -----------------------------------------------------------------------------------

	  
        	}



		}

	componentDidMount(){

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");


		console.log("update status in did mount",this.props.updateStatus);
		if(this.props.updateStatus === false){
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
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
localStorage.removeItem("uid");
localStorage.removeItem("token");
                             this.props.history.push("/");
                        }
            });

// //////////////////////////////////////////////////////

			console.log("this.props.updateStatus",this.props.updateStatus);
			console.log("this.props.property_id",this.props.property_id);
			console.log("all amenities for admin",this.state.allAmenities);
			
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
		  	 	{/*<div className="col-lg-12  borderBtm padd0 AmeniCenter">
		  	 		<b>All Amenities</b>
		  	 	</div>*/}

		  	 	<div className = "container-fluid padd0 ">

		  	 		{console.log("here amenity in map",this.state.allAmenities)}
		  	 		{this.state.allAmenities && this.state.allAmenities.length > 0 ?
		  	 			this.state.allAmenities.map((data,index)=>{
		  	 				// console.log("data",data);
		  	 				return(
		  	 						<div className="col-lg-6 FF4I1 sideBorder" key={index}>

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
												<span> 
												 	<span className="Ameni1"><img src="/images/internet.png" /></span>
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
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	{
		  		<div className="form-group col-lg-3	col-md-3 col-sm-6 col-xs-6 pull-left">
		      		 <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToPropertyDetails.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  		</div>
		  		
		  	}
		  	<div className="form-group mgbt col-lg-3 col-md-3 col-sm-6 col-xs-6 pull-right ">
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
