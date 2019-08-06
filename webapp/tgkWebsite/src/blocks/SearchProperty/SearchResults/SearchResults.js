import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		    from 'react-router-dom';
import { connect } 				from 'react-redux';

import './SearchResults.css';

class SearchResults extends Component {

	constructor(){
		super();
		this.state = {
			budgetList1 	: [],
			budgetList2 	: [],
			inputData  		: "",
			propertyType	: "Commercial-Sell"
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {

		var formValues = {
			startRange:0,
			limitRange:6,
		}

		 axios
        .post('/api/properties/listofproperty/Residential/Sell')
        .then( (res) =>{
          this.setState({
          	inputData : res.data,
          },()=>{
          	console.log("inputData",this.state.inputData);
          })

        })
        .catch((error) =>{
          console.log("error = ", error);
        });	

		this.setState({
			budgetList1 : ["00 - 05 Lac","05 - 10 Lac","10 - 20 Lac","30 - 40 Lac",
						  "20 - 30 Lac", "30 - 40 Lac","40 - 50 Lac",
						  "50 - 60 Lac","60 - 70 Lac","70 - 80 Lac",
						  "80 - 99 Lac","1 - 1.2 Cr","1.2 - 1.4 Cr","1.4 - 1.6 Cr",
						  "1.6 - 1.8 Cr","1.8 - 1.99 Cr"] ,
			budgetList2 : ["5000","10000","15000","20000","25000","30000","40000","50000","60000","80000", "1 Lac", "1.2 Lac", "1.5 Lac"] 
		})



		 var $select = $(".floorOption");

		    for (var i=-2;i<=60;i++){
		        $select.append($('<option></option>').val(i).html(i))
		    }
	}

	propertyType(event){
		event.preventDefault();
		$("#propertyDiv").toggle();
		$("#budget").hide();
	}



	handleSearch(event){
		event.preventDefault();
		var propertyType = this.refs.propertyType.value;
		this.setState({
			propertyType : this.refs.propertyType.value,
		})
	}


	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchDiv">
						{/*---------------Search Bar-------------------*/}
						<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchBar">
							<div className="col-lg-1 col-md-1 col-xs-12 col-sm-12 noPad">
							  	<div className="dropdown">
									<select className="custom-select form-control"  ref="propertyType" placeholder="" id='select' onChange={this.handleSearch.bind(this)}>
							    		<optgroup label="Residential">
											<option value="Residential-Sell">Buy</option>
											<option value="Residential-Rent">Rent</option>
										</optgroup>
											<optgroup label="Commercial">
											<option value="Commercial-Sell">Buy</option>
											<option value="Commercial-Rent">Rent</option>
										</optgroup>
									</select>
								</div>
							</div>
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad">
								<div className="form-group"  id="" >
								    <div className="input-group inputBox-main " id="">
								    	<input type="text" className="form-control" ref="" name="" placeholder="Enter Location..."/>
								  		<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-search"></i>
					                    </div>
								  	</div>
								</div>
							</div>

							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 propertyType">
							  	<div className="dropdown" id="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      		{this.state.propertyType === "Commercial-Rent" || this.state.propertyType === "Commercial-Sell" ?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Office Space</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Shop / Showroom</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Commercial Land</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Warehouse</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Industrial Building</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Industrial Shed</span>
											</div>
										</div>
										:
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Residential</h5>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;MultiStory Apartment</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Residential House</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Studio Apartment</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Villa / Bunglow</span>
												<span className="col-lg-6"><input type="checkBox" />&nbsp;Penthouse</span>
											</div>
										</div>
										}
								    </ul>
								</div>
							</div>


							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12">
							  	<div className="dropdown">
									<select className="custom-select form-control"  ref="" placeholder="">
									   	<option value="" className="hidden">Budget</option>
							    		{this.state.propertyType === "Commercial-Sell" || this.state.propertyType === "Residential-Sell" ?
							    			this.state.budgetList1.map((budget,index)=>{
									    		return(
									    				<option value="" key={index} className="selectOption">{budget}</option>
									    			);
									    		})
										:
										this.state.budgetList2.map((budget,index)=>{
								    		return(
								    				<option value="" key={index} className="selectOption">{budget}</option>
								    			);
								    		})
										}
									</select>
								</div>
							</div>
						
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12">
							  	<div className="dropdown">
									<select className="custom-select form-control floorOption"  ref="" placeholder="" id=''>
									  	<option value="" className="hidden">Floor</option>
									</select>
								</div>
							</div>
					

					{/*		<div className="col-lg-1 col-md-1 col-xs-12 col-sm-12">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Floor
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      		<div className="floorOption"></div>
								    </ul>
								</div>
							</div>*/}

							<div className="col-lg-1 col-md-1 col-xs-12 col-sm-12 areaBtn">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Area
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" placeholder="Min"/>
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" placeholder="Max"/>
							      		<span className="col-lg-3 col-md-3 col-xs-12 col-sm-12 sqftMt">Sqft</span>
							      		<button type="button" className="col-lg-2 col-md-2 col-xs-12 col-sm-12 goBtn btn">Go</button>
								    </ul>
								</div>
							</div>

							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 constructionBtn">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Construction Status
								    <span className="caret caretMlC"></span></button>
								    <ul className="dropdown-menu col-lg-10 col-md-12 col-xs-12 col-sm-12 pad mt36">
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox"/> Ready To Move</div>
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox"/> Under Construction</div>
								    </ul>
								</div>
							</div>
							
						</div>

					</div>
				</form>

			{/*-------------------Results------------------------*/}
				<div className="col-lg-12  col-md-10 col-xs-12 col-sm-12 searchResults noPad">
					<div className="col-lg-12 col-md-1 col-xs-12 col-sm-12 result noPad">
						{this.state.inputData && this.state.inputData.length>0  ?
							this.state.inputData.map((myProperty,index)=>{
							return(
								<div key={index} className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox bgWhite">			
									<div className="row pull-right topRightTriangle" id="triangle-topright">				</div>	
										<div className="row">
											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">				
												{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right ">
													<h5 className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pull-right intrestBtn">
														<i  className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;<span>{this.state.heartStatus}</span>
													</h5>
												</div>*/}
											
											<img alt=""  className="propertyImgDiv" src={myProperty.gallery.Images[0]} />
										</div>
										<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noPad">				
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
												<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 propertySubText1">				
													<i className="fa fa-inr"></i>&nbsp;
													<span>
														{myProperty.financial && myProperty.financial.totalPrice ? myProperty.financial.totalPrice : "-"}
													</span>
												</div>

														<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 propertySubText1">				
															{
																myProperty.propertyDetails && myProperty.propertyDetails.bedrooms ? myProperty.propertyDetails.bedrooms 
																: 
																"-"
															}
															&nbsp;BHK
															&nbsp;
															<i className="fa fa-map-marker text-warning"/>
															&nbsp;
															{myProperty.propertyLocation  &&  myProperty.propertyLocation.city && myProperty.propertyLocation.society
																? 
																myProperty.propertyLocation.society +", "+myProperty.propertyLocation.city 
																:
																 "-"
															}
														</div>
													
														<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noPad pull-right">				
															{myProperty.transactionType ?
																myProperty.transactionType ==="Sell" ?
																<span className="pull-right text-right col-lg-8  noPad transactionLabel">Sale</span>
																:
																myProperty.transactionType ==="Rent" ?
																<span className="pull-right text-right col-lg-8 noPad transactionLabel">{myProperty.transactionType}</span>
																:
																null
															:
															"-"
															}
														</div>	
														

													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">
																{myProperty.propertyDetails && myProperty.propertyDetails.bedrooms ? myProperty.propertyDetails.bedrooms : "-"}
															</span>
															<br/> Beds
														</div>
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">
																{myProperty.propertyDetails && myProperty.propertyDetails.bathrooms ? myProperty.propertyDetails.bathrooms : "-"}
															</span>
															<br/>Baths
														</div>
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">{myProperty.floor? myProperty.floor :"-"}  /  {myProperty.floor? myProperty.totalFloor :"-"}</span><br/>Floor / Total Floor
														</div>
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/face.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">{myProperty.propertyDetails? myProperty.propertyDetails.facing :"-"}</span><br/>Facing
														</div>
													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">				
														<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
															Super Area : <b>{myProperty.propertyDetails ? myProperty.propertyDetails.superArea : "-"}&nbsp;Sqft</b>
														</div>
														<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
															Possession by : <span className="propertySubText2">{myProperty.propertyDetails ? myProperty.propertyDetails.availableFrom : "-"}</span>
														</div>
														<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
				                                      		<Link to={"/PropertyProfile/"+myProperty._id} target="_blank">
																<button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								})
							:
							<div className="col-lg-12 text-center"><h5>Search reults will be shown <b>here...</b></h5></div>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchResults);
