import React , { Component }	from 'react';
import { Link } 				from 'react-router-dom';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import Form3 					from '../Form3/Form3.js';
import swal                     from 'sweetalert';

import './Location.css';

export default class Location extends Component {

	updateUser(event){
			event.preventDefault();
			const formValues = {
				"city" 				: this.refs.city.value,
				"area" 			    : this.refs.area.value,
				"subArea" 			: this.refs.subArea.value,
				"society" 		    : this.refs.society.value,
				"landmark" 			: this.refs.landmark.value,
				"houseBuilding" 	: this.refs.housebuilding.value,
				"pincode" 			: this.refs.pincode.value,

			};
				console.log("Location",formValues);
			axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.city.value          = '';
						this.refs.area.value          = '';
						this.refs.subArea.value 	  = '';
						this.refs.society.value 	  = '';
						this.refs.landmark.value 	  = '';
						this.refs.housebuilding.value 	  = '';
						this.refs.pincode.value 	  = '';

						this.props.history.push("/Form2");
						$("#efg").hide();
    					$("#efg").removeClass('in');
						$("#hij").show();
          				$("#hij").addClass('in');
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});

				
		}
		toggleForm(){

						    $("#location").toggle();
						   
				}
	render() {
				var windowWidth = $(window).width();
		        var backImage = "backImageModal hidden-xs hidden-sm"
		        var winHeight = window.innerHeight;
		return (
			<div className={backImage} style={{"height": winHeight}}>
			<div  className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 page_content mt-76">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
				  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
						<label className="title_sz">Let's Provide Details of Your Property Location</label>
						<Link to="/HomePage" className=" ">
							<button type="button" className="close">&times;</button>
						 </Link>
					</div>
			    </div>
			    <div className="hr_border row"></div>
			    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
			    	<span className="locSpan col-lg-2 col-lg-offset-2  ">Pincode </span>
			    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group">
						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
				                <i className="fa fa-building iconClr"></i>
			                    </div>
						    <input type="text" className="form-control" ref="pincode"  placeholder="Enter Pincode "/>
						    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
						  	</div>
					</div>
			    </div>
			    <div className="orBtn">
			        <button className="locH2 btn btn-primary" onClick={this.toggleForm.bind(this)}>OR</button>
			    </div>    
			<div id="location">    
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">	
				    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
					    <div className="form-group" id="bedrooms">
					    	<span htmlFor="">City</span>
					  		<div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconSize12 iconClr"></i>
			                    </div>
							  	<select className="custom-select form-control "  ref="city" placeholder="select" >
							    	<option className="hidden">select</option>
							    	<option>Pune</option>
							    	<option>Nashik</option>
							    	<option>Solapur</option>
								</select>
							</div>
					  </div>
				    </div>
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<div className="form-group" id="balconies">
						    <span htmlFor="">Area/Suburb</span>
						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconClr"></i>
			                    </div>
							    <select className="custom-select form-control " ref="area" placeholder="select" >
							    	<option className="hidden">select</option>
							    	<option>Hadapsar</option>
							    	<option>Kothrud</option>
							    	<option>Aundh</option>
								</select>
							</div>
						  </div>
					</div>
				    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<div className="form-group" id="bathroom">
						    <span htmlFor="">Sub-Area</span>
						    <div className="input-group inputBox-main " id="">
						      	<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconClr"></i>
			                    </div>
							    <select className="custom-select form-control " ref="subArea" placeholder="select" >
							    	<option className="hidden">select</option>
							    	<option>Magarpatta</option>
							    	<option>Satavwadi</option>
							    	<option>Sasane nagar</option>
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
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
			       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)}>Save & Next >></button>
			  	</div>
			</div>
		</div>
		</div>
		);
	}
}
