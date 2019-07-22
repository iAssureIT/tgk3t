import React , { Component }	from 'react';
import { Link } 				from 'react-router-dom';
import axios 					from 'axios';
import $ 						from "jquery";
import Financials 					from '../Financials/Financials.js';
import swal                     from 'sweetalert';
import { connect } 				from 'react-redux';
import { Route , withRouter}    from 'react-router-dom';

import './Location.css';

 class Location extends Component {

 	constructor(props){
			super(props);
			this.state = {
				selected  : "",
				
			};
		}
	componentDidMount(){
					document.getElementById("selectState").selectedIndex=0;
					document.getElementById("selectCity").selectedIndex=0;
					document.getElementById("selectArea").selectedIndex=0;
					document.getElementById("selectSubArea").selectedIndex=0;	
	}
	insertLocation(event){
			event.preventDefault();	
			const formValues = {
				"country" 			: "India",
				"state" 			: this.refs.state.value,
				"city" 				: this.refs.city.value,
				"area" 			    : this.refs.area.value,
				"subArea" 			: this.refs.subArea.value,
				"society" 		    : this.refs.society.value,
				"landmark" 			: this.refs.landmark.value,
				"address" 	        : this.refs.housebuilding.value,
				"pincode" 			: this.refs.pincode.value,
				"property_id" 		: this.props.property_id,
			};
				console.log("Location",formValues);
			axios
				.patch('/api/properties/patch/propertyLocation',formValues)
				.then( (res) =>{
					console.log(res);

					if(res.status == 200){
						this.props.redirectToPropertyDetails();
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
		}

		backToBasicInfo(){
			this.props.backToBasicInfo();
		}

		handlePincode(){
				if(this.refs.pincode.value==''){
					document.getElementById("selectState").selectedIndex=0;
					document.getElementById("selectCity").selectedIndex=0;
					document.getElementById("selectArea").selectedIndex=0;
					document.getElementById("selectSubArea").selectedIndex=0;
				}else{
					document.getElementById("selectState").selectedIndex=1;
					document.getElementById("selectCity").selectedIndex=1;
					document.getElementById("selectArea").selectedIndex=1;
					document.getElementById("selectSubArea").selectedIndex=1;
				}
			
		}

	render() {

		return (
			<div >
			<div  className="col-lg-12 col-md-12 col-sm-12">
				{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
				  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
						<label className="title_sz">Let's Provide Details of Your Property Location</label>
						<Link to="/HomePage" className=" ">
							<button type="button" className="close">&times;</button>
						 </Link>
					</div>
			    </div>*/}
			    <div className="row"></div>
			    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
			    	<span className="locSpan col-lg-2 col-lg-offset-2  ">Pincode </span>
			    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group">
						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
				                <i className="fa fa-building iconClr"></i>
			                    </div>
						    <input type="text" className="form-control" ref="pincode"  placeholder="Enter Pincode" onBlur={this.handlePincode.bind(this)}/>
						    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
						  	</div>
					</div>
			    </div>
			    <div className="orSeparatorLine col-lg-8 col-lg-offset-2"> 
			    	<div className="wordContainer col-lg-1 col-lg-offset-5"> 
			    		OR 
					</div>    			    		
			    </div>    
			<div id="location">    
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
				    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					    <div className="form-group" id="bedrooms">
					    	<span htmlFor="">State</span>
					  		<div className="input-group inputBox-main " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconSize12 iconClr"></i>
			                    </div>*/}
							  	<select className="custom-select form-control"   ref="state" placeholder="select" id="selectState">
							    	<option disabled>-- State --</option>
							    	<option>Maharashtra</option>
							    	<option>Gujrat</option>
							    	<option>Delhi</option>
								</select>
							</div>
					  </div>
				    </div>
				    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					    <div className="form-group" id="bedrooms">
					    	<span htmlFor="">City</span>
					  		<div className="input-group inputBox-main " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconSize12 iconClr"></i>
			                    </div>*/}
							  	<select className="custom-select form-control "   ref="city" placeholder="select"  id="selectCity" >
							    	<option disabled>-- City --</option>
							    	<option>Pune</option>
							    	<option>Nashik</option>
							    	<option>Solapur</option>
								</select>
							</div>
					  </div>
				    </div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="form-group" id="balconies">
						    <span htmlFor="">-- Area/Suburb --</span>
						    <div className="input-group inputBox-main " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconClr"></i>
			                    </div>*/}
							    <select className="custom-select form-control " ref="area" placeholder="select" id="selectArea">
							    	<option disabled>-- Area --</option>
							    	<option>Hadapsar</option>
							    	<option>Kothrud</option>
							    	<option>Aundh</option>
								</select>
							</div>
						  </div>
					</div>
				    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="form-group" id="bathroom">
						    <span htmlFor="">Sub-Area</span>
						    <div className="input-group inputBox-main " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconClr"></i>
			                    </div>*/}
							    <select className="custom-select form-control"   ref="subArea" placeholder="select" id="selectSubArea">
							    	<option disabled>-- Select Subarea --</option>
							    	<option>Magarpatta City</option>
							    	<option>Satavwadi</option>
							    	<option>Sasane Nagar</option>
								</select>
							</div>
						</div>
				    </div>
			    </div>
			    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm" >
			  		<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
					  	<div className="form-group"  id="" >
						    <span htmlFor="">Society</span>
						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
				                 <i className="fa fa-building iconClr"></i>
			                    </div>
							    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
							    <input type="text" className="form-control" ref="society"  placeholder="Enter Society"/>
							    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
						  	</div>
				        </div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
						  <div className="form-group"  id="" >
							    <span htmlFor="">House/Building Number</span>

						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
				                <i className="fa fa-building iconClr"></i>
			                    </div>
						    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
						    <input type="text" className="form-control" ref="housebuilding"  placeholder="Enter House Address"/>
						    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
						  	</div>
						  </div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
						  <div className="form-group"  id="" >
							    <span htmlFor="">Landmark</span>

						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
				                <i className="fa fa-building iconClr"></i>
			                    </div>
						    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
						    <input type="text" className="form-control" ref="landmark"  placeholder="Landmark "/>
						    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
						  	</div>
						  </div>
					</div>
			    </div>
			</div>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 actionArea">
			  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
			       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToBasicInfo.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
			  	</div>
			  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
			       <button className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.insertLocation.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
			  	</div>
			</div>
		</div>
		</div>
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		property_id     : state.property_id,
		BasicInfo		: state.BasicInfo,
		PropertyDetails	: state.PropertyDetails,
		Financials		: state.Financials,
		Amenities		: state.Amenities,
		Availability	: state.Availability,
		Location	 	: state.Location,		
	}
};


const mapDispatchToProps = (dispatch)=>{
	return {
		redirectToPropertyDetails   : ()=> dispatch({type: "REDIRECT_TO_PROPERTY"}),
		backToBasicInfo  			: ()=> dispatch({type: "BACK_TO_BASIC_INFO"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Location));