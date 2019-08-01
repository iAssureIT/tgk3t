import React , { Component }	from 'react';
import axios 					from 'axios';
import swal 					from 'sweetalert';		

import { connect } 				from 'react-redux';
import { withRouter}    from 'react-router-dom';

import './Location.css';

 class Location extends Component {

 	constructor(props){
			super(props);
			this.state = {
				"selected"  		: "",
				"listofStates"		: "",
				"listofDistrict"	: ""
				
			};
		}
	componentDidMount(){
		this.getState();
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
				"property_id" 		: localStorage.getItem("propertyId"),
				"uid" 				: this.props.uid,
			};
				console.log("Location",formValues);
				if(this.refs.state.value!="" && this.refs.city.value!="" && this.refs.area.value!="" && this.refs.subArea.value!="" && this.refs.society.value!="" && this.refs.housebuilding.value!="" ){
				axios
				.patch('/api/properties/patch/propertyLocation',formValues)
				.then( (res) =>{
					console.log(res);

					if(res.status === 200){
						this.props.redirectToPropertyDetails(this.props.uid);
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
				}else{
						swal("Please enter mandatory fields", "", "warning");
              			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
				}
			
		}

		backToBasicInfo(){
			this.props.backToBasicInfo();
		}

		handlePincode(){
				if(this.refs.pincode.value===''){
					document.getElementById("selectState").selectedIndex=0;
					document.getElementById("selectCity").selectedIndex=0;
					document.getElementById("selectArea").selectedIndex=0;
					document.getElementById("selectSubArea").selectedIndex=0;
				}else{
					// document.getElementById("selectState").selectedIndex=1;
					// document.getElementById("selectCity").selectedIndex=1;
					document.getElementById("selectArea").selectedIndex=1;
					document.getElementById("selectSubArea").selectedIndex=1;
				}
			
		}

  getState(){
    axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/states/get/list/IN',
    }).then((response)=> {
        // console.log('response ==========', response.data);
        this.setState({
          listofStates : response.data
        },()=>{
        // console.log('listofStates', this.state.listofStates);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
selectState(event){
    event.preventDefault();
    var selectedState = event.target.value;
    this.setState({
      state : selectedState,
    },()=>{
      var stateCode = this.state.state.split('|')[2];
      // console.log('state', stateCode);
      this.setState({
        stateCode :stateCode
      },()=>{
      console.log('stateCode',this.state.stateCode);
      this.getDistrict(this.state.stateCode);
      })
    });
    // this.handleChange(event);
}

getDistrict(stateCode){
    axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/districts/get/list/'+stateCode+'/IN',
    }).then((response)=> {
        // console.log('response ==========', response.data);
        this.setState({
          listofDistrict : response.data
        },()=>{
        console.log('listofDistrict', this.state.listofDistrict);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
  selectCity(event){
  	this.setState({
  		[event.target.name] : event.target.value
  	})
  	this.getArea(event.target.value);
  }
  getArea(city){
  	console.log('city', city);
  	axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/districts/get/list/'+city+'/IN',
    }).then((response)=> {
        // console.log('response ==========', response.data);
        this.setState({
          listofArea : response.data
        },()=>{
        console.log('listofArea', this.state.listofArea);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
    districtCoveredChange(event){    
    event.preventDefault();
    var districtCovered = event.target.value;
    // console.log('districtCovered', districtCovered);
    this.setState({
      districtCovered: districtCovered
    },()=>{
      var selectedDistrict = this.state.districtCovered.split('|')[0];
      console.log("selectedDistrict",selectedDistrict);
      this.setState({
        selectedDistrict :selectedDistrict
      },()=>{
      console.log('selectedDistrict',this.state.selectedDistrict);
      this.getBlock(this.state.stateCode, this.state.selectedDistrict);
      })
    });
  }
  getBlock(stateCode, selectedDistrict){
    axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/blocks/get/list/'+selectedDistrict+'/'+stateCode+'/IN',
    }).then((response)=> {
        console.log('response ==========', response.data);
        this.setState({
          listofBlocks : response.data
        },()=>{
        console.log('listofBlocks', this.state.listofBlocks);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
  selectBlock(event){
    event.preventDefault();
    var blockCovered = event.target.value;
    this.setState({
      blockCovered : blockCovered
    },()=>{
      console.log("blockCovered",blockCovered);
      this.getVillages(this.state.stateCode, this.state.selectedDistrict, this.state.blockCovered);
    });
  }
  getVillages(stateCode, selectedDistrict, blockCovered){
    axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/cities/get/list/'+blockCovered+'/'+selectedDistrict+'/'+stateCode+'/IN',
    }).then((response)=> {
        console.log('response ==========', response.data);
        this.setState({
          listofVillages : response.data
        },()=>{
        console.log('listofVillages', this.state.listofVillages);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
	render() {

		return (
			<div >
			<div  className="col-lg-12 col-md-12 col-sm-12 mt40">
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
							<span className="astrick">*</span>
					  		<div className=" " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconSize12 iconClr"></i>
			                    </div>*/}
							  	<select className="custom-select form-control"   ref="state" placeholder="select" id="selectState" onChange={this.selectState.bind(this)}>
							    	<option value="">-- State --</option>
							    	{
                                    this.state.listofStates ?
                                    this.state.listofStates.map((data, index)=>{
                                      return(
                                        <option key={index} value={data.stateName+'|'+data._id+'|'+data.stateCode}>{data.stateName}</option> 
                                      );
                                    })
                                    :
                                    null
                                  }
								</select>
							</div>
					  </div>
				    </div>
				    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					    <div className="form-group" id="bedrooms">
					    	<span htmlFor="">City</span>
							<span className="astrick">*</span>

					  		<div className=" " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconSize12 iconClr"></i>
			                    </div>*/}
							  	<select className="custom-select form-control "   ref="city" placeholder="select"  id="selectCity" onChange={this.selectCity.bind(this)} >
							    	<option disabled>-- City --</option>
							    	{
                                    this.state.listofDistrict && this.state.listofDistrict.length > 0 ? 
                                    this.state.listofDistrict.map((data, index)=>{
                                      return(
                                        <option key={index} value={data.districtName+'|'+data._id}>{data.districtName}</option>
                                      );
                                    })
                                    :
                                    <option disabled>Select State first</option>
                                  }     
							    	{/*<option>Pune</option>
							    	<option>Nashik</option>
							    	<option>Solapur</option>*/}
								</select>
							</div>
					  </div>
				    </div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="form-group" id="balconies">
						    <span htmlFor="">Area/Suburb </span>
							<span className="astrick">*</span>

						    <div className=" " id="">
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
							<span className="astrick">*</span>

						    <div className=" " id="">
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
							<span className="astrick">*</span>

						    <div className="input-group  " id="">
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
								<span className="astrick">*</span>

						    <div className="input-group  " id="">
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

						    <div className="input-group  " id="">
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
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40 ">
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
	console.log("lState===",state);

	return {
		uid				:state.uid,
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
		redirectToPropertyDetails   : (uid)=> dispatch({type: "REDIRECT_TO_PROPERTY",
														uid:uid
									}),
		backToBasicInfo  			: ()=> dispatch({type: "BACK_TO_BASIC_INFO"}),
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Location));