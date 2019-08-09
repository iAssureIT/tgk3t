import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from 'jquery';
import swal 					from 'sweetalert';		
import { connect } 				from 'react-redux';
import { withRouter}    		from 'react-router-dom';

import './Location.css';

 class Location extends Component {

 	constructor(props){
			super(props);
			
			this.state = {
				"selected"  		: "",
				"listofStates"		: "",
				"listofBlocks"		: "",
				"listofAreas"		: "",
				"village"			: "",
				"index" 			: "",
				"districtName"		: "",
				"subAreaList"		: ["Akashvani", "Amanora Chambers", "Fursungi", "Gadital", "KalePadal", "Magarpatta City","Sasane Nagar", "Satavwadi"],
			};
			this.handleChange = this.handleChange.bind(this);
		}
	componentDidMount(){

		this.getState();

		// document.getElementById("selectState").selectedIndex=0;
		// document.getElementById("selectCity").selectedIndex=0;
		// document.getElementById("selectArea").selectedIndex=0;
		// document.getElementById("selectSubArea").selectedIndex=0;	
	}
	insertLocation(event){
			event.preventDefault();	
			const formValues = {
				"country" 			: "India",
				"state" 			: this.state.state.split('|')[0],
				"city" 				: this.state.city.split('|')[0],
				"area" 			    : this.refs.area.value,
				"subArea" 			: this.refs.subArea.value,
				"society" 		    : this.refs.society.value,
				"landmark" 			: this.refs.landmark.value,
				"address" 	        : this.refs.housebuilding.value,
				"pincode" 			: this.refs.pincode.value,
				"property_id" 		: localStorage.getItem("propertyId"),
				"index"				: this.state.index,
				"uid" 				: localStorage.getItem("uid"),
				

			};
				 localStorage.setItem("index",this.state.index);

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
					// document.getElementById("selectState").selectedIndex=0;
					// document.getElementById("selectCity").selectedIndex=0;
					// document.getElementById("selectArea").selectedIndex=0;
					// document.getElementById("selectSubArea").selectedIndex=0;
				}else{
					// document.getElementById("selectState").selectedIndex=1;
					// document.getElementById("selectCity").selectedIndex=1;
					// document.getElementById("selectArea").selectedIndex=1;
					// document.getElementById("selectSubArea").selectedIndex=1;
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
      this.getBlockbyState(this.state.stateCode);
      })
    });
    // this.handleChange(event);
}

getBlockbyState(stateCode){
        console.log('stateCode ==========', stateCode);
    axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/blocks/get/BlocksByState/'+stateCode+'/IN',
    }).then((response)=> {
        console.log('response ==========', response.data);
        this.setState({
          listofBlocks : response.data,
          districtName : response.data[0].districtName
        },()=>{
        console.log('listofBlocks', this.state.listofBlocks);
        console.log('districtName', this.state.districtName);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
   selectBlock(event){
    event.preventDefault();
    var city = event.target.value;
    var districtName = $('option:selected', event.target).attr('data-districtname');
    this.setState({
      city : city,
      districtName:districtName
    },()=>{
      var cityCode = this.state.city.split('|')[1];
      // console.log("districtName",districtName);
      // this.getVillages(this.state.stateCode, this.state.districtName, this.state.city);
      this.getAreas(this.state.city, this.state.districtName, this.state.stateCode );
    });
  }
  getAreas(blockName, districtName, stateCode){
    axios({
      method: 'get',
      url: 'http://locationapi.iassureit.com/api/areas/get/list/'+blockName+'/'+districtName+'/'+stateCode+'/IN',
    }).then((response)=> {
        // console.log('response ==========', response.data);
        this.setState({
          listofAreas : response.data
        },()=>{
        console.log('listofAreas', this.state.listofAreas);
        })
    }).catch(function (error) {
      console.log('error', error);
    });
  }
  
  selectVillage(event){
    event.preventDefault();
    var village = event.target.value;
      console.log("village",village);
    this.setState({
      village : village,
    },()=>{
      console.log("village",village);
    });
    // this.handleChange();
  }
  selectCity(event){
  	this.setState({
  		// [event.target.name] : event.target.value
  		[event.target.name] : event.target.value
  	})
  	// this.getArea(event.target.value);
  }

  handleChange(event){
      //   const target = event.target.value;
      //   const name   = event.target.name;
      //   console.log('target',name, target);
      //     this.setState({ 
      //   [name]:target
      // },()=>{
      //   // console.log('this state', this.state);
      // })
  }

	render() {
	var cityName = this.state.city;
    var areaName = this.state.area;
    var subareaName = this.state.subArea;
    var societyName = this.state.society;

    if(cityName != null &&  areaName != null && subareaName != null && societyName != null)
    {
       var first  = cityName.toUpperCase().slice(0,2);
       var second = areaName.toUpperCase().slice(0,2);
       var third  = subareaName.toUpperCase().slice(0,2);
       var forth  = societyName.toUpperCase().slice(0,2);

       this.state.index = first+second+third+forth;
       // console.log("index here", this.state.index);
    }

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
							  	<select className="custom-select form-control"   ref="state" placeholder="select" id="selectState" value={this.state.state}  onChange={this.selectState.bind(this)}>
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
							  	<select className="custom-select form-control " value={this.state.city} name="city" ref="city" placeholder="select"  id="selectCity" onChange={this.selectBlock.bind(this)} >
							    	<option value="">-- City --</option>
							    	{
                                    this.state.listofBlocks && this.state.listofBlocks.length > 0 ? 
                                    this.state.listofBlocks.map((data, index)=>{
                                      return(
                                        <option key={index} value={data.blockName} data-districtname={data.districtName} >{data.blockName}</option>
                                        
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
							    <select className="custom-select form-control" value={this.state.village} name="village" onChange={this.selectVillage.bind(this)} name="area" ref="area" placeholder="select" id="selectArea">
							    	<option value="">-- Area --</option>
							    	{
                                    this.state.listofAreas && this.state.listofAreas.length > 0 ? 
                                    this.state.listofAreas.map((data, index)=>{
                                      return(
                                        <option key={index} value={data.areaName} >{data.areaName}</option>
                                        
                                      );
                                    })
                                    :
                                    <option disabled>Select State first</option>
                                  }   
								</select>
							</div>
						  </div>
					</div>
				    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="form-group" id="">
						    <span htmlFor="">Sub-Area</span>
							<span className="astrick">*</span>

						    <div className=" " id="">
						      	{/*<div className="input-group-addon inputIcon">
			                     <i className="fa fa-building iconClr"></i>
			                    </div>*/}
							    {/*<select className="custom-select form-control" onChange={this.handleChange} name="subArea"  ref="subArea" placeholder="select" id="selectSubArea">
							    	<option disabled>-- Select Subarea --</option>
							    	<option>Magarpatta City</option>
							    	<option>Satavwadi</option>
							    	<option>Sasane Nagar</option>
								</select>*/}
							    <input type="text" list="subAreaList" className="form-control" ref="subArea" name="subArea" placeholder="Enter Subarea"/>

							    <datalist id="subAreaList">
							    	{this.state.subAreaList.map( (subAreaName,index)=>{
							    		console.log("subareaName = ", subAreaName);
							    		return(<option value={subAreaName} key={index} />)
							    	})}
							    </datalist>


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
							    <input type="text" className="form-control" ref="society" onChange={this.handleChange}  name="society" placeholder="Enter Society"/>
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
			  	{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
			       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToBasicInfo.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
			  	</div>*/}
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